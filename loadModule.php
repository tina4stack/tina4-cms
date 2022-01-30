<?php
\Tina4\Module::addModule("CMS Module", "1.0.0", "tina4cms", static function (\Tina4\Config $config) {
    (new Content())->addConfigMethods($config);
});