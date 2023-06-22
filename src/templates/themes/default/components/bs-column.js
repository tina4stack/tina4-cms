editor.Components.addType('bs-column', {
    model: {
        init() {
            this.on('change:attributes', this.handleEvent);
        },
        handleEvent() {
            //Render the component when attributes get changed
            const component = editor.getSelected();
            this.view.onRender({el: component.getEl()});
        },
        defaults: {
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
    category: 'Bootstrap',
    media: `
    <svg fill="#000000" viewBox="0 0 32 32" ><defs><style>.cls-1{fill:none;}</style></defs><title>column</title><rect x="24" y="4" width="2" height="24"/><path d="M18,6V26H14V6h4m0-2H14a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z"/><rect x="6" y="4" width="2" height="24"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>
    `,
    content: { type: 'bs-column', content: ''},
    activate: true,
});