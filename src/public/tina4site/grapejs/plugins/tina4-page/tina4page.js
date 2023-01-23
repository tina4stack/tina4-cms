/*! tina4-inline-storage - *0.1 */
!function (e, t) {
    /*If browser*/
    'function' == typeof define ? /*Define as expression*/ define([], t) /*Else Define as plugin */ : e["grapejs-tina4-page"] = t()
}(window, (function () {
    return tina4page = function () {
        //Allow for public access to grid if user would like to override
        this.pageListingGrid = null;

        //Initialize the page listing grid (Pages from Tina4CMS)
        this.initializePageListing = function (pageListingSelector, forceReload = false) {

            //Fetch and populate grid listing
            try {
                //Get the page listing
                $.get("/api/tina4site/pages/get-page-list").done(function (result) {

                    //Define icons used in grid
                    var editOnCMSIcon = function (cell, formatterParams) { //plain text value
                        return "<i style='color:blue;' class='fa fa-pencil'></i>";
                    };
                    var loadPageIcon = function (cell, formatterParams) { //plain text value
                        return "<i style='color:blue;' class='fa fa-globe'></i>";
                    };

                    //Initialize the grid
                    this.pageListingGrid = new Tabulator("#page-listing-grid", {
                        layout: "fitColumns",
                        data: result,
                        columns: [
                            {title: "Name", field: "name", width: 150},
                            {title: "Title", field: "title"},
                            {title: "Description", field: "description", width: 300},
                            {title: "Published", field: "is_published", formatter: "tickCross", hozAlign: "center"},
                            {title: "Author", field: "author", hozAlign: "center"},
                            {title: "Slug", field: "slug"},
                            {title: "Created", field: "date_created", hozAlign: "center"},
                            //Redirect to CMS to allow modification of page Meta info
                            {
                                title: "Edit on CMS",
                                formatter: editOnCMSIcon,
                                field: "id",
                                hozAlign: "center",
                                cellClick: function (e, cell) {
                                    window.location.replace("/cms/dashboard")
                                }
                            },
                            //Load page into Tina4Site
                            {
                                title: "Edit Page",
                                formatter: loadPageIcon,
                                field: "id",
                                hozAlign: "center",
                                cellClick: function (e, cell) {
                                    loadPage(cell.getRow().getData().id)
                                }
                            },
                        ],
                    });
                    return this.pageListingGrid;
                })
            } catch (e) {
                console.log("Unable to get page listing");
                throw(e)
            }
        };

        //Public context
        this.renderTwigTemplate = function(id){
             $.ajax({
                url: '/api/tina4site/pages/render-as-twig/' + id,
                type: "GET",
                success: function (data) {
                 $.MessageBox({
                      buttonDone: "Ok",
                      message: data
                  }).done(function () {
                      loadPageData(id)
                  });
                }
            })
           };

        this.savePage = function (id) {
            //Check if a page is loaded
            if (typeof(id) == 'undefined' || id == '') {
                $.MessageBox("No page has been selected from Tina4CMS!");
                return;
            }

            // Prompt
            $.MessageBox({
                buttonDone: "Save!",
                buttonFail: "Cancel",
                input    : true,
                message  : "Leave a note!"
            }).done(function (note) {
                //Get page data
                const projectDataEl = document.getElementById('project-data');
                const projectHtmlEl = document.getElementById('project-html');

                //Process page data into json array for request
                let jsonData = JSON.parse(projectDataEl.value);
                let pageData = {
                    pages: jsonData.pages,
                    assets: jsonData.assets,
                    styles: jsonData.styles,
                    html: projectHtmlEl.value,
                    note: note,
                }

                if (typeof (pageData.assets) == 'undefined') {
                    $.MessageBox( "Cannot save an empty Page");
                    return;
                }

                //Finally stringify the data for request
                pageData = JSON.stringify(pageData)

                //Actuate the request
                $.ajax({
                    url: '/api/tina4site/pages/store/' + id + '?formToken=' + formToken,
                    type: "POST",
                    data: pageData,
                    success: function (data) {
                        tina4revisionManager.initializePageRevisionListing();
                        $.MessageBox(data);
                    }
                })
            }).fail(function () {
                return;
            });


        }

        //Private context
        loadPage = function (id) {
            const projectDataEl = $('#project-data').val();
            let jsonData = JSON.parse(projectDataEl);

            if ((typeof (jsonData.assets) != 'undefined')) {
                $.MessageBox({
                    buttonDone: "Yes",
                    buttonFail: "No",
                    message: "All current progress will be lost, Are you sure?"
                }).done(function () {
                    loadPageData(id)
                }).fail(function () {
                    return;
                });
            } else {
                loadPageData(id)
            }
        }
        //Initialize page
        function loadPageData(id) {
            $.ajax({
                url: '/api/tina4site/pages/get-page-data/' + id,
                type: "GET",
                success: function (data) {

                    //Set ID in context
                    $("#tina4site-page-id").val(id);
                    //Set the title
                    $("#page-title").text(data.title);
                    //Show "Edit" icon
                    $('#editOnCMSTitleButton').removeAttr('hidden');

                    //Gather required variables
                    let pageData = (data.pages);
                    let jStyles = JSON.parse(data.styles);
                    let jPageData = JSON.parse(pageData);

                    //Check if there is anything to actually load
                    if(jPageData == null){
                        //If there is nothing to load, define a empty body
                        let components = {"pages": [{"component": ""}]}
                        //Load page components into editor context
                        editor.setComponents(components);

                    } else {
                        //Gather page components
                        let components = (jPageData.pages[0].frames[0].component.components)
                        //Load page components into editor context
                        editor.setComponents(components);
                        //Set the styles!
                        editor.setStyle(jStyles.styles);

                    }
                    //Hide modal grid
                    $("#header_close").attr("hidden", false);
                    $("#footer_close").attr("hidden", false);
                    $("#page-list-modal").modal('hide');

                }
            })
        };
    }
}))