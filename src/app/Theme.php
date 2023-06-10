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


    public function getScripts() {
        $scripts = ['hello.js'];
        return json_encode($scripts);
    }

    public function getStyles() {


        $scripts = ['/css/default.css'];
        return json_encode($scripts);
    }
}