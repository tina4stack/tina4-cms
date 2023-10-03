editor.Components.addType('cms-article', {
    model: {
        init() {
            const component = this;
            fetch('/cms/page-builder/cms-articles')
                .then(async function(response) {
                    const data = await response.json();
                    let options = [];
                    data.forEach(function(option){
                        options.push({id: option.id, name: option.title});
                    });
                    component.getTrait('cms-article').set('options', options);
                    component.on('change:attributes', component.handleEvent);
                });

        },
        handleEvent() {
            //Render the component when attributes get changed
            const component = editor.getSelected();
            this.view.onRender({el: component.getEl()});
        },
        defaults: {
            function() {
                //any scripts here that need to be run?
            },
            traits: [
                {
                    type: 'select', // Type of the trait
                    label: 'Article', // The label you will see in Settings
                    name: 'cms-article', // The name of the attribute/property to use on component
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            const articleId = this.model.getTrait('cms-article').attributes.value;
            el.innerHTML = '<b>Rendering an article</b>';
            fetch('/cms/page-builder/cms-articles/render?id='+articleId)
                .then(async function(response) {
                    const data = await response.text();
                    el.innerHTML = data;
                });
        },
    },
});

editor.Blocks.add('cms-article', {
    label: 'Article Block',
    category: 'Articles',
    media:`
     `,
    content: '<span data-gjs-type="cms-article">Article Content</span>',
});

