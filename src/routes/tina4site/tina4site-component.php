<?php
/* Copyright (C) 2023 Code Infinity - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the GNU GENERAL PUBLIC LICENSE (V3),
 *
 * You should have received a copy of the GNU GENERAL PUBLIC LICENSE (V3) with
 * this project. If not, please write to: info@codeinfinity.co.za, or visit : codeinfinity.co.za
 *
 * License URL : https://github.com/tina4stack/tina4-php/blob/master/LICENSE
 */

/**
 * Component resource landing route
 *
 * @method "GET"
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/tina4site/component/landing/{group_id}", function ($groupID, \Tina4\Response $response){
    $groupInContext = (new Tina4SiteComponentGroup())->load("id = {$groupID}");
    $groups = (new Tina4SiteComponentGroup())->select("id, name");
    $data = ["groupInContext"=>$groupInContext->asArray(), "groups"=>$groups->asArray()];
    return $response (\Tina4\renderTemplate("/tina4site/component/grid.twig", $data), HTTP_OK, TEXT_HTML);
});

/**
 * Component resource landing route
 *
 * @note CRUD Prototype Tina4SiteComponent Modify as needed
 *       Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 *
 * @method "Custom"
 * @param $action String #Action identifier of dataset resource
 * @param $tina4sitedataset Tina4SiteComponent #Related ORM Object
 * @param $filter String #Filter to pass to grid
 * @param $request Tina4\Request #Response of request (Standard HTML Response)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Crud::route ("/tina4site/component", new Tina4SiteComponent(), function ($action, Tina4SiteComponent $tina4sitecomponent, $filter, \Tina4\Request $request) {
    switch ($action) {
       case "form":
       case "fetch":
           //Fetch groups
           $tina4sitecomponent->groups = (new Tina4SiteComponentGroup())->select("*")->where("enabled = 'on'")->asArray();
            //Return back a form to be submitted to the create
            if ($action == "form") {
                $title = "Add Tina4SiteComponent";
                $savePath =  TINA4_SUB_FOLDER . "/tina4site/component";
                $content = \Tina4\renderTemplate("/tina4site/component/form.twig", $tina4sitecomponent->asArray());
            } else {
                $title = "Edit Tina4 Site Component : " . $tina4sitecomponent->name;
                $savePath =  TINA4_SUB_FOLDER . "/tina4site/component/".$tina4sitecomponent->id;
                $content = \Tina4\renderTemplate("/tina4site/component/form.twig", ["data" => $tina4sitecomponent]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#tina4sitecomponentForm').valid() ) { saveForm('tina4sitecomponentForm', '" .$savePath."', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            }
        
            return $tina4sitecomponent->select ("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->where("group_id = {$request->data->group_id}")
                ->orderBy($filter["orderBy"])
                ->asResult();
        break;
        case "create":
            //Manipulate the $object here
            $tina4sitecomponent->html = '&lt;div id="ietj"&gt;&lt;/div&gt;';
            $tina4sitecomponent->created_at = date($tina4sitecomponent->DBA->dateFormat." H:i:s");
            if(!$tina4sitecomponent->enabled){
                $tina4sitecomponent->enabled = 'off';
            }
        break;
        case "afterCreate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>tina4sitecomponentGrid.ajax.reload(null, false); showMessage ('Tina4SiteComponent Created');</script>"];
        break;
        case "update":
            //Manipulate the $object here
            if(!$tina4sitecomponent->enabled){
                $tina4sitecomponent->enabled = 'off';
            }
        break;
        case "afterUpdate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>tina4sitecomponentGrid.ajax.reload(null, false); showMessage ('Tina4SiteComponent Updated');</script>"];
        break;   
        case "delete":
            //Manipulate the $object here
        break;
        case "afterDelete":
            //return needed 
            return (object)["httpCode" => 200, "message" => "<script>tina4sitecomponentGrid.ajax.reload(null, false); showMessage ('Tina4SiteComponent Deleted');</script>"];
        break;
    }
});