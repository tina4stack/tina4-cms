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
 * Security behaviour of the CMS content helpers:
 *  - renderSandboxedContent must execute user-authored page content inside a
 *    Twig sandbox: layout works, but template-injection RCE vectors are blocked
 *    and reflected request values are auto-escaped.
 *  - hasUnsafeScssDirective must flag @import/@use/@forward that reach outside
 *    the project (URL / absolute / traversal).
 *
 * No mocks: the real Content methods and the real Twig sandbox.
 */
final class ContentSecurityTest extends TestCase
{
    /**
     * @return array<string, array{0:string}>
     */
    public static function sstiPayloads(): array
    {
        $payloads = [
            "filter-system"   => "{{ ['id']|filter('system') }}",
            "map-system"      => "{{ ['id']|map('system')|join('') }}",
            "self-env"        => "{{ _self.env.registerUndefinedFilterCallback('system') }}",
            "attribute-env"   => "{{ attribute(_self, 'env') }}",
            "constant"        => "{{ constant('PHP_VERSION') }}",
            "template-string" => "{{ include(template_from_string('{{7*7}}')) }}",
        ];
        $out = [];
        foreach ($payloads as $name => $payload) {
            $out[$name] = [$payload];
        }
        return $out;
    }

    /**
     * @dataProvider sstiPayloads
     */
    public function testSstiPayloadsAreBlocked(string $payload): void
    {
        // A blocked construct renders empty; it must never execute or leak.
        $output = Content::renderSandboxedContent($payload, []);
        $this->assertSame("", $output, "SSTI payload must be blocked: {$payload}");
        $this->assertStringNotContainsString("49", $output);
    }

    public function testLegitLayoutRenders(): void
    {
        $output = Content::renderSandboxedContent(
            "<h1>{{ title }}</h1>{% for item in article.list %}<li>{{ item }}</li>{% endfor %}",
            ["title" => "Hello", "article" => ["list" => ["a", "b"]]]
        );
        $this->assertSame("<h1>Hello</h1><li>a</li><li>b</li>", $output);
    }

    public function testReflectedRequestValueIsAutoEscaped(): void
    {
        $output = Content::renderSandboxedContent(
            "{{ request.q }}",
            ["request" => ["q" => "<script>alert(1)</script>"]]
        );
        $this->assertStringNotContainsString("<script>", $output, "reflected value must be escaped");
        $this->assertStringContainsString("&lt;script&gt;", $output);
    }

    /**
     * @return array<string, array{0:string}>
     */
    public static function unsafeScss(): array
    {
        $cases = [
            'http'          => '@import "http://evil.example/x";',
            'protocol-rel'  => "@import '//evil.example/x';",
            'absolute'      => '@import "/etc/passwd";',
            'traversal'     => '@use "../../secret";',
            'forward-abs'   => '@forward "/var/www/secret";',
        ];
        $out = [];
        foreach ($cases as $name => $scss) {
            $out[$name] = [$scss];
        }
        return $out;
    }

    /**
     * @dataProvider unsafeScss
     */
    public function testUnsafeScssIsFlagged(string $scss): void
    {
        $this->assertTrue(Content::hasUnsafeScssDirective($scss), "must flag unsafe: {$scss}");
    }

    public function testSafeScssIsAllowed(): void
    {
        foreach (['@import "partials/buttons";', '.a { color: red; }', '@use "sass:math";', 'h1 { font-size: 2rem; }'] as $scss) {
            $this->assertFalse(Content::hasUnsafeScssDirective($scss), "must allow safe: {$scss}");
        }
    }
}
