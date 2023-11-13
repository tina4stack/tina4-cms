<?php

use Tina4\Config;
use Tina4\Data;

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */
class Content extends Data
{
    private $twigNamespace = "@tina4cms";

    /**
     * Set security attribute
     * @param $name
     * @param $options
     * @param string $category
     * @param int $roleId
     * @return void
     * @throws Exception|\Psr\Cache\InvalidArgumentException
     */
    public function setSecurityAttribute($name, $options, string $category = null, int $roleId = 1)
    {
        $category = $category ?? "Default";
        $role = new Role();
        if ($role->load("id = {$roleId}")) {
            $roleData = unserialize($role->roleInfo);
            $roleData["roles"][$name] = array_merge($options, compact('category'));
            $roleData["category"][$category][$name] = array_merge($options, ["category" => $category]);
        } else {

            $roleData = [];
            $roleData["roles"][$name] = array_merge($options, compact('category'));
            $roleData["category"][$category][$name] = array_merge($options, compact('category'));

            $role->id = $roleId;
            $role->name = "Default";
        }
        $role->roleInfo = serialize($roleData);
        $role->save();
    }

    /**
     * Get security attribute
     * @param string|null $name
     * @param int|null $roleId
     * @return mixed|void
     */
    public function getSecurityAttribute(string $name = null, int $roleId = null)
    {
        $name = $name ?? "";
        $roleId = $roleId ?? 1;
        $role = new Role();
        if ($role->load("id = {$roleId}")) {
            $roles = unserialize($role->roleInfo);

            if (!empty($name)) {
                if (isset($roles["roles"])) {
                    return $roles["roles"][$name];
                } else {
                    return $roles[$name];
                }
            } else {
                if (isset($roles["category"])) {
                    return $roles["category"];
                } else {
                    return $roles;
                }
            }
        }
    }

    /**
     * Get a different twig name space for changing dashboard and other screens
     * @return string
     */
    public function getTwigNameSpace(): string
    {
        if (defined("CMS_TWIG_NAMESPACE")) {
            if (!empty(CMS_TWIG_NAMESPACE)) {
                return CMS_TWIG_NAMESPACE;
            } else {
                return "@__main__";
            }
        } else {
            return $this->twigNamespace;
        }
    }

    /**
     * Add CMS menu
     * @param string|null $href
     * @param string $caption
     */
    public function addCmsMenu(string $href = null, string $caption = ""): void
    {
        $href = $href ?? "";
        global $TINA4_CMS_MENU_ITEMS;
        $TINA4_CMS_MENU_ITEMS[] = compact('href', 'caption');
    }

    /**
     * Get CMS menus
     * @return array
     * @tests
     *   assert is_array() === true, "Result must be an array"
     */
    public function getCmsMenus(): array
    {
        global $TINA4_CMS_MENU_ITEMS;

        if (empty($TINA4_CMS_MENU_ITEMS)) {
            $TINA4_CMS_MENU_ITEMS = [];
        }
        return $TINA4_CMS_MENU_ITEMS;
    }


    /**
     * Create a slug from the title
     * @param string $title
     * @param string $separator
     * @return String
     */
    public function getSlug(string $title, string $separator = '-'): string
    {
        if (empty($title)) {
            return "";
        }
        // lower string
        $title = strtolower($title);

        // Convert all dashes/underscores into separator
        $flip = $separator === '-' ? '_' : '-';

        $title = str_replace("'", "", $title);

        $title = preg_replace('![' . preg_quote($flip, null) . ']+!u', $separator, $title);

        // Replace @ with the word 'at'
        $title = str_replace('@', $separator . 'at' . $separator, $title);

        // Remove all characters that are not the separator, letters, numbers, or whitespace.
        $title = preg_replace('![^' . preg_quote($separator, null) . '\pL\pN\s]+!u', '-', $title);

        // Replace all separator characters and whitespace by a single separator
        $title = preg_replace('![' . preg_quote($separator, null) . '\s]+!u', $separator, $title);

        return trim($title, $separator);
    }

    /**
     * Get Page Meta
     * @param $slug
     * @return Page
     */
    public function getPageMeta($slug): Page
    {
        $page = (new Page());
        $page->load("slug = '{$slug}'");

        return $page;
    }

    /**
     * Get Pages
     * @param $slug
     * @return string
     */
    public function getPage($slug): string
    {
        $page = (new Page());
        $page->load("slug = '{$slug}'");

        if (!empty($page->content)) {
            return \Tina4\renderTemplate(html_entity_decode($page->content, ENT_QUOTES), ["title" => $page->title, "description" => $page->description, "request" => $_REQUEST]);
        } else {
            return "";
        }
    }

    /**
     * Gets all the pages
     * @throws ReflectionException
     */
    public function getAllPages($siteId=1): array
    {
        $page = (new Page());
        $pages = $page->select("*", 10000)->where("site_id = {$siteId}")->asObject();

        return $pages;
    }

    /**
     * Gets all the snippets
     */
    public function getAllSnippets($siteId=1): array
    {
        $snippet = (new Snippet());
        $snippets = $snippet->select("*", 10000)->where("site_id = {$siteId}");

        if (!empty($snippets)) {
            return $snippets->asArray();
        } else {
            return [];
        }
    }

    /**
     * Get Articles
     * @param string $category
     * @param int|null $limit
     * @param int|null $skip
     * @param string $template
     * @return array
     * @throws ReflectionException
     */
    public function getArticles(string $category, int $limit = null, int $skip = null, string $template = "article.twig"): array
    {

        $skip = $skip ?? 0;
        $limit = $limit ?? 10;
        $articles = (new Article())->select("*", $limit, $skip)->where("1 = 1");
        if ($category) {
            $articles->and("id in (select article_id 
                                                  from article_article_category 
                                                 where article_category_id in ( select id from article_category where upper(name) = upper('{$category}')
            ))");
        }

        $articles->and("id != 0 and is_published = 1");
        $articles = $articles->orderBy(["published_date desc"])->asObject();

        foreach ($articles as $id => $article) {
            $articles[$id]->url = "/content/article/{$article->slug}";
            $articles[$id]->content = $this->parseContent($article->content);
            if (!file_exists("./cache/article-" . md5($article->id) . ".png")) {
                if (!empty($article->image)) {
                    file_put_contents("./cache/article-" . md5($article->id) . ".png", base64_decode($article->image));
                    $articles[$id]->image = "/cache/article-" . md5($article->id) . ".png";
                } else {
                    $articles[$id]->image = null;
                }
            } else {
                $articles[$id]->image = "/cache/article-" . md5($article->id) . ".png";
            }
        }

        return $articles;
    }

    /**
     * Get Article List
     * @param string $category
     * @param string|null $className
     * @param int $limit
     * @return string
     * @throws ReflectionException
     */
    public function getArticleList(string $category, string $className = null, int $limit = 0): string
    {
        $className = $className ?? "";
        $articles = (new Article())->select("title, description, image, slug, date_created", $limit)
            ->where("id != 0 and is_published = 1");
        if ($category) {
            $articles->and("article_category_id in (select id from article_category where upper(name) = upper('{$category}'))");
        }
        $articles->orderBy("published_date desc");
        return \Tina4\renderTemplate("article-list.twig", ["articles" => $articles->AsObject(), "className" => $className]);
    }

    /**
     * Render Articles
     * @param $title
     * @param $content
     * @param $image
     * @param $article
     * @param string $template
     * @return string
     */
    public function renderArticle($title, $content, $image, $article, string $template = "article.twig"): string
    {
        return \Tina4\renderTemplate($template, ["title" => $title, "article" => $article, "content" => $content, "image" => $image, "request" => $_REQUEST]);
    }

    /**
     * Get Article
     * @param $slug
     * @param string $template
     * @return string
     * @throws ReflectionException
     */
    public function getArticle($slug, string $template = "article.twig"): string
    {
        $article = new Article();
        $article->load("slug = '{$slug}'");
        $this->enhanceArticle($article);
        return $this->renderArticle($article->title, $article->content, $article->image, $article, $template);
    }

    /**
     * Get Article Meta
     * @param $slug
     * @return string
     */
    public function getArticleMeta($slug): string
    {
        $article = new Article();
        $article->load("slug = '{$slug}'");

        return $article->asObject();
    }

    /**
     * Get Snippets
     * @param $name
     * @return string
     */
    public function getSnippet($name): string
    {
        $snippet = new Snippet();
        if ($snippet->load("name = '{$name}'")) {
            $fileName = "snippet" . $this->getSlug($name);
            file_put_contents("./cache" . DIRECTORY_SEPARATOR . $fileName, html_entity_decode($snippet->content, ENT_QUOTES));
        } else {
            $fileName = "";
        }
        return $fileName;
    }

    /**
     * Gets the snippet content
     * @param $name
     * @return false|string|void
     * @throws \Twig\Error\LoaderError
     */
    public function getSnippetContent($name)
    {
        $fileName = "snippet" . $this->getSlug($name);
        if (file_exists("./cache" . DIRECTORY_SEPARATOR . $fileName))
        {
            return new \Twig\Markup(file_get_contents("./cache" . DIRECTORY_SEPARATOR . $fileName), 'UTF-8');
        } else {
            if ($this->getSnippet($name) !== "")
            {
                return new \Twig\Markup(file_get_contents("./cache" . DIRECTORY_SEPARATOR . $fileName), 'UTF-8');
            }
        }

    }


    /**
     * Gets articles
     * @param int|null $articleId
     * @param string $parentId
     * @return string
     */
    public function getCategories(int $articleId = null, string $parentId = ""): string
    {
        if (!empty($_SESSION["siteId"]))
        {
            $siteId = $_SESSION["siteId"];
        } else {
            $siteId = 1;
        }

        $articleId = $articleId ?? 1;
        if (empty($articleId)) $articleId = 1;
        $html = "";
        if (!empty($parentId)) {
            $filter = "where parent_id = {$parentId} and is_active = 1  and site_id = {$siteId}";
        } else {
            $filter = "where parent_id = (select id from article_category where name = 'Root' and site_id = {$siteId}) and is_active = 1 and site_id = {$siteId}";
        }
        $sql = "select a.*,
                       (select count(id) from article_category where parent_id = a.id) as has_children,
                       (select count(id) from article_article_category where article_category_id = a.id and article_id = $articleId) as is_selected 
                    from article_category a {$filter} order by display_order asc";
        $categories = $this->DBA->fetch($sql, 1000)->asArray();

        $lis = [];
        foreach ($categories as $id => $category) {
            if ($category["hasChildren"] > 0) {
                $childrenMenus = $this->getCategories($articleId, $category["id"]);
                $children = _ul($childrenMenus);
                if ($category["isSelected"] > 0) {
                    $lis[] = _li(_input(["type" => "checkbox", "value" => $category["id"], "name" => "article_categories[{$category["id"]}]", "checked"]), " ", $category["name"], $children);
                } else {
                    $lis[] = _li(_input(["type" => "checkbox", "value" => $category["id"], "name" => "article_categories[{$category["id"]}]"]), " ", $category["name"], $children);
                }

            } else {
                if ($category["isSelected"] > 0) {
                    $lis[] = _li(_input(["type" => "checkbox", "value" => $category["id"], "name" => "article_categories[{$category["id"]}]", "checked"]), " ", $category["name"]);
                } else {
                    $lis[] = _li(_input(["type" => "checkbox", "value" => $category["id"], "name" => "article_categories[{$category["id"]}]"]), " ", $category["name"]);
                }
            }
        }

        $html .= _shape($lis);

        return $html;
    }


    /**
     * Gets a menu
     * @param string|null $parentId
     * @param int $level
     * @return array
     */
    public function getMenu(string $parentId = null, int $level = 0): array
    {
        if (!empty($_SESSION["siteId"]))
        {
            $siteId = $_SESSION["siteId"];
        } else {
            $siteId = 1;
        }
        $parentId = $parentId ?? "";
        if (!empty($parentId)) {
            $filter = "where parent_id = {$parentId} and is_active = 1 and site_id = {$siteId}";
        } else {
            $filter = "where parent_id = 1 and is_active = 1 and site_id = {$siteId} ";
        }
        $sql = "select a.*,(select count(id) from menu where parent_id = a.id) as has_children from menu a {$filter} order by display_order asc";

        if ($this->DBA->tableExists("article_category")) {
            $menus = $this->DBA->fetch($sql, 1000)->asObject();

            foreach ($menus as $id => $menu) {
                if ($menu->hasChildren > 0) {
                    $childrenMenus = $this->getMenu($menu->id, ++$level);
                    $menu->children = $childrenMenus;
                }
                if ($menu->slug === "") {
                    $menu->slug = $this->getSlug($menu->name);
                }

                if (!empty($menu->specificRoute)) {
                    $menu->url = $menu->specificRoute;
                } else {
                    $menu->url = "/content/{$menu->slug}";
                }

            }

            return $menus;
        } else {
            return [];
        }
    }

    /**
     * Gets the email template by it's name, order of website preference
     * @param $name
     * @return mixed|string
     * @throws ReflectionException
     */
    public function getEmailTemplate($name)
    {
        $template = (new EmailTemplate())->select("*", 5)
            ->where("id != 0")
            ->orderBy(["id desc"])->asArray();

        return $template[0];
    }

    /**
     * Get next and previous articles
     * @param $article
     * @throws ReflectionException
     */
    public function enhanceArticle($article)
    {
        $keywords = explode(",", $article->keywords);
        //fetch articles with these keywords by latest
        $likes = [];
        foreach ($keywords as $id => $keyword) {
            $likes[] = "instr(keywords, '" . trim($keyword) . "')";
        }
        $filter = "id != {$article->id} and ( " . join(" or ", $likes) . " )";
        $related = (new Article())->select("id,title,description,slug,image,author,published_date", 4)->where($filter)->orderBy(["published_date desc"]);
        $article->relatedArticles = $related->asObject();
        $article->url = "/content/article/" . $this->getSlug($article->title);
        foreach ($article->relatedArticles as $id => $articleData) {
            $article->relatedArticles[$id]->url = "/content/article/" . $this->getSlug($article->title);
            if (!file_exists("./cache/article-" . md5($articleData->id) . ".png")) {
                if (!empty($articleData->image)) {
                    file_put_contents("./cache/article-" . md5($articleData->id) . ".png", base64_decode($article->image));
                    $article->relatedArticles[$id]->image = "/cache/article-" . md5($articleData->id) . ".png";
                } else {
                    $article->relatedArticles[$id]->image = null;
                }
            } else {
                $article->relatedArticles[$id]->image = "/cache/article-" . md5($articleData->id) . ".png";
            }
        }

        $article->categories = $this->DBA->fetch("select * from article_category ac join article_article_category acc on acc.article_category_id = ac.id where acc.article_id = {$article->id}", 10)->asArray();
    }

    /**
     * Fixes content up for relative paths to get images and other sources to display
     * @param $content
     * @return string
     */
    public function parseContent($content): string
    {
        if (!empty($content)) {
            $content = html_entity_decode($content);
        }
        return $content;
    }

    /**
     * Get Snippets
     * @return string[]
     * @throws ReflectionException
     */
    public function getSnippets(): array
    {
        $snippets = (new Snippet())->select("*", 1000);
        if (!empty($snippets)) {
            return $snippets->asArray();
        } else {
            return [];
        }
    }

    /**
     * Gets articles by tag
     * @param $category
     * @param $limit
     * @param $skip
     * @return array|mixed|string[]
     * @throws ReflectionException
     */
    public function getArticlesByTag($category, $limit = 1, $skip = 0)
    {
        $articles = (new Article())->select("*", $limit, $skip)
            ->where("id != 0 and is_published = 1");

        if (!empty($category) && $category !== "all") {
            $articles->and("(id in (select article_id from article_article_category aac join article_category ac on ac.id = aac.article_category_id and upper(ac.name) = upper('{$category}')) or INSTR(keywords, '{$category}') ) ");
        }

        $articles->orderBy("published_date desc");


        $articles = $articles->asObject();

        foreach ($articles as $id => $article) {
            $articles[$id]->content = $this->parseContent($article->content);
            $articles[$id]->url = "/content/article/" . $this->getSlug($article->title);
            if (!file_exists("./cache/article-" . md5($article->id) . ".png")) {
                if (!empty($article->image)) {
                    file_put_contents("./cache/article-" . md5($article->id) . ".png", base64_decode($article->image));
                    $articles[$id]->image = "/cache/article-" . md5($article->id) . ".png";

                } else {
                    $articles[$id]->image = null;
                }

            } else {
                $articles[$id]->image = "/cache/article-" . md5($article->id) . ".png";
            }
        }


        return $articles;
    }

    /**
     * Method to add Config methods on the CMS
     * @param Config $config
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public function addConfigMethods(Config $config): void
    {
        global $DBA;

        if ($DBA === null) {
            die("Please install the composer dependency for SQLite3\n'composer require tina4stack/tina4php-sqlite3'\n and create a database global for using the CMS in your index.php file\nThe default code you can copy from the next 2 lines:\nglobal \$DBA;\n\$DBA = new \Tina4\DataSQLite3(\"cms.db\");\n");
        }

        $migration = new \Tina4\Migration(__DIR__ . "/../../migrations");

        //We need to do a version check here instead of a table check
        if ($migration->getVersion('tina4cms') !== "1.0.3") {
            \Tina4\Debug::message("Running migrations...on " . realpath(__DIR__ . "/../../migrations"));
            $migration->doMigration();
            $migration->setVersion("1.0.3", "Added article layouts", 'tina4cms');
        }

        //Copy over the page builder css
        $pageBuilderCSS = "./src/public/css/page-builder.css";
        if (!file_exists($pageBuilderCSS))
        {
            file_put_contents($pageBuilderCSS, file_get_contents(__DIR__ . "/../public/css/page-builder.css"));
        }

        //Copy over the page builder css
        $grapeJsCss = "./src/public/css/grape.css";
        if (!file_exists($grapeJsCss))
        {
            file_put_contents($grapeJsCss, file_get_contents(__DIR__ . "/../public/css/grape.css"));
        }

        $iconFiles = ["blocks-icons", "nav-icons", "ui-icons"];
        if (!empty($iconFiles))
        {
            foreach ($iconFiles as $iconFile) {
                if (!file_exists(TINA4_DOCUMENT_ROOT . "src" . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . $iconFile)) {
                    \Tina4\Utilities::recurseCopy(
                        __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . $iconFile,
                        TINA4_DOCUMENT_ROOT . "src" . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . $iconFile
                    );
                }
            }
        }

        //Copy over the page builder css
        $checkSite = new Site();
        if (!$checkSite->load("id = 1")) {
            $checkSite->id = 1;
            $checkSite->siteName = "Tina4 CMS";
            $checkSite->description = "My first CMS";
            $checkSite->siteUrl = "https://".$_SERVER["HTTP_HOST"];
            $checkSite->theme = "default";
            $checkSite->save();
        }

        $config->addTwigGlobal("Content", new Content());
        $config->addTwigGlobal("Snippet", new Content());
        $config->addTwigGlobal("Article", new Content());

        if (!file_exists("./src/public/uploads")) {
            mkdir("./src/public/uploads");
        }

        if (!file_exists("./cache")) {
            mkdir("./cache");
        }

        if (!file_exists("./cache/images")) {
            mkdir("./cache/images");
        }

        $config->addTwigFunction("redirect", function ($url, $code = 301) {
            \Tina4\redirect($url, $code);
        });

        $config->addTwigFilter("getSnippet", static function ($name) {
            return (new self())->getSnippet($name);
        });

        $config->addTwigFunction("getSnippet", static function ($name) {
            return (new self())->getSnippet($name);
        });

        $config->addTwigFunction("render", static function ($content) {
            return \Tina4\renderTemplate($content);
        });

        $config->addTwigFilter("getSlug", static function ($name) {
            return (new self())->getSlug($name);
        });

        $snippets = $this->getSnippets();
        foreach ($snippets as $id => $snippet) {
            $config->addTwigFunction('get'.ucfirst($snippet["name"]), static function () use ($snippet) {
                return (new self())->getSnippetContent($snippet["name"]);
            });
        }

        $config->addTwigFunction("getPageContent", function($pageName){
            $pageContent = (new Page())->select("content")->where("slug = '{$pageName}'")->asArray();
            if (!empty($pageContent)) {
                return new \Twig\Markup($pageContent[0]["content"], 'UTF-8');
            } else {
                return "";
            }
        });

        //Add the theme component
        $config->addTwigGlobal("Theme", new Theme());
    }

    /**
     * Get the tiny mce path
     * @return string
     */
    public function getTinyMCEIncludePath(): string
    {
        $documentRoot = realpath("./"); //root path D:/projects/tina4cms
        $contentPath = realpath(__DIR__ . "/../../"); // D:/projects/tina4cms/vendor/tina4stack/tina4cms

        return str_replace($documentRoot, "", $contentPath);
    }


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
                $locs = ["loc" => $site->siteUrl . "/content/" . $page->slug, "lastmod" => str_replace(" ", "T", $page->dateModified) . "+00:00"];

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
                $locs = ["loc" => $site->siteUrl . "/content/article/" . $article->slug, "lastmod" => str_replace(" ", "T", $article->publishedDate) . "+00:00"];
                if (!empty($article->image)) {
                    if (!file_exists("./cache/images/article-{$article->slug}.png")) {
                        if (!empty($article->image)) {
                            $image = $site->siteUrl . "/cache/images/article-{$article->slug}.png";
                            file_put_contents("./cache/images/article-{$article->slug}.png", base64_decode($article->image));
                        }
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
        if ($site->load("id = $siteId")) {
            return $site;
        }

        return null;
    }

    /**
     * Gets all the sites
     * @return void
     * @throws ReflectionException
     */
    public function getSites()
    {
        $site = new Site();
        return $site->select("*", 10000)->asArray();
    }

    /**
     * Renders a page with a layout
     * @param $pageName
     * @param $siteId
     * @return string
     * @throws \Twig\Error\LoaderError
     */
    public function renderPage($pageName, $siteId): string
    {
        $content = (new Content())->getPage($pageName);
        $pageMeta = (new Content())->getPageMeta($pageName);

        if (!file_exists("./cache/images/og-{$pageName}.png")) {
            if (!empty($pageMeta->image)) {
                $image = "https://" . $_SERVER["HTTP_HOST"] . "/cache/images/og-{$pageName}.png";
                file_put_contents("./cache/images/og-{$pageName}.png", base64_decode($pageMeta->image));
            } else {
                $image = null;
            }
        } else {
            $image = "https://" . $_SERVER["HTTP_HOST"] . "/cache/images/og-{$pageName}.png";
        }

        $template = "content.twig";
        $site = new Site();
        if ($site->load("id = $siteId") && !empty($site->theme)) {
            $template = "themes/{$site->theme}/page.twig";
            $layoutHtml = $site->pageLayoutHtml;

            if (!empty($layoutHtml)) {
                $content = str_replace("[TINA4CMS_PAGE_CONTENT]", $content, $layoutHtml);
                $re = '/<body(.*)>|<\/body>/mUs';
                $content = '<body>'.preg_replace($re, "", $content).'</body>';
            }
        }

        if (!empty($site->custom)) {
            $site->custom = html_entity_decode($site->custom);
        }

        return \Tina4\renderTemplate(\Tina4\renderTemplate($template, ["site" => $site, "content" => $content, "pageName" => $pageName, "title" => $pageMeta->title, "image" => $image, "description" => $pageMeta->description, "keywords" => $pageMeta->keywords]));
    }

    /**
     * Gets all the articles
     * @param $siteId
     * @return array|string[]
     * @throws ReflectionException
     */
    public function getAllArticles($siteId): array
    {
        $article = (new Article());
        $articles = $article->select("*", 10000)->where("site_id = {$siteId}");

        if (!empty($articles)) {
            return $articles->asArray();
        } else {
            return [];
        }
    }
}
