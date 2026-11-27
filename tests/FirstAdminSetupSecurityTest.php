<?php

/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

declare(strict_types=1);

namespace Tina4Cms\Tests;

use Content;
use Users;
use PHPUnit\Framework\TestCase;

/**
 * The CMS admin front door must enforce two separate rules:
 *
 *  1. POST /cms/login AUTHENTICATES ONLY. It must NEVER create a user. An
 *     unknown email or a wrong password is an authentication failure, not a
 *     sign-up. The original handler created an account whenever the email was
 *     not found, so anyone could walk straight in — this is the regression guard
 *     for that (Content::authenticate).
 *
 *  2. First-admin bootstrap (Content::createFirstAdmin via POST /cms/setup) may
 *     create exactly one account, and ONLY while the users table is empty. Once
 *     any user exists it must refuse, otherwise an unauthenticated request could
 *     mint an active admin at any time (privilege escalation). The gate
 *     (canCreateFirstAdmin) fails closed when the count cannot be determined.
 *
 * No mocks: exercised against a real in-memory SQLite database and the real
 * Users ORM, so every query and write genuinely executes.
 */
final class FirstAdminSetupSecurityTest extends TestCase
{
    private \Tina4\DataSQLite3 $dba;

    protected function setUp(): void
    {
        $this->dba = new \Tina4\DataSQLite3(":memory:");
        $this->createUsersTable();
        $GLOBALS["DBA"] = $this->dba;
    }

    protected function tearDown(): void
    {
        unset($GLOBALS["DBA"]);
    }

    private function createUsersTable(): void
    {
        // Mirror the real CMS migration: snake_case columns. The ORM maps the
        // camelCase model properties (firstName, isActive, roleId, …) onto these
        // columns, so the test exercises the genuine write path.
        $this->dba->exec(
            "create table users (" .
            "id integer primary key, first_name varchar(100) default '', " .
            "last_name varchar(100) default '', email varchar(400) default '', " .
            "password varchar(500) default '', is_active integer default 0, " .
            "reset_token varchar(500) default '', date_created datetime default null, " .
            "date_modified datetime default null, role_id integer default 0, " .
            "site_id integer default 0)"
        );
    }

    private function userCount(): int
    {
        // Count via the same ORM path production uses, against $GLOBALS["DBA"].
        $rows = (new Users())->select("count(id) as number")->asArray();
        return (int) ($rows[0]["number"] ?? -1);
    }

    private function seedUser(string $email, string $plainPassword): void
    {
        // bcrypt output is drawn from [./A-Za-z0-9$] — no quotes — so it is safe
        // to inline here, matching the no-params seeding the rest of the suite uses.
        $hash = password_hash($plainPassword, PASSWORD_BCRYPT);
        $this->dba->exec(
            "insert into users (first_name, last_name, email, password, is_active, role_id) " .
            "values ('Seed', 'User', '{$email}', '{$hash}', 1, 1)"
        );
    }

    // ---- POST /cms/login must never create a user (Content::authenticate) ----

    public function testLoginWithUnknownEmailCreatesNoUserAndReturnsNull(): void
    {
        $before = $this->userCount();

        $result = Content::authenticate([
            "email" => "attacker@example.com",
            "password" => "whatever",
        ]);

        $this->assertNull($result, "an unknown email must not authenticate");
        $this->assertSame(
            $before,
            $this->userCount(),
            "an unknown login must NOT create a user — this was the front-door hole"
        );
    }

    public function testLoginWithWrongPasswordCreatesNoUserAndReturnsNull(): void
    {
        $this->seedUser("admin@example.com", "CorrectHorse1");
        $before = $this->userCount();

        $result = Content::authenticate([
            "email" => "admin@example.com",
            "password" => "wrong-password",
        ]);

        $this->assertNull($result, "a wrong password must not authenticate");
        $this->assertSame($before, $this->userCount(), "a failed login must not create a user");
    }

    public function testLoginWithEmptyCredentialsReturnsNullAndCreatesNoUser(): void
    {
        $before = $this->userCount();

        $this->assertNull(Content::authenticate(["email" => "", "password" => ""]));
        $this->assertNull(Content::authenticate([]));

        $this->assertSame($before, $this->userCount(), "blank credentials must not create a user");
    }

    public function testLoginWithCorrectCredentialsAuthenticatesWithoutCreating(): void
    {
        $this->seedUser("admin@example.com", "CorrectHorse1");
        $before = $this->userCount();

        $user = Content::authenticate([
            "email" => "admin@example.com",
            "password" => "CorrectHorse1",
        ]);

        $this->assertInstanceOf(Users::class, $user, "valid credentials must authenticate");
        $this->assertSame("admin@example.com", $user->email);
        $this->assertSame($before, $this->userCount(), "a successful login must not create a user either");
    }

    // ---- First-admin bootstrap (Content::createFirstAdmin) ----

    public function testCreateFirstAdminWhenEmptyCreatesAHashedActiveAdmin(): void
    {
        $this->assertSame(0, $this->userCount(), "precondition: no users");

        $user = Content::createFirstAdmin([
            "firstName" => "Root",
            "lastName" => "Admin",
            "email" => "root@example.com",
            "password" => "Sup3rSecret",
        ]);

        $this->assertInstanceOf(Users::class, $user, "first admin must be created on an empty table");
        $this->assertSame(1, $this->userCount(), "exactly one user must now exist");
        $this->assertSame(1, (int) $user->isActive);
        $this->assertSame(1, (int) $user->roleId);
        $this->assertNotSame("Sup3rSecret", $user->password, "password must never be stored in plaintext");
        $this->assertTrue(
            password_verify("Sup3rSecret", (string) $user->password),
            "stored password must be a usable bcrypt hash"
        );
    }

    public function testCreateFirstAdminRefusedOnceAnyUserExists(): void
    {
        $this->seedUser("owner@example.com", "OwnerPass1");
        $before = $this->userCount();

        $user = Content::createFirstAdmin([
            "firstName" => "Mallory",
            "lastName" => "Attacker",
            "email" => "mallory@example.com",
            "password" => "Elevate123",
        ]);

        $this->assertNull($user, "setup must be refused once a user exists (privilege-escalation guard)");
        $this->assertSame($before, $this->userCount(), "no second admin may be minted");
    }

    public function testCreateFirstAdminRefusedWithMissingInput(): void
    {
        $this->assertSame(0, $this->userCount());

        $this->assertNull(Content::createFirstAdmin(["email" => "x@example.com"]), "missing password must refuse");
        $this->assertNull(Content::createFirstAdmin(["password" => "Sup3rSecret"]), "missing email must refuse");
        $this->assertNull(Content::createFirstAdmin([]), "empty input must refuse");

        $this->assertSame(0, $this->userCount(), "no user may be created from incomplete setup input");
    }

    // ---- Gate behaviour (canCreateFirstAdmin) ----

    public function testSetupAllowedWhenNoUsersExist(): void
    {
        $this->assertTrue(Content::canCreateFirstAdmin(), "setup allowed on an empty users table");
    }

    public function testSetupRefusedOnceAnyUserExists(): void
    {
        $this->seedUser("admin@example.com", "AdminPass1");
        $this->assertFalse(Content::canCreateFirstAdmin(), "setup refused once a user exists");
    }

    public function testGateFailsClosedWhenCountCannotBeDetermined(): void
    {
        // Drop the users table so the count query errors: the gate must FAIL
        // CLOSED (refuse setup), never default to "empty" and open the door.
        $this->dba->exec("drop table users");

        $this->assertFalse(
            Content::canCreateFirstAdmin(),
            "gate must refuse setup when the user count cannot be determined"
        );
    }
}
