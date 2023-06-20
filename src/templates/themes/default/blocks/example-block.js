// Add a new Block
const block = blockManager.add('BLOCK-ID', {
    // Your block properties...
    label: 'My block',
    content: '\{\{ addSnippet(\'Example Block\') \}\}',
    category: 'Snippets'
});

