const pluginsConst = [
    'gjs-navbar',
    'grapesjs-plugin-forms',
    'grapesjs-plugin-export',
    'grapesjs-tui-image-editor',
    'grapesjs-blocks-basic',
    'gjs-component-countdown',
    'grapesjs-style-gradient',
    'grapesjs-style-bg',
    'gjs-blocks-flexbox',
    'grapesjs-lory-slider',
    'grapesjs-tabs',
    'grapesjs-tooltip',
    'grapesjs-custom-code',
    'grapesjs-component-code-editor',
    tina4storagePlugin
];

const pluginOptsConst = {
    'grapesjs-plugin-forms': {},
    'grapesjs-plugin-export': {},
    'grapesjs-tui-image-editor': {
        config: {
            includeUI: {
                initMenu: 'filter',
            },
        },
        icons: {
            'menu.normalIcon.path': '../icon-d.svg',
            'menu.activeIcon.path': '../icon-b.svg',
            'menu.disabledIcon.path': '../icon-a.svg',
            'menu.hoverIcon.path': '../icon-c.svg',
            'submenu.normalIcon.path': '../icon-d.svg',
            'submenu.activeIcon.path': '../icon-c.svg',
        },
    },
    'grapesjs-blocks-basic':{},
    'gjs-navbar': {},
    'gjs-component-countdown': {},
    'grapesjs-style-gradient': {},
    'grapesjs-style-bg': {},
    'gjs-blocks-flexbox': {},
    'grapesjs-lory-slider': {},
    'grapesjs-tabs': {},
    'grapesjs-tooltip': {},
    'grapesjs-custom-code' : {},
    'grapesjs-component-code-editor': {
        "editJs": true
    }
};