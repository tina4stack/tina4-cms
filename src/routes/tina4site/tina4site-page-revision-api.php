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
 * Retrieve revision history
 *
 * @method "GET"
 * @param $id INTEGER #ID Of the page requested
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/api/tina4site/revision/get-page-revision-list/{id}", function ($cms_page_id, \Tina4\Response $response, \Tina4\Request $request) {
    return $response ((new Tina4SitePagehistory())->select("*")->where("cms_page_id = {$cms_page_id}"), HTTP_OK, TEXT_HTML);
});

/**
 * Restore to revision point
 *
 * @method "Post"
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Post::add("/api/tina4site/revision/update-to-revision", function (\Tina4\Response $response, \Tina4\Request $request) {

    //Instantiate revision model
    $selected_revision = new Tina4SitePagehistory();

    //Attempt to fetch revision entry
    $selected_revision->load("id = {$request->data->selected_revision_no}");

    //Check if revision entry exists
    if($selected_revision == null){
        //Kick back with error
        return $response (['message', 'There seems to be an error: Revision not found !'], HTTP_OK, TEXT_HTML);
    }

    //Update the current page
    $current_page = new Tina4SitePage();
    //Attempt to load a page into context
    $current_page->load("cms_page_id = '{$request->data->cms_page_id}'");
    $current_page->html = $selected_revision->html;
    $current_page->pages = $selected_revision->pages;
    $current_page->styles = $selected_revision->styles;
    $current_page->assets = $selected_revision->assets;
    //Save ORM Object
    $current_page->save();

    //Determine revision number
    $latest_revision = (new Tina4SitePagehistory())->select("revision_no",1) //the table and columns you want to select. It has to be is accordance with the Helper.
    ->where ("cms_page_id = '1'")
        ->orderBy("revision_no DESC")
        ->asArray();

    //Check if there is a valid previous revision
    if(\count($latest_revision)){
        //Add 1 to the revision counter
        $revision_no = $latest_revision[0]["revision_no"] + 1;
    } else{
        //Default to 1
        $revision_no = 1;
    }

    //Create new revision point
    $pageRevision = new Tina4SitePageHistory();
    $pageRevision->cms_page_id = $request->data->cms_page_id;
    $pageRevision->html = $selected_revision->html;
    $pageRevision->pages = $selected_revision->pages;
    $pageRevision->styles = $selected_revision->styles;
    $pageRevision->assets = $selected_revision->assets;
    $pageRevision->note = $request->data->note;
    $pageRevision->revision_no = $revision_no;
    $pageRevision->system_note = "Restored from Entry ID : " . $request->data->selected_revision_no;

    $pageRevision->created_at = date($pageRevision->DBA->dateFormat.' H:i:s');

    //Save revision ORM to database
    $pageRevision->save();

    //Build return array with success message
    $res = [
        'message'=>'Successfully updated to Revision Entry ID : ' . $request->data->selected_revision_no,
        'pages'=>$selected_revision->pages,
        'html'=>$selected_revision->html,
        'assets'=>$selected_revision->assets,
        'styles'=>$selected_revision->styles
    ];

    //Return response
    return $response ($res, HTTP_OK, TEXT_HTML);
});

/**
 * Clear revision entry by ID
 *
 * @method "Post"
 * @param $id INTEGER #ID Of the entry to be removed
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Delete::add("/api/tina4site/revision/remove-revision-entry/{id}", function ($id, \Tina4\Response $response, \Tina4\Request $request) {
    try {
        (new Tina4SitePageHistory())->delete("id=$id", "tina4site_page_history");
        $res = ["message"=> "Successfully remove Revision ID : " . $id];
    } catch (SQLiteException $e){
        $res = ["message"=>$e->getMessage()];
    }
    return $response ($res, HTTP_OK, TEXT_HTML);
});

/**
 * Clear all revisions entry by page ID
 *
 * @method "Post"
 * @param $id INTEGER #Page ID for which to clear revision history
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @param $request Tina4\Request #Request data (Unused here)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Delete::add("/api/tina4site/revision/clear-revision-history/{cms_page_id}", function ($cms_page_id, \Tina4\Response $response, \Tina4\Request $request) {
    try {
        (new Tina4SitePageHistory())->delete("cms_page_id=$cms_page_id", "tina4site_page_history");
        $res = ["message"=> "Successfully removed all related Revisions"];
    } catch (SQLiteException $e){
        $res = ["message"=>$e->getMessage()];
    }
    return $response ($res, HTTP_OK, TEXT_HTML);
});
