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
    <svg fill="#000000" viewBox="0 0 36 36">
    <path d="M32,30H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H32a2,2,0,0,1,2,2V28A2,2,0,0,1,32,30ZM4,8V28H32V8Z" class="clr-i-outline clr-i-outline-path-1"></path><path d="M9,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,9,25.3Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M14.92,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,14.92,25.3Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M21,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,21,25.3Z" class="clr-i-outline clr-i-outline-path-4"></path><path d="M27,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,27,25.3Z" class="clr-i-outline clr-i-outline-path-5"></path>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
    </svg>
    `,
    content: { type: 'bs-container'},
    activate: true,
});