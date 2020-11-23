<?php

\Tina4\Get::add("/cms/login", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number");

    if (empty($users)) {
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
                error_log("try");
                $_SESSION["user"] = $user->asArray();
                error_log(print_r ($_SESSION,1));
                \Tina4\redirect("/cms/dashboard");
            } else {
                \Tina4\redirect("/cms/login?error=true");
            }
        }
    }
});

\Tina4\Get::add("/cms/logout", function (\Tina4\Response $response, \Tina4\Request $request) {


    session_destroy();
    session_write_close();

    \Tina4\redirect("/cms/login");
});

