<?php

class Tina4SitePagehistory extends \Tina4\ORM {
    public $tableName = "tina4site_page_history";
    public $primaryKey = "id";

    public $id; //primary key because it is first
    public $cms_page_id;
    public $html;
    public $pages;
    public $assets;
    public $styles;
    public $note;
    public $system_note;
    public $revision_no;
    public $created_at;

}