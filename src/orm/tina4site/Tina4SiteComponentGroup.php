<?php

class Tina4SiteComponentGroup extends \Tina4\ORM {
    public $tableName = "tina4site_component_group";
    public $primaryKey = "id";

    public $id; //primary key because it is first
    public $name; //some additional data
    public $enabled;
    public $created_at;

}