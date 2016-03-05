js.alg.run(function() {
    var links = [
            { text: "Home", url: "home" },
            { text: "Documentation", url: "docs" },
            { text: "GitHub", url: "github" },
            { text: "Waffle", url: "waffle" }
        ],
        data = {
            links: [],
            header_links: links,
            version: js.env.version
        };
    
    js.lib
        // initializes the main page
        .register("init", function() {
            js.template.storeTemplateXml("./template/templates.xml", function () { 
                js.template(data).compile("main-page", null, function(html) {
                    js.dom(document.body).append(html);
                    js.lib("init-header-links");
                    js.dom("#main-page-header .main-page-link-item[data-url=home]").trigger("click");
                });
            });
        })
        // initializes the links on the left side of the page
        .register("init-header-links", function() {
            js.dom("#main-page-header .main-page-link-item")
                .on("click", function(event) {
                    var attrs = { "data-link": null };
                    js.dom(this).getAttrs(attrs);
                    js.lib("link-click", [attrs]);
                })
        })
        // prepares the links
        .register("init-navbar-links", function() {
            js.dom("#main-page-links .main-page-link-item")
                .on("click", function(event) {
                    var attrs = { "data-link": null };
                    js.dom(this).getAttrs(attrs);
                    js.lib("link-click", [attrs]);
                });
        })
        // pushes content into the document area
        .register("push-content", function(html) {
            js.dom("#main-page-content").append(html);
        })
        // erases content from the document area
        .register("erase-content", function() {
            js.lib("set-html", [""]);
        })
        // overwrites the current content area
        .register("set-html", function(html) {
            js.dom("#main-page-content").setHtml(html);
        })
        // overwrites the current content area
        .register("set-content", function(content) {
            js.lib("erase-content").lib("push-content", [content]);
        })
        // pushes new links onto the page
        .register("set-navbar-links", function(links) {
            js.template({ links: links })
                .compile("main-page-link-list", null, function(html) {
                    js.dom("#main-page-links")
                        .setHtml(html);
                });
            
            js.lib("init-navbar-links");
        })
        // processes link clicks
        .register("link-click", function(linkAttrs) {
            var link = linkAttrs["data-link"],
                page = js.registry.fetch("js-pages")[link];
                
            switch(link) {
                case "github":
                    window.open("https://www.github.com/theorphan/jspyder/");
                    break;
                case "docs":
                    window.open("http://theorphan.github.io/jspyder/docs/index.html");
                    break;
                case "waffle":
                    window.open("https://waffle.io/theorphan/jspyder");
                    break;
            }
            
            if(page) {
                page();
            }
            return;
        });
        
    js.registry.stash("js-pages", {
        "home": function() {
            var html = "Hello, World!  This is my JSpyder Page!",
                links = [
                    { text: "Home", url: "home" }
                ];
                
                
            js.lib("set-html", [html])
                .lib("set-navbar-links", [links]);
            return;
        },
        "canvas": function() {
            var canvasDef = {
                    css: { "border": "1px solid black" },
                    height: 500,
                    width: 800
                },
                templateDef = {
                    canvas: "Canvas"
                },
                data = {
                    borderWidth: 0,
                    max: 10000,
                    labelSize: 12,
                    labels: ["Group #1", "Group #2", "Group #3", "Group #4"],
                    sections: [
                        { fill: "#FBB", border: "#D00", borderWidth: 1, values: [Math.random() * 10000,Math.random() * 10000,Math.random() * 10000,Math.random() * 10000] },
                        { fill: "#BFB", border: "#0D0", borderWidth: 1, values: [Math.random() * 10000,Math.random() * 10000,Math.random() * 10000,Math.random() * 10000] },
                        { fill: "#BBF", border: "#00D", borderWidth: 1, values: [Math.random() * 10000,Math.random() * 10000,Math.random() * 10000,Math.random() * 10000] }
                    ]
                },
                canvas = js.canvas(canvasDef),
                template = js.dom(js.template(templateDef).compile("canvas-page").output());
                
            canvas.attach(template)
                .draw("barchart", data)
                .render();
                
            js.lib("set-content", [template]);
            
            return;
        }
    });
        
    js.lib("init");
});