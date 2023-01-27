<?php

class Tina4SitePage extends \Tina4\ORM {
    public $tableName = "tina4site_page";
    public $primaryKey = "id";

    public $id; //primary key because it is first
    public $cms_page_id;
    public $html;
    public $pages;
    public $assets;
    public $styles;
    public $created_at;

}