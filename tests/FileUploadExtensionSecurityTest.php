<?php

/**
 * Tina4 - This is not a 4ramework.
 * Copy-right 2007 - current Tina4
 * License: MIT https://opensource.org/licenses/MIT
 */

declare(strict_types=1);

namespace Tina4Cms\Tests;

use Content;
use PHPUnit\Framework\TestCase;

/**
 * The content file browser (POST /content/file/upload) must never store an
 * executable/interpretable file. It writes into the web-reachable ./uploads/
 * directory, so a stored "shell.php" would be executed by the web server (RCE).
 * Content::isAllowedUploadExtension is the allow-list gate the route uses.
 *
 * Pure-logic unit test, no doubles — the method has no dependencies.
 */
final class FileUploadExtensionSecurityTest extends TestCase
{
    /**
     * @return array<string, array{0:string}>
     */
    public static function dangerousNames(): array
    {
        $names = [
            "shell.php", "shell.PHP", "shell.Php", "x.php3", "x.php4", "x.php5",
            "x.php7", "x.phtml", "x.pht", "x.phar", "x.phps", "x.phpt",
            "x.inc", "x.cgi", "x.pl", "x.py", "x.sh", "x.lua", "x.rb",
            "x.htaccess", "x.htm", "x.html", "x.xhtml", "x.shtml",
            ".php", "noextension", "trailingdot.",
        ];
        $out = [];
        foreach ($names as $n) {
            $out[$n] = [$n];
        }
        return $out;
    }

    /**
     * @dataProvider dangerousNames
     */
    public function testRejectsExecutableOrScriptUploads(string $fileName): void
    {
        $this->assertFalse(
            Content::isAllowedUploadExtension($fileName),
            "must refuse to store: {$fileName}"
        );
    }

    /**
     * @return array<string, array{0:string}>
     */
    public static function safeNames(): array
    {
        $names = [
            "photo.jpg", "photo.JPEG", "image.png", "anim.gif", "icon.svg",
            "pic.webp", "doc.pdf", "sheet.xlsx", "deck.pptx", "notes.txt",
            "data.csv", "clip.mp4", "song.mp3", "archive.zip",
        ];
        $out = [];
        foreach ($names as $n) {
            $out[$n] = [$n];
        }
        return $out;
    }

    /**
     * @dataProvider safeNames
     */
    public function testAllowsNonExecutableAssets(string $fileName): void
    {
        $this->assertTrue(
            Content::isAllowedUploadExtension($fileName),
            "must allow: {$fileName}"
        );
    }

    public function testDoubleExtensionIsJudgedByTheFinalExtensionOnly(): void
    {
        // "php" is neutralised because the FINAL extension is the safe "jpg".
        $this->assertTrue(Content::isAllowedUploadExtension("shell.php.jpg"));
        // A trailing executable extension is refused even behind a safe-looking one.
        $this->assertFalse(Content::isAllowedUploadExtension("image.jpg.php"));
    }
}
