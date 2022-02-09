<?php
class Menu extends \Tina4\ORM
{
    public $tableName="menu";
    public $primaryKey="id"; //set for primary key
    public $fieldMapping = ["id" => "id","name" => "name","isActive" => "is_active","parentId" => "parent_id","slug" => "slug","specificRoute" => "specific_route","displayOrder" => "display_order","dateCreated" => "date_created","dateModified" => "date_modified"];
    //public $softDelete=true; //uncomment for soft deletes in crud
    
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