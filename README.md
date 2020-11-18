# Tina4 CMS Module

Happy you have decided to try this, how does it work?

```
composer require andrevanzuydam/tina4php
composer require andrevanzuydam/tina4cms
php -S localhost:8080 index.php
```

http://localhost:8080/cms/login -> will get you started

### Customization

Make a new base.twig file in your templates folder, it needs the following blocks

```
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>

    <meta prefix="og: https://ogp.me/ns#" property="og:title" content="Darts Group - {{ title }}"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:type" content="website"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:url" content="{{ url }}"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:image" content="{{ image }}"/>
    <meta prefix="og: https://ogp.me/ns#" property="og:description" content="{{ description }}"/>
    {% block headers %}
    {% endblock %}
</head>
<body>
<div class="container">
    {% block navigation %}
        {% include "navigation.twig" %}
    {% endblock %}

    <div class="row">
        {% block content %}
        {% endblock %}
    </div>
    {% block footer %}
    {% endblock %}
</div>

</body>


```