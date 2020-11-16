# Tina4 Module Development

## The composer file setup for module development

The Example here is for how I am testing the tina4 module.
You would obviously replace ```"andrevanzuydam/tina4module"``` with your own module name.
```
{
    "require": {
        "andrevanzuydam/tina4php": "v.1.10",
        "andrevanzuydam/tina4module": "@dev"
    },
    "repositories": [
        {
            "type": "path",
            "url": "../tina4-module",
            "options": {
                "symlink": true
            }
        }
    ]
}
```
## Some things to remember at this point in time

- Module naming on objects will clash with your main project so should be unique
- Module routes will also clash with the main project so should be unique
