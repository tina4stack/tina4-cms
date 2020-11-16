<?php

\Tina4\Get::add("/", function (\Tina4\Response $response, \Tina4\Request $request) {
    $pageName = "home";
    $content = (new Content())->getPage($pageName);

    $pageMeta = (new Content())->getPageMeta($pageName);
    if (!file_exists("./src/assets/images/og-{$pageName}.png")) {
      if ($pageMeta->image) {
        file_put_contents("./src/assets/images/og-{$pageName}.png", base64_decode($pageMeta->image));
      }
    }
    $html = \Tina4\renderTemplate("content.twig", ["content" => $content, "pageName" => $pageName, "title" => $pageMeta->title, "image" => "https://".$_SERVER["HTTP_HOST"]."/src/assets/images/og-{$pageName}.png" , "description" => $pageMeta->description, "keywords" => $pageMeta->keywords]);

    return $response ($html, HTTP_OK, TEXT_HTML);
});


\Tina4\Get::add("/content/{pageName}", function ($pageName, \Tina4\Response $response, \Tina4\Request $request) {
    $content = (new Content())->getPage($pageName);
    $pageMeta = (new Content())->getPageMeta($pageName);
    if (!file_exists("./src/assets/images/og-{$pageName}.png")) {
      if ($pageMeta->image) {
        file_put_contents("./src/assets/images/og-{$pageName}.png", base64_decode($pageMeta->image));
      }
    }
    $html = \Tina4\renderTemplate("content.twig", ["content" => $content, "pageName" => $pageName, "title" => $pageMeta->title, "image" => "https://".$_SERVER["HTTP_HOST"]."/src/assets/images/og-{$pageName}.png" , "description" => $pageMeta->description, "keywords" => $pageMeta->keywords]);
    return $response ($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Get::add("/content/article/{slug}", function ($slug, \Tina4\Response $response, \Tina4\Request $request) {
  $content = (new Content())->getArticle($slug);
  $articleMeta = (new Content())->getArticleMeta($slug);
  if (!file_exists("./src/assets/images/og-{$slug}.png")) {
    if ($articleMeta->image) {
      file_put_contents("./src/assets/images/og-{$slug}.png", base64_decode($articleMeta->image));
    }
  }
  $html = \Tina4\renderTemplate("content.twig", ["content" => $content, "pageName" => $articleMeta->name, "title" => $articleMeta->title, "image" => "https://".$_SERVER["HTTP_HOST"]."/src/assets/images/og-{$slug}.png" , "description" => $articleMeta->description, "keywords" => $articleMeta->keywords]);
  return $response ($html, HTTP_OK, TEXT_HTML);
});



\Tina4\Get::add("/content/file/browse", function(\Tina4\Response $response, \Tina4\Request $request) {
    $files = Content::iterateDirectory("./uploads");

    $html = \Tina4\renderTemplate("file-browser.twig", ["files" => $files]);

    return $response ($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Post::add("/content/file/upload", function(\Tina4\Response $response, \Tina4\Request $request) {
    if (!file_exists('./uploads')) {
        if (!mkdir('./uploads', 0755, true) && !is_dir('./uploads')) {
            throw new \RuntimeException(sprintf('Directory "%s" was not created', './uploads'));
        }
    }

    $result = (object)[];
    foreach ($_FILES as $name => $file) {
        $filename = explode(".", $file["name"]);
        $extension = array_pop($filename);
        $filename = (new Content())->slug(implode('_', $filename));
        if (move_uploaded_file($file["tmp_name"], "./uploads/{$filename}.{$extension}")) {
            $result->uploaded = 1;
            $result->fileName = $filename;
            $result->url = "/uploads/{$filename}.{$extension}";
        } else {
            $result->uploaded = 0;
            $result->fileName = $filename;
            $result->url = "/uploads/{$filename}.{$extension}";
            $result->error = (object)["message"=> "Could not upload the file!"];
        }
    }

    return $response ($result, HTTP_OK, APPLICATION_JSON);
});
