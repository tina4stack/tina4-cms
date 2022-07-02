<?php
class Snippet extends \Tina4\ORM
{
    public $tableName="snippet";
    public $primaryKey="id"; //set for primary key
    //public $softDelete=true; //uncomment for soft deletes in crud
    public $genPrimaryKey = true;
    
	public $id;
	public $name;
	public $description;
	public $content;
	public $dateCreated;
	public $dateModified;
    public $snippetType;
}