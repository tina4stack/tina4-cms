editor.Components.addType('cms-snippet', {
    model: {
        init() {
            const component = this;
             fetch('/cms/page-builder/cms-snippets')
                .then(async function(response) {
                    const data = await response.json();
                    let options = [];
                    data.forEach(function(option){
                        options.push({id: option.id, name: option.title});
                    });
                    component.getTrait('cms-snippet').set('options', options);
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
                    label: 'Snippet', // The label you will see in Settings
                    name: 'cms-snippet', // The name of the attribute/property to use on component
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            const template = this.model.getTrait('cms-snippet').attributes.value;
            el.innerHTML = '<b>Rendering '+template+'</b>';
            fetch('/cms/page-builder/cms-snippets/render?id='+template)
                .then(async function(response) {
                    const data = await response.text();
                    el.innerHTML = data;
                });
        },
    },
});

editor.Blocks.add('cms-snippet', {
    label: 'CMS Snippet',
    category: 'Snippets',
    media: `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M11.25 21.85c-.69 0-1.34.27-1.83.76a2.601 2.601 0 0 0 0 3.67c.51.51 1.17.76 1.83.76s1.33-.25 1.83-.76a2.601 2.601 0 0 0 0-3.67c-.49-.49-1.14-.76-1.83-.76Zm.06 2.66s-.09.03-.13 0c-.04-.04-.04-.1 0-.13.02-.02.04-.02.06-.02s.05 0 .07.02c.04.04.04.09 0 .13Z" style="fill:#515962;stroke-width:0"/><path d="m22.4 17.86 8.53-8.53c.23-.23.37-.55.37-.88s-.13-.65-.37-.88a5.22 5.22 0 0 0-7.37 0l-5.73 5.73-1.02-1.02c.16-.92.1-1.88-.2-2.77a5.627 5.627 0 0 0-2.83-3.28 5.639 5.639 0 0 0-4.32-.32c-1.43.47-2.6 1.48-3.28 2.83a5.639 5.639 0 0 0-.32 4.32c.47 1.43 1.48 2.6 2.83 3.28 1.11.56 2.34.73 3.54.52l1.01 1.01-1.01 1.01c-1.2-.22-2.43-.04-3.54.52a5.632 5.632 0 0 0-2.83 3.28c-.47 1.43-.36 2.97.32 4.32a5.632 5.632 0 0 0 3.28 2.83c.58.19 1.18.29 1.78.29.87 0 1.74-.2 2.54-.61a5.632 5.632 0 0 0 2.83-3.28c.29-.89.36-1.85.2-2.77l1.02-1.02 5.73 5.73c1.02 1.02 2.35 1.52 3.68 1.52s2.67-.51 3.68-1.52c.23-.23.37-.55.37-.88s-.13-.65-.37-.88l-8.53-8.53Zm-8.88-3.28c-.33-.33-.83-.45-1.28-.3-.8.26-1.65.2-2.41-.18a3.175 3.175 0 0 1-1.58-1.83c-.27-.8-.2-1.66.18-2.41a3.153 3.153 0 0 1 4.24-1.4c.75.38 1.31 1.03 1.58 1.83.21.64.21 1.34 0 1.98-.15.45-.03.94.3 1.28l1.52 1.51-1.03 1.03-1.51-1.51Zm1.03 7.6c-.33.33-.45.83-.3 1.28.21.64.21 1.34 0 1.98-.26.8-.82 1.45-1.58 1.83a3.153 3.153 0 0 1-4.24-1.4c-.38-.75-.44-1.61-.18-2.41s.82-1.45 1.58-1.83c.45-.22.93-.34 1.42-.34.33 0 .67.05.99.16.45.15.94.03 1.28-.3l2.39-2.39 9.41-9.41c.74-.74 1.8-.96 2.73-.67L14.54 22.19Zm10.78 4.22-5.73-5.73 1.03-1.03 7.43 7.43c-.93.29-1.99.07-2.73-.67Z" style="fill:#515962;stroke-width:0"/><path d="M11.25 8.68c-.69 0-1.34.27-1.83.76a2.601 2.601 0 0 0 0 3.67c.51.51 1.17.76 1.83.76s1.33-.25 1.83-.76a2.601 2.601 0 0 0 0-3.67c-.49-.49-1.14-.76-1.83-.76Zm.06 2.66s-.09.03-.13 0c-.04-.04-.04-.1 0-.13.02-.02.04-.02.06-.02s.05 0 .07.02c.04.04.04.09 0 .13ZM20.16 36.34a.68.68 0 0 1-.46-.64v-.61a1.25 1.25 0 0 0-2.5 0v.61c0 1.36.86 2.56 2.15 3.01.13.05.27.07.41.07.52 0 1-.33 1.18-.84.22-.65-.12-1.36-.78-1.59ZM18.45 31.34c.69 0 1.25-.56 1.25-1.25v-3a1.25 1.25 0 0 0-2.5 0v3c0 .69.56 1.25 1.25 1.25ZM27.74 36.38h-3a1.25 1.25 0 0 0 0 2.5h3a1.25 1.25 0 0 0 0-2.5ZM28.25 14.02c0 .69.56 1.25 1.25 1.25h3a1.25 1.25 0 0 0 0-2.5h-3c-.69 0-1.25.56-1.25 1.25ZM37.64 29.46c-.69 0-1.25.56-1.25 1.25v3a1.25 1.25 0 0 0 2.5 0v-3c0-.69-.56-1.25-1.25-1.25ZM35.72 36.38h-2.98a1.25 1.25 0 0 0 0 2.5h3c.69 0 1.24-.56 1.24-1.25s-.57-1.25-1.26-1.25ZM38.25 14.04c-.42-.55-1.2-.66-1.75-.24-.55.42-.66 1.2-.24 1.75.06.08.14.22.14.41v1.75a1.25 1.25 0 0 0 2.5 0v-1.75c0-.7-.22-1.36-.64-1.92ZM37.64 21.46c-.69 0-1.25.56-1.25 1.25v3a1.25 1.25 0 0 0 2.5 0v-3c0-.69-.56-1.25-1.25-1.25Z" style="fill:#515962;stroke-width:0"/></svg>
    `,
    content: '<span data-gjs-type="cms-snippet">Snippet</span>',
});

