<?php

class SiteHelper
{
    /**
     * Returns a site map array
     * @return array[]
     * @throws ReflectionException
     */
    public function getSiteMap(): array
    {
        $urls = [];

        $site = new Site();
        if ($site->load("id = 1")) {
            $pages = (new Page())->select("*", 10000)->where("is_published = 1")->asObject();

            /**
             * @var Page $page
             */
            foreach ($pages as $pId => $page) {
                $locs = ["loc" => $site->siteUrl . "/content/" . $page->slug, "lastmod" => str_replace(" ", "T", $page->dateModified ?? "") . "+00:00"];

                if (!empty($page->image)) {
                    if (!file_exists("./cache/images/og-{$page->slug}.png")) {
                        file_put_contents("./cache/images/og-{$page->slug}.png", base64_decode($page->image));
                    }
                    $image = $site->siteUrl . "/cache/images/og-{$page->slug}.png";
                    $locs["image:image"] = ["image:loc" => $image];
                }

                $urls[] = ["url" => $locs];
            }

            $articles = (new Article())->select("*", 10000)->where("is_published = 1")->asObject();

            /**
             * @var Article $article
             */
            foreach ($articles as $aId => $article) {
                $locs = ["loc" => $site->siteUrl . "/content/article/" . $article->slug, "lastmod" => str_replace(" ", "T", $article->publishedDate ?? "") . "+00:00"];
                if (!empty($article->image)) {
                    if (!file_exists("./cache/images/article-{$article->slug}.png")) {
                        $image = $site->siteUrl . "/cache/images/article-{$article->slug}.png";
                        file_put_contents("./cache/images/article-{$article->slug}.png", base64_decode($article->image));
                    }
                    $image = $site->siteUrl . "/cache/images/article-{$article->slug}.png";
                    $locs["image:image"] = ["image:loc" => $image];
                }

                $urls[] = ["url" => $locs];
            }

        }

        return ['urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' => $urls];
    }

    /**
     * Gets the data for the current site
     * @return Site|null
     */
    public function getSite(): ?Site
    {
        if (!empty($_SESSION["siteId"]))
        {
            $siteId = $_SESSION["siteId"];
        } else {
            $siteId = 1;
        }

        $site = new Site();
        if ($site->load("id = ?", [$siteId])) {
            return $site;
        }

        return null;
    }

    /**
     * Gets all the sites
     * @return array
     * @throws ReflectionException
     */
    public function getSites(): array
    {
        $site = new Site();
        return $site->select("*", 10000)->asArray();
    }
}