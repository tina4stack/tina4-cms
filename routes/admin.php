<?php

\Tina4\Post::add("/cms/upload", function (\Tina4\Response $response, \Tina4\Request $request) {

    //Add the image to a nice path
    $imageFolder = "./uploads".DIRECTORY_SEPARATOR.date("Y".DIRECTORY_SEPARATOR."F");
    if (! file_exists($imageFolder) && !mkdir($imageFolder, 0777, true) && !is_dir($imageFolder)) {
        //throw new \RuntimeException(sprintf('Directory "%s" was not created', $imageFolder));
        return $response(["location" => "error creating folder"]);
    }
    $temp = current($_FILES);

    // Sanitize input
    if (preg_match("/([^\w\s\d\-_~,;:\[\]\(\).])|([\.]{2,})/", $temp['name'])) {
        header("HTTP/1.1 400 Invalid file name.");
        return;
    }

    // Verify extension
    if (!in_array(strtolower(pathinfo($temp['name'], PATHINFO_EXTENSION)), array("gif", "jpg", "png"))) {
        header("HTTP/1.1 400 Invalid extension.");
        return;
    }

    // Accept upload if there was no origin, or if it is an accepted origin
    $fileToWrite = $imageFolder . $temp['name'];
    move_uploaded_file($temp['tmp_name'], $fileToWrite);


    return $response (["location" => str_replace("./uploads", "", $fileToWrite)]);

});


\Tina4\Get::add("/cms/login", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number")->asArray();

    if ((int)$users[0]["number"] === 0) {

        return (\Tina4\renderTemplate("@tina4cms/admin/setup.twig"));
    } else {
        return (\Tina4\renderTemplate("@tina4cms/admin/login.twig"));
    }
});

\Tina4\Get::add("/cms/login/reset", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number")->asObject()[0];
    if ($users->number === 0) {
        return (\Tina4\renderTemplate("@tina4cms/admin/setup.twig"));
    } else {
        return (\Tina4\renderTemplate("@tina4cms/admin/reset.twig"));
    }
});

\Tina4\Get::add("/cms/dashboard", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number");
    if (empty($users)) {
        return (\Tina4\renderTemplate("@tina4cms/admin/setup.twig"));
    } else {
        return (\Tina4\renderTemplate("@tina4cms/admin/dashboard.twig"));
    }
});



\Tina4\Post::add("/cms/login", function (\Tina4\Response $response, \Tina4\Request $request) {
    if (!empty($request->params["confirmPassword"])) {
        $user = new Users($request->params);

        if (!$user->load("email = '{$request->params["email"]}'")) {
            $user->isActive = 1;
            $user->password = password_hash($user->password, PASSWORD_BCRYPT);
            $user->save();
            \Tina4\redirect("/cms/dashboard");
        } else {

            \Tina4\redirect("/cms/login");
        }
    } else {
        $user = new Users();
        //perform login
        if ($user->load("email = '{$request->params["email"]}'")) {
            if (password_verify($request->params["password"],$user->password)) {
                $_SESSION["user"] = $user->asArray();
                \Tina4\redirect("/cms/dashboard");
            } else {
                \Tina4\redirect("/cms/login?error=true");
            }
        } else {
            \Tina4\redirect("/cms/login?error=true");
        }
    }
});

\Tina4\Get::add("/cms/logout", function (\Tina4\Response $response, \Tina4\Request $request) {


    session_destroy();
    session_write_close();

    \Tina4\redirect("/cms/login");
});

