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
    <svg viewBox="0 0 32 32" >
    <path d="M4.574,5.463c.262.4,2.5-1.608,4.454-1.161,2.061.472,4.014,3.724,4.848,13.7a40.18,40.18,0,0,1,3.541,3.61q.53.614,1.013,1.22a11.847,11.847,0,0,1,.229-1.4,12.3,12.3,0,0,1,1.981-4.4A19.151,19.151,0,0,0,17.272,7.9c-1.03-1.445-4.6-6.478-8.546-5.843C6.182,2.465,4.3,5.054,4.574,5.463Z" style="fill:#63bf6a"/>
    <path d="M24.4,30c-.32-2.567-.448-4.76-.5-6.449-.094-3.232.1-4.541.9-5.756.193-.295,1.288-1.975,2.58-1.863,1.466.128,2.213,2.414,2.362,2.337.175-.09-.36-3.543-2.532-4.431-2.6-1.063-6.312,2.07-7.8,5.154a12.223,12.223,0,0,0-.857,2.81,32.555,32.555,0,0,0-.71,8.2Z" style="fill:#74d74d"/>
    <path d="M2.238,13.935c.145-.447,2.468-.259,4.54.293,2.5.666,7,2.344,11.651,8.606A12.544,12.544,0,0,1,20.279,30H10.386a21.875,21.875,0,0,0-.175-4.62,14.9,14.9,0,0,0-2.459-7.158C5.441,15.159,2.055,14.5,2.238,13.935Z" style="fill:#78dc50"/>
    <path d="M17.3,21.323a1.753,1.753,0,1,1-.513-1.24A1.748,1.748,0,0,1,17.3,21.323Z" style="fill:#fff"/>
    <path d="M21.975,21.323a1.753,1.753,0,1,1-.513-1.24A1.748,1.748,0,0,1,21.975,21.323Z" style="fill:#fff"/>
    </svg>
    `,
    content: '<div data-gjs-type="twig-component">Twig Template</div>',
});