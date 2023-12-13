<?php
require_once "vendor/autoload.php";

global $DBA;
$DBA = new \Tina4\DataSQLite3("cms.db");

//$DBA = new \Tina4\DataFirebird("127.0.0.1:C:\\Users\\andre\\IdeaProjects\\tina4-cms\\TESTCMS.FDB", "SYSDBA", "masterkey");


$config = new \Tina4\Config(function(\Tina4\Config $config) {
    (new Content())->addConfigMethods($config);
    (new Content())->addCmsMenu("/backend/program", "Products");
    //(new Content())->addCmsMenu("/backend/program", "Something Else");
    //(new Content())->addCmsMenu("/backend/program", "Products");
    // $config->addTwigGlobal("Menu", new Menu());
    //(new Theme())->addTwigView("product", "Products", "examples/products.twig");
    //(new Theme())->addTwigView("menu", "Menu", "examples/menu.twig");
});

//Hack to build css for documentation
$scss = new ScssPhp\ScssPhp\Compiler();
$scssDefault = $scss->compileString(file_get_contents("./src/templates/admin/page-builder.scss"))->getCss();
file_put_contents("./src/public/css/page-builder.css", $scssDefault);


(new Theme(""))->deployThemes(__dir__, true);
echo new \Tina4\Tina4Php($config);