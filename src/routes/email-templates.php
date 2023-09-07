<?php

\Tina4\Get::add("/cms/email-templates", function (\Tina4\Response $response){
    return $response (\Tina4\renderTemplate("/content/emailTemplates.twig"), HTTP_OK, TEXT_HTML);
});
        
/**
 * CRUD Prototype EmailTemplate Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/email-templates", new EmailTemplate(), function ($action, EmailTemplate $emailTemplate, $filter, \Tina4\Request $request) {
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
             
            if ($action == "form") {
                $title = "Add Email Template";
                $savePath =  TINA4_BASE_URL . "/api/admin/email-templates";
                $content = \Tina4\renderTemplate("/api/admin/emailTemplates/form.twig", ["siteId" => $siteId]);
            } else {
                $title = "Edit Email Template";
                $savePath =  TINA4_BASE_URL . "/api/admin/email-templates/".$emailTemplate->id;
                $content = \Tina4\renderTemplate("/api/admin/emailTemplates/form.twig", ["data" => $emailTemplate, "siteId" => $siteId]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#emailtemplateForm').valid() ) { saveForm('emailtemplateForm', '" .$savePath."', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "site_id = {$siteId}";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
                $where .= " and site_id = {$siteId}";
            }

            return   $emailTemplate->select ("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->orderBy($filter["orderBy"])
                ->asResult();
        break;
        case "create":
            $emailTemplate->dateCreated = date($emailTemplate->DBA->dateFormat." H:i:s");
            break;
        case "update":
            //Manipulate the $object here


            $emailTemplate->dateModified = date($emailTemplate->DBA->dateFormat." H:i:s");
            break;
        case "afterCreate":
           //return needed
            $emailTemplate->saveBlob("content", $_REQUEST["content"]);
           return (object)["httpCode" => 200, "message" => "<script>emailtemplateGrid.ajax.reload(null, false); showMessage ('Email Template Created');</script>"];
        break;

        case "afterUpdate":
           //return needed
            $emailTemplate->saveBlob("content", $_REQUEST["content"]);
           return (object)["httpCode" => 200, "message" => "<script>emailtemplateGrid.ajax.reload(null, false); showMessage ('Email Template Updated');</script>"];
        break;   
        case "delete":
            //Manipulate the $object here
        break;
        case "afterDelete":
            //return needed 
            return (object)["httpCode" => 200, "message" => "<script>emailtemplateGrid.ajax.reload(null, false); showMessage ('Email Template Deleted');</script>"];
        break;
    }
});