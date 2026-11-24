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
 * The first-admin setup flow (POST /cms/login with a "confirmPassword" field)
 * must only create an account when NO users exist yet. If it creates an account
 * while users already exist, an unauthenticated request can mint an active admin
 * at any time (privilege escalation). Content::canCreateFirstAdmin is the gate
 * the route uses.
 *
 * No mocks: exercised against a real in-memory SQLite database and the real
 * Users ORM, so the count query is genuinely executed.
 */
final class FirstAdminSetupSecurityTest extends TestCase
{
    private \Tina4\DataSQLite3 $dba;

    protected function setUp(): void
    {
        $this->dba = new \Tina4\DataSQLite3(":memory:");
        $this->dba->exec(
            "create table users (" .
            "id integer primary key, firstName text, lastName text, email text, " .
            "password text, isActive integer, resetToken text, dateCreated text, " .
            "dateModified text, roleId integer, siteId integer)"
        );
        $GLOBALS["DBA"] = $this->dba;
    }

    protected function tearDown(): void
    {
        unset($GLOBALS["DBA"]);
    }

    public function testSetupAllowedWhenNoUsersExist(): void
    {
        $this->assertTrue(
            Content::canCreateFirstAdmin(),
            "first-admin setup must be allowed when the users table is empty"
        );
    }

    public function testSetupRefusedOnceAnyUserExists(): void
    {
        $this->dba->exec(
            "insert into users (firstName, lastName, email, password, isActive) " .
            "values ('Admin', 'One', 'admin@example.com', 'hash', 1)"
        );

        $this->assertFalse(
            Content::canCreateFirstAdmin(),
            "setup must be refused once any user exists (privilege-escalation guard)"
        );
    }

    public function testSetupStaysRefusedWithSeveralUsers(): void
    {
        for ($i = 1; $i <= 3; $i++) {
            $this->dba->exec(
                "insert into users (firstName, lastName, email, password, isActive) " .
                "values ('User', '{$i}', 'user{$i}@example.com', 'hash', 1)"
            );
        }

        $this->assertFalse(
            Content::canCreateFirstAdmin(),
            "setup must stay refused with multiple users present"
        );
    }
}
