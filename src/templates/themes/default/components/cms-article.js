editor.Components.addType('cms-article', {
    model: {
        init() {
            const component = this;
            fetch('/cms/page-builder/cms-articles')
                .then(async function(response) {
                    const data = await response.json();
                    let options = [];
                    data.forEach(function(option){
                        options.push({id: option.id, name: option.title});
                    });
                    component.getTrait('cms-article').set('options', options);
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
                    label: 'Article', // The label you will see in Settings
                    name: 'cms-article', // The name of the attribute/property to use on component
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            const articleId = this.model.getTrait('cms-article').attributes.value;
            el.innerHTML = '<b>Rendering an article</b>';
            fetch('/cms/page-builder/cms-articles/render?id='+articleId)
                .then(async function(response) {
                    const data = await response.text();
                    el.innerHTML = data;
                });
        },
    },
});

editor.Blocks.add('cms-article', {
    label: 'Article Block',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M41.51 17.26 39.26 15c-.98-.98-2.68-.98-3.66 0l-3.12 3.12c-.13-.04-.26-.08-.4-.08-.69 0-1.25.56-1.25 1.25v.48l-2.99 2.99h-.66c-.69 0-1.25.56-1.25 1.25 0 .19.05.37.13.53l-1.1 1.1c-.15.15-.25.32-.31.52l-1.75 5.76c-.13.44-.01.92.31 1.25a1.251 1.251 0 0 0 1.24.32l6.16-1.88s.04-.02.07-.03c.03-.01.06-.02.08-.04.14-.06.26-.14.37-.25l10.38-10.38a2.59 2.59 0 0 0 0-3.66ZM26.55 28.48l1.34 1.34-1.93.59.59-1.93Zm13.19-9.33-9.49 9.49-2.38-2.38 5.08-5.08 4.41-4.41c.03-.03.1-.03.12 0l2.25 2.26s.03.09 0 .13Z" style="fill:#515962;stroke-width:0"/><path d="M37.25 28.78c-.69 0-1.25.56-1.25 1.25v3.09a3.06 3.06 0 0 1-3.06 3.06H11.21a3.06 3.06 0 0 1-3.06-3.06V11.38a3.06 3.06 0 0 1 3.06-3.06h21.73c1.23 0 2.34.73 2.82 1.87.27.64 1 .93 1.64.66.64-.27.93-1 .66-1.64a5.544 5.544 0 0 0-5.12-3.39H11.21a5.56 5.56 0 0 0-5.56 5.56v21.73c0 3.06 2.49 5.56 5.56 5.56h21.73a5.56 5.56 0 0 0 5.56-5.56v-3.09c0-.69-.56-1.25-1.25-1.25Z" style="fill:#515962;stroke-width:0"/><path d="M15.44 25.26h.19a1.25 1.25 0 0 0 0-2.5h-.19c-.19 0-.36-.09-.47-.24a1.248 1.248 0 0 0-2.03 1.45c.58.8 1.51 1.29 2.5 1.29ZM30.26 12.62h-.29a1.25 1.25 0 0 0 0 2.5h.29c.17 0 .34.08.45.22.25.31.61.47.98.47.27 0 .55-.09.78-.27.54-.43.63-1.22.2-1.76a3.047 3.047 0 0 0-2.4-1.16ZM26.41 13.87c0-.69-.56-1.25-1.25-1.25h-1.92a1.25 1.25 0 0 0 0 2.5h1.92c.69 0 1.25-.56 1.25-1.25ZM20.44 25.26h1.92a1.25 1.25 0 0 0 0-2.5h-1.92a1.25 1.25 0 0 0 0 2.5ZM19.67 13.87c0-.69-.56-1.25-1.25-1.25H16.5a1.25 1.25 0 0 0 0 2.5h1.92c.69 0 1.25-.56 1.25-1.25ZM14.87 18.51v-1.92a1.25 1.25 0 0 0-2.5 0v1.92a1.25 1.25 0 0 0 2.5 0Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<span data-gjs-type="cms-article">Article Content</span>',
});

editor.Components.addType('cms-article-title', {
    model: {
        init() {
            const component = this;
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
                    type: 'text', // Type of the trait
                    label: 'Title', // The label you will see in Settings
                    name: 'cms-article-title', // The name of the attribute/property to use on component
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            el.innerHTML = this.model.getTrait('cms-article-title').attributes.value;
        },
    },
});

editor.Blocks.add('cms-article-title', {
    label: 'Article Title',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M41.51 17.26 39.26 15c-.98-.98-2.68-.98-3.66 0l-2.27 2.27v-1.59c0-1.69-1.38-3.07-3.07-3.07H15.44c-1.69 0-3.07 1.38-3.07 3.07v6.51c0 1.69 1.38 3.07 3.07 3.07h9.9l-.38.38c-.15.15-.25.32-.31.52l-1.75 5.76c-.13.44-.01.92.31 1.25a1.251 1.251 0 0 0 1.24.32l6.16-1.88s.04-.02.07-.03c.03-.01.06-.02.08-.04.14-.06.26-.14.37-.25l10.38-10.38a2.59 2.59 0 0 0 0-3.66Zm-26.08 5.5a.57.57 0 0 1-.57-.57v-6.51c0-.31.25-.57.57-.57h14.82c.31 0 .57.25.57.57v4.09l-2.99 2.99h-12.4Zm11.12 5.72 1.34 1.34-1.93.59.59-1.93Zm13.19-9.33-9.49 9.49-2.38-2.38 1.37-1.36 8.13-8.13s.1-.03.12 0l2.25 2.26s.03.09 0 .13ZM35.76 10.19a1.245 1.245 0 0 0 1.64.66c.64-.27.93-1 .66-1.64-.25-.59-.59-1.12-1.03-1.6a1.26 1.26 0 0 0-1.77-.08 1.26 1.26 0 0 0-.08 1.77c.24.26.43.56.57.88ZM8.15 30.98a1.25 1.25 0 0 0-2.5 0v2.14c0 .34.03.68.09 1.01.11.6.64 1.02 1.23 1.02.08 0 .15 0 .23-.02a1.25 1.25 0 0 0 1-1.46c-.03-.18-.05-.37-.05-.55v-2.14ZM6.9 27.36c.69 0 1.25-.56 1.25-1.25v-2.92a1.25 1.25 0 0 0-2.5 0v2.92c0 .69.56 1.25 1.25 1.25ZM6.9 19.56c.69 0 1.25-.56 1.25-1.25v-2.92a1.25 1.25 0 0 0-2.5 0v2.92c0 .69.56 1.25 1.25 1.25ZM20.91 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM13.11 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM28.71 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM9.27 9.02c.53-.44.61-1.23.17-1.76-.44-.53-1.23-.61-1.76-.17-.98.81-1.66 1.93-1.91 3.17-.14.68.3 1.34.97 1.47.08.02.17.03.25.03.58 0 1.1-.41 1.22-1 .14-.68.51-1.3 1.05-1.74ZM28.62 36.18H25.7a1.25 1.25 0 0 0 0 2.5h2.92a1.25 1.25 0 0 0 0-2.5ZM35.15 35.23c-.48.5-1.13.83-1.82.92a1.25 1.25 0 0 0 .16 2.49h.16c1.25-.16 2.43-.75 3.31-1.66.48-.5.46-1.29-.04-1.77a1.25 1.25 0 0 0-1.77.04ZM13.03 36.18h-1.82c-.26 0-.52-.03-.77-.1-.67-.17-1.35.22-1.53.89-.18.67.22 1.35.89 1.53.46.12.93.18 1.41.18h1.82a1.25 1.25 0 0 0 0-2.5ZM20.82 36.18H17.9a1.25 1.25 0 0 0 0 2.5h2.92a1.25 1.25 0 0 0 0-2.5ZM37.25 28.78c-.69 0-1.25.56-1.25 1.25v1.48a1.25 1.25 0 0 0 2.5 0v-1.48c0-.69-.56-1.25-1.25-1.25Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<span data-gjs-type="cms-article-title">Article Title</span>',
});

editor.Components.addType('cms-article-image', {
    model: {
        init() {
            const component = this;
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
                    type: 'text', // Type of the trait
                    label: 'Image URL', // The label you will see in Settings
                    name: 'cms-article-image', // The name of the attribute/property to use on component
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            el.innerHTML = this.model.getTrait('cms-article-image').attributes.value;
        },
    },
});

editor.Blocks.add('cms-article-image', {
    label: 'Article Image',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M41.51 17.26 39.26 15c-.98-.98-2.68-.98-3.66 0l-2.27 2.27v-1.59c0-1.69-1.38-3.07-3.07-3.07H15.44c-1.69 0-3.07 1.38-3.07 3.07v6.51c0 1.69 1.38 3.07 3.07 3.07h9.9l-.38.38c-.15.15-.25.32-.31.52l-1.75 5.76c-.13.44-.01.92.31 1.25a1.251 1.251 0 0 0 1.24.32l6.16-1.88s.04-.02.07-.03c.03-.01.06-.02.08-.04.14-.06.26-.14.37-.25l10.38-10.38a2.59 2.59 0 0 0 0-3.66Zm-26.08 5.5a.57.57 0 0 1-.57-.57v-6.51c0-.31.25-.57.57-.57h14.82c.31 0 .57.25.57.57v4.09l-2.99 2.99h-12.4Zm11.12 5.72 1.34 1.34-1.93.59.59-1.93Zm13.19-9.33-9.49 9.49-2.38-2.38 1.37-1.36 8.13-8.13s.1-.03.12 0l2.25 2.26s.03.09 0 .13ZM35.76 10.19a1.245 1.245 0 0 0 1.64.66c.64-.27.93-1 .66-1.64-.25-.59-.59-1.12-1.03-1.6a1.26 1.26 0 0 0-1.77-.08 1.26 1.26 0 0 0-.08 1.77c.24.26.43.56.57.88ZM8.15 30.98a1.25 1.25 0 0 0-2.5 0v2.14c0 .34.03.68.09 1.01.11.6.64 1.02 1.23 1.02.08 0 .15 0 .23-.02a1.25 1.25 0 0 0 1-1.46c-.03-.18-.05-.37-.05-.55v-2.14ZM6.9 27.36c.69 0 1.25-.56 1.25-1.25v-2.92a1.25 1.25 0 0 0-2.5 0v2.92c0 .69.56 1.25 1.25 1.25ZM6.9 19.56c.69 0 1.25-.56 1.25-1.25v-2.92a1.25 1.25 0 0 0-2.5 0v2.92c0 .69.56 1.25 1.25 1.25ZM20.91 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM13.11 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM28.71 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM9.27 9.02c.53-.44.61-1.23.17-1.76-.44-.53-1.23-.61-1.76-.17-.98.81-1.66 1.93-1.91 3.17-.14.68.3 1.34.97 1.47.08.02.17.03.25.03.58 0 1.1-.41 1.22-1 .14-.68.51-1.3 1.05-1.74ZM28.62 36.18H25.7a1.25 1.25 0 0 0 0 2.5h2.92a1.25 1.25 0 0 0 0-2.5ZM35.15 35.23c-.48.5-1.13.83-1.82.92a1.25 1.25 0 0 0 .16 2.49h.16c1.25-.16 2.43-.75 3.31-1.66.48-.5.46-1.29-.04-1.77a1.25 1.25 0 0 0-1.77.04ZM13.03 36.18h-1.82c-.26 0-.52-.03-.77-.1-.67-.17-1.35.22-1.53.89-.18.67.22 1.35.89 1.53.46.12.93.18 1.41.18h1.82a1.25 1.25 0 0 0 0-2.5ZM20.82 36.18H17.9a1.25 1.25 0 0 0 0 2.5h2.92a1.25 1.25 0 0 0 0-2.5ZM37.25 28.78c-.69 0-1.25.56-1.25 1.25v1.48a1.25 1.25 0 0 0 2.5 0v-1.48c0-.69-.56-1.25-1.25-1.25Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<span data-gjs-type="cms-article-image">Article Image</span>',
});

editor.Components.addType('cms-article-tags', {
    model: {
        init() {
            const component = this;
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
                    type: 'text', // Type of the trait
                    label: 'Article Tags', // The label you will see in Settings
                    name: 'cms-article-tags', // The name of the attribute/property to use on component
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            el.innerHTML = this.model.getTrait('cms-article-tags').attributes.value;
        },
    },
});

editor.Blocks.add('cms-article-tags', {
    label: 'Article Tags',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M41.51 17.26 39.26 15c-.98-.98-2.68-.98-3.66 0l-2.27 2.27v-1.59c0-1.69-1.38-3.07-3.07-3.07H15.44c-1.69 0-3.07 1.38-3.07 3.07v6.51c0 1.69 1.38 3.07 3.07 3.07h9.9l-.38.38c-.15.15-.25.32-.31.52l-1.75 5.76c-.13.44-.01.92.31 1.25a1.251 1.251 0 0 0 1.24.32l6.16-1.88s.04-.02.07-.03c.03-.01.06-.02.08-.04.14-.06.26-.14.37-.25l10.38-10.38a2.59 2.59 0 0 0 0-3.66Zm-26.08 5.5a.57.57 0 0 1-.57-.57v-6.51c0-.31.25-.57.57-.57h14.82c.31 0 .57.25.57.57v4.09l-2.99 2.99h-12.4Zm11.12 5.72 1.34 1.34-1.93.59.59-1.93Zm13.19-9.33-9.49 9.49-2.38-2.38 1.37-1.36 8.13-8.13s.1-.03.12 0l2.25 2.26s.03.09 0 .13ZM35.76 10.19a1.245 1.245 0 0 0 1.64.66c.64-.27.93-1 .66-1.64-.25-.59-.59-1.12-1.03-1.6a1.26 1.26 0 0 0-1.77-.08 1.26 1.26 0 0 0-.08 1.77c.24.26.43.56.57.88ZM8.15 30.98a1.25 1.25 0 0 0-2.5 0v2.14c0 .34.03.68.09 1.01.11.6.64 1.02 1.23 1.02.08 0 .15 0 .23-.02a1.25 1.25 0 0 0 1-1.46c-.03-.18-.05-.37-.05-.55v-2.14ZM6.9 27.36c.69 0 1.25-.56 1.25-1.25v-2.92a1.25 1.25 0 0 0-2.5 0v2.92c0 .69.56 1.25 1.25 1.25ZM6.9 19.56c.69 0 1.25-.56 1.25-1.25v-2.92a1.25 1.25 0 0 0-2.5 0v2.92c0 .69.56 1.25 1.25 1.25ZM20.91 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM13.11 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM28.71 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM9.27 9.02c.53-.44.61-1.23.17-1.76-.44-.53-1.23-.61-1.76-.17-.98.81-1.66 1.93-1.91 3.17-.14.68.3 1.34.97 1.47.08.02.17.03.25.03.58 0 1.1-.41 1.22-1 .14-.68.51-1.3 1.05-1.74ZM28.62 36.18H25.7a1.25 1.25 0 0 0 0 2.5h2.92a1.25 1.25 0 0 0 0-2.5ZM35.15 35.23c-.48.5-1.13.83-1.82.92a1.25 1.25 0 0 0 .16 2.49h.16c1.25-.16 2.43-.75 3.31-1.66.48-.5.46-1.29-.04-1.77a1.25 1.25 0 0 0-1.77.04ZM13.03 36.18h-1.82c-.26 0-.52-.03-.77-.1-.67-.17-1.35.22-1.53.89-.18.67.22 1.35.89 1.53.46.12.93.18 1.41.18h1.82a1.25 1.25 0 0 0 0-2.5ZM20.82 36.18H17.9a1.25 1.25 0 0 0 0 2.5h2.92a1.25 1.25 0 0 0 0-2.5ZM37.25 28.78c-.69 0-1.25.56-1.25 1.25v1.48a1.25 1.25 0 0 0 2.5 0v-1.48c0-.69-.56-1.25-1.25-1.25Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<span data-gjs-type="cms-article-tags">Article Tags</span>',
});

