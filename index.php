<?php

\Tina4\Module::addModule("CMS Module", "1.0.0", "tina4css", function($config) {

    $config->addTwigGlobal("Content",  new Content());

    $config->addTwigFilter("getPage",  function ($name) {
        $page = (new Content())->getPage($name);
        return $page["content"];
    });

    $config->addTwigFilter("getSnippet",  function ($name) {
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