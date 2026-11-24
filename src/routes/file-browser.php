<?php
/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

/**
 * @secure
 */
\Tina4\Get::add("/content/file/browse", function(\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    $files = Content::iterateDirectory("./uploads");

    $html = \Tina4\renderTemplate("file-browser.twig", ["files" => $files]);

    return $response ($html, HTTP_OK, TEXT_HTML);
});

\Tina4\Post::add("/content/file/upload", function(\Tina4\Response $response, \Tina4\Request $request) {
    if (empty($_SESSION["user"])) {
        return $response("No Auth", HTTP_UNAUTHORIZED);
    }

    if (!file_exists('./uploads')) {
        if (!mkdir('./uploads', 0755, true) && !is_dir('./uploads')) {
            throw new \RuntimeException(sprintf('Directory "%s" was not created', './uploads'));
        }
    }

    $result = (object)[];
    foreach ($_FILES as $name => $file) {
        // Refuse anything that is not an allow-listed, non-executable asset type.
        // Without this, a file named e.g. "shell.php" is written into the
        // web-reachable ./uploads/ directory and executed by the web server (RCE).
        if (!Content::isAllowedUploadExtension($file["name"])) {
            $result->uploaded = 0;
            $result->fileName = $file["name"];
            $result->error = (object)["message" => "File type not allowed"];
            continue;
        }

        $parts = explode(".", $file["name"]);
        $extension = strtolower((string) array_pop($parts));
        $filename = (new Content())->getSlug(implode('_', $parts));
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
