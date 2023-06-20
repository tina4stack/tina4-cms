const script = function() {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', this);
};

// Define a new custom component
editor.Components.addType('example-component', {
    model: {
        defaults: {
            script,
            // Add some style, just to make the component visible
            style: {
                width: '100px',
                height: '100px',
                background: 'red',
            }
        }
    }
});

// Create a block for the component, so we can drop it easily
editor.Blocks.add('test-block', {
    label: 'Test block',
    attributes: { class: 'fa fa-text' },
    content: { type: 'example-component' },
});