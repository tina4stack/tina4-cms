<?php

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
}