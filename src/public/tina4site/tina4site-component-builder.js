/*
  tina4-site v1.0
  Please see config for panel buttons, style manager, plugins and device
  /public/tina4site/config/*

 Exception will attempt to ensure required inclusions

 tina4StorageManager and tina4StoragePlugin can be found at
 /public/tina4site/grapejs/plugins/tina4-storage


 tina4blocksManager can be found at
 /public/tina4site/grapejs/plugins/tina4-components

*/

//Ensure that required libraries are in scope
if (typeof grapesjs == 'undefined') {
  throw ("Grape JS Not found in scope! Unable to initialize site builder");
}
if (typeof $ != 'function') {
  throw ("JQuery Not found in scope! Unable to initialize API to CMS");
}

//Ensure that required constants are in scope
if (typeof pluginsConst == 'undefined') {
  throw ("Plugin config failed to initialise");
}
if (typeof pluginOptsConst == 'undefined') {
  throw ("Plugin options failed to initialise");
}
if (typeof styleManagerSectorsConst == 'undefined') {
  throw ("Style sections config failed to initialise");
}
if (typeof leftPanelButtonOpts == 'undefined') {
  throw ("Left Panel Button options failed to initialise");
}

//Initialize asset manager
const tina4assetManager = new tina4asset();

//Initialize tina4-config-plugin
//const tina4ConfigManager = new tina4Config();

//Initialize custom blocks plugin
const tina4ComponentsManager = new tina4components();

const css = tina4assetManager.cssAssetsArray()
const js = tina4assetManager.javascriptAssetsArray()
//Initialize editor
const   editor = grapesjs.init({
  showOffsets: true,
  allowScripts: true,
  noticeOnUnload: 1,
  height: '100%',
  container: "#editor",
  plugins: pluginsConst,
  pluginsOpts: pluginOptsConst,
  storageManager: {type: 'tina4storage'},
  canvas: {
    styles: ['https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'],
    scripts: ['https://code.jquery.com/jquery-3.4.1.min.js']
  },
  selectorManager: {
    appendTo: '#styles-container',
  },
  //Style panel (Sidebar)
  styleManager: {
    appendTo: '#styles-container',
    sectors: styleManagerSectorsConst
  },
  //Layers manager panel (Sidebar)
  layerManager: {
    appendTo: '#layers-container',
  },
  //Editable traits/attributes panel (Sidebar) [id,url,href etc]
  traitManager: {
    appendTo: '#trait-container',
  },
  //Bring panel structure into editor context
  panels: {
    defaults: [
      {
        id: 'left-panel',
        el: '.panel__left',
        buttons: componentBuilderLeftPanel
      },
      {
        id: 'right-panel',
        el: '.panel__right',
        buttons: componentBuilderRightPanel
      },
    ],
  },
  //Append the block manager
  blockManager: {
    appendTo: '#blocks',
  },
  //Define device manager configuration
  deviceManager: {
    devices: deviceOptsConst
  },
  //Define plugins configuration
  plugins: pluginsConst ,
  pluginsOpts: pluginOptsConst,
});

// Commands
//@Params
//1 : Button ID
//2 : Event Options // => function
//EG : {run : variableAccessor } || (varToBringIntoScope) => { /* do stuff */ }
editor.Commands.add('toggle-nav-bar', () => {
  //Get elements to manage on toggle
  let sidebar = document.getElementById('sidebar')
  mainbody = document.getElementById('main-body')
  //Check sidebar status (0px if collapsed)
  if(sidebar.style.width === '0px'){
    sidebar.style.width = '275.95px'
    mainbody.style.left = '15%';
    mainbody.style.width = '85%';
  } else {
    sidebar.style.width = '0px'
    mainbody.style.left = '0px';
    mainbody.style.width = '100%';
  }
});

editor.Commands.add('set-device-desktop', {
  run: (editor) => editor.setDevice('Desktop'),
});
editor.Commands.add('set-device-tablet', {
  run: (editor) => editor.setDevice('Tablet'),
});
editor.Commands.add('set-device-mobile', {
  run: (editor) => editor.setDevice('Mobile'),
});
//Page modals
editor.Commands.add('load-component-modal', {
  run : function () {
    $("#component-list-modal").modal("show")
  }
});
editor.Commands.add('save-component', {
  run : function () {
    tina4ComponentsManager.saveComponent()
  }
});
editor.Commands.add('save-component-as', {
  run : function () {
    tina4ComponentsManager.saveComponentAs()
  }
});
editor.Commands.add('add-page', {
  run : function () {
    window.location.replace("/cms/dashboard")
  }
});
editor.Commands.add('show-revision-modal', {
  run : function () {
    tina4revisionManager.showRevisionModel("#revision-grid");
  }
});

//On editor initialization
editor.on('load', (editor) => {
//Initialize custom blocks
  tina4ComponentsManager.loadComponents($("#tina4site-component-id").val());
  $("#component-list-modal").modal("show")
  $("#component-list-modal").on('hide.bs.modal', function (e) {
    if ($("#tina4site-component-id").val() === '') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });
  tina4ComponentsManager.componentListingGrid();
  //Close all blocks by default
  editor.BlockManager.getCategories().each(ctg => ctg.set('open', false))

});
