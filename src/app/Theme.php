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

    private function deployAssets()
    {

    }

    private function deployCss()
    {
        \Tina4\Utilities::getFiles();
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
     * @return void
     */
    public function deployThemes($path)
    {
        \Tina4\Utilities::recurseCopy($path.DIRECTORY_SEPARATOR."src".DIRECTORY_SEPARATOR."templates".DIRECTORY_SEPARATOR."themes", TINA4_DOCUMENT_ROOT."src".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."themes");
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
            if (strpos($value,'.css') !== false && $value !== "." && $value !== ".." && is_file($value)) {
                $finalCss[] =  "/themes/".$themeName."/css/".$value;
            }
        }

        $finalCss[] = '/css/default.css';

        return json_encode($finalCss);
    }

    public function getDir(string $themeName): string
    {
        return "/themes/".$themeName;
    }

}