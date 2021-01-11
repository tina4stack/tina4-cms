<?php

\Tina4\Get::add("/", function (\Tina4\Response $response, \Tina4\Request $request) {
    $pageName = "home";
    $content = (new Content())->getPage($pageName);

    $pageMeta = (new Content())->getPageMeta($pageName);
    if (!file_exists("./src/assets/images/og-{$pageName}.png")) {
      if (!empty($pageMeta->image)) {
          $image = "https://".$_SERVER["HTTP_HOST"]."/src/assets/images/og-{$pageName}.png";
          file_put_contents("./src/assets/images/og-{$pageName}.png", base64_decode($pageMeta->image));
      } else {
          $image = null;
      }
    } else {
        $image = "https://".$_SERVER["HTTP_HOST"]."/src/assets/images/og-{$pageName}.png";
    }
    $html = \Tina4\renderTemplate("content.twig", ["content" => $content, "pageName" => $pageName, "title" => $pageMeta->title, "image" => $image , "description" => $pageMeta->description, "keywords" => $pageMeta->keywords]);

    return $response ($html, HTTP_OK, TEXT_HTML);
});


\Tina4\Get::add("/content/{pageName}", function ($pageName, \Tina4\Response $response, \Tina4\Request $request) {

    $content = (new Content())->getPage($pageName);


    $pageMeta = (new Content())->getPageMeta($pageName);
    if (!file_exists("./src/assets/images/og-{$pageName}.png")) {
        if (!empty($pageMeta->image)) {
            $image = "https://".$_SERVER["HTTP_HOST"]."/src/assets/images/og-{$pageName}.png";
            file_put_contents("./src/assets/images/og-{$pageName}.png", base64_decode($pageMeta->image));
        } else {
            $image = null;
        }
    } else {
        $image = "https://".$_SERVER["HTTP_HOST"]."/src/assets/images/og-{$pageName}.png";
    }
    $html = \Tina4\renderTemplate("content.twig", ["content" => $content, "pageName" => $pageName, "title" => $pageMeta->title, "image" => $image , "description" => $pageMeta->description, "keywords" => $pageMeta->keywords]);
    return $response ($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Get::add("/content/article/{slug}", function ($slug, \Tina4\Response $response, \Tina4\Request $request) {
  $content = (new Content())->getArticle($slug);
  $articleMeta = (new Content())->getArticleMeta($slug);

  if (!file_exists("./src/assets/images/og-{$slug}.png")) {
    if (!empty($articleMeta->image)) {
      $image = "https://".$_SERVER["HTTP_HOST"]."/src/assets/images/og-{$slug}.png";
      file_put_contents("./src/assets/images/og-{$slug}.png", base64_decode($articleMeta->image));
    } else {
        $image =  null;
    }
  } else {
      $image = "https://".$_SERVER["HTTP_HOST"]."/src/assets/images/og-{$slug}.png";
  }
  $html = \Tina4\renderTemplate("content.twig", ["content" => $content, "article" => $articleMeta, "pageName" => $articleMeta->title, "title" => $articleMeta->title, "image" => $image , "description" => $articleMeta->description, "keywords" => $articleMeta->keywords]);
  return $response ($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Get::add("/content/tags/{tag}", function ($tag, \Tina4\Response $response, \Tina4\Request $request) {

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

    $content = \Tina4\renderTemplate( $snippet, ["articles" => $articles, "tag" => $tag, "limit" => $limit, "skip" => $skip , "template" => $template] );

    if (isset($request->params["return"])) {
        return $response ($content, HTTP_OK, TEXT_HTML);
    }


    $html = \Tina4\renderTemplate("content.twig", ["content" => $content, "pageName" => "Articles tagged with {$tag}", "title" => "Articles tagged with {$tag}", "description" => "Articles tagged with {$tag}", "keywords" => $tag]);
    return $response ($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Get::add("/content/categories/{category}", function ($category, \Tina4\Response $response, \Tina4\Request $request) {
    $content = (new Content())->getArticlesByCategory($category);

    $html = \Tina4\renderTemplate("content.twig", ["content" => $content, "pageName" => "Articles tagged with {$tag}", "title" => "Articles tagged with {$tag}", "description" => "Articles tagged with {$tag}", "keywords" => $tag]);
    return $response ($html, HTTP_OK, TEXT_HTML);
});


