<?php

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */


class Site extends \Tina4\ORM
{
    public $tableName="site";
    public $primaryKey = "id";

    public $id;
    public $siteName;
    public $siteUrl;
    public $description;
    public $google;
    public $bing;
    public $twitter;
    public $custom;
    public $fromEmail;
    public $smtpPort;
    public $smtpUsername;
    public $smtpPassword;
    public $smtpServer;
    public $dateCreated;
    public $dateModified;
    public $allowCrawlers;
}