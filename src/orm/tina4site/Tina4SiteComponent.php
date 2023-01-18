<?php

class Tina4SiteComponent extends \Tina4\ORM {
    public $tableName = "tina4site_component";
    public $primaryKey = "id";

    public $id; //primary key because it is first
    public $name; //some additional data
    public $html;
    public $css;
    public $api_code;
    public $enabled;
    public $icon;
    public $group_id;
    public $created_at;

}