<?php


\Tina4\Get::add("/cms/page-builder", function (\Tina4\Response $response) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    $users = (new Users())->select("count(id) as number");
    $twigNameSpace = (new Content())->getTwigNameSpace();
    if (empty($users)) {
        return $response(\Tina4\renderTemplate($twigNameSpace . "/admin/setup.twig", ["twigNameSpace" => $twigNameSpace]));
    }

    $menuItems = (new Content())->getCmsMenus();
    $themes = (new Theme())->getThemes();
    $site = (new SiteHelper())->getSite();
    $sites = (new SiteHelper())->getSites();
    $pages = (new Content())->getAllPages($site->id);
    $snippets = (new Content())->getAllSnippets($site->id);
    $version = (new \Tina4\Migration)->getVersion('tina4cms');
    return $response(\Tina4\renderTemplate($twigNameSpace . "/admin/page-builder.twig", ["menuItems" => $menuItems, "pages" => $pages, "snippets" => $snippets, "twigNameSpace" => $twigNameSpace, "site" => $site, "sites" => $sites, "countSites" => count($sites), "themes" => $themes, "version"  => $version]));
})::noCache();

\Tina4\Get::add("/cms/page-builder/pages", function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    if (isset($request->params["siteId"]) && !empty($request->params["siteId"]))
    {
        $siteId = $request->params["siteId"];
    } else {
        $siteId = 1;
    }

    $pagesData = (new Content())->getAllPages($siteId);
    $pages = [];

    $site = new Site();
    $site->load("id = ?", [$siteId]);

    if (!empty($site->pageLayout)) {
        $pageBuilderContent = json_decode($site->pageLayout);
        $components = $pageBuilderContent->frames[0]->component;
        $pages[] = ["id" => "layout", "component" => $components];
    } else {
        $pages[] = ["id" => "layout"];
    }

    if (!empty($site->pageLayoutArticle)) {
        $pageBuilderContent = json_decode($site->pageLayoutArticle);
        $components = $pageBuilderContent->frames[0]->component;
        $pages[] = ["id" => "layoutArticle", "component" => $components];
    } else {
        $pages[] = ["id" => "layoutArticle"];
    }

    foreach ($pagesData as $page) {
        $components = [];
        if (!empty($page->pageBuilderContent)) {
            $pageBuilderContent = json_decode($page->pageBuilderContent);
            $components = $pageBuilderContent->frames[0]->component;
        }

        $pages[] = ["id" => "{$page->id}", "component" => $components];
    }

    if (empty($site->pageBuilderAssets)) {
        $site->pageBuilderAssets = "[]";
    }

    if (empty($site->pageBuilderStyles)) {
        $site->pageBuilderStyles = "[]";
    }


    $data = '{"assets": '.$site->pageBuilderAssets.', "styles": '.$site->pageBuilderStyles.', "pages": '.json_encode($pages).', "formToken": "'.(new Tina4\Auth())->getToken().'"}';
    return $response($data, HTTP_OK, APPLICATION_JSON);
})::noCache();


\Tina4\Post::add("/cms/page-builder/fresh-token",static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    return $response(["formToken" => (new \Tina4\Auth())->getToken()]);
});

\Tina4\Post::add("/cms/page-builder/pages", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    $pages = $request->data->data->pages;
    $pageData = "";
    foreach ($pages as $page) {
        if ($page->id == $request->data->pageId) {
            $pageData = $page;
            break;
        }
    }

    if ($request->data->pageId !== "layout"  && $request->data->pageId !== "layoutArticle") {
        $page = new Page();
        if ($page->load("id = ?", [$request->data->pageId])) {
            $page->content = (new Theme())->parseContentIncludes($request->data->html);
            $page->isPageBuilder = 1;
            $page->pageBuilderContent = json_encode($pageData); //makes all the twig includes work
            $page->save();

            //Save CSS to SCSS folder for compilation
            if (!empty($request->data->css)) {
                file_put_contents("./src/scss/page-{$page->id}.scss", $request->data->css);
            }

            $site = new Site();
            $site->load("id = ?", [$page->siteId]);
            $site->pageBuilderStyles =  json_encode($request->data->data->styles);
            $site->pageBuilderAssets =  json_encode($request->data->data->assets);
            $site->save();
        }
    }

    if ($request->data->pageId === "layout") {
        $site = new Site();
        $site->load("id = ?", [$request->params["siteId"]]);
        $site->pageLayout = json_encode($pageData);
        $site->pageLayoutHtml = (new Theme())->parseContentIncludes($request->data->html);
        $site->pageBuilderStyles =  json_encode($request->data->data->styles);
        $site->pageBuilderAssets =  json_encode($request->data->data->assets);
        $site->save();
    }

    if ($request->data->pageId === "layoutArticle") {
        $site = new Site();
        $site->load("id = ?", [$request->params["siteId"]]);

        $site->pageLayoutArticle = json_encode($pageData);
        $site->pageLayoutArticleHtml = (new Theme())->parseArticleIncludes($request->data->html);
        $site->save();
    }

    return $response(["formToken" => (new Tina4\Auth())->getToken()], HTTP_OK, APPLICATION_JSON);
})::noCache();

\Tina4\Get::add("/cms/page-builder/twig-templates", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    $templates = (new Theme())->getTwigViews();
    return $response($templates);
})::noCache();

\Tina4\Get::add("/cms/page-builder/twig-templates/render", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    $templates = [];
    if (isset($_SESSION["tina4-cms:twigViews"])) {
        $templates = $_SESSION["tina4-cms:twigViews"];
    }

    if (isset($request->params["id"]) && !empty($request->params["id"]) && $request->params["id"] !== "undefined") {
        $html = \Tina4\renderTemplate($templates[$request->params["id"]]["template"]);
    } else {
        $html = "Choose template to render";
    }
    return $response($html);
})::noCache();;

\Tina4\Get::add("/cms/page-builder/cms-snippets", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    $templates = (new Theme())->getCMSSnippets();
    return $response($templates);
})::noCache();

\Tina4\Get::add("/cms/page-builder/cms-snippets/render", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    if (isset($request->params["id"]) && !empty($request->params["id"]) && $request->params["id"] !== "undefined") {
        $template = (new Snippet());
        $template->load("name = ?", [$request->params["id"]]);
        $html = \Tina4\renderTemplate($template->content);
    } else {
        $html = "Choose template to render";
    }
    return $response($html);
})::noCache();

\Tina4\Get::add("/cms/page-builder/cms-content", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    if (isset($request->params["siteId"]) && !empty($request->params["siteId"]))
    {
        $siteId = $request->params["siteId"];
    } else {
        $siteId = 1;
    }

    $pages = (new Content())->getAllPages($siteId);

    $pageNames = [];
    foreach ($pages as $id => $record) {
        $pageNames[] = ["id" => $record->name, "title" => $record->name];
    }

    return $response($pageNames);
})::noCache();

\Tina4\Get::add("/cms/page-builder/cms-content/render", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    if (isset($request->params["id"]) && !empty($request->params["id"]) && $request->params["id"] !== "undefined") {
        $page = (new Page());
        $page->load("name = ?", [$request->params["id"]]);
        $html = \Tina4\renderTemplate($page->content);
    } else {
        $html = "Choose page to render";
    }
    return $response($html);
})::noCache();


\Tina4\Get::add("/cms/page-builder/cms-articles", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    if (isset($request->params["siteId"]) && !empty($request->params["siteId"]))
    {
        $siteId = $request->params["siteId"];
    } else {
        $siteId = 1;
    }

    $articles = (new Content())->getAllArticles($siteId);

    $articleContent = [];
    foreach ($articles as $id => $record) {
        $articleContent[] = ["id" => $record["id"], "title" => $record["title"]];
    }
    return $response($articleContent);
})::noCache();


\Tina4\Get::add("/cms/page-builder/cms-articles/render", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    if (isset($request->params["id"]) && !empty($request->params["id"]) && $request->params["id"] !== "undefined") {
        if (empty($request->params["field"])) {
            $html = (new Content())->getArticleById($request->params["id"]);
        } else{
            $article = new Article();
            if ($article->load("id = ?", ["id" => $request->params["id"]])) {
                $html = $article->{$request->params["field"]};
            } else {
                $html = "Article not found";
            }
        }

    } else {
        $html = "Choose an article to render";
    }

    if (!empty($request->params["render"]))
    {

    }

    return $response($html);
})::noCache();


\Tina4\Post::add("/cms/page-builder/assets/upload", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    //Add the image to a nice path
    $imageFolder = "./src/public/uploads/".date("Y")."/".date("F");
    if (! file_exists($imageFolder) && !mkdir($imageFolder, 0777, true) && !is_dir($imageFolder)) {
        //throw new \RuntimeException(sprintf('Directory "%s" was not created', $imageFolder));
        return $response(["location" => "error creating folder"]);
    }
    $temp = $_FILES["files"];

    $fileInfo = [];
    foreach ($temp["name"] as $id => $fileName) {
        // Sanitize input
        if (preg_match("/([^\w\s\d\-_~,;:\[\]\(\).])|([\.]{2,})/", $fileName)) {
            header("HTTP/1.1 400 Invalid file name.");
            return null;
        }

        // Verify extension
        if (!in_array(strtolower(pathinfo($fileName, PATHINFO_EXTENSION)), array("gif", "jpg", "png", "jpeg", "svg"))) {
            header("HTTP/1.1 400 Invalid extension.");
            return null;
        }

        // Accept upload if there was no origin, or if it is an accepted origin
        $fileToWrite = $imageFolder . "/" . $fileName;

        if (move_uploaded_file($temp['tmp_name'][$id], $fileToWrite)) {
            $fileInfo[] = str_replace ("./src/public", "", $imageFolder."/".$fileName);
        }
    }

    $fileData = ["data" => $fileInfo];
    return $response($fileData, HTTP_OK, APPLICATION_JSON);
})::noCache();

\Tina4\Get::add("/cms/page-builder/open-ai", static function(\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    $text = "";
    if (!empty($request->params["prompt"])) {
        try {
            if (empty($request->params["image"])) {
                $apiResponse = (new OpenAi())->getCompletion(
                    strip_tags(html_entity_decode($request->params["prompt"]))
                );

                if (!empty($apiResponse["choices"])) {
                    $text = $apiResponse["choices"][0]["message"]["content"];
                } else {
                    $text = print_r ($apiResponse, 1);
                }
            } else {
                $imageFolder = "./src/public/uploads/".date("Y")."/".date("F");
                if (! file_exists($imageFolder) && !mkdir($imageFolder, 0777, true) && !is_dir($imageFolder)) {
                    //throw new \RuntimeException(sprintf('Directory "%s" was not created', $imageFolder));
                    return $response(["location" => "error creating folder"]);
                }

                $apiResponse = (new OpenAi())->getImage(strip_tags(html_entity_decode($request->params["prompt"])));
                $fileName= "open-ai-".date("YmdHis").".png";
                $content = file_get_contents($apiResponse["data"][0]["url"]);
                file_put_contents($imageFolder."/".$fileName, $content);
                $src = str_replace ("./src/public", "", $imageFolder."/".$fileName);
                $text = "<img src=\"{$src}\" alt=\"{$apiResponse["data"][0]["revised_prompt"]}\">";
            }
        } catch (\Exception $e) {
            $text = "Error: " . $e->getMessage();
        }
    }  else {
        $text = "Error no prompt";
    }
    return $response ($text, HTTP_OK, TEXT_HTML);
})::noCache();