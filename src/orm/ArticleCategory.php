<?php
class ArticleCategory extends \Tina4\ORM
{
    public $tableName="article_category";
    public $primaryKey="id"; //set for primary key
    //public $softDelete=true; //uncomment for soft deletes in crud
    public $genPrimaryKey = true;
    
	public $id;
	public $name;
	public $isActive;
	public $isMenu;
	public $dateCreated;
	public $dateModified;
	public $parentId;
	public $slug;
	public $displayOrder;


    public $parentName;

    public $virtualFields = ["parentName"];
}