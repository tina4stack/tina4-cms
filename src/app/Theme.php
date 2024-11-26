<?php
/**
 * The Theme component is used to validate and deploy theme changes, it keeps track of the theme using an md5 hash of a json file containing all the hashes of the files
 * User: andre
 * Date: 2017/07/08
 * Time: 10:41 PM
 */
class Theme
{
    public $themeName = "";
    public $themePath = "";
    public $deployPath = "";
    private $twigViews = [];

    /**
     * Adds twig views
     * @param string $id
     * @param string $title
     * @param string $twigTemplate
     * @return void
     */
    public function addTwigView(string $id, string $title, string $twigTemplate): void
    {
        if (isset($_SESSION["tina4-cms:twigViews"])) {
            $this->twigViews = $_SESSION["tina4-cms:twigViews"];
        }
        $this->twigViews[$id] = ["id" => $id, "title" => $title, "template" => $twigTemplate];
        $_SESSION["tina4-cms:twigViews"] = $this->twigViews;
    }

    public function getTwigViews(): array
    {
        if (isset($_SESSION["tina4-cms:twigViews"])) {
            $this->twigViews = $_SESSION["tina4-cms:twigViews"];
        }
        $results = [];
        foreach ($this->twigViews as $view) {
            $results[] = $view;
        }

        return $results;
    }

    public function parseContentIncludes(string $content)
    {
        $templates = [];
        if (isset($_SESSION["tina4-cms:twigViews"])) {
            $templates = $_SESSION["tina4-cms:twigViews"];
        }

        $re = '/twig-view="(.*)"(.*)Twig Template<\/(span|div|ul)>/mUs';

        preg_match_all($re, $content, $matches, PREG_SET_ORDER, 0);

        foreach ($matches as $id => $match) {
            $matchText = $match[0];
            $id = trim($match[1]);
            $matchText = str_replace("Twig Template", '{% include "'.$templates[$id]["template"].'" %}', $matchText);
            $content = str_replace($match[0], $matchText, $content);
        }

        $re = '/cms-snippet="(.*)"(.*)Snippet<\/(span|div|ul)>/mUs';

        preg_match_all($re, $content, $matches, PREG_SET_ORDER, 0);

        foreach ($matches as $id => $match) {
            $matchText = $match[0];
            $id = trim($match[1]);
            $matchText = str_replace("Snippet", '{{ include(getSnippet("'.$id.'")) }}', $matchText);
            $content = str_replace($match[0], $matchText, $content);
        }

        $re = '/cms-article="(.*)"(.*)Article Block<\/(span|div|ul)>/mUs';

        preg_match_all($re, $content, $matches, PREG_SET_ORDER, 0);

        foreach ($matches as $id => $match) {
            $matchText = $match[0];
            $id = trim($match[1]);
            $matchText = str_replace("Article Block", '{{ getArticle("'.$id.'") | raw }}', $matchText);
            $content = str_replace($match[0], $matchText, $content);
        }

        $re = '/cms-content="(.*)"(.*)Page Content<\/(span|div|ul)>/mUs';

        preg_match_all($re, $content, $matches, PREG_SET_ORDER, 0);
        foreach ($matches as $id => $match) {
            $matchText = $match[0];
            $id = trim($match[1]);
            $matchText = str_replace("Page Content", '[TINA4CMS_PAGE_CONTENT]', $matchText);

            $content = str_replace($match[0], $matchText, $content);
        }

        $content = $this->parseArticleIncludes($content);

        $content = str_replace('Â ', '&nbsp;', $content);
        $content = str_replace('\u00e2\u0080\u0099', '&rsquo;', $content);

        return $content;
    }


    /**
     * Gets all the CMS snippets
     * @return array
     * @throws ReflectionException
     */
    public function getCMSSnippets(): array
    {
        $snippets = [];
        $snippetData = (new Snippet())->select("id,name", 10000)->asArray();

        foreach ($snippetData as $id => $record) {
            $snippets[] = ["id" => $record["name"], "title" => $record["name"]];
        }

        return $snippets;

    }

    /**
     * Parses out the article inputs
     * @param $html
     * @return array|string|string[]
     */
    public function parseArticleIncludes($html)
    {
        //Get rid of the body bits
        $re = '/<body(.*)id="(.*)">(.*)<\/body>/mU';
        $subst = "$3";
        $html = preg_replace($re, $subst, $html);


        $html = str_replace(array('Article Content', 'Article Category', 'Article Title', 'Article Tags'),
                            array('{{ render(article.content) | raw }}', '{{ article.category  | raw }}',
                                  '{{ article.title  | raw}}', '{{ article.tags | raw }}'), $html);
        $html = str_replace('Publish Date', '{{ article.publishedDate | raw }}', $html);
        $html = str_replace('Article Link', '{{ article.slug | raw }}', $html);
        $html = str_replace('Article Navigation', '{{ article.navigation | raw }}', $html);
        $html = str_replace('Article List', '{{ article.list | raw }}', $html);
        $html = str_replace('Related Articles', '{{ article.related | raw }}', $html);
        return str_replace('Article Author', '{{ article.author | raw }}', $html);
    }

    private function deployAssets()
    {

    }

    private function deployCss()
    {
        (new Tina4\Utilities)->getFiles();
    }

    /**
     * Theme constructor.
     * @param string $themeName
     */
    public function __construct(string $themeName="")
    {
        $this->themePath = $this->getPath($themeName);
    }
    public function validateTheme()
    {

    }

    /**
     * Deploy a single theme
     * @param $force
     * @return void
     */
    public function deployTheme($force=false)
    {
        \Tina4\Utilities::recurseCopy( ".".DIRECTORY_SEPARATOR."src".DIRECTORY_SEPARATOR."templates".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$this->themeName, TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$this->themeName, $force);
    }

    /**
     * Deploys whatever themes are in the CMS master to the current project
     * @param $path
     * @param $force
     * @return void
     */
    public function deployThemes($path, $force=false)
    {
        \Tina4\Utilities::recurseCopy($path.DIRECTORY_SEPARATOR."src".DIRECTORY_SEPARATOR."templates".DIRECTORY_SEPARATOR."themes", TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes", $force);
    }

    /**
     * Gets a list of themes
     * @return array
     */
    public function getThemes(): array
    {
        $themes = scandir(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes");

        $finalThemes = [];
        foreach ($themes as $key => $value) {
            if ($value === "." || $value === ".." || is_file($value)) {
                unset($themes[$key]);
            } else {
                $finalThemes[] = $value;
            }
        }

        return array_values($finalThemes);
    }

    /**
     * Gets all the component script files
     * @param string $themeName
     * @return array
     */
    public function getComponents(string $themeName): array
    {
        if (empty($themeName)) {
            $themeName = "default";
        }

        $components = scandir(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."components");

        $finalComponents = [];
        foreach ($components as $key => $value) {
            if (strpos($value,'.js') !== false && $value !== "." && $value !== ".." && is_file(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."components".DIRECTORY_SEPARATOR.$value)) {
                $finalComponents[] =  TINA4_BASE_URL."/themes/".$themeName."/components/".$value;
            }
        }

        return $finalComponents;
    }

    /**
     * @param string $themeName
     * @return array
     */
    public function getBlocks(string $themeName): array
    {
        if (empty($themeName)) {
            $themeName = "default";
        }

        $blocks = scandir(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."blocks");

        $finalBlocks = [];
        foreach ($blocks as $key => $value) {
            if (strpos($value,'.js') !== false && $value !== "." && $value !== ".." && is_file(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."blocks".DIRECTORY_SEPARATOR.$value)) {
                $finalBlocks[] =  TINA4_BASE_URL."/themes/".$themeName."/blocks/".$value;
            }
        }

        return $finalBlocks;
    }

    public function getScripts(string $themeName): string
    {
        if (empty($themeName)) {
            $themeName = "default";
        }

        $scripts = scandir(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."js");

        $finalScripts = [];
        foreach ($scripts as $key => $value) {
            if (strpos($value,'.js') !== false && $value !== "." && $value !== ".." && is_file($value)) {
                $finalScripts[] =  TINA4_BASE_URL."/themes/".$themeName."/js/".$value;
            }
        }

        return json_encode($finalScripts);
    }

    public function getStyles(string $themeName) : string
    {
        if (empty($themeName)) {
            $themeName = "default";
        }

        $css = scandir(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."css");

        $finalCss = [];
        foreach ($css as $key => $value) {
            if (strpos($value,'.css') !== false && $value !== "." && $value !== ".." ) {
                $finalCss[] =  TINA4_BASE_URL."/themes/".$themeName."/css/".$value;
            }
        }

        $finalCss[] = TINA4_BASE_URL.'/css/default.css';
        $finalCss[] = TINA4_BASE_URL.'/css/page-builder.css';

        return json_encode($finalCss);
    }

    /**
     * Gets the relative path to the theme for use in templates - see {{Theme.Dir(site.theme)}
     * @param string $themeName
     * @return string
     */
    public function getDir(string $themeName): string
    {
        return "/themes/".$themeName;
    }

    /**
     * Gets the absolute path to the theme folder
     * @param string $themeName
     * @return string
     */
    public function getPath(string $themeName): string
    {
        return TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName;
    }

}