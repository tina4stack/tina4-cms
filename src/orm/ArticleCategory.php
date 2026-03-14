<?php
/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */


class ArticleCategory extends \Tina4\ORM
{
    public $tableName="article_category";
    public $primaryKey="id"; //set for primary key
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

    public $siteId;

    public $virtualFields = ["parentName"];
}
