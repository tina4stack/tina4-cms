<?php
require_once "vendor/autoload.php";

global $DBA;
$DBA = new \Tina4\DataSQLite3("cms.db");

$config = new \Tina4\Config(function($config) {
    (new Content())->addConfigMethods($config);
    (new Content())->addCmsMenu("/backend/program", "Products");

    //(new Theme())->addView("product");
    //(new Theme())->addDataset("ProductData");
});

\Tina4\Initialize();

echo new \Tina4\Tina4Php($config);