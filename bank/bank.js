/** BANK.JS **/
/* global js */

// Get the JSpyder template data, then build JSpyder interface.
js.ajax("tmp/templates.xml")
    .get(function (xhttp) {
        var $xml = js.dom(xhttp.responseXML.firstChild),
            $template = js.template();

        $xml.children(function (child) {
            $template
                .storeTemplate(
                    child.getAttribute("name"), 
                    child.innerHTML);
        });

        $template
            .compile("main-page", null, function (main) {
                js.lib("initBank", [main]);
            })
            .compile("overview-table", projectedTravel, function (table) {
                js.lib("setContent", [table]);
            });
    });
    
