const leftPanelButtonOpts = [
    {
        id: 'collapse-sidebar',
        label: '<i class="fa fa-bars"></i>',
        command: 'toggle-nav-bar',
        attributes: {
            title: 'Toggle SideBar'
        },
        active: false,
        togglable: false,
    },
    {
        id: 'open-code-export',
        label: '<i class="fa fa-download"></i>',
        command: 'core:open-code',
        attributes: {
            title: 'Export/View your code!'
        },
        active: false,
        togglable: false,
    },
    {
        id: 'device-desktop',
        label: '<i class="fa fa-television"></i>',
        command: 'set-device-desktop',
        attributes: {
            title: 'Desktop View'
        },
        active: true,
        togglable: false,
    },
    {
        id: 'device-tablet',
        label: '<i class="fa fa-tablet"></i>',
        command: 'set-device-tablet',
        attributes: {
            title: 'Tablet View'
        },
        togglable: false,
    },
    {
        id: 'device-mobile',
        label: '<i class="fa fa-mobile"></i>',
        attributes: {
            title: 'Mobile View'
        },
        command: 'set-device-mobile',
        togglable: false,
    },
    {
        id: 'open-code',
        className: 'fa fa-code',
        attributes: {
            title: 'Open Code Editor'
        },
        command: 'open-code',
        togglable: true
    },
    {
        id: 'preview',
        label: '<i class="fa fa-eye"></i>',
        command: 'core:preview',
        togglable: false,
    },
    {
        id: 'undo',
        label: '<i class="fa fa-arrow-circle-left"></i>',
        command: 'core:undo',
        attributes: {
            title: 'Undo last action'
        },
        togglable: false,
    },
    {
        id: 'redo',
        label: '<i class="fa fa-arrow-circle-right"></i>',
        command: 'core:redo',
        attributes: {
            title: 'Redo previous action'
        },
        togglable: false,
    },
];

const rightPanelButtonOpts = [
    {
        id: 'visibility',
        active: true, // active by default
        attributes: {
            title: 'View component outlines'
        },
        className: 'btn-toggle-borders',
        label: '<i class="fa fa-clone"></i>',
        command: 'sw-visibility', // Built-in command
    },
    {
        id: 'add-page',
        attributes: {
            title: 'Add new Page'
        },
        label: '<i class="fa fa-plus"></i>',
        command: 'add-page',
        togglable: false,
    },
    {
        id: 'revisions',
        attributes: {
            title: 'View Revisions'
        },
        label: '<i class="fa fa-history"></i>',
        command: 'show-revision-modal',
        togglable: false,
    },
    {
        id: 'save',
        attributes: {
            title: 'Save progress'
        },
        label: '<i class="fa fa-save"></i>',
        command: 'save-page',
        togglable: false,
    },
    {
        id: 'load',
        label: '<i class="fa fa-folder"></i>',
        attributes: {
            title: 'Manage Pages from CMS'
        },
        command: 'load-page-modal',
        togglable: false,
    },
];

const componentBuilderLeftPanel = [
    {
        id: 'collapse-sidebar',
        label: '<i class="fa fa-bars"></i>',
        command: 'toggle-nav-bar',
        attributes: {
            title: 'Toggle SideBar'
        },
        active: false,
        togglable: false,
    },
    {
        id: 'open-code-export',
        label: '<i class="fa fa-download"></i>',
        command: 'core:open-code',
        attributes: {
            title: 'Export/View your code!'
        },
        active: false,
        togglable: false,
    },
    {
        id: 'device-desktop',
        label: '<i class="fa fa-television"></i>',
        command: 'set-device-desktop',
        attributes: {
            title: 'Desktop View'
        },
        active: true,
        togglable: false,
    },
    {
        id: 'device-tablet',
        label: '<i class="fa fa-tablet"></i>',
        command: 'set-device-tablet',
        attributes: {
            title: 'Tablet View'
        },
        togglable: false,
    },
    {
        id: 'device-mobile',
        label: '<i class="fa fa-mobile"></i>',
        attributes: {
            title: 'Mobile View'
        },
        command: 'set-device-mobile',
        togglable: false,
    },
    {
        id: 'open-code',
        className: 'fa fa-code',
        attributes: {
            title: 'Open Code Editor'
        },
        command: 'open-code',
        togglable: true
    },
    {
        id: 'preview',
        label: '<i class="fa fa-eye"></i>',
        command: 'core:preview',
        togglable: false,
    },
    {
        id: 'undo',
        label: '<i class="fa fa-arrow-circle-left"></i>',
        command: 'core:undo',
        attributes: {
            title: 'Undo last action'
        },
        togglable: false,
    },
    {
        id: 'redo',
        label: '<i class="fa fa-arrow-circle-right"></i>',
        command: 'core:redo',
        attributes: {
            title: 'Redo previous action'
        },
        togglable: false,
    },
];

const componentBuilderRightPanel = [
    {
        id: 'visibility',
        active: true, // active by default
        attributes: {
            title: 'View component outlines'
        },
        className: 'btn-toggle-borders',
        label: '<i class="fa fa-clone"></i>',
        command: 'sw-visibility', // Built-in command
    },
    {
        id: 'save',
        attributes: {
            title: 'Save Component As'
        },
        label: '<i class="fa fa-plus"></i>',
        command: 'save-component-as',
        togglable: false,
    },
    {
        id: 'save',
        attributes: {
            title: 'Save Component'
        },
        label: '<i class="fa fa-save"></i>',
        command: 'save-component',
        togglable: false,
    },
    {
        id: 'load',
        label: '<i class="fa fa-sitemap"></i>',
        attributes: {
            title: 'Manage components on CMS'
        },
        command: 'load-component-modal',
        togglable: false,
    },
];