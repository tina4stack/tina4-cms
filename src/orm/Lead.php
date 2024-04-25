<?php

class Lead extends \Tina4\ORM
{
    public $tableName="lead";
    public $primaryKey="id"; //set for primary key
    public $genPrimaryKey = true;

    public $id;
    public $pageName;
    public $formName;
    public $dateCaptured;
    public $content;
    public $formToken;
}