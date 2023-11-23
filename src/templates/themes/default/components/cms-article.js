editor.DomComponents.addType('cms-article', {
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
    content: '<div data-gjs-type="cms-article" class="article">Article Block</div>',
});


editor.DomComponents.addType('cms-article-content', {
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
                    name: 'cms-article-content', // The name of the attribute/property to use on component
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            const articleId = this.model.getTrait('cms-article-content').attributes.value;
            el.innerHTML = '<b>Rendering an article</b>';
            fetch('/cms/page-builder/cms-articles/render?id='+articleId)
                .then(async function(response) {
                    const data = await response.text();
                    el.innerHTML = data;
                });
        },
    },
});

editor.Blocks.add('cms-article-content', {
    label: 'Article Content',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="m41.51 17.26-2.25-2.25c-.98-.98-2.68-.98-3.66 0l-2.8 2.8H12.5a1.25 1.25 0 0 0 0 2.5h17.79l-3.9 3.9h-13.9a1.25 1.25 0 0 0 0 2.5h11.98l-1.19 3.9h-10.8a1.25 1.25 0 0 0 0 2.5h10.65s.03.05.06.07a1.251 1.251 0 0 0 1.24.32l6.16-1.88s.04-.02.07-.03c.03-.01.06-.02.08-.04.14-.06.26-.14.37-.25l10.38-10.38a2.59 2.59 0 0 0 0-3.66ZM26.55 28.48l1.34 1.34-1.93.59.59-1.93Zm13.19-9.33-9.49 9.49-2.38-2.38 9.49-9.49s.1-.03.13 0l2.25 2.26s.03.09 0 .13ZM35.76 10.19a1.245 1.245 0 0 0 1.64.66c.64-.27.93-1 .66-1.64a5.62 5.62 0 0 0-1.03-1.6 1.25 1.25 0 0 0-1.77-.07 1.25 1.25 0 0 0-.07 1.77c.24.26.43.55.57.88ZM6.9 27.36c.69 0 1.25-.56 1.25-1.25v-2.92a1.25 1.25 0 0 0-2.5 0v2.92c0 .69.56 1.25 1.25 1.25ZM8.15 30.98a1.25 1.25 0 0 0-2.5 0v2.14c0 .34.03.68.09 1.01.11.6.64 1.02 1.23 1.02.08 0 .15 0 .23-.02a1.25 1.25 0 0 0 1-1.46c-.03-.18-.05-.37-.05-.55v-2.14ZM20.91 8.33h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM28.71 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM13.11 8.33h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM6.9 19.56c.69 0 1.25-.56 1.25-1.25v-2.92a1.25 1.25 0 0 0-2.5 0v2.92c0 .69.56 1.25 1.25 1.25ZM20.82 36.18H17.9a1.25 1.25 0 0 0 0 2.5h2.92a1.25 1.25 0 0 0 0-2.5ZM28.62 36.18H25.7a1.25 1.25 0 0 0 0 2.5h2.92a1.25 1.25 0 0 0 0-2.5ZM35.15 35.23c-.48.5-1.13.83-1.82.92a1.25 1.25 0 0 0 .16 2.49h.16c1.25-.16 2.43-.75 3.31-1.66.48-.5.46-1.29-.04-1.77a1.25 1.25 0 0 0-1.77.04ZM13.03 36.18h-1.82c-.26 0-.52-.03-.77-.1-.67-.18-1.35.22-1.53.89-.18.67.22 1.35.89 1.53.46.12.93.18 1.41.18h1.82a1.25 1.25 0 0 0 0-2.5ZM9.27 9.02c.53-.44.61-1.23.17-1.76s-1.23-.61-1.76-.17c-.98.81-1.66 1.93-1.91 3.17-.14.68.3 1.34.97 1.47.08.02.17.03.25.03.58 0 1.1-.41 1.22-1 .14-.68.51-1.3 1.05-1.74ZM37.25 28.78c-.69 0-1.25.56-1.25 1.25v1.48a1.25 1.25 0 0 0 2.5 0v-1.48c0-.69-.56-1.25-1.25-1.25ZM12.5 13.91h19.49a1.25 1.25 0 0 0 0-2.5H12.5a1.25 1.25 0 0 0 0 2.5Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<article data-gjs-type="cms-article-content" class="article-content">Article Content</article>',
});


editor.DomComponents.addType('cms-article-list', {
    model: {
        defaults: {
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Article List', // The label you will see in Settings
                    name: 'cms-article-list', // The name of the attribute/property to use on component
                    placeholder: 'grid,columns'
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            let articleComponent = this.model.getTrait('cms-article-list');
            if (articleComponent !== null) {

                el.innerHTML = 'Render the list';
            }
        },
    },
});

editor.Blocks.add('cms-article-list', {
    label: 'Article List',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M33.17 38.68h-3.1a1.25 1.25 0 0 1 0-2.5h3.05c.69 0 1.28.56 1.28 1.25s-.54 1.25-1.23 1.25Zm-8.19 0h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5Zm-8.14 0h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5Zm-7.97-.81c-.25 0-.51-.08-.73-.24a5.6 5.6 0 0 1-2.16-3.2c-.16-.67.25-1.35.92-1.51.67-.16 1.35.25 1.51.92.17.71.59 1.33 1.19 1.76.56.4.69 1.18.28 1.75-.24.34-.63.52-1.02.52Zm28.25-1.9a1.254 1.254 0 0 1-1.16-1.71c.14-.36.21-.74.21-1.13v-1.42a1.25 1.25 0 0 1 2.5 0v1.42c0 .71-.13 1.4-.39 2.06-.2.49-.67.79-1.16.79ZM7.07 30.32c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25Zm30.35-2.45c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25ZM7.07 22.18c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25Zm30.35-2.45c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25Zm-30.35-5.7c-.69 0-1.25-.56-1.25-1.25v-1.4c0-.72.14-1.42.41-2.09a1.252 1.252 0 0 1 2.32.94c-.15.36-.22.75-.22 1.15v1.4c0 .69-.56 1.25-1.25 1.25Zm30.22-2.44c-.56 0-1.07-.38-1.21-.95-.18-.71-.6-1.33-1.2-1.75a1.248 1.248 0 0 1 1.45-2.03 5.57 5.57 0 0 1 2.17 3.18c.17.67-.24 1.35-.91 1.52-.1.03-.2.04-.3.04Zm-6.61-3.26h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5Zm-8.14 0h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5Zm-8.14 0h-3.03c-.69 0-1.26-.56-1.26-1.25s.55-1.25 1.24-1.25h3.05a1.25 1.25 0 0 1 0 2.5ZM19.05 21.49h-5.53c-1.29 0-2.33-1.05-2.33-2.33v-5.53c0-1.29 1.05-2.33 2.33-2.33h5.53c1.29 0 2.33 1.05 2.33 2.33v5.53c0 1.29-1.05 2.33-2.33 2.33Zm-5.36-2.5h5.19V13.8h-5.19v5.19ZM30.98 21.49h-5.53c-1.29 0-2.33-1.05-2.33-2.33v-5.53c0-1.29 1.05-2.33 2.33-2.33h5.53c1.29 0 2.33 1.05 2.33 2.33v5.53c0 1.29-1.05 2.33-2.33 2.33Zm-5.36-2.5h5.19V13.8h-5.19v5.19ZM19.05 33.2h-5.53c-1.29 0-2.33-1.05-2.33-2.33v-5.53c0-1.29 1.05-2.33 2.33-2.33h5.53c1.29 0 2.33 1.05 2.33 2.33v5.53c0 1.29-1.05 2.33-2.33 2.33Zm-5.36-2.5h5.19v-5.19h-5.19v5.19ZM30.98 33.2h-5.53c-1.29 0-2.33-1.05-2.33-2.33v-5.53c0-1.29 1.05-2.33 2.33-2.33h5.53c1.29 0 2.33 1.05 2.33 2.33v5.53c0 1.29-1.05 2.33-2.33 2.33Zm-5.36-2.5h5.19v-5.19h-5.19v5.19Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<span data-gjs-type="cms-article-list" class="article-list">Article List</span>',
});


editor.DomComponents.addType('cms-article-title', {
    model: {
        defaults: {
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Title', // The label you will see in Settings
                    name: 'cms-article-title', // The name of the attribute/property to use on component
                    placeholder: 'Article Title'
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            let articleComponent = this.model.getTrait('cms-article-title');
            if (articleComponent !== null) {
                let articleTitle = articleComponent.attributes.value;
                if (articleTitle === '') {
                    articleTitle = 'Title of the article';
                }
                el.innerHTML = articleTitle;
            }
        },
    },
});

editor.Blocks.add('cms-article-title', {
    label: 'Article Title',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M41.51 17.26 39.26 15c-.98-.98-2.68-.98-3.66 0l-2.27 2.27v-1.59c0-1.69-1.38-3.07-3.07-3.07H15.44c-1.69 0-3.07 1.38-3.07 3.07v6.51c0 1.69 1.38 3.07 3.07 3.07h9.9l-.38.38c-.15.15-.25.32-.31.52l-1.75 5.76c-.13.44-.01.92.31 1.25a1.251 1.251 0 0 0 1.24.32l6.16-1.88s.04-.02.07-.03c.03-.01.06-.02.08-.04.14-.06.26-.14.37-.25l10.38-10.38a2.59 2.59 0 0 0 0-3.66Zm-26.08 5.5a.57.57 0 0 1-.57-.57v-6.51c0-.31.25-.57.57-.57h14.82c.31 0 .57.25.57.57v4.09l-2.99 2.99h-12.4Zm11.12 5.72 1.34 1.34-1.93.59.59-1.93Zm13.19-9.33-9.49 9.49-2.38-2.38 1.37-1.36 8.13-8.13s.1-.03.12 0l2.25 2.26s.03.09 0 .13ZM35.76 10.19a1.245 1.245 0 0 0 1.64.66c.64-.27.93-1 .66-1.64-.25-.59-.59-1.12-1.03-1.6a1.26 1.26 0 0 0-1.77-.08 1.26 1.26 0 0 0-.08 1.77c.24.26.43.56.57.88ZM8.15 30.98a1.25 1.25 0 0 0-2.5 0v2.14c0 .34.03.68.09 1.01.11.6.64 1.02 1.23 1.02.08 0 .15 0 .23-.02a1.25 1.25 0 0 0 1-1.46c-.03-.18-.05-.37-.05-.55v-2.14ZM6.9 27.36c.69 0 1.25-.56 1.25-1.25v-2.92a1.25 1.25 0 0 0-2.5 0v2.92c0 .69.56 1.25 1.25 1.25ZM6.9 19.56c.69 0 1.25-.56 1.25-1.25v-2.92a1.25 1.25 0 0 0-2.5 0v2.92c0 .69.56 1.25 1.25 1.25ZM20.91 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM13.11 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM28.71 8.32h2.92a1.25 1.25 0 0 0 0-2.5h-2.92a1.25 1.25 0 0 0 0 2.5ZM9.27 9.02c.53-.44.61-1.23.17-1.76-.44-.53-1.23-.61-1.76-.17-.98.81-1.66 1.93-1.91 3.17-.14.68.3 1.34.97 1.47.08.02.17.03.25.03.58 0 1.1-.41 1.22-1 .14-.68.51-1.3 1.05-1.74ZM28.62 36.18H25.7a1.25 1.25 0 0 0 0 2.5h2.92a1.25 1.25 0 0 0 0-2.5ZM35.15 35.23c-.48.5-1.13.83-1.82.92a1.25 1.25 0 0 0 .16 2.49h.16c1.25-.16 2.43-.75 3.31-1.66.48-.5.46-1.29-.04-1.77a1.25 1.25 0 0 0-1.77.04ZM13.03 36.18h-1.82c-.26 0-.52-.03-.77-.1-.67-.17-1.35.22-1.53.89-.18.67.22 1.35.89 1.53.46.12.93.18 1.41.18h1.82a1.25 1.25 0 0 0 0-2.5ZM20.82 36.18H17.9a1.25 1.25 0 0 0 0 2.5h2.92a1.25 1.25 0 0 0 0-2.5ZM37.25 28.78c-.69 0-1.25.56-1.25 1.25v1.48a1.25 1.25 0 0 0 2.5 0v-1.48c0-.69-.56-1.25-1.25-1.25Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<h1 data-gjs-type="cms-article-title" class="article-title">Article Title</h1>',
});

editor.DomComponents.addType('cms-article-image', {
    model: {
        defaults: {
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Image URL', // The label you will see in Settings
                    name: 'cms-article-image', // The name of the attribute/property to use on component
                    placeholder: 'Article Image'
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            let articleComponent = this.model.getTrait('cms-article-image');
            if (articleComponent !== null) {
                let articleImageUrl = articleComponent.attributes.value;
                if (articleImageUrl === '') {
                    articleImageUrl = 'https://placehold.co/600x400/png';
                }
                el.src = articleImageUrl;
            }
        },
    },
});

editor.Blocks.add('cms-article-image', {
    label: 'Article Image',
    category: 'Articles',
    media:`
    <svg id="b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><g id="c"><g id="d"><rect width="44.5" height="44.5" style="fill:none; stroke-width:0px;"/></g><path d="m41.51,17.26l-2.25-2.26c-.7-.71-1.72-.91-2.61-.63v-2.59c0-2.17-1.76-3.93-3.93-3.93H11.78c-2.17,0-3.93,1.76-3.93,3.93v20.93c0,2.17,1.76,3.93,3.93,3.93h20.94c2.17,0,3.93-1.76,3.93-3.93v-6.94l4.86-4.86c1.01-1.01,1.01-2.65,0-3.66Zm-29.73-6.91h20.94c.79,0,1.43.64,1.43,1.43v4.67l-5.51,5.51-.39-.39c-1.36-1.36-3.57-1.36-4.92,0l-3.36,3.36-1.13-1.13c-1.31-1.31-3.61-1.32-4.92,0l-3.56,3.56v-15.58c0-.79.64-1.43,1.43-1.43Zm14.77,18.13l1.34,1.34-1.93.59.59-1.93Zm6.16,5.67H11.78c-.79,0-1.43-.64-1.43-1.43v-1.82l5.33-5.33c.18-.18.43-.29.69-.29s.51.1.69.29l2.02,2.02c.49.49,1.28.49,1.77,0l4.25-4.25c.38-.38,1-.38,1.38,0l.39.39-1.9,1.9c-.15.15-.25.32-.31.52l-1.75,5.77c-.13.44-.01.92.31,1.25.24.24.56.37.88.37.12,0,.24-.02.36-.05l6.16-1.88s.04-.02.07-.03c.03-.01.06-.02.08-.04.14-.06.26-.14.37-.25l1.65-1.65,1.37,1.37v1.7c0,.79-.64,1.43-1.43,1.43Zm1.8-9.77h0l-2.61,2.61s0,0,0,0,0,0,0,0l-1.64,1.64-2.38-2.38,1.64-1.64s0,0,0,0,0,0,0,0l6.76-6.76s0,0,0,0l1.08-1.08s.09-.04.13,0l2.25,2.25s.04.09,0,.13l-5.23,5.23Z" style="fill:#515962; stroke-width:0px;"/><path d="m18.46,19.27c1.92,0,3.48-1.56,3.48-3.48s-1.56-3.48-3.48-3.48-3.48,1.56-3.48,3.48,1.56,3.48,3.48,3.48Zm0-4.46c.54,0,.98.44.98.98s-.44.98-.98.98-.98-.44-.98-.98.44-.98.98-.98Z" style="fill:#515962; stroke-width:0px;"/></g></svg>
     `,
    content: '<img data-gjs-type="cms-article-image" class="article-image" src="{{ article.image }}" alt="{{article.description}}" >'
});

editor.DomComponents.addType('cms-article-tags', {
    model: {
        defaults: {
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Tags', // The label you will see in Settings
                    name: 'cms-article-tags', // The name of the attribute/property to use on component
                    placeholder: 'Article Tags'
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            let articleComponent = this.model.getTrait('cms-article-tags');
            if (articleComponent !== null) {
                let articleTags = articleComponent.attributes.value;
                if (articleTags === '') {
                    articleTags = '<a href="#">tag1</a>,<a href="#">tag2</a>,<a href="#">tag3</a>'
                }
                el.innerHTML = articleTags;
            }
        },
    },
});

editor.Blocks.add('cms-article-tags', {
    label: 'Article Tags',
    category: 'Articles',
    media:`
    <svg id="b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><g id="c"><g id="d"><rect width="44.5" height="44.5" style="fill:none; stroke-width:0px;"/></g><path d="m38.88,18.17l-3.65-7.25c-.45-.89-1.26-1.52-2.2-1.78-.18-.92-.67-1.76-1.44-2.33-.92-.69-2.09-.93-3.2-.66l-9.22,2.22c-.86.21-1.63.71-2.17,1.42l-11,14.61c-1.27,1.69-.93,4.09.76,5.37l9.65,7.26c.69.52,1.5.77,2.3.77,1.16,0,2.31-.53,3.07-1.53l.06-.09,9.66,2.19c.26.06.51.09.77.09,1.58,0,3.01-1.09,3.38-2.69l3.51-15.27c.18-.78.08-1.61-.28-2.32Zm-20.96,16.86h0s-9.65-7.26-9.65-7.26c-.59-.44-.71-1.28-.26-1.86l11-14.61c.19-.25.45-.42.75-.49l9.22-2.22c.1-.02.21-.04.31-.04.29,0,.57.09.8.27.32.24.51.61.53,1l.43,9.48c.01.31-.08.61-.27.86l-11,14.61c-.44.59-1.28.7-1.86.26Zm18.8-15.09l-3.51,15.27c-.12.52-.64.85-1.16.73l-8.56-1.94,9.28-12.34c.53-.71.81-1.59.77-2.48l-.3-6.64,3.4,6.76c.1.2.13.42.08.64Z" style="fill:#515962; stroke-width:0px;"/><path d="m27.08,12.83c-.88-.66-1.96-.94-3.05-.79-1.09.15-2.05.72-2.71,1.6-1.36,1.81-1,4.39.81,5.76.74.56,1.61.82,2.47.82,1.25,0,2.48-.57,3.29-1.64,1.36-1.81,1-4.39-.81-5.76Zm-1.19,4.25c-.54.71-1.55.85-2.26.32-.71-.53-.85-1.55-.32-2.26.26-.34.64-.57,1.06-.63.08-.01.15-.02.23-.02.35,0,.68.11.97.32.71.53.85,1.55.32,2.26Z" style="fill:#515962; stroke-width:0px;"/></g></svg>
     `,
    content: '<span data-gjs-type="cms-article-tags" class="article-tags">Article Tags</span>',
});

editor.DomComponents.addType('cms-article-related', {
    model: {
        defaults: {
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Related Articles', // The label you will see in Settings
                    name: 'cms-article-related', // The name of the attribute/property to use on component
                    placeholder: 'Comma Separated Article Ids'
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            let articleComponent = this.model.getTrait('cms-article-related');
            if (articleComponent !== null) {
                let articleRelated = articleComponent.attributes.value;
                if (articleRelated === '') {
                    articleRelated = '<a href="#">Article 1</a>,<a href="#">Article 2</a>,<a href="#">Article 3</a>'
                }
                el.innerHTML = articleRelated;
            }
        },
    },
});

editor.Blocks.add('cms-article-related', {
    label: 'Related Articles',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M8.41 33.84c-.16-.67-.84-1.08-1.51-.92-.67.16-1.08.84-.92 1.51a5.553 5.553 0 0 0 2.16 3.2 1.25 1.25 0 0 0 1.75-.28c.4-.56.28-1.34-.28-1.75a3.075 3.075 0 0 1-1.19-1.76ZM7.07 30.31c.69 0 1.25-.56 1.25-1.25v-3.05a1.25 1.25 0 0 0-2.5 0v3.05c0 .69.56 1.25 1.25 1.25ZM19.5 8.32h3.05a1.25 1.25 0 0 0 0-2.5H19.5a1.25 1.25 0 0 0 0 2.5ZM11.38 8.32h3.03a1.25 1.25 0 0 0 0-2.5h-3.05c-.69 0-1.24.56-1.24 1.25s.57 1.25 1.26 1.25ZM7.07 14.03c.69 0 1.25-.56 1.25-1.25v-1.4c0-.4.08-.78.22-1.15a1.252 1.252 0 0 0-2.32-.94c-.27.66-.4 1.37-.4 2.09v1.4c0 .69.56 1.25 1.25 1.25ZM7.07 22.17c.69 0 1.25-.56 1.25-1.25v-3.05a1.25 1.25 0 0 0-2.5 0v3.05c0 .69.56 1.25 1.25 1.25ZM16.84 36.18h-3.05a1.25 1.25 0 0 0 0 2.5h3.05a1.25 1.25 0 0 0 0-2.5ZM37.3 11.59c.1 0 .2-.01.3-.04.67-.17 1.08-.85.91-1.52a5.57 5.57 0 0 0-2.17-3.18 1.248 1.248 0 0 0-1.45 2.03c.6.42 1.02 1.05 1.2 1.75.14.57.65.95 1.21.95ZM37.43 30.45c-.69 0-1.25.56-1.25 1.25v1.42c0 .39-.07.77-.22 1.13-.26.64.06 1.37.7 1.62a1.242 1.242 0 0 0 1.62-.7c.26-.66.39-1.35.39-2.06v-1.42c0-.69-.56-1.25-1.25-1.25ZM37.43 22.31c-.69 0-1.25.56-1.25 1.25v3.05a1.25 1.25 0 0 0 2.5 0v-3.05c0-.69-.56-1.25-1.25-1.25ZM37.43 14.17c-.69 0-1.25.56-1.25 1.25v3.05a1.25 1.25 0 0 0 2.5 0v-3.05c0-.69-.56-1.25-1.25-1.25ZM24.98 36.18h-3.05a1.25 1.25 0 0 0 0 2.5h3.05a1.25 1.25 0 0 0 0-2.5ZM27.64 8.32h3.05a1.25 1.25 0 0 0 0-2.5h-3.05a1.25 1.25 0 0 0 0 2.5ZM33.12 36.18h-3.05a1.25 1.25 0 0 0 0 2.5h3.1c.69 0 1.23-.56 1.23-1.25s-.58-1.25-1.28-1.25ZM11.51 16.39c0 2.69 2.19 4.89 4.88 4.89s4.89-2.19 4.89-4.89-2.19-4.88-4.89-4.88-4.88 2.19-4.88 4.88Zm4.88-2.38c1.32 0 2.39 1.07 2.39 2.38s-1.07 2.39-2.39 2.39-2.38-1.07-2.38-2.39 1.07-2.38 2.38-2.38ZM32.99 28.11c0-2.69-2.19-4.88-4.88-4.88s-4.88 2.19-4.88 4.88 2.19 4.88 4.88 4.88 4.88-2.19 4.88-4.88Zm-4.88 2.38a2.38 2.38 0 1 1-.001-4.759 2.38 2.38 0 0 1 .001 4.759ZM20.98 32.78h.15c.62 0 1.16-.47 1.24-1.1a1.25 1.25 0 0 0-1.09-1.39 8.06 8.06 0 0 1-6.29-4.43l.55.29c.61.32 1.37.09 1.69-.51.33-.61.09-1.37-.51-1.69l-3.17-1.69s-.08-.02-.12-.04c-.08-.03-.15-.06-.24-.07-.08-.02-.16-.02-.25-.02-.05 0-.09-.02-.13-.01-.04 0-.07.03-.1.03-.04 0-.07 0-.11.01-.05.01-.08.05-.12.07a.94.94 0 0 0-.22.12c-.06.04-.12.09-.17.15-.06.06-.11.12-.16.19-.02.03-.05.05-.07.08l-1.66 3.11a1.249 1.249 0 0 0 2.2 1.18l.21-.39c1.5 3.29 4.62 5.66 8.37 6.1ZM33.79 16.92c-.61-.32-1.37-.09-1.69.51l-.21.39c-1.5-3.29-4.62-5.66-8.37-6.1a1.25 1.25 0 0 0-.3 2.48 8.06 8.06 0 0 1 6.29 4.43l-.55-.3c-.61-.32-1.37-.09-1.69.51-.33.61-.09 1.37.51 1.69l3.17 1.69s.06.02.09.04c.03.01.06.03.1.04.13.04.26.07.39.07h.14c.02 0 .04-.01.06-.02.14-.02.27-.06.39-.13.01 0 .02 0 .03-.01.12-.07.23-.17.32-.28.03-.03.05-.07.07-.1.03-.04.06-.07.09-.12l1.66-3.11c.33-.61.09-1.37-.51-1.69Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<span data-gjs-type="cms-article-related" class="article-related">Related Articles</span>',
});

editor.DomComponents.addType('cms-article-author', {
    model: {
        defaults: {
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Author', // The label you will see in Settings
                    name: 'cms-article-author', // The name of the attribute/property to use on component
                    placeholder: 'Article Author'
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            let articleComponent = this.model.getTrait('cms-article-author');
            if (articleComponent !== null) {
                let articleAuthor = articleComponent.attributes.value;
                if (articleAuthor === '') {
                    articleAuthor = 'Author Name';
                }
                el.innerHTML = articleAuthor;
            }
        },
    },
});

editor.Blocks.add('cms-article-author', {
    label: 'Article Author',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M16.67 36.18h-3.05a1.25 1.25 0 0 0 0 2.5h3.05a1.25 1.25 0 0 0 0-2.5ZM19.33 8.32h3.05a1.25 1.25 0 0 0 0-2.5h-3.05a1.25 1.25 0 0 0 0 2.5ZM8.24 33.84c-.16-.67-.84-1.08-1.51-.92-.67.16-1.08.84-.92 1.51a5.553 5.553 0 0 0 2.16 3.2 1.25 1.25 0 0 0 1.75-.28c.4-.56.28-1.34-.28-1.75a3.075 3.075 0 0 1-1.19-1.76ZM15.49 7.07c0-.69-.56-1.25-1.25-1.25h-3.05c-.69 0-1.24.56-1.24 1.25s.57 1.25 1.26 1.25h3.03c.69 0 1.25-.56 1.25-1.25ZM27.47 8.32h3.05a1.25 1.25 0 0 0 0-2.5h-3.05a1.25 1.25 0 0 0 0 2.5ZM6.9 14.03c.69 0 1.25-.56 1.25-1.25v-1.4c0-.4.07-.78.22-1.15a1.252 1.252 0 0 0-2.32-.94 5.52 5.52 0 0 0-.41 2.09v1.4c0 .69.56 1.25 1.25 1.25ZM6.9 22.17c.69 0 1.25-.56 1.25-1.25v-3.05a1.25 1.25 0 0 0-2.5 0v3.05c0 .69.56 1.25 1.25 1.25ZM6.9 30.31c.69 0 1.25-.56 1.25-1.25v-3.05a1.25 1.25 0 0 0-2.5 0v3.05c0 .69.56 1.25 1.25 1.25ZM24.8 36.17h-3.05a1.25 1.25 0 0 0 0 2.5h3.05a1.25 1.25 0 0 0 0-2.5ZM37.25 30.45c-.69 0-1.25.56-1.25 1.25v1.42c0 .39-.07.77-.22 1.13-.26.64.06 1.37.7 1.62a1.242 1.242 0 0 0 1.62-.7c.26-.66.39-1.35.39-2.06v-1.42c0-.69-.56-1.25-1.25-1.25ZM37.25 14.17c-.69 0-1.25.56-1.25 1.25v3.05a1.25 1.25 0 0 0 2.5 0v-3.05c0-.69-.56-1.25-1.25-1.25ZM37.25 22.31c-.69 0-1.25.56-1.25 1.25v3.05a1.25 1.25 0 0 0 2.5 0v-3.05c0-.69-.56-1.25-1.25-1.25ZM37.13 11.59c.1 0 .2-.01.3-.04.67-.17 1.08-.85.91-1.52a5.593 5.593 0 0 0-2.17-3.19 1.248 1.248 0 0 0-1.45 2.03c.6.42 1.02 1.05 1.2 1.75.14.57.65.95 1.21.95ZM32.95 36.17H29.9a1.25 1.25 0 0 0 0 2.5H33c.69 0 1.22-.56 1.22-1.25s-.58-1.25-1.28-1.25ZM29.25 31.41c.69-.07 1.19-.68 1.12-1.36a8.3 8.3 0 0 0-6.39-7.31 5.026 5.026 0 0 0 3.12-4.65c0-2.77-2.26-5.03-5.03-5.03s-5.03 2.26-5.03 5.03c0 2.1 1.29 3.89 3.12 4.65-3.42.79-6.04 3.66-6.37 7.22v.08c-.08.66.38 1.27 1.04 1.38.07.01.14.02.21.02.6 0 1.13-.43 1.23-1.04 0-.03 0-.08.01-.1.29-3.01 2.79-5.27 5.81-5.27s5.52 2.27 5.81 5.27c.07.69.67 1.19 1.36 1.12Zm-7.17-15.85c1.39 0 2.53 1.13 2.53 2.53s-1.13 2.53-2.53 2.53-2.53-1.13-2.53-2.53 1.13-2.53 2.53-2.53Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<span data-gjs-type="cms-article-author" class="article-author">Article Author</span>',
});

editor.DomComponents.addType('cms-article-publish-date', {
    model: {
        defaults: {
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Published Date', // The label you will see in Settings
                    name: 'cms-article-publish-date', // The name of the attribute/property to use on component
                    placeholder: 'Published Date'
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            let articleComponent = this.model.getTrait('cms-article-publish-date');
            if (articleComponent !== null) {
                let articlePublishDate = articleComponent.attributes.value;
                if (articlePublishDate === '') {
                    articlePublishDate = new Date();
                }
                el.innerHTML = articlePublishDate;
            }
        },
    },
});

editor.Blocks.add('cms-article-publish-date', {
    label: 'Article Published Date',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M15.1 32.61h14.31c1.49 0 2.71-1.22 2.71-2.71V16c0-1.49-1.22-2.71-2.71-2.71h-1.6v-.16a1.25 1.25 0 0 0-2.5 0v.16H19.2v-.16a1.25 1.25 0 0 0-2.5 0v.16h-1.6c-1.5 0-2.71 1.22-2.71 2.71v13.9c0 1.49 1.22 2.71 2.71 2.71Zm14.31-2.5H15.1c-.12 0-.21-.09-.21-.21v-8.78h14.73v8.78c0 .12-.09.21-.21.21ZM15.1 15.79h1.6V16a1.25 1.25 0 0 0 2.5 0v-.21h6.11V16a1.25 1.25 0 0 0 2.5 0v-.21h1.6c.12 0 .21.09.21.21v2.62H14.89V16c0-.12.09-.21.21-.21Z" style="fill:#515962;stroke-width:0"/><path d="M19.51 24.29h-.59a1.25 1.25 0 0 0 0 2.5h.59a1.25 1.25 0 0 0 0-2.5ZM26.02 24.29h-.59a1.25 1.25 0 0 0 0 2.5h.59a1.25 1.25 0 0 0 0-2.5ZM15.66 7.07c0-.69-.56-1.25-1.25-1.25h-3.05v1.25-1.25c-.69 0-1.24.56-1.24 1.25s.57 1.25 1.26 1.25h3.03c.69 0 1.25-.56 1.25-1.25ZM19.5 8.32h3.05a1.25 1.25 0 0 0 0-2.5H19.5a1.25 1.25 0 0 0 0 2.5ZM7.07 14.03c.69 0 1.25-.56 1.25-1.25v-1.4c0-.4.08-.78.22-1.15a1.252 1.252 0 0 0-2.32-.94c-.27.66-.4 1.37-.4 2.09v1.4c0 .69.56 1.25 1.25 1.25ZM7.07 22.17c.69 0 1.25-.56 1.25-1.25v-3.05a1.25 1.25 0 0 0-2.5 0v3.05c0 .69.56 1.25 1.25 1.25ZM7.07 30.31c.69 0 1.25-.56 1.25-1.25v-3.05a1.25 1.25 0 0 0-2.5 0v3.05c0 .69.56 1.25 1.25 1.25ZM8.41 33.84c-.16-.67-.83-1.08-1.51-.92-.67.16-1.08.84-.92 1.51a5.553 5.553 0 0 0 2.16 3.2 1.25 1.25 0 0 0 1.75-.28c.4-.56.28-1.34-.28-1.75a3.075 3.075 0 0 1-1.19-1.76ZM27.64 8.32h3.05a1.25 1.25 0 0 0 0-2.5h-3.05a1.25 1.25 0 0 0 0 2.5ZM37.43 22.31c-.69 0-1.25.56-1.25 1.25v3.05a1.25 1.25 0 0 0 2.5 0v-3.05c0-.69-.56-1.25-1.25-1.25ZM37.43 30.45c-.69 0-1.25.56-1.25 1.25v1.42c0 .39-.07.77-.22 1.13-.26.64.06 1.37.7 1.62a1.242 1.242 0 0 0 1.62-.7c.26-.66.39-1.35.39-2.06v-1.42c0-.69-.56-1.25-1.25-1.25ZM37.43 14.17c-.69 0-1.25.56-1.25 1.25v3.05a1.25 1.25 0 0 0 2.5 0v-3.05c0-.69-.56-1.25-1.25-1.25ZM16.84 36.18h-3.05a1.25 1.25 0 0 0 0 2.5h3.05a1.25 1.25 0 0 0 0-2.5ZM24.98 36.18h-3.05a1.25 1.25 0 0 0 0 2.5h3.05a1.25 1.25 0 0 0 0-2.5ZM37.3 11.59c.1 0 .2-.01.3-.04.67-.17 1.08-.85.91-1.52a5.57 5.57 0 0 0-2.17-3.18 1.248 1.248 0 0 0-1.45 2.03c.6.42 1.02 1.05 1.2 1.75.14.57.65.95 1.21.95ZM33.12 36.18h-3.05a1.25 1.25 0 0 0 0 2.5h3.09l.02-1.25v1.25c.69 0 1.23-.56 1.23-1.25s-.58-1.25-1.28-1.25Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<span data-gjs-type="cms-article-publish-date" class="article-publish-date">Publish Date</span>',
});

editor.DomComponents.addType('cms-article-link', {
    model: {
        defaults: {
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Article Link', // The label you will see in Settings
                    name: 'cms-article-link', // The name of the attribute/property to use on component
                    placeholder: 'URL to the Article'
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            let articleComponent = this.model.getTrait('cms-article-link');
            if (articleComponent !== null) {
                let articleLink = articleComponent.attributes.value;
                if (articleLink === '') {
                    articleLink = '#'
                }
                el.href = articleLink;
            }
        },
    },
});

editor.Blocks.add('cms-article-link', {
    label: 'Article Link',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M30.06 38.68a1.25 1.25 0 0 1 0-2.5h3.05c.69 0 1.27.56 1.27 1.25s-.54 1.25-1.23 1.25v-1.25l-.02 1.25h-3.08Zm-5.09 0h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5Zm-8.14 0h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5Zm-7.97-.81c-.25 0-.51-.08-.73-.24a5.537 5.537 0 0 1-2.15-3.2c-.16-.67.25-1.35.92-1.51.67-.16 1.35.25 1.51.92.17.71.59 1.33 1.19 1.76.56.4.69 1.19.28 1.75-.24.34-.63.52-1.01.52Zm28.25-1.9a1.254 1.254 0 0 1-1.16-1.71c.14-.36.22-.74.22-1.13v-1.42a1.25 1.25 0 0 1 2.5 0v1.42c0 .71-.13 1.4-.39 2.06-.2.49-.67.79-1.16.79ZM7.07 30.32c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25Zm30.35-2.45c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25ZM7.07 22.18c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25Zm30.35-2.45c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25Zm-30.34-5.7c-.69 0-1.25-.56-1.25-1.25v-1.39c0-.72.14-1.43.41-2.09a1.252 1.252 0 0 1 2.32.94c-.15.36-.22.75-.22 1.15v1.39c0 .69-.56 1.25-1.25 1.25Zm30.22-2.44c-.56 0-1.07-.38-1.21-.95-.18-.71-.6-1.33-1.2-1.75a1.248 1.248 0 0 1 1.45-2.03 5.57 5.57 0 0 1 2.17 3.18c.17.67-.24 1.35-.91 1.52-.1.03-.2.04-.3.04Zm-6.6-3.27h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5Zm-8.14 0h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5Zm-8.14 0h-3.03c-.69 0-1.26-.56-1.26-1.25s.55-1.25 1.24-1.25h3.05a1.25 1.25 0 0 1 0 2.5ZM27.61 25.29c-.32 0-.64-.12-.88-.37a1.25 1.25 0 0 1 0-1.77l2.26-2.26c.72-.72 1.11-1.67 1.11-2.69s-.4-1.97-1.11-2.69c-1.44-1.44-3.94-1.44-5.38 0l-2.26 2.26c-.49.49-1.28.49-1.77 0s-.49-1.28 0-1.77l2.26-2.26c1.19-1.19 2.77-1.85 4.46-1.85s3.27.66 4.46 1.85a6.263 6.263 0 0 1 1.85 4.46c0 1.69-.66 3.27-1.85 4.46l-2.26 2.26c-.24.24-.56.37-.88.37ZM18.2 32.6c-1.61 0-3.23-.61-4.46-1.84-1.19-1.19-1.85-2.77-1.85-4.46s.66-3.27 1.85-4.46L16 19.58c.49-.49 1.28-.49 1.77 0s.49 1.28 0 1.77l-2.26 2.26c-.72.72-1.11 1.67-1.11 2.69s.4 1.97 1.11 2.69a3.815 3.815 0 0 0 5.38 0l2.26-2.26c.49-.49 1.28-.49 1.77 0s.49 1.28 0 1.77l-2.26 2.26a6.274 6.274 0 0 1-4.46 1.84Z" style="fill:#515962;stroke-width:0"/><path d="M19.09 26.66c-.32 0-.64-.12-.88-.37a1.25 1.25 0 0 1 0-1.77l6.32-6.32c.49-.49 1.28-.49 1.77 0s.49 1.28 0 1.77l-6.32 6.32c-.24.24-.56.37-.88.37Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<a data-gjs-type="cms-article-link" class="article-link">Article Link</a>',
});


editor.DomComponents.addType('cms-article-category', {
    model: {
        defaults: {
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Article Categories', // The label you will see in Settings
                    name: 'cms-article-category', // The name of the attribute/property to use on component
                    placeholder: 'Comma Separated Article Categories'
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            let articleComponent = this.model.getTrait('cms-article-category');
            if (articleComponent !== null) {
                let articleCategory = articleComponent.attributes.value;
                if (articleCategory === '') {
                    articleCategory = '<a href="#">Category 1</a>,<a href="#">Category 2</a>,<a href="#">Category 3</a>'
                }
                el.innerHTML = articleCategory;
            }
        },
    },
});

editor.Blocks.add('cms-article-category', {
    label: 'Article Category',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M7.08 22.17c.69 0 1.25-.56 1.25-1.25v-3.05a1.25 1.25 0 0 0-2.5 0v3.05c0 .69.56 1.25 1.25 1.25ZM7.08 30.31c.69 0 1.25-.56 1.25-1.25v-3.05a1.25 1.25 0 0 0-2.5 0v3.05c0 .69.56 1.25 1.25 1.25ZM7.08 14.03c.69 0 1.25-.56 1.25-1.25v-1.4c0-.4.07-.78.22-1.15a1.252 1.252 0 0 0-2.32-.94 5.52 5.52 0 0 0-.41 2.09v1.4c0 .69.56 1.25 1.25 1.25ZM19.5 8.33h3.05a1.25 1.25 0 0 0 0-2.5H19.5a1.25 1.25 0 0 0 0 2.5ZM27.64 8.32h3.05a1.25 1.25 0 0 0 0-2.5h-3.05a1.25 1.25 0 0 0 0 2.5ZM8.41 33.84c-.16-.67-.84-1.08-1.51-.92-.67.16-1.08.84-.92 1.51a5.553 5.553 0 0 0 2.16 3.2 1.25 1.25 0 0 0 1.75-.28c.4-.56.28-1.34-.28-1.75a3.075 3.075 0 0 1-1.19-1.76ZM33.12 36.18h-3.05a1.25 1.25 0 0 0 0 2.5h3.08l.02-1.25v1.25c.69 0 1.23-.56 1.23-1.25s-.58-1.25-1.27-1.25ZM14.41 8.33a1.25 1.25 0 0 0 0-2.5h-2.96c-.71-.05-1.33.54-1.33 1.25s.57 1.25 1.26 1.25h3.03ZM37.3 11.59c.1 0 .2-.01.3-.04.67-.17 1.08-.85.91-1.52a5.57 5.57 0 0 0-2.17-3.18 1.248 1.248 0 0 0-1.45 2.03 3.1 3.1 0 0 1 1.2 1.75c.14.57.65.95 1.21.95ZM24.98 36.18h-3.05a1.25 1.25 0 0 0 0 2.5h3.05a1.25 1.25 0 0 0 0-2.5ZM37.42 22.31c-.69 0-1.25.56-1.25 1.25v3.05a1.25 1.25 0 0 0 2.5 0v-3.05c0-.69-.56-1.25-1.25-1.25ZM37.42 30.45c-.69 0-1.25.56-1.25 1.25v1.42c0 .39-.07.77-.22 1.13-.26.64.06 1.37.7 1.62a1.242 1.242 0 0 0 1.62-.7c.26-.66.39-1.35.39-2.06v-1.42c0-.69-.56-1.25-1.25-1.25ZM16.84 36.18h-3.05a1.25 1.25 0 0 0 0 2.5h3.05a1.25 1.25 0 0 0 0-2.5ZM37.42 14.17c-.69 0-1.25.56-1.25 1.25v3.05a1.25 1.25 0 0 0 2.5 0v-3.05c0-.69-.56-1.25-1.25-1.25ZM12.37 11.12c-.69 0-1.25.56-1.25 1.25v7.31c0 .69.56 1.25 1.25 1.25h7.32c.69 0 1.25-.56 1.25-1.25v-7.31c0-.69-.56-1.25-1.25-1.25h-7.32Zm6.07 7.31h-4.82v-4.81h4.82v4.81ZM31.24 23.93l-7.32 7.32c-.36.36-.46.9-.27 1.36.19.47.65.77 1.16.77h7.32c.69 0 1.25-.56 1.25-1.25v-7.32c0-.51-.3-.96-.77-1.15-.47-.19-1-.09-1.36.27Zm-.37 6.95h-3.05l3.05-3.05v3.05ZM28.47 20.94c2.71 0 4.91-2.2 4.91-4.91s-2.2-4.91-4.91-4.91-4.91 2.2-4.91 4.91 2.2 4.91 4.91 4.91Zm0-7.31c1.33 0 2.41 1.08 2.41 2.41s-1.08 2.41-2.41 2.41-2.41-1.08-2.41-2.41 1.08-2.41 2.41-2.41ZM20.57 31.24l-2.77-2.77 2.77-2.77c.49-.49.49-1.28 0-1.77a1.25 1.25 0 0 0-1.77 0l-2.77 2.77-2.77-2.77c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77l2.77 2.77-2.77 2.77a1.25 1.25 0 0 0 0 1.77c.24.24.56.37.88.37s.64-.12.88-.37l2.77-2.77 2.77 2.77c.24.24.56.37.88.37s.64-.12.88-.37c.49-.49.49-1.28 0-1.77Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<span data-gjs-type="cms-article-category" class="article-category">Article Category</span>',
});

editor.DomComponents.addType('cms-article-navigation', {
    model: {
        defaults: {
            traits: [
                {
                    type: 'text', // Type of the trait
                    label: 'Article Navigation', // The label you will see in Settings
                    name: 'cms-article-navigation', // The name of the attribute/property to use on component
                    placeholder: 'Comma Separated Article Ids'
                }
            ]
        }
    },
    view: {
        onRender({ el }) {
            let articleComponent = this.model.getTrait('cms-article-navigation');
            if (articleComponent !== null) {
                let articleNavigation = articleComponent.attributes.value;
                if (articleNavigation === '') {
                    articleNavigation = '<a href="#">Previous</a>,<a href="#">Next</a>'
                }
                el.innerHTML = articleNavigation;
            }
        },
    },
});

editor.Blocks.add('cms-article-navigation', {
    label: 'Article Navigation',
    category: 'Articles',
    media:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5"><path d="M0 0h44.5v44.5H0z" style="fill:none;stroke-width:0"/><path d="M30.06 38.68a1.25 1.25 0 0 1 0-2.5h3.05c.69 0 1.27.56 1.27 1.25s-.54 1.25-1.23 1.25v-1.25l-.02 1.25h-3.08Zm-5.09 0h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5Zm-8.14 0h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5Zm-7.97-.81c-.25 0-.51-.08-.73-.24a5.6 5.6 0 0 1-2.16-3.2c-.16-.67.25-1.35.92-1.51.67-.16 1.35.25 1.51.92.17.71.59 1.33 1.19 1.76.56.4.69 1.18.28 1.75-.24.34-.63.52-1.02.52Zm28.25-1.9c-.15 0-.31-.03-.46-.09-.64-.26-.96-.98-.7-1.62.14-.36.22-.74.22-1.13v-1.42a1.25 1.25 0 0 1 2.5 0v1.42c0 .71-.13 1.4-.39 2.06-.19.49-.67.79-1.16.79ZM7.07 30.32c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25Zm30.35-2.45c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25ZM7.07 22.18c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25Zm30.35-2.45c-.69 0-1.25-.56-1.25-1.25v-3.05a1.25 1.25 0 0 1 2.5 0v3.05c0 .69-.56 1.25-1.25 1.25Zm-30.34-5.7c-.69 0-1.25-.56-1.25-1.25v-1.4c0-.72.14-1.42.41-2.09a1.252 1.252 0 0 1 2.32.94c-.15.36-.22.75-.22 1.15v1.4c0 .69-.56 1.25-1.25 1.25Zm30.22-2.44c-.56 0-1.07-.38-1.21-.95-.18-.71-.6-1.33-1.2-1.75a1.248 1.248 0 0 1 1.45-2.03 5.57 5.57 0 0 1 2.17 3.18c.17.67-.24 1.35-.91 1.52-.1.03-.2.04-.3.04ZM19.5 8.32a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5H19.5Zm-5.09 0h-3.03c-.69 0-1.26-.56-1.26-1.25s.63-1.3 1.33-1.25h2.96a1.25 1.25 0 0 1 0 2.5Zm16.28 0h-3.05a1.25 1.25 0 0 1 0-2.5h3.05a1.25 1.25 0 0 1 0 2.5ZM19.32 21h-3.69l1.7-1.7c.49-.49.49-1.28 0-1.77s-1.28-.49-1.77 0l-3.83 3.83c-.12.12-.21.25-.27.41-.13.31-.13.65 0 .96.06.15.15.29.27.41l3.83 3.83c.24.24.56.37.88.37s.64-.12.88-.37c.49-.49.49-1.28 0-1.77l-1.7-1.7h3.69a1.25 1.25 0 0 0 0-2.5ZM33.04 22.73c.13-.31.13-.65 0-.96-.06-.15-.15-.29-.27-.41l-3.83-3.83c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77l1.7 1.7h-3.69a1.25 1.25 0 0 0 0 2.5h3.69l-1.7 1.7a1.25 1.25 0 0 0 0 1.77c.24.24.56.37.88.37s.64-.12.88-.37l3.83-3.83c.12-.12.21-.25.27-.41Z" style="fill:#515962;stroke-width:0"/></svg>
     `,
    content: '<span data-gjs-type="cms-article-navigation" class="article-navigation">Article Navigation</span>',
});

//handle events when the component trait changes
editor.TraitManager.addType('text', {
    onEvent({ elInput, component }) {
        console.log('Running', component);
        if (   component.attributes.attributes['cms-article-list'] !== undefined
            || component.attributes.attributes['cms-article-title'] !== undefined
            || component.attributes.attributes['cms-article-image'] !== undefined
            || component.attributes.attributes['cms-article-tags'] !== undefined
            || component.attributes.attributes['cms-article-content'] !== undefined
            || component.attributes.attributes['cms-article-related'] !== undefined
            || component.attributes.attributes['cms-article-author'] !== undefined
            || component.attributes.attributes['cms-article-publish-date'] !== undefined
            || component.attributes.attributes['cms-article-link'] !== undefined
            || component.attributes.attributes['cms-article-category'] !== undefined
            || component.attributes.attributes['cms-article-navigation'] !== undefined
        )
        {
            component.view.onRender({el: component.getEl()});
        }
    }
});
