editor.Components.addType('cms-content', {
    model: {
        init() {
            const component = this;
            fetch('/cms/page-builder/cms-content')
                .then(async function(response) {
                    const data = await response.json();
                    let options = [];
                    data.forEach(function(option){
                        options.push({id: option.id, name: option.title});
                    });
                    component.getTrait('cms-content').set('options', options);
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
                    label: 'Page Name', // The label you will see in Settings
                    name: 'cms-content', // The name of the attribute/property to use on component
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            const pageName = this.model.getTrait('cms-content').attributes.value;
            el.innerHTML = '<b>Rendering '+pageName+'</b>';
            fetch('/cms/page-builder/cms-content/render?id='+pageName)
                .then(async function(response) {
                    const data = await response.text();
                    el.innerHTML = data;
                });
        },
    },
});

editor.Blocks.add('cms-content', {
    label: 'Content Block',
    category: 'Snippets',
    media:`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><rect width="12" height="29.17" x="6.83" y="7.67" rx="3.08" ry="3.08" style="fill:none;stroke:#515962;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px"/><rect width="13.33" height="17.67" x="24.33" y="7.67" rx="3.08" ry="3.08" style="fill:none;stroke:#515962;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px"/><rect width="13.33" height="6.17" x="24.33" y="30.67" rx="3.08" ry="3.08" style="fill:none;stroke:#515962;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px"/></svg>    
`,
    content: '<span data-gjs-type="cms-content">Page Content</span>',
});