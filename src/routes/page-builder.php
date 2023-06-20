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
    foreach ($pagesData as $page) {
        $pageBuilderContent = json_decode($page->pageBuilderContent);
        $components = [];
        if (!empty($pageBuilderContent))
        {
            $components = $pageBuilderContent->frames[0]->component;
        }
        $pages[] = ["id" => "{$page->id}", "component" => $components];
    }

    $data = '{"assets": [], "styles": [], "pages": '.json_encode($pages).'}';
    return $response($data, HTTP_OK, APPLICATION_JSON);
});

\Tina4\Post::add("/cms/page-builder/pages", function (\Tina4\Response $response, \Tina4\Request $request) {
    $pages = $request->data->data->pages;
    $pageData = "";
    foreach ($pages as $page) {
        if ($page->id == $request->data->pageId) {
            $pageData = $page;
            break;
        }
    }

    $page = new Page();
    $page->load("id = ?", [$request->data->pageId]);
    $page->content = $request->data->html;
    $page->isPageBuilder = 1;
    $page->pageBuilderContent = json_encode($pageData);
    $page->save();

    return $response([], HTTP_OK, APPLICATION_JSON);
});