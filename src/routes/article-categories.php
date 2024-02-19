<?php
/**
 * @secure
 */
\Tina4\Get::add("/cms/article-categories", function (\Tina4\Response $response){
    return $response (\Tina4\renderTemplate("/content/article-categories.twig"), HTTP_OK, TEXT_HTML);
});


/**
 * CRUD Prototype Example
 * Creates  GET @ /path, /path/{id}, - fetch for whole or for single
POST @ /path, /path/{id} - create & update
DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/article-categories", new ArticleCategory(), function ($action, ArticleCategory $articleCategory, $filter, $request) {
    if (isset($request->params["siteId"]) && !empty($request->params["siteId"]))
    {
        $siteId = $request->params["siteId"];

        //Check for the default Root article category
        $articleCategoryCheck = new ArticleCategory();
        if (!$articleCategoryCheck->load("name = 'Root' and site_id = {$siteId}"))
        {
            $articleCategoryCheck->name = "Root";
            $articleCategoryCheck->siteId = $siteId;
            $articleCategoryCheck->isActive = 0;
            $articleCategoryCheck->isMenu = 0;
            $articleCategoryCheck->parentId = 0;
            $articleCategoryCheck->save();
        }

    } else {
        $siteId = 1;
    }

    $categories = (new ArticleCategory())->select("id,name,parent_id,slug,is_menu,is_active,display_order")
        ->where("site_id = {$siteId}")
        ->filter(function($record){
            $article = new ArticleCategory();
            $article->load("id = {$record->parentId}");
            $record->parentName = $article->name; // { "parentName": "test" } record.parentName
        })
        ->asArray();
    switch ($action) {
        case "form":
            //Return back a form to be submitted to the create

            $content = \Tina4\renderTemplate("api/admin/articleCategories/form.twig", ["categories" => $categories, "siteId" => $siteId]);

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => "Add Article Category", "onclick" => "if ( $('#articleCategory').valid() ) { saveForm('articleCategory', '" . TINA4_BASE_URL . "/api/admin/article-categories', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
            break;
        case "fetch":
            //Return back a form to be submitted to the create

            $content = \Tina4\renderTemplate("api/admin/articleCategories/form.twig",["data" => $articleCategory, "categories" => $categories, "siteId" => $siteId]);

            return \Tina4\renderTemplate("components/modalFormNormal.twig", ["title" => "Edit Article Category", "onclick" => "if ( $('#articleCategory').valid() ) { saveForm('articleCategory', '" . TINA4_BASE_URL . "/api/admin/article-categories/{$articleCategory->id}', 'message'); $('#formModal').modal('hide'); }", "content" => $content]);
            break;
        case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "site_id = {$siteId}";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
                $where .= " and site_id = {$siteId}";
            }


            return   $articleCategory->select ("id,name,parent_id,slug,is_menu,is_active,display_order", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->filter(function($record){
                    $article = new ArticleCategory();
                    $article->load("id = {$record->parentId}");
                    $record->parentName = $article->name;
                })
                ->orderBy($filter["orderBy"])
                ->asResult();
            break;
        case "create":
        case "update":
            //no return needed
            $articleCategory->slug = (new Content())->getSlug($articleCategory->name);
        break;
        case "afterCreate":
            //no return needed
            return (object)["httpCode" => 200, "message" => "<script>articleCategoryTable.ajax.reload(null, false); showMessage ('{$articleCategory->name} Created');</script>"];
        break;
        case "afterUpdate":
            //no return needed
            return (object)["httpCode" => 200, "message" => "<script>articleCategoryTable.ajax.reload(null, false); showMessage ('{$articleCategory->name} Updated');</script>"];
        break;
        case "delete":
            //no return needed
        break;
        case "afterDelete":
            //no return needed
            return (object)["httpCode" => 200, "message" => "<script>articleCategoryTable.ajax.reload(null, false); showMessage ('{$articleCategory->name} Deleted');</script>"];

            break;
    }
});
