<?php

class Tina4SiteDataSet extends \Tina4\ORM
{
    public $tableName = "tina4site_dataset";
    public $primaryKey = "id";

    public $id; //primary key because it is first
    public $datasetTable;
    public $datasetColumns;
    public $datasetConditions;
    public $code;
    public $class;
    public $type;
    public $created_at;

}
