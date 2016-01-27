/** BANK.JS **/
/* global js */
js.alg.run(function () {    
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
            
            js.lib("initBank");
        });
});
