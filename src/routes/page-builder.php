<?php

\Tina4\Get::add("/cms/page-builder", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number");
    $twigNameSpace = (new Content())->getTwigNameSpace();
    if (empty($users)) {
        return $response(\Tina4\renderTemplate($twigNameSpace . "/admin/setup.twig", ["twigNameSpace" => $twigNameSpace]));
    } else {
        $menuItems = (new Content())->getCmsMenus();
        $pages = (new Content())->getAllPages();
        $snippets = (new Content())->getAllSnippets();
        $themes = (new Theme())->getThemes();
        $site = (new Content())->getSite();
        return $response(\Tina4\renderTemplate($twigNameSpace . "/admin/page-builder.twig", ["menuItems" => $menuItems, "pages" => $pages, "snippets" => $snippets, "twigNameSpace" => $twigNameSpace, "site" => $site, "themes" => $themes]));
    }
});

\Tina4\Get::add("/cms/page-builder/pages", function (\Tina4\Response $response, \Tina4\Request $request) {
    $pagesData = (new Content())->getAllPages();
    $pages = [];

    $site = new Site();
    $site->id = $request->params["siteId"];
    if (!empty($site->pageLayout)) {
        $pages[] = ["id" => "layout", "component" => json_decode($site->pageLayout)];
    } else {
        $pages[] = ["id" => "layout"];
    }
    $site->load();

    foreach ($pagesData as $page) {

        $components = [];
        if (!empty($page->pageBuilderContent)) {
            $pageBuilderContent = json_decode($page->pageBuilderContent);
            $components = $pageBuilderContent->frames[0]->component;
        }

        $pages[] = ["id" => "{$page->id}", "component" => $components];
    }

    $data = '{"assets": '.$site->pageBuilderAssets.', "styles": '.$site->pageBuilderStyles.', "pages": '.json_encode($pages).'}';
    return $response($data, HTTP_OK, APPLICATION_JSON);
});

\Tina4\Post::add("/cms/page-builder/pages", static function (\Tina4\Response $response, \Tina4\Request $request) {
    $pages = $request->data->data->pages;
    $pageData = "";
    foreach ($pages as $page) {
        if ($page->id == $request->data->pageId) {
            $pageData = $page;
            break;
        }
    }

    if ($request->data->pageId !== "layout") {
        $page = new Page();
        $page->load("id = ?", [$request->data->pageId]);
        $page->content = (new Theme())->injectIncludes($request->data->html);
        $page->isPageBuilder = 1;
        $page->pageBuilderContent = json_encode($pageData); //makes all the twig includes work
        $page->save();

        //Save CSS to SCSS folder for compilation
        if (!empty($request->data->css)) {
            file_put_contents("./src/scss/page-{$page->id}.scss", $request->data->css);
        }

        $site = new Site();
        $site->id = $page->siteId;
        $site->load();
        $site->pageBuilderStyles =  json_encode($request->data->data->styles);
        $site->pageBuilderAssets =  json_encode($request->data->data->assets);
        $site->save();
    }
    return $response([], HTTP_OK, APPLICATION_JSON);
});

\Tina4\Get::add("/cms/page-builder/twig-templates", static function (\Tina4\Response $response, \Tina4\Request $request) {
    $templates = (new Theme())->getTwigViews();

    return $response($templates);
});

\Tina4\Get::add("/cms/page-builder/twig-templates/render", static function (\Tina4\Response $response, \Tina4\Request $request) {
    $templates = [];
    if (isset($_SESSION["tina4-cms:twigViews"])) {
        $templates = $_SESSION["tina4-cms:twigViews"];
    }

    if (isset($request->params["id"]) && !empty($request->params["id"])) {
        $html = \Tina4\renderTemplate($templates[$request->params["id"]]["template"]);
    } else {
        $html = "Choose template to render";
    }
    return $response($html);
});
