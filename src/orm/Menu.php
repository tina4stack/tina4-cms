<?php

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */


class Menu extends \Tina4\ORM
{
    public $tableName="menu";
    public $primaryKey="id"; //set for primary key
    public $genPrimaryKey = true;

	public $id;
	public $name;
	public $isActive;
	public $parentId;
	public $slug;
	public $specificRoute;
	public $displayOrder;
	public $dateCreated;
	public $dateModified;

    public $parentName;

    public $virtualFields = ["parentName"];
}