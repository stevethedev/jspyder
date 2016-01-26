// creates jspyder controls
(function (js) {
    js.dom.fn.tooltips = function () {
        var TOOLTIPS = "js-tooltips",
            TOOLTIP_ATTR = "data-tooltip",
            SELF = this,
            data,
            __tooltip;

        if (!this.__jspyder.fetch(TOOLTIPS)) {
            this.__jspyder.stash(TOOLTIPS, true);

            function mouseover() {
                data = {};
                data[TOOLTIP_ATTR] = null;
                this.getAttrs(data, function () {
                    var text = data["data-tooltip"];

                    if (text) {
                        js.template({ tooltip: text })
                            .compile("js-tooltip", null, function (tip) {
                                // save reference
                                __tooltip = js.dom(tip);
                            
                                // attach to owner
                                __tooltip.attach(SELF);
                            });
                    }
                });
            }
        }
    }
})(jspyder);
