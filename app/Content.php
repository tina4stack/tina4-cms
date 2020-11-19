<?php

class Content extends \Tina4\Data
{
    /**
     * Create a slug from the title
     * @param $tile
     * @param $separator
     * @return String
     */
    function getSlug($title, $separator = '-') {
        // lower string
        $title = strtolower($title);

        // Convert all dashes/underscores into separator
        $flip = $separator === '-' ? '_' : '-';

        $title = str_replace("'", "", $title);

        $title = preg_replace('!['.preg_quote($flip).']+!u', $separator, $title);

        // Replace @ with the word 'at'
        $title = str_replace('@', $separator.'at'.$separator, $title);

        // Remove all characters that are not the separator, letters, numbers, or whitespace.
        $title = preg_replace('![^'.preg_quote($separator).'\pL\pN\s]+!u', '-', $title);

        // Replace all separator characters and whitespace by a single separator
        $title = preg_replace('!['.preg_quote($separator).'\s]+!u', $separator, $title);

        return trim($title, $separator);
    }

    /**
     * Get Page Meta
     * @param $pageName
     * @return Page
     * @throws Exception
     */
    public function getPageMeta($slug) {
        $page = (new Page());
        $page->load("slug = '{$slug}'");

        return $page;
    }

    /**
     * Get Pages
     * @param $slug
     * @return string
     * @throws \Twig\Error\LoaderError
     */
    public function getPage($slug) {
        $page = (new Page());
        $page->load("slug = '{$slug}'");

        return \Tina4\renderTemplate( html_entity_decode($page->content, ENT_QUOTES ) , ["title" => $page->title, "description" => $page->description, "request" => $_REQUEST]);
    }

    /**
     * Get Articles
     * @param $category
     * @param int $limit
     * @param int $skip
     * @param string $template
     * @return string
     */
    public function getArticles($category, $limit=10, $skip=0, $template="article.twig") {

        $articles = (new Article())->select("*", $limit, $skip)->where("1 = 1");
        if ($category) {
            $articles->and("article_category_id in (select id from article_category where upper(name) = upper('{$category}'))");
        }

        $articles->and("id <> 0 and is_published = 1");
        $articles = $articles->orderBy("published_date desc")->asObject();

        foreach ($articles as $id => $article) {
            $articles[$id]->url = "/content/article/{$article->slug}";
            $articles[$id]->content = $this->parseContent($article->content);
            if (!file_exists("./cache/article-".md5($article->image).".png")) {
                if ($article->image) {
                    file_put_contents("./cache/article-".md5($article->image).".png", base64_decode($article->image));
                }
                $articles[$id]->image = "/cache/article-".md5($article->image).".png";
            } else {
                $articles[$id]->image = "/cache/article-".md5($article->image).".png";
            }
        }

        return $articles;
    }

    /**
     * Get Article List
     * @param $category
     * @param string $className
     * @param int $limit
     * @return string
     * @throws \Twig\Error\LoaderError
     */
    public function getArticleList($category, $className="", $limit=0) {
        $articles = (new Article())->select("title, description, image, slug, date_created", $limit)
          ->where("id <> 0 and is_published = 1");
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
     * @throws \Twig\Error\LoaderError
     */
    public function renderArticle($title, $content, $image, $article, $template="article.twig") {
        $content = \Tina4\renderTemplate($template, ["title" => $title, "article" => $article, "content" => html_entity_decode( $content, ENT_QUOTES), "image" => $image, "request" => $_REQUEST]);
        return $content;
    }

    /**
     * Get Article
     * @param $slug
     * @param string $template
     * @return string
     * @throws \Twig\Error\LoaderError
     */
    public function getArticle($slug, $template="article.twig") {
        $article = new Article();
        $article->load("slug = '{$slug}'");
        $this->enhanceArticle($article);
        $html = $this->renderArticle($article->title, $article->content, $article->image, $article, $template);
        return $html;
    }

    /**
     * Get Article Meta
     * @param $title
     * @return string
     * @throws Exception
     */
    public function getArticleMeta($slug) {
        $article = new Article();
        $article->load("slug = '{$slug}'");

        return $article->asObject();
    }

    /**
     * Get Snippets
     * @param $name
     * @return string
     * @throws \Twig\Error\LoaderError
     */
    public function getSnippet($name) {
        $snippet = new Snippet();
        $snippet->load("name = '{$name}'");

        return \Tina4\renderTemplate(html_entity_decode($snippet->content, ENT_QUOTES), ["request" => $_REQUEST]);
    }

    public static function iterateDirectory($path, $clickEvent="returnFileUrl", $relativePath = "")
    {
        if (empty($relativePath)) $relativePath = $path;
        $files = scandir($path);
        asort($files);

        $dirItems = [];
        $fileItems = [];

        foreach ($files as $id => $fileName) {
            if ($fileName[0] == "." || $fileName == "cache" || $fileName == "vendor") continue;
            if (is_dir($path . "/" . $fileName) && $fileName != "." && $fileName != "..") {
                $html = '<li data-jstree=\'{"icon":"//img.icons8.com/metro/26/000000/folder-invoices.png"}\'>' . $fileName;
                $html .= self::iterateDirectory($path . "/" . $fileName, $clickEvent, $relativePath);
                $html .= "</li>";
                $dirItems[] = $html;

            } else {
                if (strpos($fileName, ".jpg") !== false || strpos($fileName, ".png") !== false || strpos($fileName, ".jpeg") !== false ) {
                    $fileItems[] = '<li data-jstree=\'{"icon":"//img.icons8.com/plasticine/32/000000/image.png"}\' onclick="previewFile(\'' . str_replace("./", "/", $path) . "/" . $fileName . '\')" ondblclick="' . $clickEvent . '(\'' . str_replace("./", "/", $path) . "/" . $fileName . '\')">' . $fileName . '</li>';
                }
            }

        }

        $html = "<ul>";
        $html .= join("", $dirItems);
        $html .= join("", $fileItems);
        $html .= "</ul>";
        return $html;
    }

    /**
     * Gets articles
     * @param int $articleId
     * @param string $parentId
     * @return string
     */
    public function getCategories($articleId=0, $parentId="") {
        if (empty($articleId)) $articleId = 0;
        $html = "";
        if (!empty($parentId)) {
            $filter = "where parent_id = {$parentId} and is_active = 1 ";
        } else {
            $filter = "where parent_id = 0 and is_active = 1 ";
        }
        $sql = "select a.*,
                       (select count(id) from article_category where parent_id = a.id) as has_children,
                       (select count(id) from article_article_category where article_category_id = a.id and article_id = $articleId) as is_selected 
                    from article_category a {$filter} order by display_order asc";
        $categories = $this->DBA->fetch($sql, 1000)->asArray();

        $lis = [];
        foreach ($categories as $id => $category) {
            if ($category["hasChildren"] > 0) {
                $childrenMenus = $this->getCategories($articleId,   $category["id"]);
                $children = _ul($childrenMenus );
                if ($category["isSelected"] > 0) {
                    $lis[] = _li(_input(["type" => "checkbox", "value" => $category["id"], "name" => "article_categories[{$category["id"]}]", "" => "checked"])," ", $category["name"], $children);
                } else {
                    $lis[] = _li(_input(["type" => "checkbox", "value" => $category["id"], "name"=>"article_categories[{$category["id"]}]"])," ", $category["name"], $children);
                }

            } else {
                if ($category["isSelected"] > 0) {
                    $lis[] = _li(_input(["type" => "checkbox", "value" => $category["id"], "name" => "article_categories[{$category["id"]}]", "" => "checked"]), " ", $category["name"]);
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
     * @param string $parentId
     * @param string $liClass
     * @param string $aClass
     * @param int $level
     * @return string
     */
    public function getMenu($parentId="",  $level=0) {
        if (!empty($parentId)) {
            $filter = "where parent_id = {$parentId} and is_active = 1 and is_menu = 1 ";
        } else {
            $filter = "where parent_id = 0 and is_active = 1 and is_menu = 1 ";
        }
        $sql = "select a.*,(select count(id) from article_category where parent_id = a.id) as has_children from article_category a {$filter} order by display_order asc";
        $menus = $this->DBA->fetch($sql, 1000)->asObject();

        foreach ($menus as $id => $menu) {
            if ($menu->hasChildren > 0) {
                $childrenMenus = $this->getMenu($menu->id,   $level+=1);
                $menu->children = $childrenMenus;
            }
            $menu->url = "/content/{$menu->slug}";

        }

        return $menus;
    }

    /**
     * Gets the email template by it's name, order of website preference
     * @param $name
     * @param $websiteId
     * @return mixed|string
     */
    public function getEmailTemplate($name) {
        $template = (new EmailTemplate())->select("*", 5)
            ->where("id <> 0")
        ->orderBy("id desc")->asArray();

        return $template[0];
    }

    /**
     * Get next and previous articles
     * @param $article
     */
    public function enhanceArticle ($article)
    {
        $keywords = explode(",", $article->keywords);
        //fetch articles with these keywords by latest
        $likes = [];
        foreach ($keywords as $id => $keyword) {
            $likes[] = "instr(keywords, '".trim($keyword)."')";
        }
        $filter = "id <> {$article->id} and ( ".join(" or ", $likes)." )";
        $related = (new Article())->select("id,title,description,slug,image", 4)->where($filter)->orderBy("published_date desc");
        $article->relatedArticles = $related->asObject();

        foreach ( $article->relatedArticles as $id => $articleData) {

            if (!file_exists("./cache/article-".md5($articleData->image).".png")) {
                if ($articleData->image) {
                    file_put_contents("./cache/article-".md5($articleData->image).".png", base64_decode($article->image));
                }
                $article->relatedArticles[$id]->image = "/cache/article-".md5($articleData->image).".png";
            } else {
                $article->relatedArticles[$id]->image = "/cache/article-".md5($articleData->image).".png";
            }
        }

        $article->categories =  $this->DBA->fetch("select * from article_category ac join article_article_category acc on acc.article_category_id = ac.id where acc.article_id = {$article->id}", 10)->asArray();
    }

    /**
     * Fixes content up for relative paths to get images and other sources to display
     * @param $content
     * @return
     */
    public function parseContent ($content) {
        $content = html_entity_decode($content);
        return $content;
    }

    /**
     * Get Snippets
     * @return string|string[]
     */
    public function getSnippets() {
        $snippets = (new Snippet())->select("*", 1000)->AsObject();
        return $snippets;
    }

    public function getArticlesByTag($category, $limit=1, $skip=0) {


        $articles = (new Article())->select("*", $limit, $skip)
            ->where("id <> 0 and is_published = 1");

        if (!empty($category) && $category !== "all") {
            $articles->and("(id in (select article_id from article_article_category aac join article_category ac on ac.id = aac.article_category_id and upper(ac.name) = upper('{$category}')) or INSTR(keywords, '{$category}') ) ");
        }

        $articles->orderBy("published_date desc");


        $articles = $articles->asObject();



        foreach ($articles as $id => $article) {
            $articles[$id]->content = $this->parseContent($article->content);
            if (!file_exists("./cache/article-".md5($article->image).".png")) {
                if ($article->image) {
                    file_put_contents("./cache/article-".md5($article->image).".png", base64_decode($article->image));
                }
                $articles[$id]->image = "/cache/article-".md5($article->image).".png";
            } else {
                $articles[$id]->image = "/cache/article-".md5($article->image).".png";
            }
        }


        return $articles;
    }
}
