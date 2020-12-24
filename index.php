<?php

\Tina4\Module::addModule("CMS Module", "1.0.0", "tina4cms", function(\Tina4\Config $config) {
    global $DBA;
    if (!$DBA->tableExists("article")) {
        (new \Tina4\Migration(__DIR__."/migrations"))->doMigration();
    }

    $config->addTwigGlobal("Content",  new Content());

    $config->addTwigFilter("getPage",  function ($name) {
        $page = (new Content())->getPage($name);
        return $page["content"];
    });

    $config->addTwigFunction("redirect", function ($url, $code=301) {
        \Tina4\redirect($url, $code);
    });

    $config->addTwigFilter("getSnippet",  function ($name) {
        return (new Content())->getSnippet($name);
    });

    $config->addTwigFunction("getSnippet",  function ($name) {
        return (new Content())->getSnippet($name);
    });

    $config->addTwigFilter("getSlug", function ($name) {
        return (new Content())->getSlug($name);
    });

    $snippets = (new Content())->getSnippets();

    foreach ($snippets as $id => $snippet) {
        $config->addTwigGlobal($snippet->name, (new Content())->parseContent($snippet->content));
    }
});