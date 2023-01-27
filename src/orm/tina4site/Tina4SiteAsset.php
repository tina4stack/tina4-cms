<?php

class Tina4SiteAsset extends \Tina4\ORM {
    public $tableName = "tina4site_asset";
    public $primaryKey = "id";

    public $id; //primary key because it is first
    public $type;
    public $url;
    public $enabled;
    public $created_at;

}
