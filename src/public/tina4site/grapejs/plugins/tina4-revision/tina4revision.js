//Ensure that required plugin is in scope
$(document).ready(function () {
    if (typeof tina4storagePlugin == 'undefined') {
        throw ("Plugin config (tina4revision) :  failed to initialise (Storage manager not found)");
    }
})

/*! tina4-inline-storage - *0.1 */
!function (e, t) {
    /*If browser*/
    'function' == typeof define ? /*Define as expression*/ define([], t) /*Else Define as plugin */ : e["grapejs-tina4-revision"] = t()
}(window, (function () {
    return tina4revision = function () {
        //Allow for public access to grid if user would like to override
        this.pageHistoryListingGrid = null;

        this.showRevisionModel = function (pageRevisionListingSelect) {
            if ($("#tina4site-page-id").val() != '') {
                this.initializePageRevisionListing()
                $("#revision-modal").modal("show")
            } else {
                $.MessageBox("No page has been selected from Tina4CMS!");
            }
        }

        //Initialize the page listing grid (Pages from Tina4CMS)
        this.initializePageRevisionListing = function () {
            //Attempt to fetch id in context
            let cms_page_id = $("#tina4site-page-id").val();
            //Check if ID is valid
            if (typeof (cms_page_id) == 'undefined' || cms_page_id == '') {
                $.MessageBox("No page has been selected from Tina4CMS!");
                return;
            }

            //Fetch and populate grid listing
            try {
                //Get the page listing
                $.get("/api/tina4site/revision/get-page-revision-list/" + cms_page_id).done(function (result) {

                    var refreshIcon = function (cell, formatterParams) { //plain text value
                        return "<i style='color:blue;' class='fa fa-refresh'></i>";
                    };
                    var deleteIcon = function (cell, formatterParams) { //plain text value
                        return "<i style='color:red;' class='fa fa-trash'></i>";
                    };

                    //Initialize the grid
                    this.pageRevisionListingGrid = new Tabulator("#revision-grid", {
                        layout: "fitColumns",
                        data: result,
                        columns: [
                            {title: "Entry ID", field: "id", width: 150},
                            {title: "Note", field: "note"},
                            {title: "System Note", field: "system_note"},
                            {title: "Revision #", field: "revision_no"},
                            {title: "Created", field: "created_at", hozAlign: "center"},
                            //Restore to previous revision
                            {
                                title: "Restore to Revision",
                                formatter: refreshIcon,
                                field: "id",
                                hozAlign: "center",
                                cellClick: function (e, cell) {
                                    updateCurrentPageToRevision(cms_page_id, cell.getRow().getData().id)
                                }
                            },
                            //Delete given revision
                            {
                                title: "Remove Revision",
                                formatter: deleteIcon,
                                field: "id",
                                hozAlign: "center",
                                cellClick: function (e, cell) {
                                    removeRevisionEntry(cell.getRow().getData().id)
                                }
                            },
                        ],
                    });
                    return this.pageRevisionListingGrid;
                })
            } catch (e) {
                console.log("Unable to get page listing");
                throw(e)
            }
        };

        //Initialize page update from revision to live
         function updateCurrentPageToRevision(cms_page_id, selected_revision_no) {
            $("#revision-modal").modal("hide");
            $.MessageBox({
                buttonDone: "Save!",
                buttonFail: "Cancel",
                input: true,
                message: "Leave a note!"
            }).done(function (note) {
                let revision_data = {
                    cms_page_id: cms_page_id,
                    selected_revision_no: selected_revision_no,
                    note: note,
                }
                revision_data = JSON.stringify(revision_data)
                $.ajax({
                    url: '/api/tina4site/revision/update-to-revision?formToken=' + formToken,
                    type: "POST",
                    data: revision_data,
                    success: function (data) {
                        //Gather required variables
                        let pageData = (data.pages);
                        let jStyles = JSON.parse(data.styles);
                        let jPageData = JSON.parse(pageData);
                        //Gather page components
                        let components = (jPageData.pages[0].frames[0].component.components)

                        //Load page components into editor context
                        editor.setComponents(components);
                        //Set the styles!
                        editor.setStyle(jStyles.styles);
                        //Hide modal grid
                        $("#revision-modal").modal('hide');

                        $.MessageBox("Page restored to revision");

                    }
                })
            }).fail(function () {
                return;
            })

        };

        //Initialize page update from revision to live
        function removeRevisionEntry(id) {
            $.MessageBox({
                buttonDone: "Remove",
                buttonFail: "Cancel",
                message: "Remove Revision ID : " + id
            }).done(function(){
                $.ajax({
                    url: '/api/tina4site/revision/remove-revision-entry/' + id + '?formToken=' + formToken,
                    type: "DELETE",
                    success: function (data) {
                        $("#revision-modal").modal("hide");
                        $.MessageBox(data.message);
                    }
                })
            })
        };
        //Initialize page update from revision to live
        this.clearRevisionHistory = function(cms_page_id) {
            $.MessageBox({
                buttonDone: "Remove",
                buttonFail: "Cancel",
                message: "Remove ALL Revisions?"
            }).done(function(){
            $.ajax({
                url: '/api/tina4site/revision/clear-revision-history/' + cms_page_id + '?formToken=' + formToken,
                type: "DELETE",
                success: function (data) {
                    $("#revision-modal").modal("hide");
                    $.MessageBox(data.message)
                }
            })
         })
        };
    }
}))
