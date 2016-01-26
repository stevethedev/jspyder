/** BANK.JS **/


// PAGE MANIPULATION FUNCTIONS
js.lib.registerSet({
    // inserts new data to the page.
    "addContent": function(v) {
        js.dom(CONTENT_PANEL_ID).append(v);
    },
    
    // removes all data from the page
    "clearContent": function() {
        js.dom(CONTENT_PANEL_ID).setHtml("");
    },
    
    // replaces the current data on the page
    "setContent": function(v) {
        js.dom(CONTENT_PANEL_ID).setHtml("").append(v);
    },
    
    // processes a page open
    "getPage": function(page) {
        console.log(page);
    }
});


// DATA DISPLAY
var $t = js.template({
    divisions: ["J2", "J2X", "J22", "J23", "J25", "J26", "J28", "J29"],
    bank_navigation: [
        { page: "home", text: "HOME" },
        { page: "query", text: "ITEMIZED QUERY" },
        { page: "input", text: "DATA ENTRY" },
        { page: "filter", text: "DATA FILTERS" },
        { page: "chart", text: "WEB CHARTS" },
    ],
    bank_subnav_constant: [
        { subnav: "collapse", text: "<i class='compare-arrows'></i><span>Collapse</span>" }
    ],
    bank_subnav_volatile: []
});
var projectedTravel = {
    table_header: "Projected Travel",
    table_class: "projected travel",
    table_columns: [
        {
            tag: "division",
            text: "Division"
        },
        {
            tag: "fyq1",
            text: "1<sup>st</sup> Quarter",
            class: "currency",
            default: 0
        },
        {
            tag: "fyq2",
            text: "2<sup>nd</sup> Quarter",
            class: "currency",
            default: 0
        },
        {
            tag: "fyq3",
            text: "3<sup>rd</sup> Quarter",
            class: "currency",
            default: 0
        },
        {
            tag: "fyq4",
            text: "4<sup>th</sup> Quarter",
            class: "currency",
            default: 0
        },
        {
            tag: "fyTotal",
            text: "Total",
            class: "currency",
            default: 0
        },
        {
            tag: "fyRemaining",
            text: "Remaining",
            class: "currency",
            default: 0
        }
    ],
    // ["Division", "Travel Budget", "1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter", "Total", "Remaining"],
    table_rows: [
        { division: "J20", fyq1: 2000 }, 
        { division: "J2X", fyq1: 2100 }, 
        { division: "J22", fyq1: 2200 }, 
        { division: "J23", fyq1: 2300 }, 
        { division: "J25", fyq1: 2500 }, 
        { division: "J26", fyq1: 2600 }, 
        { division: "J28", fyq1: 2800 }, 
        { division: "J29", fyq1: "2,900", fyq1_class: "os-quarter", fyq1_tooltip: "Overspent quarterly value by $2,000" }
    ]
};


// TEMPLATE MANIPULATION
js.ajax("tmp/templates.xml")
    .get(function(xhttp) {
        var $xml = js.dom(xhttp.responseXML.firstChild),
            $template = js.template();
            
        $xml.children(function(child) {
            $template.storeTemplate(child.getAttribute("name"), child.innerHTML);
        });
        
        $t.compile("main-page", null, function(main) {
            js.lib("initBank", [main]);
        })
        
        $t.compile("overview-table", projectedTravel, function(table) {
            js.lib("setContent", [table])
            //js.dom(document.body).append(table);
            //console.log(table);
        });
    });
    
