<?php
/**
 * The Theme component is used to validate and deploy theme changes, it keeps track of the theme using an md5 hash of a json file containing all the hashes of the files
 * User: andre
 * Date: 2017/07/08
 * Time: 10:41 PM
 */
class Theme
{
    private $themeName = "";
    private $themePath = "";
    private $deployPath = "";
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

    public function injectIncludes(string $content)
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

        $re = '/cms-content="(.*)"(.*)Page Content<\/(span|div|ul)>/mUs';

        preg_match_all($re, $content, $matches, PREG_SET_ORDER, 0);
        foreach ($matches as $id => $match) {
            $matchText = $match[0];
            $id = trim($match[1]);
            $matchText = str_replace("Page Content", '[TINA4CMS_PAGE_CONTENT]', $matchText);

            $content = str_replace($match[0], $matchText, $content);
        }


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

    }
    public function validateTheme()
    {

    }

    public function deployTheme()
    {

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
        $components = scandir(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."components");

        $finalComponents = [];
        foreach ($components as $key => $value) {
            if (strpos($value,'.js') !== false && $value !== "." && $value !== ".." && is_file(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."components".DIRECTORY_SEPARATOR.$value)) {
                $finalComponents[] =  "/themes/".$themeName."/components/".$value;
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
        $blocks = scandir(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."blocks");

        $finalBlocks = [];
        foreach ($blocks as $key => $value) {
            if (strpos($value,'.js') !== false && $value !== "." && $value !== ".." && is_file(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."blocks".DIRECTORY_SEPARATOR.$value)) {
                $finalBlocks[] =  "/themes/".$themeName."/blocks/".$value;
            }
        }

        return $finalBlocks;
    }

    public function getScripts(string $themeName): string
    {
        $scripts = scandir(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."js");

        $finalScripts = [];
        foreach ($scripts as $key => $value) {
            if (strpos($value,'.js') !== false && $value !== "." && $value !== ".." && is_file($value)) {
                $finalScripts[] =  "/themes/".$themeName."/js/".$value;
            }
        }

        return json_encode($finalScripts);
    }

    public function getStyles(string $themeName) : string
    {
        $css = scandir(TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes".DIRECTORY_SEPARATOR.$themeName.DIRECTORY_SEPARATOR."css");

        $finalCss = [];
        foreach ($css as $key => $value) {
            if (strpos($value,'.css') !== false && $value !== "." && $value !== ".." ) {
                $finalCss[] =  "/themes/".$themeName."/css/".$value;
            }
        }

        $finalCss[] = '/css/default.css';
        $finalCss[] = '/css/page-builder.css';

        return json_encode($finalCss);
    }

    public function getDir(string $themeName): string
    {
        return "/themes/".$themeName;
    }

}