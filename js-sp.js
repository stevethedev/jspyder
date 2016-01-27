// SP Interface
js.extend.fn("sp", function(){
    /**
     * Creates an initial context object
     * 
     * column[internal,text,type,default]
     */
    function sp(config, fn) {
        var context = Object.create(sp.fn.list);
        
        if(config.url) { context.url = config.url; }
        if(config.name) { context.name = config.name; }
        
        js.alg.use(context, fn);
        
        return context;
    }
    sp.fn = {};
    sp.fn.list = {
        url: "",
        name: "",
        
        fetch: function (success, failure) {
            var ctx = new SP.ClientContext(this.url),
                list = ctx.get_web().getListByName(name);
                
            // bla bla bla
            
            // async query
            return this;
        },
        query: function (criteria) {
            
        }
    };
    sp.fn.query = {};
    
    return sp;
});