editor.Components.addType('bs-column', {
    tagName: 'div',
    model: {
        init() {
            this.on('change:attributes', this.handleEvent);
        },
        handleEvent() {
            this.getEl().setStyle('padding: 10px; border: 1px dashed blue;');
        },
        defaults: {
            script: function() {
                // console.log('Script', this);
                this.style = 'padding: 10px; border: 1px dashed blue;';
            },
            traits: [
                {
                    type: 'select', // Type of the trait
                    label: 'Class', // The label you will see in Settings
                    name: 'class', // The name of the attribute/property to use on component
                    value: 'col',
                    options: [
                        {id: "col", name: "Column"},
                        {id: "col-1", name: "Column 1"},
                        {id: "col-2", name: "Column 2"},
                        {id: "col-3", name: "Column 3"},
                        {id: "col-4", name: "Column 4"},
                        {id: "col-5", name: "Column 5"},
                        {id: "col-6", name: "Column 6"},
                        {id: "col-7", name: "Column 7"},
                        {id: "col-8", name: "Column 8"},
                        {id: "col-9", name: "Column 9"},
                        {id: "col-10", name: "Column 10"},
                        {id: "col-11", name: "Column 11"},
                        {id: "col-12", name: "Column 12"}
                    ]
                }
            ]
        }
    }
});

editor.Blocks.add('bs-column', {
    label: 'Column',
    category: 'Bootstrap - Layout',
    media: `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M23.14 38.72h-1.79c-2.6 0-4.72-2.12-4.72-4.72V10.5c0-2.6 2.12-4.72 4.72-4.72h1.79c2.6 0 4.72 2.12 4.72 4.72v23.51c0 2.6-2.12 4.72-4.72 4.72ZM21.35 8.28c-1.22 0-2.22.99-2.22 2.22v23.51c0 1.22.99 2.22 2.22 2.22h1.79c1.22 0 2.22-.99 2.22-2.22V10.5c0-1.22-.99-2.22-2.22-2.22h-1.79ZM9.44 38.72H7.17a1.25 1.25 0 0 1 0-2.5h2.26c.15.01.28-.02.41-.05.67-.18 1.35.22 1.53.89.18.67-.22 1.35-.89 1.53-.34.09-.69.14-1.04.14Zm2.82-5.12c-.69 0-1.25-.56-1.25-1.25v-3a1.25 1.25 0 0 1 2.5 0v3c0 .69-.56 1.25-1.25 1.25Zm0-9c-.69 0-1.25-.56-1.25-1.25v-3a1.25 1.25 0 0 1 2.5 0v3c0 .69-.56 1.25-1.25 1.25Zm0-9c-.69 0-1.25-.56-1.25-1.25v-3a1.25 1.25 0 0 1 2.5 0v3c0 .69-.56 1.25-1.25 1.25ZM9.37 8.28h-3a1.25 1.25 0 0 1 0-2.5h3a1.25 1.25 0 0 1 0 2.5ZM38.14 38.72h-3a1.25 1.25 0 0 1 0-2.5h3a1.25 1.25 0 0 1 0 2.5Zm-5.9-4.31c-.69 0-1.25-.56-1.25-1.25v-3a1.25 1.25 0 0 1 2.5 0v3c0 .69-.56 1.25-1.25 1.25Zm0-9c-.69 0-1.25-.56-1.25-1.25v-3a1.25 1.25 0 0 1 2.5 0v3c0 .69-.56 1.25-1.25 1.25Zm0-9c-.69 0-1.25-.56-1.25-1.25v-3a1.25 1.25 0 0 1 2.5 0v3c0 .69-.56 1.25-1.25 1.25Zm2.09-8.03c-.55 0-1.06-.37-1.21-.93-.18-.67.22-1.35.88-1.53.34-.09.7-.14 1.06-.14h2.26a1.25 1.25 0 0 1 0 2.5h-2.26c-.14 0-.28.02-.41.05-.11.03-.22.04-.32.04Z" style="fill:#515962;stroke-width:0"/></svg>
    `,
    content: { type: 'bs-column'},
    activate: true,
});