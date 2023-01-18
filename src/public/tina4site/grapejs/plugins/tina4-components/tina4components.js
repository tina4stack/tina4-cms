/*! tina4-components - *0.1 */
!function (e, t) {
    /*If browser*/
    'function' == typeof define ? /*Define as expression*/ define([], t) /*Else Define as plugin */ : e["grapejs-tina4-blocks"] = t()
}(window, (function () {
        return tina4components = function () {
//Allow for public access to grid if user would like to override
            this.componentListingGrid = null;

            this.componentListingGrid = function () {

                //Fetch and populate grid listing
                try {
                    //Get the component listing
                    $.get("/api/tina4site/components/get-grouped-list").done(function (result) {

                        //Define icons used in grid
                        var editOnCMSIcon = function (cell, formatterParams) { //plain text value
                            return "<i style='color:blue;' class='fa fa-pencil'></i>";
                        };
                        var loadPageIcon = function (cell, formatterParams) { //plain text value
                            return "<i style='color:blue;' class='fa fa-globe'></i>";
                        };

                        //Initialize the grid
                        this.componentListingGrid = new Tabulator("#component-list-grid", {
                            layout: "fitColumns",
                            data: result,
                            groupBy: "group_name",
                            columns: [
                                {title: "Group Name", field: "group_name", width: 240},
                                {title: "Component Name", field: "name"},
                                //Redirect to CMS to allow modification of component Meta info
                                {
                                    title: "Edit on CMS",
                                    formatter: editOnCMSIcon,
                                    field: "id",
                                    hozAlign: "center",
                                    cellClick: function (e, cell) {
                                        window.location.replace("/tina4site/component-group/landing")
                                    }
                                },
                                //Load component into Tina4Site
                                {
                                    title: "Edit Component",
                                    formatter: loadPageIcon,
                                    field: "id",
                                    hozAlign: "center",
                                    cellClick: function (e, cell) {
                                        loadComponent(cell.getValue())
                                    }
                                },
                            ],
                        });
                        return this.componentListingGrid;
                    })
                } catch (e) {
                    console.log("Unable to get component listing");
                    throw(e)
                }
            }

            loadComponent = function (id) {
                $.ajax({
                    url: '/api/tina4site/component/get/' + id,
                    type: "GET",
                    success: function (data) {

                        $("#tina4site-component-id").val(id);
                        html = data[0].html.unescapeHTML();
                        style = "<style>" + data[0].css + "</style>";

                        component = html + style;

                        editor.setComponents(component);
                        $("#header_close").attr("hidden", false);
                        $("#footer_close").attr("hidden", false);
                        $("#component-list-modal").modal("hide");
                    }
                });
            }

            this.loadComponents = function () {
                $.ajax({
                    url: '/api/tina4site/components/get-grouped-list',
                    type: "GET",
                    success: function (data) {
                        l = data.length;
                        for (var i = 0; i < l; i++) {
                            editor.BlockManager.add(data[i].name, {
                                label: data[i].name,
                                category: data[i].group_name,
                                attributes: {class: 'fa ' + data[i].icon},
                                content: '<body>' + data[i].html.unescapeHTML()  +'<style>'+ data[i].css +'</style>'+ '</body>'
                            });
                        }
                    }
                });
            }

            this.saveComponent = function () {
                var html = editor.getHtml();
                var bodyTagToRemove = html.substring(0, html.indexOf('>', 0) + 1);
                html = html.replace(bodyTagToRemove, '');
                html = html.replace('</body>', '');
                cssToSave = editor.getCss();

                component = {
                    id: $("#tina4site-component-id").val(),
                    html: html,
                    css: cssToSave
                }
                console.log(component)
                $.ajax({
                    url: '/api/tina4site/component/save?formToken=' + formToken,
                    type: "POST",
                    data: component,
                    success: function (data) {
                        $.MessageBox(data)
                    }
                });
            }

            this.saveComponentAs = function () {

                let groups = []
                $.ajax({
                    url: '/api/tina4site/component/groups',
                    type: "GET",
                    async:false,
                    success: function (data) {
                        l = data.length;
                        for(let x = 0; x<l; x++){
                            groups.push(data[x].name)
                        }
                    }
                });

                // Multiple inputs of different types
                $.MessageBox({
                                message : "<b>Save as new Component</b>",
                    buttonDone: "Save!",
                    buttonFail: "Cancel",
                    input   : {
                        name   : {
                            type         : "name",
                            label        : "Name :",
                            title        : ""
                        },
                        group: {
                            type         : "select",
                            label        : "Select a Group",
                            title        : "Select a Group",
                            options      : groups,

                        },
                        enabled : {
                            type         : "checkbox",
                            label        : "Enabled:",
                            title        : "Check or uncheck this to manage component availability",
                        },
                    },
                    filterDone : function(data){
                        // Note the use of ".then()" instead of ".done()" to return a new promise
                        if(data.name == ""){
                            return "Name Required"
                        }
                        if(data.name.length < 5){
                            return "Name should be atleast 5 characters long"
                        }
                        if(data.group == ""){
                            return "Select a Group"
                        }
                    },
                    top     : "auto"
                }).done(function(inputData){

                    var html = editor.getHtml();
                    var bodyTagToRemove = html.substring(0, html.indexOf('>', 0) + 1);
                    html = html.replace(bodyTagToRemove, '');
                    html = html.replace('</body>', '');
                    cssToSave = editor.getCss();

                    component = {
                        html: html,
                        name: inputData.name,
                        group: inputData.group,
                        enabled: inputData.enabled,
                        icon: 'fa-circle',
                        css: cssToSave
                    }

                    $.ajax({
                        url: '/api/tina4site/component/save-as?formToken=' + formToken,
                        type: "POST",
                        data: component,
                        success: function (data) {
                           if(data.status == "false"){
                               $.MessageBox(data.response)
                           } else {
                               loadComponent(data.response)
                               if(component.enabled == true){
                                   editor.BlockManager.add(component.name, {
                                       label: component.name,
                                       category: component.group,
                                       attributes: {class: 'fa ' + component.icon},
                                       content: '<body>' + component.html.unescapeHTML() + '</body>'
                                   });
                               }

                               //Check if user would like to edit on CMS
                               $.MessageBox({
                                   buttonDone  : "Yes",
                                   buttonFail  : "No",
                                   message  : "Successfully saved new Component as : " + component.name + ", Edit on CMS Now?"
                               }).done(function(){
                                       window.location.replace("/tina4site/component-group/landing")
                               }).fail(function(){
                                   return;
                               });

                           }

                        }
                    });
                }).fail(function(){
                    return false;
                })
            }
        }
    }
))

