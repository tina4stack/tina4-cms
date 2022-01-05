<?php
require_once "./vendor/autoload.php";
$config = new \Tina4\Config();
global $DBA;
$DBA = new \Tina4\DataSQLite3("cms.db");
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

    $config->addTwigFunction("getCountryCode", function () {
        return DEFAULT_COUNTRY_CODE;
    });

    $config->addTwigFunction("datePast", function ($dateA){


    });

    $config->addTwigFunction("dateFuture", function ($dateA){

    });
\Tina4\Initialize();
echo new \Tina4\Tina4Php($config);