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
 * Retrieve page listing
 *
 * @method "GET"
 * @param $id INTEGER #ID Of the page requested
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/api/tina4site/pages/get-page-list", function (\Tina4\Response $response, \Tina4\Request $request) {
    return $response ((new Page())->select("*"), HTTP_OK, TEXT_HTML);
});

/**
 * Retrieve given ID page data
 * @method "GET"
 * @param $id INTEGER #ID Of the page requested
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/api/tina4site/pages/get-page-data/{id}", function ($id, \Tina4\Response $response, \Tina4\Request $request) {

    //Initialize CMS ORM
    $cmsPage = new Page();
    //Load CMS page in content
    $cmsPage->load("id  = $id");

    //Initialize Related grapeJS page ORM
    $pd = new Tina4SitePage();
    //Load GrapeJS page into context
    $pd->load("cms_page_id = $id");

    //Form response
    $pageData = [
        'title'=>$cmsPage->title,
        'pages'=>$pd->pages,
        'html'=>$pd->html,
        'assets'=>$pd->assets,
        'styles'=>$pd->styles
    ];

    //Return The page data to be processed by grape JS
    return $response ($pageData, HTTP_OK, TEXT_HTML);
});

/**
 * Store page + create revision iteration
 * @method "POST"
 * @param $id INTEGER #ID Of the page in context
 * @param $response Tina4\Response #Response of request (In this case a simple string is returned)
 * @param $request Tina4\Request #Request data
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Post::add("/api/tina4site/pages/store/{id}", function ($id, \Tina4\Response $response, \Tina4\Request $request) : Tina4\Response {

    //---Standard save---\\

    //Initiailize ORM
    $pageData = new Tina4SitePage();

    //Bring page into context
    $pageData->load("cms_page_id={$id}");

    //Encode inputs
    $pageData->html = json_encode($request->data->html);
    $pageData->pages = json_encode(["pages"=>$request->data->pages]);
    $pageData->styles = json_encode(["styles"=>$request->data->styles]);
    $pageData->assets = json_encode(["assets"=>$request->data->assets]);

    //Assign cms page id
    $pageData->cms_page_id = $id;

    //Define timestamp
    if(($pageData->created_at ?? '') == ''){
        $pageData->created_at = date('Y-m-d H:i:s');
    }

    //Save ORM object to database
    $pageData->save();

    //---Revision---\\

    //Fetch the latest revision
    $latest_revision = (new Tina4SitePagehistory())->select("revision_no",1)
    ->where ("cms_page_id = '{$id}'")
    ->orderBy("revision_no DESC")
    ->asArray();

    //Check if it is a valid previous revision
    if(\count($latest_revision)){
        //Add 1 to the revision counter
        $revision_no = $latest_revision[0]["revision_no"] + 1;
    } else{
        //Default to 1
        $revision_no = 1;
    }

    //Initialize page revision object
    $pageRevision = (new Tina4SitePageHistory());

    //Encode inputs
    $pageRevision->html = json_encode($request->data->html);
    $pageRevision->pages = json_encode(["pages"=>$request->data->pages]);
    $pageRevision->styles = json_encode(["styles"=>$request->data->styles]);
    $pageRevision->assets = json_encode(["assets"=>$request->data->assets]);

    //Relate CMS page
    $pageRevision->cms_page_id = $id;

    //Revision note (Passed via request)
    $pageRevision->note = $request->data->note;

    //Set system note as new revision as it's a new save point
    $pageRevision->system_note = "New Revision";

    //Set revision number based on afore logic
    $pageRevision->revision_no = $revision_no;

    //Set time stamp to readable format
    $pageRevision->created_at = date('Y-m-d H:i:s');

    //Save ORM to databse
    $pageRevision->save();

    //Finally return a response
    return $response ('Successfully saved', HTTP_OK, TEXT_HTML);
});

/**
 * Save / Update as twig template in public templates
 * @method "POST"
 * @param $id INTEGER #ID Of the page in context
 * @param $response Tina4\Response #Response of request (In this case a simple string is returned)
 * @param $request Tina4\Request #Request data
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\GET::add("/api/tina4site/pages/render-as-twig/{id}", function ($id, \Tina4\Response $response, \Tina4\Request $request) {

    //Initialize CMS ORM
    $cmsPage = new Page();
    //Load CMS page in content
    $cmsPage->load("id  = $id");

    //Initialize Related grapeJS page ORM
    $pd = new Tina4SitePage();
    //Load GrapeJS page into context
    $pd->load("cms_page_id = $id");

    //Declare holder for html
    $html = $pd->html;
    //Process the html
    $html = str_replace('\n','',$html);

    $html = FormatMarkup::HTML($html);

    $html = str_replace('\/','/',$html);
    $html = str_replace('\"','"',$html);

    $css ="<link href='/tina4site/lib/css/bootstrap.min.css' rel='stylesheet'/>";
    $html = str_replace('</head>','</head>' ."\n" . $css . "\n",$html);

    $html = substr_replace($html,'',stripos($html,'"'), 1);
    $html = substr_replace($html,'',strrpos($html,'"'), 1);

    $html = str_replace(' !-- =============== 1.9 Footer Area Start ====================-->','<!-- =============== 1.9 Footer Area Start ====================-->',$html);

    //Save the file
    $template = fopen($_SERVER['DOCUMENT_ROOT'].'/src/templates/'.strtolower(str_replace(' ','-',$cmsPage->title.'.twig')), "w+");
    fwrite($template,$html);
    fclose($template);
    //Return response
    return $response ('Successfully saved', HTTP_OK, TEXT_HTML);
});