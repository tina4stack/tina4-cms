<?php
require_once "./vendor/autoload.php";

define("TINA4_TEMPLATE_LOCATIONS", ["src/templates", "src/public", "src/assets", "src/assets/components", "src/templates/snippets", "src/templates/dashboard", "src/templates/public", "src/templates/messenger"]);

class_alias("\Tina4\ORM", "Tina4Object");

//Initialize the database
global $DBA;
$DBA = new \Tina4\DataSQLite3("cmstest.db");

$config = new \Tina4\Config(
    function ($config) {

    $config->addTwigFilter("getArticles",  function ($category) {
        return (new Content())->getArticles($category);
    });

    $config->addTwigFilter("getArticleList",  function ($category, $classname="", $limit=0) {
        return (new Content())->getArticleList($category, $classname, $limit);
    });

    $config->addTwigFilter("getArticle",  function ($name) {
        return (new Content())->getArticle($name);
    });

    $config->addTwigFilter("getPage",  function ($name) {
        return (new Content())->getPage($name);
    });

    $config->addTwigFilter("getSnippet",  function ($name) {
        return (new Content())->getSnippet($name);
    });

    $config->addTwigFunction("getSnippet",  function ($name) {
        return (new Content())->getSnippetInclude($name);
    });

    $config->addTwigFilter("dateOnly", function($dateString) {
        global $DBA;
        return substr($DBA->formatDate($dateString, $DBA->dateFormat, "Y-m-d"), 0, 10);
    });

    $snippets = (new Content())->getSnippets();

    foreach ($snippets as $id => $snippet) {
        if (isset($snippet->name)) {
            $config->addTwigGlobal($snippet->name, (new Content())->parseContent($snippet->content));
        }
    }

    $config->addTwigGlobal("Content",  new Content());

    $config->addTwigFunction('calendarDisplay', function() {
        $calendar = new Calendar();
        return $calendar->show();
    });
});

global $auth;
$auth = new \Tina4\Auth();
$config->setAuthentication($auth);

echo new \Tina4\Tina4Php($config);