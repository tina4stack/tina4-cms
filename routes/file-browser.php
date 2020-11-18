<?php

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
        $filename = (new Content())->getSlug(implode('_', $filename));
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
