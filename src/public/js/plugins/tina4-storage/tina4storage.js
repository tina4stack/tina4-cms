// Inline storage
const tina4storagePlugin = (editor) => {

    //Get hidden page elements
    const projectDataEl = document.getElementById('project-data');
    const projectHtmlEl = document.getElementById('project-html');

    /*
      Get editor in context
      Add storage manager type
      Declare function overrides
    */
    editor.Storage.add('tina4storage', {
        load() {
            return JSON.parse(projectDataEl.value || '{}');
        },
        store(data) {
            //Fetch the main body
            const component = editor.Pages.getSelected().getMainComponent();
            //Set the hidden elements values
            projectDataEl.value = JSON.stringify(data);
            projectHtmlEl.value = `<html>
          <head>
            <style>${editor.getCss({ component })}</style>
          </head>
          ${editor.getHtml({ component })}
        <html>`;
        }
    });
};

