This folder is where all your blocks will be stored
https://grapesjs.com/docs/modules/Blocks.html#configuration
### Block example
```json
// Add a new Block
const block = blockManager.add('BLOCK-ID', {
  // Your block properties...
  label: 'My block',
  content: '...',
});
```