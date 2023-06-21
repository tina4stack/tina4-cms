This folder is where all your components will be stored
https://grapesjs.com/docs/modules/Components.html

Type Stack

 | Type     | Description                                                                                                        |
 |----------|--------------------------------------------------------------------------------------------------------------------|
 | default  | default component                                                                                                  |
 | cell     | (opens new window)- Component for handle `<td>` and `<th>` elements                                                |
 | row      | (opens new window)- Component for handle `<tr>` elements                                                           |
 | table    | (opens new window)- Component for handle `<table>` elements                                                        |
 | thead    | (opens new window)- Component for handle `<thead>` elements                                                        |
 | tbody    | (opens new window)- Component for handle `<tbody>` elements                                                        |
 | tfoot    | (opens new window)- Component for handle `<tfoot>` elements                                                        |
 | map      | (opens new window)- Component for handle `<a>` elements                                                            |
 | link     | (opens new window)- Component for handle `<a>` elements                                                            |
 | label    | (opens new window)- Component for handle properly `<label>` elements                                               |
 | video    | (opens new window)- Component for videos                                                                           |
 | image    | (opens new window)- Component for images                                                                           |
 | script   | (opens new window)- Component for handle `<script>` elements                                                       |
 | svg      | (opens new window)- Component for handle SVG elements                                                              |
 | comment  | (opens new window)- Component for comments (might be useful for email editors)                                     |
 | textnode | (opens new window)- Similar to the textnode in DOM definition, so a text element without a tag element.            |
 | text     | (opens new window)- A simple text component that can be edited inline                                              |
 | wrapper  | (opens new window)- The canvas need to contain a root component, a wrapper, this component was made to identify it |

### Component example
```json
const script = function() {
 //alert('Hi');
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
  },
  view: {
  onRender({ el }) {
  el.innerHTML = '<h1>Hello</h1>';
  },
 }
});

// Create a block for the component, so we can drop it easily
editor.Blocks.add('test-block', {
 label: 'Test block',
 attributes: { class: 'fa fa-text' },
 content: { type: 'example-component' },
});

```