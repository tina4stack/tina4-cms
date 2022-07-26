<?php


\Tina4\Get::add("/cms/roles", function (\Tina4\Response $response){
    return $response (\Tina4\renderTemplate("/content/roles.twig"), HTTP_OK, TEXT_HTML);
});
        
/**
 * CRUD Prototype Role Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/roles", new Role(), static function ($action, Role $role, $filter, \Tina4\Request $request) {

    switch ($action) {
       case "form":
       case "fetch":
            //Return back a form to be submitted to the create
             
            if ($action == "form") {
                $title = "Add Role";
                $savePath =  TINA4_SUB_FOLDER . "/api/admin/roles";
                $content = \Tina4\renderTemplate("/api/admin/roles/form.twig", []);
            } else {
                $title = "Edit Role";
                $role->roleInfo = unserialize($role->roleInfo);
                $savePath =  TINA4_SUB_FOLDER . "/api/admin/roles/".$role->id;
                $content = \Tina4\renderTemplate("/api/admin/roles/form.twig", ["data" => $role]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#roleForm').valid() ) { saveForm('roleForm', '" .$savePath."', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            }
        
            return   $role->select ("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->orderBy($filter["orderBy"])
                ->asResult();
        break;
        case "create":
            //Manipulate the $object here
            $role->roleInfo = serialize($role->roleInfo);
            $role->dateCreated = date($role->DBA->dateFormat." H:i:s");
        break;
        case "afterCreate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>roleGrid.ajax.reload(null, false); showMessage ('Role Created');</script>"];
        break;
        case "update":
            //Manipulate the $object here
            $role->roleInfo = serialize($role->roleInfo);
            $role->dateModified = date($role->DBA->dateFormat." H:i:s");
        break;    
        case "afterUpdate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>roleGrid.ajax.reload(null, false); showMessage ('Role Updated');</script>"];
        break;   
        case "delete":
            //Manipulate the $object here
        break;
        case "afterDelete":
            //return needed 
            return (object)["httpCode" => 200, "message" => "<script>roleGrid.ajax.reload(null, false); showMessage ('Role Deleted');</script>"];
        break;
    }
});