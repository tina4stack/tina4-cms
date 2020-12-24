# Tina4 CMS Module

Happy you have decided to try this, how does it work?

```
composer require andrevanzuydam/tina4cms
php -S localhost:8080 index.php
```

Make the usual tina4 index.php file - we do need a database!

```
require_once "vendor/autoload.php";

global $DBA;

$DBA = new \Tina4\DataSQLite3("test.db","", "", "d/m/Y");

echo new \Tina4\Tina4Php();
```

Run the migrations

http://localhost:8080/migrate

Open up the CMS to setup the admin user

http://localhost:8080/cms/login -> will get you started

### The Landing Page - home

You need to create a landing page called "home" as your starting page for things to working properly.

### Customization

Make a new base.twig file in your templates folder, it needs the following blocks

```
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>

    <meta prefix="og: https://ogp.me/ns#" property="og:title" content="{{ title }}"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:type" content="website"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:url" content="{{ url }}"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:image" content="{{ image }}"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:description" content="{{ description }}"/>
    {% block headers %}
    {% endblock %}
</head>
<body>

{% block navigation %}
    {% include "navigation.twig" %}
{% endblock %}

{% block content %}
{% endblock %}

{% block footer %}
{% endblock %}

</body>

</html>
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
