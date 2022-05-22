<?php


\Tina4\Get::add("/cms/menus", function (\Tina4\Response $response){
    return $response (\Tina4\renderTemplate("/content/menu.twig"), HTTP_OK, TEXT_HTML);
});
        
/**
 * CRUD Prototype Menu Modify as needed
 * Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 */
\Tina4\Crud::route ("/api/admin/menus", new Menu(), function ($action, Menu $menu, $filter, \Tina4\Request $request) {
    $categories = (new Menu())->select("id,name,parent_id,slug,specific_route,is_active,display_order")
        ->filter(function($record){
            $menuItem = new Menu();
            $menuItem->load("id = {$record->parentId}");
            $record->parentName = $menuItem->name;
        })
        ->asArray();

    switch ($action) {
       case "form":
       case "fetch":
            //Return back a form to be submitted to the create
             
            if ($action == "form") {
                $title = "Add Menu";
                $savePath =  TINA4_SUB_FOLDER . "/api/admin/menus";
                $content = \Tina4\renderTemplate("/api/admin/menus/form.twig",  ["categories" => $categories]);
            } else {
                $title = "Edit Menu";
                $savePath =  TINA4_SUB_FOLDER . "/api/admin/menus/".$menu->id;
                $content = \Tina4\renderTemplate("/api/admin/menus/form.twig", ["data" => $menu, "categories" => $categories]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#menuForm').valid() ) { saveForm('menuForm', '" .$savePath."', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            }
        
            return   $menu->select ("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->filter(function($record){
                    $menuItem = new Menu();
                    $menuItem->load("id = {$record->parentId}");
                    $record->parentName = $menuItem->name;
                })
                ->orderBy($filter["orderBy"])
                ->asResult();
        break;
        case "afterCreate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>menuGrid.ajax.reload(null, false); showMessage ('Menu Created');</script>"];
        break;
        case "create":
        case "update":
            //Manipulate the $object here
            if ($menu->slug !== "") {
                $menu->slug = (new Content())->getSlug($menu->slug);
            }
        break;    
        case "afterUpdate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>menuGrid.ajax.reload(null, false); showMessage ('Menu Updated');</script>"];
        break;   
        case "delete":
            //Manipulate the $object here
        break;
        case "afterDelete":
            //return needed 
            return (object)["httpCode" => 200, "message" => "<script>menuGrid.ajax.reload(null, false); showMessage ('Menu Deleted');</script>"];
        break;
    }
});