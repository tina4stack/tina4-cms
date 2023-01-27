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
 * Dataset resource landing route
 *
 * @method "GET"
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/tina4site/tina4site-dataset/landing", function (\Tina4\Response $response){
    return $response (\Tina4\renderTemplate("/tina4site/tina4site-dataset/grid.twig"), HTTP_OK, TEXT_HTML);
});
        
/**
 * Resource route for Tina4Site-Dataset
 *
 * @note CRUD Prototype Tina4SiteDataSet Modify as needed
 *       Creates  GET @ /path, /path/{id}, - fetch,form for whole or for single
            POST @ /path, /path/{id} - create & update
            DELETE @ /path/{id} - delete for single
 *
 * @method "Custom"
 * @param $action String #Action identifier of dataset resource
 * @param $tina4sitedataset Tina4SiteDataSet #Related ORM Object
 * @param $filter String #Filter to pass to grid
 * @param $request Tina4\Request #Response of request (Standard HTML Response)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Crud::route ("/tina4site/tina4site-dataset", new Tina4SiteDataSet(), function ($action, Tina4SiteDataSet $tina4sitedataset, $filter, \Tina4\Request $request) {
    switch ($action) {
       case "form":
       case "fetch":
            //Return back a form to be submitted to the create
             
            if ($action == "form") {
                $title = "Add Tina4SiteDataSet";
                $savePath =  TINA4_SUB_FOLDER . "/tina4site/tina4site-dataset";
                $content = \Tina4\renderTemplate("/tina4site/tina4site-dataset/form.twig", []);
            } else {
                $title = "Edit Tina4SiteDataSet";
                $savePath =  TINA4_SUB_FOLDER . "/tina4site/tina4site-dataset/".$tina4sitedataset->id;
                $content = \Tina4\renderTemplate("/tina4site/tina4site-dataset/form.twig", ["data" => $tina4sitedataset]);
            }

            return \Tina4\renderTemplate("components/modalForm.twig", ["title" => $title, "onclick" => "if ( $('#tina4sitedatasetForm').valid() ) { saveForm('tina4sitedatasetForm', '" .$savePath."', 'message'); $('#formModal').modal('hide');}", "content" => $content]);
       break;
       case "read":
            //Return a dataset to be consumed by the grid with a filter
            $where = "";
            if (!empty($filter["where"])) {
                $where = "{$filter["where"]}";
            }
        
            return   $tina4sitedataset->select ("*", $filter["length"], $filter["start"])
                ->where("{$where}")
                ->orderBy($filter["orderBy"])
                ->asResult();
        break;
        case "create":
            //Manipulate the $object here
        break;
        case "afterCreate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>tina4sitedatasetGrid.ajax.reload(null, false); showMessage ('Tina4SiteDataSet Created');</script>"];
        break;
        case "update":
            //Manipulate the $object here
        break;    
        case "afterUpdate":
           //return needed 
           return (object)["httpCode" => 200, "message" => "<script>tina4sitedatasetGrid.ajax.reload(null, false); showMessage ('Tina4SiteDataSet Updated');</script>"];
        break;   
        case "delete":
            //Manipulate the $object here
        break;
        case "afterDelete":
            //return needed 
            return (object)["httpCode" => 200, "message" => "<script>tina4sitedatasetGrid.ajax.reload(null, false); showMessage ('Tina4SiteDataSet Deleted');</script>"];
        break;
    }
});
 