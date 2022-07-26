<?php

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */


class Page extends \Tina4\ORM
{
    public $tableName="page";
    public $primaryKey="id"; //set for primary key
    public $genPrimaryKey = true;
    
	public $id;
	public $name;
	public $title;
	public $description;
	public $keywords;
	public $image;
	public $content;
	public $isPublished;
	public $dateCreated;
	public $dateModified;
	public $slug;
}