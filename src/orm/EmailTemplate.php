<?php

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */


class EmailTemplate extends \Tina4\ORM
{
    public $tableName="email_template";
    public $primaryKey="id"; //set for primary key
    public $genPrimaryKey = true;

    public $id;
    public $name;
    public $description;
    public $content;
    public $dateCreated;
    public $dateModified;

}