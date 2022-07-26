<?php

/**
 * File browser
 */
\Tina4\Get::add("/cms/file-browser",function (\Tina4\Response $response, \Tina4\Request $request) {
    $files = \Tina4\Utilities::iterateDirectory("./uploads", "", "onclick=\"previewFile($(this).attr('file-data'))\"");
    return $response(\Tina4\renderTemplate("admin/file-browser.twig", ["files" => $files]));
});

\Tina4\Post::add("/cms/upload", function (\Tina4\Response $response, \Tina4\Request $request) {

    //Add the image to a nice path
    $imageFolder = "./uploads/".date("Y")."/".date("F");
    if (! file_exists($imageFolder) && !mkdir($imageFolder, 0777, true) && !is_dir($imageFolder)) {
        //throw new \RuntimeException(sprintf('Directory "%s" was not created', $imageFolder));
        return $response(["location" => "error creating folder"]);
    }
    $temp = current($_FILES);

    // Sanitize input
    if (preg_match("/([^\w\s\d\-_~,;:\[\]\(\).])|([\.]{2,})/", $temp['name'])) {
        header("HTTP/1.1 400 Invalid file name.");
        return null;
    }

    // Verify extension
    if (!in_array(strtolower(pathinfo($temp['name'], PATHINFO_EXTENSION)), array("gif", "jpg", "png", "jpeg", "svg"))) {
        header("HTTP/1.1 400 Invalid extension.");
        return null;
    }

    // Accept upload if there was no origin, or if it is an accepted origin
    $fileToWrite = $imageFolder . "/". $temp['name'];
    move_uploaded_file($temp['tmp_name'], $fileToWrite);
    return $response (["location" => str_replace("./uploads", "", $fileToWrite)]);
});


\Tina4\Get::add("/cms/login", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number")->asArray();
    $twigNameSpace = (new Content())->getTwigNameSpace();

    if ((int)$users[0]["number"] === 0) {
        return $response(\Tina4\renderTemplate($twigNameSpace."/admin/setup.twig", ["twigNameSpace" => $twigNameSpace]));
    } else {
        return $response(\Tina4\renderTemplate($twigNameSpace."/admin/login.twig", ["twigNameSpace" => $twigNameSpace]));
    }
});

\Tina4\Get::add("/cms/login/reset", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number")->asObject()[0];
    $twigNameSpace = (new Content())->getTwigNameSpace();
    if ($users->number === 0) {
        return $response(\Tina4\renderTemplate($twigNameSpace."/admin/setup.twig", ["twigNameSpace" => $twigNameSpace]));
    } else {
        return $response(\Tina4\renderTemplate($twigNameSpace."/admin/reset.twig", ["twigNameSpace" => $twigNameSpace]));
    }
});


\Tina4\Post::add("/cms/login/reset", function (\Tina4\Response $response, \Tina4\Request  $request) {
    $twigNameSpace = (new Content())->getTwigNameSpace();
    $website = new Site();
    if ($website->load("id = 1")) {

        if (!empty($website->smtpServer)) {
            $messengerSettings = new \Tina4\MessengerSettings(true);
            $messengerSettings->smtpServer = $website->smtpServer;
            $messengerSettings->smtpUsername = $website->smtpUsername;
            $messengerSettings->smtpPassword = $website->smtpPassword;
            $messengerSettings->smtpPort = (int)$website->smtpPort;
        } else {
            $messengerSettings = new \Tina4\MessengerSettings(false);
        }

        $user = new Users(); //use ORM to load a user with email
        $messenger = new \Tina4\Messenger($messengerSettings);
        if ($user->load("email = '{$request->params["email"]}' and reset_token = ''")) { //if i can load the user with this email
            //reset the password
            $user->resetToken = md5(date("Y-m-d-H-i-s") . "{$user->id}");
            $user->save();

            $recipients[] = ["name" => $user->firstName." ".$user->lastName, "email" => $user->email];
            //send email with token so the user can input a new password!)
            if ($messenger->sendEmail($recipients, "Reset password {$website->siteName} ({$user->email})", ["template" => $twigNameSpace."/email/reset-token.twig", "data" => ["user" => $user->asArray(), "website" => $website->asArray()]], $website->siteName, $website->fromEmail)) {
                \Tina4\redirect("/cms/login?error=Please check your email for a reset link");
            } else {
                \Tina4\redirect("/cms/login?error=Error could not send user a reset link");
            }
        } else {
            if ($user->load("email = '{$request->params["email"]}'")) {
                //resend the reset token ??
                $recipients[] = ["name" => $user->firstName." ".$user->lastName, "email" => $user->email];

                //send email with token so the user can input a new password!)
                $result = $messenger->sendEmail($recipients, "Reset password {$website->siteName} ({$user->email})", ["template" => $twigNameSpace."/email/reset-token.twig", "data" => ["user" => $user->asArray(), "website" => $website->asArray()]], $website->siteName, $website->fromEmail);

                if ($result == 1) {
                    \Tina4\redirect("/cms/login?error=Please check your email for a reset link, we have resent it to your email address!");
                }
            }
            \Tina4\redirect("/cms/login?error=Reset password error, user not found or reset token exists");
        }
    } else {
        \Tina4\redirect("/cms/login?error=No website found");
    }
});


\Tina4\Get::add("/cms/login/reset-confirm/{resetToken}", function($resetToken, \Tina4\Response $response, \Tina4\Request  $request) {
    $user = new Users();
    if ($user->load("reset_token = '{$resetToken}'")) {
        $twigNameSpace = (new Content())->getTwigNameSpace();
        //display reset password screen
        return $response(\Tina4\renderTemplate($twigNameSpace."/admin/confirmReset.twig", ["twigNameSpace" => $twigNameSpace, "user" => $user->asArray()]));
    }
      else {
          \Tina4\redirect("/cms/login?error=Token has expired");
      }
});

\Tina4\Post::add("/cms/login/reset-confirm/{resetToken}", static function($resetToken, \Tina4\Response $response, \Tina4\Request $request) {
    $user = new Users();
    if ($user->load("reset_token = '{$resetToken}'")) {
        $user->resetToken = "";
        $user->password = password_hash($request->params["newPassword"], PASSWORD_BCRYPT);
        $user->save();
        \Tina4\redirect("/cms/login?error=Password changed successfully");
    }
    else {
        \Tina4\redirect("/cms/login?error=Token has expired");
    }
});

\Tina4\Get::add("/cms/dashboard", function (\Tina4\Response $response) {
    $users = (new Users())->select("count(id) as number");
    $twigNameSpace = (new Content())->getTwigNameSpace();
    if (empty($users)) {
        return $response(\Tina4\renderTemplate($twigNameSpace."/admin/setup.twig", ["twigNameSpace" => $twigNameSpace]));
    } else {
        $menuItems = (new Content())->getCmsMenus();
        return $response(\Tina4\renderTemplate($twigNameSpace."/admin/dashboard.twig", ["menuItems" => $menuItems , "twigNameSpace" => $twigNameSpace]));
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
                \Tina4\redirect("/cms/login?error=Invalid password");
            }
        } else {
            \Tina4\redirect("/cms/login?error=Invalid email address or password");
        }
    }
    return null;
});

\Tina4\Get::add("/cms/logout", function (\Tina4\Response $response, \Tina4\Request $request) {
    session_destroy();
    session_write_close();

    \Tina4\redirect("/cms/login");

    return null;
});

