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
    return $response($html, HTTP_OK, TEXT_HTML);
});

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
        $siteMap = (new Content())->getSiteMap();
    }

    return $response($siteMap, HTTP_OK, APPLICATION_XML);
});


\Tina4\Get::add("/content/{pageName}", static function ($pageName, \Tina4\Response $response, \Tina4\Request $request) {
    if (isset($request->session["siteId"]) && !empty($request->session["siteId"]))
    {
        $siteId = $request->session["siteId"];
    } else {
        $siteId = 1;
    }


    $html = (new Content())->renderPage($pageName, $siteId);
    return $response ($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Get::add("/content/article/{slug}", function ($slug, \Tina4\Response $response, \Tina4\Request $request) {
    if (isset($request->session["siteId"]) && !empty($request->session["siteId"]))
    {
        $siteId = $request->session["siteId"];
    } else {
        $siteId = 1;
    }

    $content = (new Content())->getArticle($slug);
    $articleMeta = (new Content())->getArticleMeta($slug);

    if (!file_exists("./cache/images/og-{$slug}.png")) {
        if (!empty($articleMeta->image)) {
            $image = "https://" . $_SERVER["HTTP_HOST"] . "/cache/images/og-{$slug}.png";
            file_put_contents("./cache/images/og-{$slug}.png", base64_decode($articleMeta->image));
        } else {
            $image = null;
        }
    } else {
        $image = "https://" . $_SERVER["HTTP_HOST"] . "/cache/images/og-{$slug}.png";
    }

    $template = "content.twig";
    $site = new Site();
    if ($site->load("id = ?", [$siteId]) && !empty($site->theme)) {
        $template = "themes/{$site->theme}/page.twig";
    }

    $html = \Tina4\renderTemplate($template, ["site" => $site, "content" => $content, "article" => $articleMeta, "pageName" => $articleMeta->title, "title" => $articleMeta->title, "image" => $image, "description" => $articleMeta->description, "keywords" => $articleMeta->keywords]);
    return $response ($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Get::add("/content/tags/{tag}", function ($tag, \Tina4\Response $response, \Tina4\Request $request) {
    if (isset($request->session["siteId"]) && !empty($request->session["siteId"]))
    {
        $siteId = $request->session["siteId"];
    } else {
        $siteId = 1;
    }

    if (!isset($request->params["limit"])) {
        $limit = 4;
    } else {
        $limit = $request->params["limit"];
    }

    if (!isset($request->params["skip"])) {
        $skip = 0;
    } else {
        $skip = $request->params["skip"];
    }

    if (!isset($request->params["template"])) {
        $template = "medium.twig";
    } else {
        $template = $request->params["template"];
    }

    $articles = (new Content())->getArticlesByTag($tag, $limit, $skip);

    $snippet = '{% if (skip == 0) %}
<div class="col-md-12">
<h1>
    Articles by {{tag}}
</h1>    
</div>
{% endif %}
{% if template %}
{% for article in articles %} {% include "snippets/" ~ template  with {\'article\': article} %} {% endfor %}
{% else %}
{% for article in articles %} {% include "snippets/medium.twig" with {\'article\': article} %} {% endfor %}
{% endif %}
{% if (skip == 0) %}
{% include "load-more.twig" %}
{% endif %}';

    $content = \Tina4\renderTemplate($snippet, ["articles" => $articles, "tag" => $tag, "limit" => $limit, "skip" => $skip, "template" => $template]);

    if (isset($request->params["return"])) {
        return $response ($content, HTTP_OK, TEXT_HTML);
    }

    $template = "content.twig";
    $site = new Site();
    if ($site->load("id = ?", [$siteId]) && !empty($site->theme)) {
        $template = "themes/{$site->theme}/page.twig";
    }

    $html = \Tina4\renderTemplate($template, ["site" => $site, "content" => $content, "pageName" => "Articles tagged with {$tag}", "title" => "Articles tagged with {$tag}", "description" => "Articles tagged with {$tag}", "keywords" => $tag]);
    return $response ($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Get::add("/content/categories/{category}", function ($category, \Tina4\Response $response, \Tina4\Request $request) {
    if (isset($request->session["siteId"]) && !empty($request->session["siteId"]))
    {
        $siteId = $request->session["siteId"];
    } else {
        $siteId = 1;
    }

    $content = (new Content())->getArticlesByCategory($category);

    $template = "content.twig";
    $site = new Site();
    if ($site->load("id = ?", [$siteId]) && !empty($site->theme)) {
        $template = "themes/{$site->theme}/page.twig";
    }

    $html = \Tina4\renderTemplate($template, ["site" => $site, "content" => $content, "pageName" => "Articles tagged with {$category}", "title" => "Articles tagged with {$category}", "description" => "Articles tagged with {$category}", "keywords" => $category]);

    return $response ($html, HTTP_OK, TEXT_HTML);
});


