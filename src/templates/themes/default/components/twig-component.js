editor.Components.addType('twig-component', {
    model: {
        init() {
            const component = this;
             fetch('/cms/page-builder/twig-templates')
                .then(async function(response) {
                    const data = await response.json();
                    let options = [];
                    data.forEach(function(option){
                        options.push({id: option.id, name: option.title});
                    });
                    component.getTrait('twig-view').set('options', options);
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
                    label: 'Template', // The label you will see in Settings
                    name: 'twig-view', // The name of the attribute/property to use on component
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            const template = this.model.getTrait('twig-view').attributes.value;
            el.innerHTML = '<!--twig-include '+template+' --><b>Rendering '+template+'</b><!--/twig-include '+template+' -->';
            fetch('/cms/page-builder/twig-templates/render?id='+template)
                .then(async function(response) {
                    const data = await response.text();
                    el.innerHTML = data;
                });
        },
    },
});

editor.Blocks.add('twig-component', {
    label: 'Twig Snippet',
    category: 'Snippets',
    media: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M31.92 16.58c.3-.69.5-1.14.57-1.49.12-.5-.11-1.1-.54-1.4-.48-.34-1.14-.34-1.64 0-2.14 1.48-3.75 3.38-4.98 5.43-1.47-3.84-3.52-6.85-6.11-8.96-.47-.38-1.13-.42-1.64-.11-.49.3-.74.86-.63 1.4.07.36.23.81.44 1.43.7 2 2.01 5.76 1.7 10.84-1.27-1.79-2.93-3.44-5.12-4.63-.5-.25-1.09-.19-1.52.16-.38.31-.58.91-.45 1.38.01.04.02.08.04.12 1.41 3.67 2.34 7.51 2.77 11.41h-.09c-.29 0-.58-.07-.83-.23-.58-.37-1.35-.21-1.73.37s-.21 1.35.37 1.73c.64.42 1.38.63 2.11.63 1.37 0 2.15-.5 2.7-.88.41-.29.61-.43 1.16-.43s.75.14 1.16.43c.53.37 1.26.88 2.59.88.14 0 .25-.03.38-.04.04 0 .08.03.12.03h.04c.2 0 .38-.06.54-.14.67-.18 1.14-.48 1.5-.73.41-.29.61-.43 1.16-.43s.75.14 1.16.43c.42.29.98.66 1.83.81h.01c.22.04.44.07.7.07.82.01 1.59-.2 2.26-.63.58-.38.75-1.15.37-1.73-.38-.58-1.15-.74-1.73-.37-.17.11-.37.17-.58.2-1.92-6.7.73-12.86 1.9-15.56Zm-11.04-.83c1.18 1.81 2.14 4 2.89 6.52-1 2.48-1.57 4.98-1.87 7.12-.21-.64-.46-1.3-.74-1.97.9-4.81.42-8.78-.27-11.67ZM18.5 30.86c-.53 0-.94.09-1.31.21-.33-2.6-.86-5.16-1.6-7.67 2.28 2.32 3.53 5.34 4.2 7.66-.36-.12-.77-.21-1.29-.21Zm7.49 0c-.8 0-1.36.19-1.81.41.32-3.31 1.27-8.15 4-11.99-1.01 3.06-1.86 7.21-1 11.75-.34-.1-.72-.18-1.19-.18ZM9.65 8.23c.69-.03 1.23-.61 1.2-1.3-.03-.69-.62-1.22-1.3-1.2-2.21.09-3.93 1.95-3.86 4.11v7.07c.02 1.7-.79 3.32-2.15 4.33-.32.24-.5.61-.5 1s.19.77.5 1a5.321 5.321 0 0 1 2.15 4.35v7.01a4.025 4.025 0 0 0 3.86 4.16h.05a1.251 1.251 0 0 0 .05-2.5c-.83-.03-1.48-.74-1.45-1.61v-7.04a7.87 7.87 0 0 0-2.05-5.36A7.864 7.864 0 0 0 8.2 16.9V9.8c-.03-.83.62-1.54 1.45-1.57ZM40.95 21.25a5.349 5.349 0 0 1-2.15-4.35V9.89a4.025 4.025 0 0 0-3.86-4.16 1.252 1.252 0 0 0-.1 2.5c.83.03 1.48.74 1.45 1.61v7.04a7.87 7.87 0 0 0 2.05 5.36 7.864 7.864 0 0 0-2.05 5.35v7.1c.03.83-.62 1.54-1.45 1.57a1.251 1.251 0 0 0 .05 2.5h.05c2.21-.09 3.93-1.95 3.86-4.11v-7.07c-.02-1.7.79-3.32 2.15-4.33.32-.24.5-.61.5-1s-.19-.77-.5-1Z" style="fill:#515962;stroke-width:0"/></svg>
    `,
    content: '<span data-gjs-type="twig-component">Twig Template</span>',
});