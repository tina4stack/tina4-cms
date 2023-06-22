<?php
require_once "vendor/autoload.php";

global $DBA;
$DBA = new \Tina4\DataSQLite3("cms.db");

$config = new \Tina4\Config(function(\Tina4\Config $config) {
    (new Content())->addConfigMethods($config);
    //(new Content())->addCmsMenu("/backend/program", "Products");
    $config->addTwigGlobal("Menu", new Menu());

    (new Theme())->addTwigView("product", "Products", "examples/products.twig");
    (new Theme())->addTwigView("menu", "Menu", "examples/menu.twig");
});

\Tina4\Initialize();

echo new \Tina4\Tina4Php($config);