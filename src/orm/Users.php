<?php
/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */


class Users extends \Tina4\ORM
{
    public $tableName = "users";
    public $primaryKey = "id";
    public $genPrimaryKey = true;

    public $id;
    public $firstName;
    public $lastName;
    public $email;
    public $password;
    public $isActive;
    public $resetToken;
    public $dateCreated;
    public $dateModified;
    public $roleId;
    public $siteId;

    public $excludeFields = ["password", "resetToken"];
}
