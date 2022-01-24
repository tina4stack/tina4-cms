<?php
$devMode = true;

if (!$devMode) {
    \Tina4\Module::addModule("CMS Module", "1.0.0", "tina4cms", function (\Tina4\Config $config) {
        (new Content())->addConfigMethods($config);
    });
} else {
    require_once "vendor/autoload.php";

    global $DBA;

    $DBA = new \Tina4\DataSQLite3("cms.db");

    \Tina4\Initialize();
    $config = new \Tina4\Config(function($config) {
        (new Content())->addConfigMethods($config);
    });

    echo new \Tina4\Tina4Php($config);
    die("");
}
