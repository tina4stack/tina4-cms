<?php
/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

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
