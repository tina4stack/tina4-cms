<?php

\Tina4\Get::add("/cms/login", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number")->asObject()[0];
    if ($users->number === 0) {
        return (\Tina4\renderTemplate("@tina4css/admin/setup.twig"));
    } else {
        return (\Tina4\renderTemplate("@tina4css/admin/login.twig"));
    }
});

\Tina4\Get::add("/cms/login/reset", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number")->asObject()[0];
    if ($users->number === 0) {
        return (\Tina4\renderTemplate("@tina4css/admin/setup.twig"));
    } else {
        return (\Tina4\renderTemplate("@tina4css/admin/reset.twig"));
    }
});

\Tina4\Get::add("/cms/dashboard", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number")->asObject()[0];
    if ($users->number === 0) {
        return (\Tina4\renderTemplate("@tina4css/admin/setup.twig"));
    } else {
        return (\Tina4\renderTemplate("@tina4css/admin/dashboard.twig"));
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
        }
    }
});

\Tina4\Get::add("/cms/logout", function (\Tina4\Response $response, \Tina4\Request $request) {
    session_destroy();
    \Tina4\redirect("/cms/login");
});

