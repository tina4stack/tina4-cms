<?php

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
                ->select('id,name,parent_id,is_menu,display_order', 100)
                ->where("id = 1")
                ->filter(function($record){
                    $article = new ArticleCategory();
                    $article->load("id = {$record->parentId}");
                    $record->parentName = $article->name;
                })
                ->orderBy("parent_id,name")
                ->asArray();

            $snippets = (new Snippet())->select("id,name", 1000)->orderBy("name")->asArray();

            if ($action == "form") {
                $title = "Add Article";
                $savePath =  TINA4_BASE_URL . "/api/admin/articles";
                $content = \Tina4\renderTemplate("/api/admin/articles/form.twig", ['categories' => $articleCategories, "snippets" => $snippets]);
            } else {
                $title = "Edit Article";
                $savePath =  TINA4_BASE_URL . "/api/admin/articles/".$article->id;
                $content = \Tina4\renderTemplate("/api/admin/articles/form.twig", ["data" => $article, 'categories' => $articleCategories, "snippets" => $snippets]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#articleForm').valid() ) { saveForm('articleForm', '" .$savePath."', 'message'); $('#formModal').modal('hide'); }", "content" => $content]);
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

            if($article->isPublished == 1) {
                if (empty($article->publishedDate)) {
                    $article->publishedDate = date($article->DBA->dateFormat." H:i:s");
                }
            }

            $article->slug = (new Content())->getSlug($request->data->title);
        break;
        case "update":


            if (!empty($request->params["article_categories"])) {

                $article->DBA->exec("delete from article_article_category where article_id = {$article->id}");
                foreach ($request->params["article_categories"] as $id => $value) {
                    if ($value != 0) {
                        $article->DBA->exec("insert into article_article_category (article_id, article_category_id) values ({$article->id}, {$id})");
                    }
                }
            }

            $article->slug = (new Content())->getSlug($request->data->title);
            //Manipulate the $object here

            if($article->isPublished == 1) {
                if (empty($article->publishedDate)) {
                    $article->publishedDate = date($article->DBA->dateFormat." H:i:s");
                }
            }


            break;
        case "afterCreate":
            $article->saveBlob("content", $_REQUEST["content"]);
            $article->saveFile("image", "image");
            //return needed

            if (!empty($request->params["article_categories"])) {
                $article->DBA->exec("delete from article_article_category where article_id = {$article->id}");
                foreach ($request->params["article_categories"] as $id => $value) {
                    if ($value != 0) {
                        $article->DBA->exec("insert into article_article_category (article_id, article_category_id) values ({$article->id}, {$id})");
                    }
                }
            }

            return (object)["httpCode" => 200, "message" => "<script>articleGrid.ajax.reload(null, false); showMessage ('Article Created');</script>"];
        break;
        case "afterUpdate":
           $article->saveBlob("content", $_REQUEST["content"]);
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
