<?php
class Css extends \Tina4\ORM
{
    public $tableName="css";
    public $primaryKey="id"; //set for primary key
    public $fieldMapping = ["id" => "id","name" => "name","content" => "content","isActive" => "is_active","dateCreated" => "date_created","dateModified" => "date_modified"];
    //public $softDelete=true; //uncomment for soft deletes in crud
    
	public $id;
	public $name;
	public $content;
	public $isActive;
	public $dateCreated;
	public $dateModified;
}