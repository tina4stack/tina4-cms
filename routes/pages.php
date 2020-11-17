<?php

\Tina4\Get::add("/cms/pages", function (\Tina4\Response $response){
    return $response (\Tina4\renderTemplate("/content/pages.twig"), HTTP_OK, TEXT_HTML);
});

/**
 * CRUD Prototype Page Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/pages", new Page(), function ($action, Page $page, $filter, \Tina4\Request $request) {
    if (isset($request->params["websiteId"])) {
        $websiteId = $request->params["websiteId"];
    }

    switch ($action) {
       case "form":
       case "fetch":
            //Return back a form to be submitted to the create
            if ($action == "form") {
                $title = "Add Page";
                $savePath =  TINA4_BASE_URL . "/api/admin/pages";
                $content = \Tina4\renderTemplate("/api/admin/pages/form.twig", []);
            } else {
                $title = "Edit Page";
                $savePath =  TINA4_BASE_URL . "/api/admin/pages/".$page->id;
                $content = \Tina4\renderTemplate("/api/admin/pages/form.twig", ["data" => $page]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#pageForm').valid() ) { saveForm('pageForm', '" .$savePath."', 'message'); }", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter

            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            } else {
                $where = "1 = 1";
            }

            return   $page->select ("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->orderBy($filter["orderBy"])
                ->asResult();
        break;
        case "create":
            $page->isPublished = 0;

            unset($page->image);
            unset($page->content);
        break;
        case "update":
            $page->slug = (new Content())->getSlug($request->data->name);
            //Manipulate the $object here
            $page->dateModified = date("Y-m-d H:i:s");

            unset($page->image);
            unset($page->content);
        break;
        case "afterCreate":

           //return needed
           $page->saveBlob("content", $request->params["content"]);
           $page->saveFile("image", "image"); //$_FILES["image"]
           return (object)["httpCode" => 200, "message" => "<script>pageGrid.ajax.reload(null, false); showMessage ('Page Created');</script>"];
        break;
        case "afterUpdate":
           //return needed
           $page->saveBlob("content", $request->params["content"]);
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
