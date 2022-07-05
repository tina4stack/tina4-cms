<?php

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */


class Snippet extends \Tina4\ORM
{
    public $tableName="snippet";
    public $primaryKey="id"; //set for primary key
    public $genPrimaryKey = true;
    
	public $id;
	public $name;
	public $description;
	public $content;
	public $dateCreated;
	public $dateModified;
    public $snippetType;
}