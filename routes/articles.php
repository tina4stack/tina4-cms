<?php



\Tina4\Get::add("/cms/article-categories", function (\Tina4\Response $response){
    return $response (\Tina4\renderTemplate("/content/article-categories.twig"), HTTP_OK, TEXT_HTML);
});



/**
 * CRUD Prototype Example
 * Creates  GET @ /path, /path/{id}, - fetch for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/article-categories", new ArticleCategory(), function ($action, $articleCategory, $filter, $request) {


      if (isset($request->params["websiteId"]) && $request->params["websiteId"] != 0) {
        $websiteId = $request->params["websiteId"];
        $categories = (new ArticleCategory())->select("id,name,parent_id,slug,is_menu,is_active,display_order", 1000)
            ->where("(id = 0 or website_id = {$websiteId})")
            ->filter(function($record){
                $article = new ArticleCategory();
                $article->load("id = {$record->parentId}");
                $record->parentName = $article->name;
            })
            ->asArray();
    } else {
        $websiteId = 0;
        $categories = (new ArticleCategory())->select("id,name,parent_id,slug,is_menu,is_active,display_order")
            ->filter(function($record){
                $article = new ArticleCategory();
                $article->load("id = {$record->parentId}");
                $record->parentName = $article->name;
            })
            ->asArray();
    }



    switch ($action) {
       case "form":
            //Return back a form to be submitted to the create

            $content = \Tina4\renderTemplate("api/admin/articleCategories/form.twig", ["categories" => $categories]);

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => "Add Article Category", "onclick" => "if ( $('#articleCategory').valid() ) { saveForm('articleCategory', '" . TINA4_BASE_URL . "/api/admin/article-categories', 'message'); }", "content" => $content]);
       break;
       case "fetch":
            //Return back a form to be submitted to the create

            $content = \Tina4\renderTemplate("api/admin/articleCategories/form.twig",["data" => $articleCategory, "categories" => $categories]);

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => "Edit Article Category", "onclick" => "if ( $('#articleCategory').valid() ) { saveForm('articleCategory', '" . TINA4_BASE_URL . "/api/admin/article-categories/{$articleCategory->id}', 'message'); }", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
           if ($websiteId != 0) {
               $where = "website_id = {$websiteId}";
           } else {
               $where = "";
           }
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
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
           //no return needed

        break;

        case "afterCreate":
           //no return needed
            return (object)["httpCode" => 200, "message" => "<script>articleCategoryTable.ajax.reload(null, false); showMessage ('{$articleCategory->name} Created');</script>"];

            break;
        case "update":
           //no return needed
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


\Tina4\Get::add("/cms/articles", function (\Tina4\Response $response){
    return $response (\Tina4\renderTemplate("/content/articles.twig"), HTTP_OK, TEXT_HTML);
});

/**
 * CRUD Prototype Article Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/articles", new Article(), function ($action, Article $article, $filter, $request) {



    switch ($action) {
       case "form":
       case "fetch":
            //Return back a form to be submitted to the create
            $articleCategories = (new ArticleCategory())
                ->select('id,name,parent_id,is_menu,display_order,website_id', 100)
                ->where("(id = 0")
                ->filter(function($record){
                    $article = new ArticleCategory();
                    $article->load("id = {$record->parentId}");
                    $record->parentName = $article->name;
                })
                ->orderBy("parent_id,name")
                ->asArray();

            if ($action == "form") {
                $title = "Add Article";
                $savePath =  TINA4_BASE_URL . "/api/admin/articles";
                $content = \Tina4\renderTemplate("/api/admin/articles/form.twig", ['categories' => $articleCategories]);
            } else {
                $title = "Edit Article";
                $savePath =  TINA4_BASE_URL . "/api/admin/articles/".$article->id;
                $content = \Tina4\renderTemplate("/api/admin/articles/form.twig", ["data" => $article, 'categories' => $articleCategories]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#articleForm').valid() ) { saveForm('articleForm', '" .$savePath."', 'message'); }", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter

            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            } else {
                $where = " 1 = 1";
            }

          

            $articles =   $article->select ("id, published_date, title, description, author, is_published", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->orderBy($filter["orderBy"])
                ->asResult();


            return $articles;
        break;
        case "create":
            unset($article->image);
            unset($article->content);

            if (!empty($request->params["article_categories"])) {
                $article->DBA->exec("delete from article_article_category where article_id = {$article->id}");
                foreach ($request->params["article_categories"] as $id => $value) {
                    if ($value != 0) {
                        $article->DBA->exec("insert into article_article_category (article_id, article_category_id) values ({$article->id}, {$id})");
                    }
                }
            }


            $article->isPublished = 0;
            $article->slug = (new Content())->slug($request->data->title);


        break;
        case "update":
            unset($article->image);
            unset($article->content);

            if (!empty($request->params["article_categories"])) {
                $article->DBA->exec("delete from article_article_category where article_id = {$article->id}");
                foreach ($request->params["article_categories"] as $id => $value) {
                    if ($value != 0) {
                        $article->DBA->exec("insert into article_article_category (article_id, article_category_id) values ({$article->id}, {$id})");
                    }
                }
            }

            $article->slug = (new Content())->slug($request->data->title);
            //Manipulate the $object here

            if($article->isPublished == 1) {
                if ($article->publishedDate !== "") {
                    $article->publishedDate = date("d/m/Y H:i:s");
                }
            } else {
                $article->publishedDate = null;
            }

            break;
        case "afterCreate":
            $article->saveBlob("content", $request->params["content"]);
            $article->saveFile("image", "image");
            //return needed

            return (object)["httpCode" => 200, "message" => "<script>articleGrid.ajax.reload(null, false); showMessage ('Article Created');</script>"];
        break;
        case "afterUpdate":
           $article->saveBlob("content", $request->params["content"]);
            //return needed
           $article->saveFile("image", "image");



           return (object)["httpCode" => 200, "message" => "<script>articleGrid.ajax.reload(null, false); showMessage ('Article Updated');</script>"];
        break;
        case "delete":
            //Manipulate the $object here

        break;
        case "afterDelete":
            //return needed
            return (object)["httpCode" => 200, "message" => "<script>articleGrid.ajax.reload(null, false); showMessage ('Article Deleted');</script>"];
        break;
    }
});
