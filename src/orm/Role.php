<?php
class Role extends \Tina4\ORM
{
    public $tableName="role";
    public $primaryKey="id"; //set for primary key
    public $fieldMapping = ["id" => "id","name" => "name","roleInfo" => "role_info","dateCreated" => "date_created","dateModified" => "date_modified"];
    //public $softDelete=true; //uncomment for soft deletes in crud
    
	public $id;
	public $name;
	public $roleInfo;
	public $dateCreated;
	public $dateModified;
}