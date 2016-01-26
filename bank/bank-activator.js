// bank-activate
js.lib

    .register("initBank", function (main) {
        js.dom(document.body).append(main);

        js.lib("initLinks")
            .lib("activateConstSubnav");
    })

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

    .register("activateConstSubnav", function () {
        var $viewport = js.dom(".bank-viewport");

        js.dom(".subnav-collapse")
            .on("click", function (event) {
                var cls = { "collapsed-menu": null };
                $viewport.getClasses(cls);
                js.lib("setSubnavCollapsed", [!cls["collapsed-menu"]]);
                console.log(cls);
            });
    });

js.lib.register("setSubnavCollapsed", function (collapsed) {
    js.dom(".bank-viewport").setClasses({
        "collapsed-menu": collapsed
    });
});
