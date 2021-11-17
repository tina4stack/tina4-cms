<?php
/**
 * PHPMD supress import warnings
 *
 * @SuppressWarnings(PHPMD.MissingImport)
 * @SuppressWarnings(PHPMD.Superglobals)
 * @SuppressWarnings(PHPMD.StaticAccess)
 */

class UserHelper extends \Tina4\Data
{
    public function sendPasswordReset($email)
    {
        /* send email */
        $settings = new \Tina4\MessengerSettings(true);
        $settings->smtpUsername = EMAIL_USERNAME;
        $settings->smtpPassword = EMAIL_PASSWORD;
        $settings->smtpServer = EMAIL_HOSTNAME;

        $user = new Users();
        if ($user->load("email = '" . $email . "'")) {
            $user->verifyToken = md5($user->email . time());
            $user->save();

            $recipients = [];
            //Add recipients
            $recipients[] = ["name" => $user->name, "email" => $email];

            //expects a twig template in templates/messenger/message.twig
            try {
                (new \Tina4\Messenger($settings))->sendEmail(
                    $recipients, //Recipients
                    "A link to reset Your password has been sent to your email address. Plesse follow r", //Subject
                    ["template" => "vendor/tina4stack/tina4cms/src/templates/admin/reset.twig",
                        "data" => ["user" => $user, "verifyLink" => HOSTNAME . "/reset-password?t=" . $user->verifyToken]
                    ],
                    "Tina4CMS", //From name
                    EMAIL_USERNAME, //From email address
                    null, //attachments
                    null //Bcc - same form as recipients
                );
                return true;
            } catch (\Exception $e) {
                \Tina4\DebugLog::message($e);
            }
        }
        return false;
    }
}
