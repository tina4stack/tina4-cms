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
        <svg fill="#000000" viewBox="0 0 32 32" id="icon"><defs><style>.cls-1{fill:none;}</style></defs><rect x="4" y="24" width="24" height="2"/><path d="M26,18H6V14H26v4m2,0V14a2,2,0,0,0-2-2H6a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2Z"/><rect x="4" y="6" width="24" height="2"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32" transform="translate(32) rotate(90)"/></svg>
    `,
    content: { type: 'bs-row'},
    activate: true,
});