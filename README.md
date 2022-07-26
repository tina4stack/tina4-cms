# Tina4 CMS Module

Welcome to the Tina4CMS module, how does it work?

```
composer require tina4stack/tina4cms

composer exec tina4 initialize:run
```

Add the database connection to your index.php file which would have been created

```
require_once "vendor/autoload.php";

global $DBA;

$DBA = new \Tina4\DataSQLite3("test.db","", "", "d/m/Y");

echo new \Tina4\Tina4Php();
```

Run the CMS
```commandline
composer start 8080
```

Open up the CMS to setup the admin user

http://localhost:8080/cms/login -> will get you started

### The Landing Page - home

You need to create a landing page called "home" as your starting page for things to working properly.

### Customization

Make a  *base.twig* file in your */src/templates* folder, it needs the following blocks
```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>{{ title }}</title>
    <meta prefix="og: https://ogp.me/ns#" property="og:title" content="{{ title }}"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:type" content="website"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:url" content="{{ url }}"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:image" content="{{ image }}"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:description" content="{{ description }}"/>
{% block headers %}
    <link rel="stylesheet" type="text/css" href="/src/public/css/default.css">
{% endblock %}
</head>
{% block body %}
<body>
{% block navigation %}
    {% include "navigation.twig" %}
{% endblock %}

{% block content %}
{% endblock %}

{% block footer %}
{% endblock %}
</body>
{% endblock %}
</html>
```
or an example which extends the existing base in the tina4-cms
```
{% extends "@tina4cms/base.twig" %}

{% block headers %}
    <link rel="stylesheet" type="text/css" href="/src/templates/css/default.css">
{% endblock %}

{% block body %}
<body>
    <div class="content">
{% block navigation %}
    {%  include "navigation.twig" %}
{% endblock %}

{% block content %}
{% endblock %}
    </div>
</body>
{% endblock %}
```


#### Example of a navigation.twig which you can over write
Create a *navigation.twig* file in your *src/templates* folder
```
{% set menus = Content.getMenu("") %}
<nav>
    <ul>
        {% for menu in menus %}
            <li><a href="{{ menu.url }}">{{ menu.name }}</a>
                {% if menu.children %}
                    <ul>
                        {% for childmenu in menu.children %}
                            <li>
                                <a href="{{ childmenu.url }}">{{ childmenu.name }}</a>
                            </li>
                        {% endfor %}
                    </ul>
                {% endif %}
            </li>
        {% endfor %}
    </ul>
</nav>
```

### Including your snippets in the CMS
 
There are two ways you can do this:

When you want to include content as it is, and not have the snippet parsed with Twig you can simply use the following:
Use the raw filter when you want to have scripts or other things included correctly
```
{{snippetName | raw}} or {{snippetName}}
```

The following is how you would include a snippet where you want variables in the page for example parsed in the snippet
```
{{ include(getSnippet("snippetName")) }}
```

#### Example:

Page content of "home"
```
  {% set world = "World!" %}
  
  {{ include (getSnippet("mySnippet")) }}
```

Snippet content of "mySnippet"
```
  Hello {{world}}!
  
```

Adding articles into a page
```
{% set articles = Content.getArticles ("", 8) %}
{% for article in articles %}{% include "snippets/medium.twig" with {"article": article} %}{% endfor %}
{% set params = {"tag": "all", "skip": 4, "limit": 4, "template": "medium.twig"} %}
{% include "load-more.twig" with params %}
```

Overwriting the default CMS twig namespace - your own namespace
```
CMS_TWIG_NAMESPACE=""
```
