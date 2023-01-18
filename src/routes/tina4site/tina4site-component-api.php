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
 * Retrieve component listing
 *
 * @method "GET"
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/api/tina4site/components/get", function (\Tina4\Response $response, \Tina4\Request $request){
    //Initialize result set
    $components = (new Tina4SiteComponent())->select("*")->where("enabled = 'on'");
    //Return the result
    return $response ($components, HTTP_OK, TEXT_HTML);
});

/**
 * Retrieve component listing WITH groups
 *
 * @method "GET"
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/api/tina4site/components/get-grouped-list", function (\Tina4\Response $response, \Tina4\Request $request){
    //Bring global DB into scope
    global $DBA;
    //Actuate custom query
    $sql = "select c.id,c.name,c.html,c.css, c.enabled, c.icon,
            c.group_id, g.name as group_name 
            from tina4site_component c
            left join 
            tina4site_component_group g 
            on c.group_id = g.id";
    $components = $DBA->fetch($sql, 100)->asArray();

    //Return the result
    return $response ($components, HTTP_OK, TEXT_HTML);
});

/**
 * Retrieve component group listing
 *
 * @method "GET"
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/api/tina4site/component/groups", function (\Tina4\Response $response, \Tina4\Request $request){
    //Initialize result set
    $componentGroups = (new Tina4SiteComponentGroup())->select("id,name")->where("enabled = 'on'")->jsonSerialize();
    //Return the result
    return $response ($componentGroups, HTTP_OK, TEXT_HTML);
});

/**
 * Retrieve component
 *
 * @method "GET"
 * @param $id INTEGER #ID Of the page requested
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/api/tina4site/component/get/{id}", function ($id, \Tina4\Response $response, \Tina4\Request $request){
    //Initialize component result set
    $components = (new Tina4SiteComponent())->select("*")->where("id = '$id'");
    //Return the result
    return $response ($components, HTTP_OK, TEXT_HTML);
});

/**
 * Retrieve component
 *
 * @method "POST"
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Post::add("/api/tina4site/component/save", function (\Tina4\Response $response, \Tina4\Request $request){

    //Bring component into context
    $component = (new Tina4SiteComponent())->load("id = '{$request->params["id"]}' ");
    $component->html = $request->params["html"];
    $component->css = $request->params["css"];
    $component->created_at = date('Y-m-d H:i:s');
    //Save ORM to database
    $component->save();
    //Return success message
    return $response ("Successfully Saved Component", HTTP_OK, TEXT_HTML);
});

/**
 * Store component
 * @method "POST"
 * @param $request Tina4\Request #Request data
 * @param $response Tina4\Response #Response of request (In this case a simple string is returned)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Post::add("/api/tina4site/component/save-as", function (\Tina4\Response $response, \Tina4\Request $request){

    //Define array to contain res
    $res = ["status"=>"false", "response"=>""];

    //Ensure a name is passed
    $name = $request->params['name'];
    if(!$name || strlen($name) < 5){
        $res["response"] = 'Validation : Name of component (Required & Min length 5)';
        return $response ($res, HTTP_OK, TEXT_HTML);
    }

    //Ensure name is unique
    if((new Tina4SiteComponent())->load("name = '$name'")){
        $res["response"] = 'Component with name already exists';
        return $response ($res, HTTP_OK, TEXT_HTML);
    }

    //Ensure a group name is passed (Name due to limitation on front end control)
    $group = $request->params['group'];
    if($group == '' || $group == null){
        $res["response"] = 'Must select a Group';
        return $response ($res, HTTP_OK, TEXT_HTML);
    }

    //Get group ID from given name
    $group_id = (new Tina4SiteComponentGroup())->load("name = '{$group}'")->id;
    //Initialize ORM for new component
    $component = (new Tina4SiteComponent());

    //Define Object properties
    $component->name = $name;
    $component->html = $request->params["html"];
    $component->css = $request->params["css"];
    $component->icon = $request->params["icon"];
    $component->enabled = ($request->params["enabled"] === "true") ? 'on' : 'off' ;
    $component->group_id = $group_id;

    //Assign datestamp
    $component->created_at = date($component->DBA->getDefaultDatabaseDateFormat().' H:i:s');

    //Save component
    $component->save();

    $componentID = (new Tina4SiteComponent())->load("name = '$name'")->id;
    $res = ["status"=>"true", "response"=>$componentID];

    //Return response
    return $response ($res, HTTP_OK, TEXT_HTML);
});
