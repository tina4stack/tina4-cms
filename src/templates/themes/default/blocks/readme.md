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

blockManager.add('quote', {
category: 'Generic',
label: 'Quote',
media: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
</svg>`,
content: `<blockquote class="quote">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
</blockquote>`
});

```