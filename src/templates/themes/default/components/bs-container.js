editor.Components.addType('bs-container', {
    tagName: 'div',
    model: {
        init() {
            this.on('change:attributes', this.handleEvent);
        },
        handleEvent(component) {
            //Render the component when attributes get changed
            this.view.onRender({el: component});
        },
        defaults: {
            script: function() {
                this.style = 'border:2px dashed blue; height: 100vh; padding: 5px; margin: 5px;';
            },
            draggable: 'body, body *',
            traits: [
                {
                    type: 'select', // Type of the trait
                    label: 'Class', // The label you will see in Settings
                    name: 'class', // The name of the attribute/property to use on component
                    options: [
                        {id:"container-fluid", name:"Container Fluid"},
                        {id:"container", name:"Container"},
                        {id:"container-sm", name:"Container Sm"},
                        {id:"container-md", name:"Container Md"},
                        {id:"container-lg", name:"Container Lg"},
                        {id:"container-xl", name:"Container Xl"},
                        {id:"container-xxl", name:"Container Xxl"},
                    ],
                    value: 'container-fluid'
                }
            ]
        }
    },
    view: {
        onRender({el}) {
            if (el.ccid) {
                throw('No render');
            }
        }
    }
});

editor.Blocks.add('bs-container', {
    label: 'Container',
    category: 'Bootstrap - Layout',
    media: `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M36.29 4.1H8.21C5.94 4.1 4.1 5.95 4.1 8.22V36.3c0 2.27 1.85 4.12 4.11 4.12h28.08c2.27 0 4.12-1.85 4.12-4.12V8.21c0-2.27-1.85-4.12-4.12-4.12Zm1.62 32.19c0 .89-.72 1.62-1.62 1.62H8.21c-.89 0-1.61-.72-1.61-1.62V8.21c0-.89.72-1.62 1.61-1.62h28.08c.89 0 1.62.72 1.62 1.62v28.08Z" style="fill:#515962;stroke-width:0"/><path d="M12.57 32.17a.643.643 0 0 1-.33-.57v-.97a1.25 1.25 0 0 0-2.5 0v.97c0 1.12.6 2.16 1.56 2.73.2.12.42.17.63.17.43 0 .85-.22 1.08-.62.35-.6.15-1.36-.45-1.71ZM10.99 26.95c.69 0 1.25-.56 1.25-1.25v-2.96a1.25 1.25 0 0 0-2.5 0v2.96c0 .69.56 1.25 1.25 1.25ZM10.99 19.06c.69 0 1.25-.56 1.25-1.25v-2.96a1.25 1.25 0 0 0-2.5 0v2.96c0 .69.56 1.25 1.25 1.25ZM28.68 12.24h2.91l.05-1.25-.04-1.25h-2.92a1.25 1.25 0 0 0 0 2.5ZM12.9 12.24h2.96a1.25 1.25 0 0 0 0-2.5h-2.98c-.69 0-1.24.56-1.24 1.25s.57 1.25 1.26 1.25ZM20.79 12.24h2.96a1.25 1.25 0 0 0 0-2.5h-2.96a1.25 1.25 0 0 0 0 2.5ZM33.51 21.51c-.69 0-1.25.56-1.25 1.25v2.96a1.25 1.25 0 0 0 2.5 0v-2.96c0-.69-.56-1.25-1.25-1.25ZM33.51 13.62c-.69 0-1.25.56-1.25 1.25v2.96a1.25 1.25 0 0 0 2.5 0v-2.96c0-.69-.56-1.25-1.25-1.25ZM33.51 29.4c-.69 0-1.25.56-1.25 1.25v.96c0 .24-.12.45-.33.57-.6.35-.8 1.11-.46 1.71.23.4.65.62 1.08.62.21 0 .43-.05.62-.17.98-.56 1.58-1.61 1.58-2.74v-.96c0-.69-.56-1.25-1.25-1.25ZM19.78 32.26h-2.96a1.25 1.25 0 0 0 0 2.5h2.96a1.25 1.25 0 0 0 0-2.5ZM27.67 32.26h-2.96a1.25 1.25 0 0 0 0 2.5h2.96a1.25 1.25 0 0 0 0-2.5Z" style="fill:#515962;stroke-width:0"/></svg>
    `,
    content: { type: 'bs-container'},
    activate: true,
});