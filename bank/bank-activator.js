// bank-activate
js.lib

    // writes the initial page layout
    .register("initBank", function (main) {
        js.dom(document.body).append(main);

        js.lib("initLinks")
            .lib("activateConstSubnav");
    })

    // initializes the links across the top of the window
    .register("initLinks", function () {
        js.dom(".bank-navigation .link").each(function (link) {
            var $link = js.dom(link);

            $link.on("click", function (event) {
                $link.getAttrs({ "data-page": null }, function (data) {
                    js.lib("getPage", [data["data-page"]]);
                });
            });
        });
    })

    // initializes the base subnavigation menu
    .register("activateConstSubnav", function () {
        var $viewport = js.dom(".bank-viewport");

        js.dom(".subnav-collapse")
            .on("click", function (event) {
                var cls = { "collapsed-menu": null };
                $viewport.getClasses(cls);
                js.lib("setSubnavCollapsed", [!cls["collapsed-menu"]]);
                console.log(cls);
            });
    })
    
    // inserts new data to the page.
    .register("addContent", function(v) {
        js.dom("#bank-content-panel").append(v);
    })
    
    // removes all data from the page
    .register("clearContent", function() {
        js.dom("#bank-content-panel").setHtml("");
    })
    
    // replaces the current data on the page
    .register("setContent", function(v) {
        js.dom("#bank-content-panel").setHtml("").append(v);
    })
    
    // processes a page open
    .register("getPage", function(page) {
        console.log(page);
    })

    .register("setSubnavCollapsed", function (collapsed) {
        js.dom(".bank-viewport").setClasses({
            "collapsed-menu": collapsed
        });
    })
    
    // loads subnav data
    .register("setSubnav", function(subnav) {
        js.template(subnav).compile(
            "bank-subnav-list", function(data) {
                js.dom("#bank-subnavigation").remove();
                js.dom(".bank-subnavigation-container").append(data);
            });
    })
