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
 * Asset listing  ( CSS )
 *
 * @method "GET"
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/api/tina4site/assets/css", function (\Tina4\Response $response, \Tina4\Request $request){
$components = ((new Tina4SiteAsset())->select("url")->where("type = 'CSS' AND enabled = 'on'")->jsonSerialize());
return $response ($components, HTTP_OK, TEXT_HTML);
});

/**
 * Asset listing  ( Javascript )
 *
 * @method "GET"
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::add("/api/tina4site/assets/javascript", function (\Tina4\Response $response, \Tina4\Request $request){
    $components = ((new Tina4SiteAsset())->select("url")->where("type = 'Javascript' AND enabled = 'on'")->jsonSerialize());
    return $response ($components, HTTP_OK, TEXT_HTML);
});
