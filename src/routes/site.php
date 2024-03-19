<?php
/**
 * @secure
 */
\Tina4\Post::add("/cms/site/set", function (\Tina4\Response $response, \Tina4\Request $request){
    $_SESSION["siteId"] = $request->params["siteId"];
    \Tina4\redirect(TINA4_SUB_FOLDER."/cms/page-builder");
});


/**
 * @secure
 */
\Tina4\Get::add("/cms/site", function (\Tina4\Response $response){
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    return $response (\Tina4\renderTemplate("/content/site.twig"), HTTP_OK, TEXT_HTML);
});
        
/**
 * CRUD Prototype Site Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/site", new Site(), function ($action, Site $site, $filter, \Tina4\Request $request) {
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

            if ($action == "form") {
                $title = "Add Site";
                $savePath =  TINA4_BASE_URL . "/api/admin/site";
                $content = \Tina4\renderTemplate("/api/admin/site/form.twig", ["themes" => $themes]);
            } else {
                $title = "Edit Site";
                $savePath =  TINA4_BASE_URL . "/api/admin/site/".$site->id;
                $content = \Tina4\renderTemplate("/api/admin/site/form.twig", ["data" => $site, "themes" => $themes]);
            }
            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#siteForm').valid() ) { saveForm('siteForm', '" .$savePath."', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            }

            return   $site->select ("*", $filter["length"], $filter["start"])
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
