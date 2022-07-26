<?php

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */


class Role extends \Tina4\ORM
{
    public $tableName="role";
    public $primaryKey="id"; //set for primary key
    public $genPrimaryKey = true;

	public $id;
	public $name;
	public $roleInfo;
	public $dateCreated;
	public $dateModified;
}