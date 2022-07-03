<?php


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