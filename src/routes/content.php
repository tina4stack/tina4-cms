<?php

\Tina4\Get::add("/", static function (\Tina4\Response $response, \Tina4\Request $request) {
    $site = (new SiteHelper())->getSite();
    $pageName = "home";
    $html = (new Content())->renderPage($pageName, $site->id);
    if (empty($html)) {
        return $response("", HTTP_NOT_FOUND);
    }

    return $response($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Post::add("/", static function (\Tina4\Response $response, \Tina4\Request $request) {
    $site = (new SiteHelper())->getSite();
    $pageName = "home";
    $html = (new Content())->renderPage($pageName, $site->id);
    if (empty($html)) {
        return $response("", HTTP_NOT_FOUND);
    }

    return $response($html, HTTP_OK, TEXT_HTML);
});


\Tina4\Get::add("/{pageName}~~/migrate|/swagger", static function ($pageName, \Tina4\Response $response, \Tina4\Request $request) {
    $site = (new SiteHelper())->getSite();

    //Output the sitemap
    if ($pageName == "sitemap.xml") {
        $siteMap = '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></sitemapindex>';
        if ($site->load("id = ?", [$site->id]) && $site->allowCrawlers) {
            $siteMap = (new SiteHelper())->getSiteMap();
        }

        return $response($siteMap, HTTP_OK, APPLICATION_XML);
    }

    //Output the robots
    if ($pageName == "robots.txt") {
        $robotText = "User-agent: *\nDisallow: /\n";

        if ($site->load("id = ?", [$site->id]) && $site->allowCrawlers) {
            $robotText = "User-agent: *\nDisallow: /cms/\nSitemap: {$site->siteUrl}/sitemap.xml";
        }

        return $response($robotText, HTTP_OK, TEXT_PLAIN);
    }

    $html = (new Content())->renderPage($pageName, $site->id);

    if (empty($html)) {
        return $response("", HTTP_NOT_FOUND);
    }

    return $response ($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Post::add("/{pageName}", static function ($pageName, \Tina4\Response $response, \Tina4\Request $request) {
    $site = (new SiteHelper())->getSite();

    //Output the sitemap
    if ($pageName == "sitemap.xml") {
        $siteMap = '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></sitemapindex>';
        if ($site->load("id = ?", [$site->id]) && $site->allowCrawlers) {
            $siteMap = (new SiteHelper())->getSiteMap();
        }

        return $response($siteMap, HTTP_OK, APPLICATION_XML);
    }

    //Output the robots
    if ($pageName == "robots.txt") {
        $robotText = "User-agent: *\nDisallow: /\n";

        if ($site->load("id = ?", [$site->id]) && $site->allowCrawlers) {
            $robotText = "User-agent: *\nDisallow: /cms/\nSitemap: {$site->siteUrl}/sitemap.xml";
        }

        return $response($robotText, HTTP_OK, TEXT_PLAIN);
    }

    $html = (new Content())->renderPage($pageName, $site->id);

    if (empty($html)) {
        return $response("", HTTP_NOT_FOUND);
    }

    return $response ($html, HTTP_OK, TEXT_HTML);
});


//Define a format for articles
if (!defined("TINA4_CMS_ARTICLE_PREFIX")) {
    define("TINA4_CMS_ARTICLE_PREFIX", "articles");
}

if (!defined("TINA4_CMS_ARTICLES_FORMAT")) {
    define("TINA4_CMS_ARTICLES_FORMAT", "/".TINA4_CMS_ARTICLE_PREFIX."/{year}/{month}/{slug}");
}

\Tina4\Get::add(TINA4_CMS_ARTICLES_FORMAT, static function($year, $month, $slug, \Tina4\Response $response, \Tina4\Request $request) {
    $site = (new SiteHelper())->getSite();

    $html = (new Content())->renderArticle($year, $month, $slug, $site->id);

    if (empty($html)) {
        return $response("", HTTP_NOT_FOUND);
    }

    return $response ($html, HTTP_OK, TEXT_HTML);
});

//Gets a single article based on the slug
\Tina4\Get::add(TINA4_CMS_ARTICLE_PREFIX."/{slug}", static function($slug, \Tina4\Response $response, \Tina4\Request $request) {
    $site = (new SiteHelper())->getSite();

    $html = (new Content())->renderArticle("", "", $slug, $site->id);

    if (empty($html)) {
        return $response("", HTTP_NOT_FOUND);
    }

    return $response ($html, HTTP_OK, TEXT_HTML);
});

//Gets an article list of articles based on category
\Tina4\Get::add(TINA4_CMS_ARTICLE_PREFIX."/categories/{category}", static function($category, \Tina4\Response $response, \Tina4\Request $request) {

});

//Gets an article list of articles based on tag
\Tina4\Get::add(TINA4_CMS_ARTICLE_PREFIX."/tags/{tag}", static function($category, \Tina4\Response $response, \Tina4\Request $request) {

});


