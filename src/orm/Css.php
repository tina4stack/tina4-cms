<?php

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */


class Css extends \Tina4\ORM
{
    public $tableName="css";
    public $primaryKey="id"; //set for primary key
    public $genPrimaryKey = true;

	public $id;
	public $name;
	public $content;
	public $isActive;
	public $dateCreated;
	public $dateModified;
}