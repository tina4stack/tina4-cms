<?php

use Tina4\Config;
use Tina4\Data;
use Tina4\DataSQLite3;
use Tina4\Migration;

/**
 * Tina4CMS - CMS Module
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */
class Content extends Data
{
    private $twigNamespace = "@tina4cms";

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
     * @param string $icon
     */
    public function addCmsMenu(?string $href, string $caption, string $icon="pages-link-icon"): void
    {
        $href = $href ?? "";
        global $TINA4_CMS_MENU_ITEMS;
        $TINA4_CMS_MENU_ITEMS[] = compact('href', 'caption', 'icon');
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

        $title = preg_replace('![' . preg_quote($flip) . ']+!u', $separator, $title);

        // Replace @ with the word 'at'
        $title = str_replace('@', $separator . 'at' . $separator, $title);

        // Remove all characters that are not the separator, letters, numbers, or whitespace.
        $title = preg_replace('![^' . preg_quote($separator) . '\pL\pN\s]+!u', '-', $title);

        // Replace all separator characters and whitespace by a single separator
        $title = preg_replace('![' . preg_quote($separator) . '\s]+!u', $separator, $title);

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
        if ($page->load("slug = ?", [$slug])) {
            if (!file_exists("./cache/images/og-$page->name.png")) {
                if (!empty($page->image)) {
                    $imageUrl = "https://" . $_SERVER["HTTP_HOST"] . "/cache/images/og-$page->name.png";
                    file_put_contents("./cache/images/og-$page->name.png", base64_decode($page->image));
                } else {
                    $imageUrl = null;
                }
            } else {
                $imageUrl = "https://" . $_SERVER["HTTP_HOST"] . "/cache/images/og-$page->name.png";
            }

            $page->imageUrl = $imageUrl;
            return $page;
        }

        return new Page();
    }

    /**
     * Get Article Meta
     * @param Article $article
     * @return Article
     */
    public function getArticleMeta(Article $article) : Article
    {
        $imageHash = md5($article->id.$article->title.$article->siteId);
        if (!file_exists("./cache/images/og-article-{$imageHash}.png")) {
            if (!empty($article->image)) {
                $imageUrl =  (in_array(explode(":", $_SERVER["HTTP_HOST"])[0], ["localhost", "127.0.0.1"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] . "/cache/images/og-article-{$imageHash}.png";
                file_put_contents("./cache/images/og-article-{$imageHash}.png", base64_decode($article->image));
            } else {
                $imageUrl = null;
            }
        } else {
            $imageUrl = (in_array(explode(":", $_SERVER["HTTP_HOST"])[0], ["localhost", "127.0.0.1"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] . "/cache/images/og-article-{$imageHash}.png";
        }

        $article->imageUrl = $imageUrl;
        $article->url = (in_array(explode(":", $_SERVER["HTTP_HOST"])[0], ["localhost", "127.0.0.1"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] ."/".TINA4_CMS_ARTICLE_PREFIX. "/" . $this->getSlug($article->title);

        return $article;
    }

    /**
     * Get Pages
     * @param $slug
     * @return string
     */
    public function getPage($slug): string
    {
        $page = (new Page());
        if ($page->load("slug = ?", [$slug]) && !empty($page->content) && ($page->isPublished)) {
            return \Tina4\renderTemplate(html_entity_decode($page->content, ENT_QUOTES), ["title" => $page->title, "description" => $page->description, "request" => $_REQUEST]);
        }

        return "";
    }

    /**
     * Gets all the pages
     * @throws ReflectionException
     */
    public function getAllPages($siteId=1): array
    {
        $page = (new Page());
        $pages = $page->select("*", 10000)->where("site_id = ?", [$siteId]);

        if (!empty($pages)) {
            return $pages->asObject();
        }
        return [];
    }

    /**
     * Gets all the snippets
     * @throws ReflectionException
     */
    public function getAllSnippets($siteId=1): array
    {
        $snippet = (new Snippet());
        $snippets = $snippet->select("*", 10000)->where("site_id = ?", [$siteId]);

        if (!empty($snippets)) {
            return $snippets->asArray();
        }

        return [];
    }

    /**
     * Renders a page with a layout
     * @param string $pageName
     * @param int $siteId
     * @param string $overrideContent
     * @param null $pageMeta
     * @return string
     */
    public function renderPage(string $pageName, int $siteId, string $overrideContent="", $pageMeta=null): string
    {
        if ($overrideContent === "") {
            $content = $this->getPage($pageName);
        } else {
            $content = $overrideContent;
        }
        if (empty($content) && empty($overrideContent)) {
            return "";
        }

        if (empty($pageMeta)) {
            $pageMeta = $this->getPageMeta($pageName);
        }

        $template = "base.twig"; //fallback template
        $site = new Site();
        if ($site->load("id = ?", [$siteId]) && !empty($site->theme)) {
            $theme = new Theme($site->theme);
            $template = $theme->themePath.DIRECTORY_SEPARATOR."page.twig";
            $layoutHtml = $site->pageLayoutHtml;

            if (!empty($layoutHtml)) {
                //Try to inject a content tag if the user forgot to add one
                if (strpos($layoutHtml, "[TINA4CMS_PAGE_CONTENT]") === false) {
                    $layoutHtml = str_replace("</body>", "[TINA4CMS_PAGE_CONTENT]</body>", $layoutHtml);
                }

                $content = str_replace("[TINA4CMS_PAGE_CONTENT]", $content, $layoutHtml);
                $re = '/<body(.*)>|<\/body>/mUs';
                $content = '<body>'.preg_replace($re, "", $content).'</body>';
            }
        }

        if (!empty($site->custom)) {
            $site->custom = html_entity_decode($site->custom);
        }

        return \Tina4\renderTemplate(\Tina4\renderTemplate($template, ["site" => $site, "content" => $content, "pageName" => $pageName, "title" => $pageMeta->title, "image" => $pageMeta->imageUrl, "description" => $pageMeta->description, "keywords" => $pageMeta->keywords]));
    }

    /**
     * Render Articles
     * @param string $year
     * @param string $month
     * @param string $slug
     * @param int $siteId
     * @return string
     * @throws ReflectionException
     */
    public function renderArticle(string $year, string $month, string $slug, int $siteId): string
    {
        $site = (new SiteHelper())->getSite($siteId);
        $articles = (new Article())->select("*"); //add filters here

        $articles->where("is_published = 1");
        if (!empty($year) && !empty($month)) {
            //add the date filter
            $startDate = date( str_replace("d", "01", str_replace('m', $month, str_replace('Y', $year, $site->DBA->getDefaultDatabaseDateFormat())))) ;
            $endDate = date( str_replace("d", "t", str_replace('m', $month, str_replace('Y', $year, $site->DBA->getDefaultDatabaseDateFormat()))), strtotime("{$year}-{$month}-01")) ;

            $articles->and("published_date between ? and ? ", [$startDate, $endDate]);
        }

        if (!empty($slug)) {
            $articles->and("slug = ?", [$slug]);
        }

        $articles = $articles->asObject();

        $html = "";
        if (count($articles) > 0) {
            $articleContent = $this->getArticleById($articles[0]->id);
            $articleMeta = $this->getArticleMeta($articles[0]);

            $html = $this->renderPage($articles[0]->title, $siteId, $articleContent, $articleMeta);
        }

        return $html;
    }

    /**
     * @throws ReflectionException
     */
    public function getArticleById($id): string
    {
        $article = new Article();
        if ($article->load("id = ?", [$id])) {
            $article = $this->getArticleMeta($article);
            $this->enhanceArticle($article);

            $site = new Site();
            $site->load("id = ?", [$article->siteId]);

            //Get the article template
            $articleTemplate = $site->pageLayoutArticleHtml;

            return \Tina4\renderTemplate($articleTemplate, compact('article'));
        }

        return "";
    }

    /**
     * Get Snippets
     * @param $name
     * @return string
     */
    public function getSnippet($name): string
    {
        $snippet = new Snippet();
        if ($snippet->load("name = ?", [$name])) {
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
    public function getCategories(?int $articleId = null, string $parentId = ""): string
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
                       (select count(id) from article_article_category 
                         where article_category_id = a.id 
                           and article_id = {$articleId}) as is_selected 
                    from article_category a {$filter} 
                    order by display_order asc";
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
    public function getMenu(?string $parentId = null, int $level = 0): array
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
     * @param Article $article
     * @param int $relatedArticles
     * @throws ReflectionException
     */
    public function enhanceArticle(Article $article, int $relatedArticles=4)
    {
        if (!empty($article->keywords)) {
            $keywords = explode(",", $article->keywords);
        } else {
            $keywords = [];
        }
        //fetch articles with these keywords by latest
        $likes = [];
        foreach ($keywords as $id => $keyword) {
            $likes[] = "instr(keywords, '" . trim($keyword) . "')";
        }
        $filter = "id != {$article->id} and ( " . join(" or ", $likes) . " )";
        $related = (new Article())->select("id,title,description,slug,image,author,published_date,site_id", $relatedArticles)->where($filter)->orderBy(["published_date desc"]);
        $article->relatedArticles = $related->asObject();

        foreach ($article->relatedArticles as $id => $articleData) {
            $article->relatedArticles[$id] = $this->getArticleMeta($articleData)->asObject();
        }

        $article->related = print_r ($article->relatedArticles,1);

        $article->categories = $this->DBA->fetch("select ac.id, ac.name, ac.parent_id from article_category ac join article_article_category acc on acc.article_category_id = ac.id where acc.article_id = {$article->id}", 10)->asArray();
        $article->category = $this->renderTemplate("article-categories.twig", ["categories" => $article->categories, "baseUrl" =>  TINA4_BASE_URL, "articlePrefix" => TINA4_CMS_ARTICLE_PREFIX ], $article->siteId);

        if (count($article->relatedArticles) > 0)
        {
            $article->navigation = ["previous" => ["url" => $article->relatedArticles[0]->url, "title" => $article->relatedArticles[0]->title],  "next" => ["url" => $article->relatedArticles[count($article->relatedArticles)-1]->url, "title" => $article->relatedArticles[count($article->relatedArticles)-1]->title]];
        } else {
            $article->navigation = [];
        }

        $article->navigation = $this->renderTemplate("article-navigation.twig", ["navigation" => $article->navigation], $article->siteId);
        $article->tags = $article->keywords;
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
     * Method to add Config methods on the CMS
     * @param Config $config
     * @throws \Psr\Cache\InvalidArgumentException|ReflectionException
     */
    public function addConfigMethods(Config $config): void
    {
        global $DBA;

        if ($DBA === null) {
            if (class_exists(DataSQLite3::class)) {
                $DBA = new DataSQLite3("cms.db");
            } else {
                echo "Could not connect to database, please check your database settings: composer require tina4stack/tina4php-sqlite3\n";
                die();
            }
        }

        $migration = new Migration(__DIR__ . "/../../migrations");

        //We need to do a version check here instead of a table check
        if ($migration->getVersion('tina4cms') !== "1.0.3") {
            \Tina4\Debug::message("Running migrations...on " . realpath(__DIR__ . "/../../migrations"));
            $migration->doMigration();
            $migration->setVersion("1.0.3", "Added article layouts", 'tina4cms');
        }

        //Mechanism to stop the system from trying to copy over files all the time
        if (!file_exists(".deployed")) {
            $cssFiles = ["page-builder.css", "grape.css", "bootstrap.min.css", "bootstrap-grid.min.css", "bootstrap-reboot.min.css", "bootstrap-utilities.min.css", "data-tables.css"];
            //Copy over the page builder css
            foreach ($cssFiles as $cssFile) {
                $CSSFile = "./src/public/css/{$cssFile}";
                if (!file_exists($CSSFile)) {
                    file_put_contents($CSSFile, file_get_contents(__DIR__ . "/../public/css/{$cssFile}"));
                }
            }

            $jsFiles = ["bootstrap.bundle.min.js", "boostrap-tagsinput.js", "data-tables.js", "grapes.min.js", "jquery.min.js", "jquery.validate.js", "tina4helper.js", "underscore.min.js"];
            //Copy over the page builder css
            foreach ($jsFiles as $jsFile) {
                $JSFile = "./src/public/js/{$jsFile}";
                if (!file_exists($JSFile)) {
                    file_put_contents($JSFile, file_get_contents(__DIR__ . "/../public/js/{$jsFile}"));
                }
            }

            $iconFiles = ["blocks-icons", "nav-icons", "ui-icons"];
            if (!empty($iconFiles)) {
                foreach ($iconFiles as $iconFile) {
                    if (!file_exists(TINA4_DOCUMENT_ROOT . "src" . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . $iconFile)) {
                        \Tina4\Utilities::recurseCopy(
                            __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . $iconFile,
                            TINA4_DOCUMENT_ROOT . "src" . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . $iconFile
                        );
                    }
                }
            }

            //Copy over tinymce
            if (!file_exists(TINA4_DOCUMENT_ROOT . "src" . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "tinymce")) {
                \Tina4\Utilities::recurseCopy(
                    __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "tinymce",
                    TINA4_DOCUMENT_ROOT . "src" . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "tinymce"
                );
            }

            //Copy over components
            if (!file_exists(TINA4_DOCUMENT_ROOT . "src" . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "components")) {
                \Tina4\Utilities::recurseCopy(
                    __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "components",
                    TINA4_DOCUMENT_ROOT . "src" . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "components"
                );
            }

            //Copy over errors
            \Tina4\Utilities::recurseCopy(
                __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "errors",
                TINA4_DOCUMENT_ROOT . "src" . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "errors"
            );

            $checkSite = new Site();
            if (!$checkSite->load("id = 1")) {
                $checkSite->id = 1;
                $checkSite->siteName = "Tina4 CMS";
                $checkSite->description = "My first CMS";
                $checkSite->siteUrl = "";
                $checkSite->theme = "default";
                $checkSite->save();
            }

            if (!file_exists("./src/public/uploads")) {
                mkdir("./src/public/uploads");
            }

            if (!file_exists("./cache")) {
                mkdir("./cache");
            }

            if (!file_exists("./cache/images")) {
                mkdir("./cache/images");
            }
            file_put_contents(".deployed", date("Y-m-d H:i:s"));
        }

        $config->addTwigGlobal("RoleHelper", new RoleHelper());
        $config->addTwigGlobal("Content", new Content());
        $config->addTwigGlobal("Snippet", new Content());
        $config->addTwigGlobal("Article", new Content());

        $config->addTwigFunction("redirect", function ($url, $code = 301) {
            \Tina4\redirect($url, $code);
        });

        $config->addTwigFilter("getSnippet", static function ($name) {
            return (new self())->getSnippet($name);
        });

        $config->addTwigFunction("getSnippet", static function ($name) {
            return (new self())->getSnippet($name);
        });

        $config->addTwigFilter("getArticle", static function ($id) {
            return new \Twig\Markup((new self())->getArticleById($id), 'UTF-8');
        });

        $config->addTwigFunction("getArticle", static function ($id) {
            return new \Twig\Markup((new self())->getArticleById($id),'UTF-8');
        });

        $config->addTwigFunction("render", static function ($content) {
            return \Tina4\renderTemplate($content);
        });

        $config->addTwigFilter("getSlug", static function ($name) {
            return (new self())->getSlug($name);
        });

        $snippets = $this->getSnippets();
        /**
         * @var Array $snippet
         */
        foreach ($snippets as $snippet) {
            if (!empty($snippet['name'])) {
                $config->addTwigFunction('get' . ucfirst($snippet['name']), static function () use ($snippet) {
                    return (new self())->getSnippetContent($snippet['name']);
                });
            }
        }

        $config->addTwigFunction("getPageContent", function($pageName){
            $pageContent = (new Page())->select("content")->where("slug = ?", [$pageName])->asArray();
            if (!empty($pageContent)) {
                return new \Twig\Markup($pageContent[0]["content"], 'UTF-8');
            } else {
                return "";
            }
        });

        //Add the theme component
        $config->addTwigGlobal("Theme", new Theme());
        //Temp
        (new Theme())->addTwigView("menu", "Menu", "snippets/menu.twig");
    }

    /**
     * Get the tiny mce path
     * @return string
     */
    public function getTinyMCEIncludePath(): string
    {
        //For now returns nothing
        return "";
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
        $articles = $article->select("*", 10000)->where("site_id = ?", [$siteId]);

        if (!empty($articles)) {
            return $articles->asArray();
        } else {
            return [];
        }
    }

    /**
     * Renders templates from the site theme template folder themes/default/templates
     * @param string $template
     * @param array $data
     * @param $siteId
     * @return string
     */
    private function renderTemplate(string $template, array $data, $siteId): string
    {
        $site = (new SiteHelper())->getSite($siteId);
        $theme = new Theme($site->theme);
        $template = $theme->themePath.DIRECTORY_SEPARATOR."templates".DIRECTORY_SEPARATOR.$template;
        return \Tina4\renderTemplate($template, $data);
    }
}
