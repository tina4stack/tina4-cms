<?php
class Page extends \Tina4\ORM
{
    public $tableName="page";
    public $primaryKey="id"; //set for primary key
    //public $softDelete=true; //uncomment for soft deletes in crud
    
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