<?php

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

class Article extends \Tina4\ORM
{
    public $tableName="article";
    public $primaryKey="id"; //set for primary key
    public $genPrimaryKey = true;

    public $id;
    public $publishedDate;
    public $title;
    public $description;
    public $keywords;
    public $image;
    public $content;
    public $author;
    public $isPublished;
    public $userId;
    public $slug;
}
