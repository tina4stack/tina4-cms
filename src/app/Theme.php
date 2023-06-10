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
        echo $path;
    }
}