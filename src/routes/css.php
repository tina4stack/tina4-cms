<?php


\Tina4\Get::add("/cms/css", function (\Tina4\Response $response) {
    return $response (\Tina4\renderTemplate("/content/css.twig"), HTTP_OK, TEXT_HTML);
});

/**
 * CRUD Prototype Css Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
 * POST @ /path, /path/{id} - create & update
 * DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route("/api/admin/css", new Css(), function ($action, Css $css, $filter, \Tina4\Request $request) {
    switch ($action) {
        case "form":
        case "fetch":
            //Return back a form to be submitted to the create
            if ($action == "form") {
                $title = "Add Css";
                $savePath = TINA4_SUB_FOLDER . "/api/admin/css";
                $content = \Tina4\renderTemplate("/api/admin/css/form.twig", []);
            } else {
                $title = "Edit Css";
                $savePath = TINA4_SUB_FOLDER . "/api/admin/css/" . $css->id;
                $content = \Tina4\renderTemplate("/api/admin/css/form.twig", ["data" => $css]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#cssForm').valid() ) { saveForm('cssForm', '" . $savePath . "', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
            break;
        case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            }

            return $css->select("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->orderBy($filter["orderBy"])
                ->asResult();
            break;
        case "create":
            //Manipulate the $object here
            break;
        case "afterCreate":
            //add to scss folder
            if (file_exists("./src/public/css/default.css")) {
                unlink("./src/public/css/default.css");
            }

            if ($css->isActive == 1) {
                file_put_contents("./src/scss/" . (new Content())->getSlug($css->name) . ".scss", $_REQUEST["content"]);
            } else {
                unlink("./src/scss/" . (new Content())->getSlug($css->name) . ".scss");
            }
            $css->saveBlob("content", $_REQUEST["content"]);
            //return needed
            return (object)["httpCode" => 200, "message" => "<script>cssGrid.ajax.reload(null, false); showMessage ('Css Created');</script>"];
            break;
        case "update":
            //Manipulate the $object here
            break;
        case "afterUpdate":
            //return needed
            if (file_exists("./src/public/css/default.css")) {
                unlink("./src/public/css/default.css");
            }

            if ($css->isActive == 1) {
                file_put_contents("./src/scss/" . (new Content())->getSlug($css->name) . ".scss", $_REQUEST["content"]);
            } else {
                if (file_exists("./src/scss/" . (new Content())->getSlug($css->name) . ".scss")) {
                    unlink("./src/scss/" . (new Content())->getSlug($css->name) . ".scss");
                }
            }

            $css->saveBlob("content", $_REQUEST["content"]);

            return (object)["httpCode" => 200, "message" => "<script>cssGrid.ajax.reload(null, false); showMessage ('Css Updated');</script>"];
            break;
        case "delete":
            unlink("./src/scss/".(new Content())->getSlug($css->name).".scss");
            //Manipulate the $object here
            break;
        case "afterDelete":
            //return needed 
            return (object)["httpCode" => 200, "message" => "<script>cssGrid.ajax.reload(null, false); showMessage ('Css Deleted');</script>"];
            break;
    }
});