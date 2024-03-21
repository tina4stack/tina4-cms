<?php

\Tina4\Get::add("/", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (isset($request->session["siteId"]) && !empty($request->session["siteId"]))
    {
        $siteId = $request->session["siteId"];
    } else {
        $siteId = 1;
    }

    $pageName = "home";

    $html = (new Content())->renderPage($pageName, $siteId);
    if (empty($html)) {
        return $response("", HTTP_NOT_FOUND);
    }

    return $response($html, HTTP_OK, TEXT_HTML);
});


\Tina4\Get::add("/{pageName}", static function ($pageName, \Tina4\Response $response, \Tina4\Request $request) {
    if (isset($request->session["siteId"]) && !empty($request->session["siteId"]))
    {
        $siteId = $request->session["siteId"];
    } else {
        $siteId = 1;
    }

    $html = (new Content())->renderPage($pageName, $siteId);

    if (empty($html)) {
        return $response("", HTTP_NOT_FOUND);
    }

    return $response ($html, HTTP_OK, TEXT_HTML);
});



