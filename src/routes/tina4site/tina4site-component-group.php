<?php
/**
 * Component Group resource landing route
 *
 * @method "GET"
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/tina4site/component-group/landing", function (\Tina4\Response $response) {
    return $response (\Tina4\renderTemplate("/tina4site/component-group/grid.twig", []), HTTP_OK, TEXT_HTML);
});
        
/**
 * Resource route for Tina4Site-ComponentGroup
 *
 * @note CRUD Prototype Tina4SiteComponentGroup Modify as needed
 *       Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single

 * @method "Custom"
 * @param $action String #Action identifier of dataset resource
 * @param $tina4sitecomponentgroup Tina4SiteComponentGroup #Related ORM Object
 * @param $filter String #Filter to pass to grid
 * @param $request Tina4\Request #Response of request (Standard HTML Response)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Crud::route ("/tina4site/component-group", new Tina4SiteComponentGroup(), function ($action, Tina4SiteComponentGroup $tina4sitecomponentgroup, $filter, \Tina4\Request $request) {
    switch ($action) {
       case "form":
       case "fetch":
            //Return back a form to be submitted to create
             
            if ($action == "form") {
                $title = "Add Tina4SiteComponentGroup";
                $savePath =  TINA4_SUB_FOLDER . "/tina4site/component-group";
                $content = \Tina4\renderTemplate("/tina4site/component-group/form.twig", []);
            } else {
                $title = "Edit Tina4SiteComponentGroup";
                $savePath =  TINA4_SUB_FOLDER . "/tina4site/component-group/".$tina4sitecomponentgroup->id;
                $content = \Tina4\renderTemplate("/tina4site/component-group/form.twig", ["data" => $tina4sitecomponentgroup]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#tina4sitecomponentgroupForm').valid() ) { saveForm('tina4sitecomponentgroupForm', '" .$savePath."', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            }
        
            $groups =  $tina4sitecomponentgroup->select ("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->orderBy($filter["orderBy"])
                ->asResult();

            $gc = count($groups->records);
            for($x=0; $x<$gc; $x++){
                $c = count((new Tina4SiteComponent())->select("id")->where("group_id =".$groups->records[$x]->id)->asArray());
                $groups->records[$x]->count = $c;
            }
            return $groups;
        break;
        case "create":
            //Manipulate the $object here
            $tina4sitecomponentgroup->created_at = date($tina4sitecomponentgroup->DBA->dateFormat." H:i:s");
            if(!$tina4sitecomponentgroup->enabled){
                $tina4sitecomponentgroup->enabled = 'off';
            }
        break;
        case "afterCreate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>tina4sitecomponentgroupGrid.ajax.reload(null, false); showMessage ('Tina4SiteComponentGroup Created');</script>"];
        break;
        case "update":
            //Manipulate the $object here
            if(!$tina4sitecomponentgroup->enabled){
                $tina4sitecomponentgroup->enabled = 'off';
            }

            break;
        case "afterUpdate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>tina4sitecomponentgroupGrid.ajax.reload(null, false); showMessage ('Tina4SiteComponentGroup Updated');</script>"];
        break;   
        case "delete":
            //Manipulate the $object here
        break;
        case "afterDelete":
            //return needed 
            return (object)["httpCode" => 200, "message" => "<script>tina4sitecomponentgroupGrid.ajax.reload(null, false); showMessage ('Tina4SiteComponentGroup Deleted');</script>"];
        break;
    }
});