<?php


\Tina4\Get::add("robots.txt", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (isset($request->session["siteId"]) && !empty($request->session["siteId"]))
    {
        $siteId = $request->session["siteId"];
    } else {
        $siteId = 1;
    }

    $robotText = "User-agent: *\nDisallow: /\n";
    $site = new Site();
    if ($site->load("id = ?", [$siteId]) && $site->allowCrawlers) {
        $robotText = "User-agent: *\nDisallow: /cms/\nSitemap: {$site->siteUrl}/sitemap.xml";
    }

    return $response($robotText, HTTP_OK, TEXT_PLAIN);
});

\Tina4\Get::add("sitemap.xml", static function (\Tina4\Response $response, \Tina4\Request $request) {
    if (isset($request->session["siteId"]) && !empty($request->session["siteId"]))
    {
        $siteId = $request->session["siteId"];
    } else {
        $siteId = 1;
    }

    $siteMap = '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></sitemapindex>';
    $site = new Site();
    if ($site->load("id = ?", [$siteId]) && $site->allowCrawlers) {
        $siteMap = (new SiteHelper())->getSiteMap();
    }

    return $response($siteMap, HTTP_OK, APPLICATION_XML);
});