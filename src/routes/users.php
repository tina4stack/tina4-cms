<?php


\Tina4\Get::add("/cms/users", function (\Tina4\Response $response){
    return $response (\Tina4\renderTemplate("/content/users.twig"), HTTP_OK, TEXT_HTML);
});
        
/**
 * CRUD Prototype Users Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/users", new Users(), function ($action, Users $users, $filter, \Tina4\Request $request) {
    switch ($action) {
       case "form":
       case "fetch":
            //Return back a form to be submitted to the create
            $roles = (new Role())->select('id,name', 1000)->asArray();
            if ($action == "form") {
                $title = "Add Users";
                $savePath =  TINA4_BASE_URL . "/api/admin/users";
                $content = \Tina4\renderTemplate("/api/admin/users/form.twig", ["roles" => $roles]);
            } else {
                $title = "Edit Users";
                $savePath =  TINA4_BASE_URL . "/api/admin/users/".$users->id;
                $content = \Tina4\renderTemplate("/api/admin/users/form.twig", ["data" => $users, "roles" => $roles]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#usersForm').valid() ) { saveForm('usersForm', '" .$savePath."', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            }
        
            return   $users->select ("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->orderBy($filter["orderBy"])
                ->asResult();
        break;
        case "create":
            //Manipulate the $object here
            $users->dateCreated = date($users->DBA->dateFormat);

            if (!empty($users->password)) {
                $users->password = password_hash($users->password, PASSWORD_BCRYPT);
            } else {
                $users->password = null;
            }
        break;
        case "afterCreate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>usersGrid.ajax.reload(null, false); showMessage ('Users Created');</script>"];
        break;
        case "update":
            //Manipulate the $object here
            if (!empty($users->password)) {
                $users->password = password_hash($users->password, PASSWORD_BCRYPT);
            } else {
                $users->password = null;
            }
            $users->dateModified = date($users->DBA->dateFormat);
        break;    
        case "afterUpdate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>usersGrid.ajax.reload(null, false); showMessage ('Users Updated');</script>"];
        break;   
        case "delete":
            //Manipulate the $object here
        break;
        case "afterDelete":
            //return needed 
            return (object)["httpCode" => 200, "message" => "<script>usersGrid.ajax.reload(null, false); showMessage ('Users Deleted');</script>"];
        break;
    }
});
