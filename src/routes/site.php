<?php
/**
 * @secure
 */
\Tina4\Post::add("/cms/site/set", function (\Tina4\Response $response, \Tina4\Request $request) {
    $_SESSION["siteId"] = $request->params["siteId"];
    \Tina4\redirect(TINA4_SUB_FOLDER . "/cms/page-builder");
});


/**
 * @secure
 */
\Tina4\Get::add("/cms/site", function (\Tina4\Response $response) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    return $response (\Tina4\renderTemplate("/content/site.twig"), HTTP_OK, TEXT_HTML);
});

/**
 * CRUD Prototype Site Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
 * POST @ /path, /path/{id} - create & update
 * DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route("/api/admin/site", new Site(), function ($action, Site $site, $filter, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return (object)["httpCode" => 403, "message" => "No auth"];
    }

    switch ($action) {
        case "form":
        case "fetch":
            //Return back a form to be submitted to the create
            $themes = (new Theme())->getThemes();

            if (!empty($site->custom)) {
                $site->custom = html_entity_decode($site->custom ?? '');
            }

            if (empty($site->pageLayoutArticle)) {
                $site->pageLayoutArticle = '{"frames":[{"component":{"type":"wrapper","stylable":["background","background-color","background-image","background-repeat","background-attachment","background-position","background-size"],"attributes":{"id":"i6pbl"},"components":[{"tagName":"h1","type":"cms-article-title","classes":["article-title"],"attributes":{"cms-article-title":"This is a title"},"components":[{"type":"textnode","content":"Article Title"}]},{"tagName":"span","type":"cms-article-category","classes":["article-category"],"components":[{"type":"textnode","content":"Article Category"}]},{"tagName":"img","type":"cms-article-image","void":true,"classes":["article-image"],"attributes":{"src":"data:image\/png;base64,{{ article.image }}","alt":"{{article.description}}"}},{"type":"bs-row","attributes":{"id":"ifwmr1"},"components":[{"type":"bs-column","classes":["col-9"],"attributes":{"id":"if4pbv"},"components":[{"tagName":"article","type":"cms-article-content","classes":["article-content"],"attributes":{"cms-article-content":"1"},"components":[{"type":"textnode","content":"Article Content"}]}]},{"type":"bs-column","classes":["col-3"],"attributes":{"id":"ises09"},"components":[{"tagName":"span","type":"cms-article-related","classes":["article-related"],"components":[{"type":"textnode","content":"Related Articles"}]}]}]},{"type":"bs-row","attributes":{"id":"i6vtuz"},"components":[{"type":"bs-column","classes":["col-12"],"attributes":{"id":"iouip6"},"components":[{"tagName":"span","type":"cms-article-author","classes":["article-author"],"components":[{"type":"textnode","content":"Article Author"}]},{"tagName":"span","type":"cms-article-publish-date","classes":["article-publish-date"],"components":[{"type":"textnode","content":"Publish Date"}]}]}]},{"type":"bs-row","attributes":{"id":"i9q48g"},"components":[{"type":"bs-column","classes":["col-12"],"attributes":{"id":"iyp9wv"},"components":[{"tagName":"span","type":"cms-article-navigation","classes":["article-navigation"],"components":[{"type":"textnode","content":"Article Navigation"}]}]}]}]}}],"id":"layoutArticle"}';
            }

            if ($action == "form") {
                $title = "Add Site";
                $savePath = TINA4_BASE_URL . "/api/admin/site";
                $content = \Tina4\renderTemplate("/api/admin/site/form.twig", ["themes" => $themes]);
            } else {
                $title = "Edit Site";
                $savePath = TINA4_BASE_URL . "/api/admin/site/" . $site->id;
                $content = \Tina4\renderTemplate("/api/admin/site/form.twig", ["data" => $site, "themes" => $themes]);
            }
            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#siteForm').valid() ) { saveForm('siteForm', '" . $savePath . "', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
            break;
        case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            }

            return $site->select("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->orderBy($filter["orderBy"])
                ->asResult();
            break;
        case "update":
        case "create":
            //Manipulate the $object here
            $site->dateModified = date($site->DBA->dateFormat);
            break;
        case "afterCreate":
            //return needed
            return (object)["httpCode" => 200, "message" => "<script>siteGrid.ajax.reload(null, false); showMessage ('Site Created');</script>"];
            break;
        case "afterUpdate":
            //return needed
            return (object)["httpCode" => 200, "message" => "<script>siteGrid.ajax.reload(null, false); showMessage ('Site Updated');</script>"];
            break;
        case "delete":
            //Manipulate the $object here
            break;
        case "afterDelete":
            //return needed 
            return (object)["httpCode" => 200, "message" => "<script>siteGrid.ajax.reload(null, false); showMessage ('Site Deleted');</script>"];
            break;
    }
});
