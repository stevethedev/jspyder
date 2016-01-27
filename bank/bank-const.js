// BANK CONST
var BANK_CONST = {
    // division names
    DIVISIONS: [
        { name: "J2", code: "J20" },
        { name: "J2X", code: "J2X" },
        { name: "J22", code: "J22" },
        { name: "J23", code: "J23" },
        { name: "J25", code: "J25" },
        { name: "J26", code: "J26" },
        { name: "J28", code: "J28" },
        { name: "J29", code: "J29" },
    ],
    
    // navigation links
    MAIN_NAVIGATION: [
        { page: "home", text: "HOME" },
        { page: "input", text: "DATA ENTRY" },
        { page: "query", text: "ITEMIZED QUERY" },
        { page: "filter", text: "DATA FILTERS" },
        { page: "chart", text: "WEB CHARTS" }
    ],
    
    CONSTANT_SUBNAV: [
        { subnav: "collapse", text: "Collapse", icon: "compare-arrows" }
    ],
    
    MAIN_NAVIGATION_DEFAULT: "home",
    
    // page data
    PAGES: {
        home: {
            subnav: [
                {
                    subnav: "home.overview", 
                    text: "Travel",
                    constructor: function () {
                        var $travelTable = BANK_DATA.buildOverviewTableTemplateData("projected-travel"),
                            $trainingTable = BANK_DATA.buildOverviewTableTemplateData("projected-training");
                        function _writeTable(data) { js.lib("addContent", [data]); }
                        
                        js.template()
                            .compile("overview-table", $travelTable, _writeTable)
                            .compile("overview-table", $trainingTable, _writeTable);
                    }
                }
            ],
            defaultSubnav: "home.overview"
        }
    },
    
    SUB_NAVIGATION: { 
        "home.overview": {}
    },
    
    // SP table definition
    SP_LIST: {
        Transactions: {
            // literal fields
            "id": { name: "ID", text: "ID", type: "number" },
            "division": { name: "Division", text: "Division", type: "text", default: "J2" },
            "fyq1": { name: "FYQ1", text: "1<sup>st</sup> Quarter", data_class: "currency", type: "number", default: 0 },
            "fyq2": { name: "FYQ2", text: "2<sup>nd</sup> Quarter", data_class: "currency", type: "number", default: 0 },
            "fyq3": { name: "FYQ3", text: "3<sup>rd</sup> Quarter", data_class: "currency", type: "number", default: 0 },
            "fyq4": { name: "FYQ4", text: "4<sup>th</sup> Quarter", data_class: "currency", type: "number", default: 0 },
        }
    },
    
    // data for the constructed overview tables
    OVERVIEW_TABLES: [
        { 
            id: "projected-travel", 
            title: "Projected Travel",
            class: "projected travel",
            columns: ["division", "fyq1", "fyq2", "fyq3", "fyq4", "fyTotal", "fyRemaining"],
            rows: []
        }
    ]
};

