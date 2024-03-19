<?php
/**
 * @secure
 */
\Tina4\Get::add("/cms/pages", function (\Tina4\Response $response){
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    return $response (\Tina4\renderTemplate("/content/pages.twig"), HTTP_OK, TEXT_HTML);
});

/**
 * CRUD Prototype Page Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/pages", new Page(), function ($action, Page $page, $filter, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return (object)["httpCode" => 403, "message" => "No auth"];
    }

    if (isset($request->params["siteId"]) && !empty($request->params["siteId"]))
    {
        $siteId = $request->params["siteId"];
    } else {
        $siteId = 1;
    }

    switch ($action) {
       case "form":
       case "fetch":
            //Return back a form to be submitted to the create

            $snippets = (new Snippet())->select("id,name", 1000)->where("site_id = ?", [$siteId])->orderBy("name")->asArray();

            $articleCategories = (new ArticleCategory())->select("id,name", 1000)->where("id != 1 and is_active = 1 and site_id = ?", [$siteId])->orderBy("name")->asArray();

            if ($action == "form") {
                $title = "Add Page";
                $savePath =  TINA4_BASE_URL . "/api/admin/pages";
                $content = \Tina4\renderTemplate("/api/admin/pages/form.twig", ["snippets" => $snippets, "articleCategories" => $articleCategories, "siteId" => $siteId]);
            } else {
                $title = "Edit Page";
                $savePath =  TINA4_BASE_URL . "/api/admin/pages/".$page->id;


                $openAI = new OpenAi($siteId);

                $renderedText = strip_tags((new Content())->renderPage($page->slug, $siteId));

                if ($openAI->active) {
                    $description = $openAI->getCompletion(
                        "summarize this content {$renderedText} in 160 chars",
                        160
                    )["choices"][0]["message"]["content"];

                    $description = str_replace('"', '', $description);
                    $description = str_replace("'", "\'", $description);


                    $title = $openAI->getCompletion(
                        "give a concise page title for this content: {$renderedText} in 70 chars",
                        70
                    )["choices"][0]["message"]["content"];

                    $title = str_replace('"', '', $title);
                    $title = str_replace("'", "\'", $title);

                    $keywords = $openAI->getCompletion(
                        "suggest 10 unique keywords in comma separated format for this content: {$renderedText}",
                        50
                    )["choices"][0]["message"]["content"];

                    $keywords = str_replace("\n", ",", $keywords);
                    for ($i = 0; $i < 20; $i++) {
                        $keywords = str_replace("{$i}.", "", $keywords);
                    }

                    $ai = compact('title', 'description', 'keywords');

                } else {
                    $ai = [];
                }
                $content = \Tina4\renderTemplate("/api/admin/pages/form.twig", ["data" => $page, "renderedText" => $renderedText,  "snippets" => $snippets, "articleCategories" => $articleCategories, "siteId" => $siteId, "ai" => $ai]);
            }

            return \Tina4\renderTemplate("components/modalFormLarge.twig", ["title" => $title, "onclick" => "if ( $('#pageForm').valid() ) { saveForm('pageForm', '" .$savePath."', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
            $whereData = [];
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            } else {
                $where = "1 = 1";
            }

            if (!empty($siteId)) {
                $where .= " and site_id = ?";
                $whereData[] = $siteId;
            }

            return   $page->select ("*", $filter["length"], $filter["start"])
                ->where("{$where}", $whereData)
                ->orderBy($filter["orderBy"])
                ->asResult();
        break;
        case "create":
            $page->slug = (new Content())->getSlug($request->data->name);
            $page->dateCreated = date($page->DBA->dateFormat." H:i:s");
        break;
        case "update":
            $page->slug = (new Content())->getSlug($request->data->name);
            //Manipulate the $object here
            $page->dateModified = date($page->DBA->dateFormat." H:i:s");
        break;
        case "afterCreate":
           //return needed
           $page->saveBlob("content", $_REQUEST["content"]);
           $page->saveFile("image", "image"); //$_FILES["image"]
           return (object)["httpCode" => 200, "message" => "<script>pageGrid.ajax.reload(null, false); showMessage ('Page Created');</script>"];
        break;
        case "afterUpdate":
           //return needed
           $page->saveBlob("content", $_REQUEST["content"]);
           $page->saveFile("image", "image");
           return (object)["httpCode" => 200, "message" => "<script>pageGrid.ajax.reload(null, false); showMessage ('Page Updated');</script>"];
        break;
        case "delete":
            //Manipulate the $object here

        break;
        case "afterDelete":
            //return needed
            return (object)["httpCode" => 200, "message" => "<script>pageGrid.ajax.reload(null, false); showMessage ('Page Deleted');</script>"];
        break;
    }
});
