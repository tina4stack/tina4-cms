<?php
\Tina4\Module::addModule("CMS Module", "1.0.0", "tina4cms", function(\Tina4\Config $config) {
    global $DBA;

    if ($DBA === null)
    {
        die("Please create a database for using the CMS in your index.php file\nThe default code you can copy from the next 2 lines:\nglobal \$DBA;\n\$DBA = new \Tina4\DataSQLite3(\"cms.db\");\n");
    }

    if (!$DBA->tableExists("article")) {
        (new \Tina4\Migration(__DIR__."/migrations"))->doMigration();
    }

    $config->addTwigGlobal("Content",  new Content());
    $config->addTwigGlobal("Snippet",  new Content());
    $config->addTwigGlobal("Article",  new Content());


    $config->addTwigFunction("redirect", function ($url, $code=301) {
        \Tina4\redirect($url, $code);
    });

    $config->addTwigFilter("getSnippet",  function ($name) {
        return (new Content())->getSnippet($name);
    });

    $config->addTwigFunction("getSnippet",  function ($name) {
        return (new Content())->getSnippet($name);
    });

    $config->addTwigFunction("render",  function ($content) {
        return \Tina4\renderTemplate($content);
    });

    $config->addTwigFilter("getSlug", function ($name) {
        return (new Content())->getSlug($name);
    });

    $snippets = (new Content())->getSnippets();

    foreach ($snippets as $id => $snippet) {
        $config->addTwigGlobal($snippet->name, (new Content())->parseContent($snippet->content));
    }
});
