editor.Components.addType('bs-row', {
    tagName: 'div',
    model: {
        init() {
            this.setStyle('display: flex;');
            this.on('change:attributes', this.handleEvent);
        },
        handleEvent() {
            this.style = 'padding: 10px; border: 1px dashed blue;';
        },
        defaults: {
            isComponent: el => {return 'text'},
            script: function() {
                // console.log('Script', this);
                this.style = 'padding: 10px; border: 1px dashed blue;';
            },
            draggable: 'div, div *',
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Class', // The label you will see in Settings
                    name: 'class', // The name of the attribute/property to use on component
                    value: 'row'
                }
            ]
        }
    }
});

editor.Blocks.add('bs-row', {
    label: 'Row',
    category: 'Bootstrap - Layout',
    media: `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M33.97 28.5h-23.5c-2.6 0-4.72-2.12-4.72-4.72v-1.79c0-2.6 2.12-4.72 4.72-4.72h23.51c2.6 0 4.72 2.12 4.72 4.72v1.79c0 2.6-2.12 4.72-4.72 4.72Zm-23.51-8.72c-1.22 0-2.22.99-2.22 2.22v1.79c0 1.22.99 2.22 2.22 2.22h23.51c1.22 0 2.22-.99 2.22-2.22V22c0-1.22-.99-2.22-2.22-2.22h-23.5ZM33.13 14.15h-3a1.25 1.25 0 0 1 0-2.5h3a1.25 1.25 0 0 1 0 2.5Zm-9 0h-3a1.25 1.25 0 0 1 0-2.5h3a1.25 1.25 0 0 1 0 2.5Zm-9 0h-3a1.25 1.25 0 0 1 0-2.5h3a1.25 1.25 0 0 1 0 2.5ZM7.1 12.06c-.55 0-1.06-.37-1.21-.93-.09-.34-.14-.7-.14-1.05V7.82a1.25 1.25 0 0 1 2.5 0v2.26c0 .14.02.28.05.41.18.67-.22 1.35-.88 1.53-.11.03-.22.04-.33.04Zm30.34-.81c-.69 0-1.25-.56-1.25-1.25V7a1.25 1.25 0 0 1 2.5 0v3c0 .69-.56 1.25-1.25 1.25ZM7 40.02c-.69 0-1.25-.56-1.25-1.25v-3a1.25 1.25 0 0 1 2.5 0v3c0 .69-.56 1.25-1.25 1.25Zm30.44-.82c-.69 0-1.25-.56-1.25-1.25v-2.26c0-.14-.02-.28-.05-.41-.18-.67.22-1.35.88-1.53.67-.18 1.35.22 1.53.88.09.34.14.69.14 1.05v2.26c0 .69-.56 1.25-1.25 1.25Zm-5.13-5.08h-3a1.25 1.25 0 0 1 0-2.5h3a1.25 1.25 0 0 1 0 2.5Zm-9 0h-3a1.25 1.25 0 0 1 0-2.5h3a1.25 1.25 0 0 1 0 2.5Zm-9 0h-3a1.25 1.25 0 0 1 0-2.5h3a1.25 1.25 0 0 1 0 2.5Z" style="fill:#515962;stroke-width:0"/><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/></svg>
    `,
    content: { type: 'bs-row'},
    activate: true,
});