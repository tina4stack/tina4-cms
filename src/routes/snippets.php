<?php


\Tina4\Get::add("/cms/snippets", function (\Tina4\Response $response){
    return $response (\Tina4\renderTemplate("/content/snippets.twig"), HTTP_OK, TEXT_HTML);
});
        
/**
 * CRUD Prototype Snippet Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/snippets", new Snippet(), function ($action, Snippet $snippet, $filter, \Tina4\Request $request) {
    switch ($action) {
       case "form":
       case "fetch":

            //Return back a form to be submitted to the create
            if ($action == "form") {
                $title = "Add Snippet";
                $savePath =  TINA4_BASE_URL . "/api/admin/snippets";
                $content = \Tina4\renderTemplate("/api/admin/snippets/form.twig", []);
            } else {
                $title = "Edit Snippet";
                $savePath =  TINA4_BASE_URL . "/api/admin/snippets/".$snippet->id;
                $content = \Tina4\renderTemplate("/api/admin/snippets/form.twig", ["data" => $snippet]);
            }


            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#snippetForm').valid() ) { saveForm('snippetForm', '" .$savePath."', 'message'); $('#formModal').modal('hide'); }", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            }
        
            return   $snippet->select ("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->orderBy($filter["orderBy"])
                ->asResult();
        break;
        case "create":
            $snippet->dateCreated = date($snippet->DBA->dateFormat." H:i:s");
        break;
        case "update":
            //Manipulate the $object here


            $snippet->dateModified = date($snippet->DBA->dateFormat." H:i:s");
        break;
        case "afterCreate":
            $snippet->saveBlob("content", $_REQUEST["content"]);
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>snippetGrid.ajax.reload(null, false); showMessage ('Snippet Created');</script>"];
        break;    
        case "afterUpdate":

           //return needed 
           $snippet->saveBlob("content", $_REQUEST["content"]);
           return (object)["httpCode" => 200, "message" => "<script>snippetGrid.ajax.reload(null, false); showMessage ('Snippet Updated');</script>"];
        break;   
        case "delete":
            //Manipulate the $object here
           
        break;
        case "afterDelete":
            //return needed 
            return (object)["httpCode" => 200, "message" => "<script>snippetGrid.ajax.reload(null, false); showMessage ('Snippet Deleted');</script>"];
        break;
    }
});
