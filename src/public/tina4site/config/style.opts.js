const styleManagerSectorsConst =
    [
        {
            name: 'Dimension ∇',
            open: false,
            buildProps: ['width', 'min-height', 'padding'],
            properties: [
                {
                    type: 'integer',
                    name: 'The width',
                    property: 'width',
                    units: ['px', '%'],
                    defaults: 'auto',
                    min: 0,
                },
            ],
        },
        {
            name: 'General ∇',
            open: false,
            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
        },
        {
            name: 'Flex ∇',
            open: false,
            buildProps: ['flex-direction', 'flex-wrap', 'justify-content', 'align-items', 'align-content', 'order', 'flex-basis', 'flex-grow', 'flex-shrink', 'align-self']
        },
        {
            name: 'Typography ∇',
            open: false,
            buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-shadow'],
        },
        {
            name: 'Decorations ∇',
            open: false,
            buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
        },
        {
            name: 'Extra ∇',
            open: false,
            properties: [
                {extend: 'filter'},
                {extend: 'filter', property: 'backdrop-filter'},
            ],
        }
    ]