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
                    onload: function () {
                        function _writeTable(data) { js.lib("addContent", [data]); }
                        var $travelTable = BANK_DATA.buildOverviewTableTemplateData("projected-travel"),
                            $trainingTable = BANK_DATA.buildOverviewTableTemplateData("projected-training");
                        
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
        // list: "transaction"
        Transactions: {
            config: {
                url: "",
                name: "",
                success: function() {},
                failure: function() {}
            },
            postCreation: function() {},
            columns: {
                "id": { name: "ID", text: "ID", type: "number" },
                "division": { 
                    name: "Division", 
                    text: "Division", 
                    type: "text", 
                    default: "J2" },
                "travelCost": {
                    name: "Travel_x0020_Cost",
                    text: "Travel Cost",
                    type: "number",
                    default: 0
                },
                "trainingCost": {
                    name: "Training_x0020_Cost",
                    text: "Training Cost",
                    type: "number",
                    default: 0
                }
                "fyq1": { 
                    name: "FYQ1", 
                    text: "1<sup>st</sup> Quarter", 
                    data_class: "currency", 
                    type: "number", 
                    default: 0,
                    macro: true,
                    process: function(value, row, column) {  } },
                "fyq2": { name: "FYQ2", text: "2<sup>nd</sup> Quarter", data_class: "currency", type: "number", default: 0 },
                "fyq3": { name: "FYQ3", text: "3<sup>rd</sup> Quarter", data_class: "currency", type: "number", default: 0 },
                "fyq4": { name: "FYQ4", text: "4<sup>th</sup> Quarter", data_class: "currency", type: "number", default: 0 },
            }
        },
        // list: "allocations"
        Allocations: {
            config: {},
            postCreation: function() {},
            columns: {
                "id": { name: "ID", text: "ID", type: "number" },
                "organization": { name: "", text: "Division" },
                "allocYear": { name: "", text: "Allocated" },
                "fyq1": { } 
            }
        },
    },
    
    // data for the constructed overview tables
    OVERVIEW_TABLES: [
        { 
            id: "projected-travel", 
            title: "Projected Travel",
            class: "projected travel",
            columns: [
                // list: list to get the data from
                // column: field to read the data from
                { list: "transaction", column: "division" },
                { list: "allocation", column: "allocated" },
                { list: "transaction", column: "fyq1" },
                { list: "transaction", column: "fyq2" },
                { list: "transaction", column: "fyq3" },
                { list: "transaction", column: "fyq4" },
                { list: "transaction", column: "fyTotal" },
                { list: "transaction", column: "fyRemaining" }
            ],
            rows: [],
            filters: [
                {  }
            ]
        }
    ]
};

