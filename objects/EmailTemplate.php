<?php


class EmailTemplate extends \Tina4\ORM
{
    public $tableName="email_template";
    public $primaryKey="id"; //set for primary key
    //public $softDelete=true; //uncomment for soft deletes in crud

    public $id;
    public $name;
    public $description;
    public $content;
    public $dateCreated;
    public $dateModified;

}