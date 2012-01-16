NE.RenderLoop = Class.create(NE.Publisher, {
	
    initialize : function(reactor, delay){
        this.running = false;
        this.reactor = reactor;
        this.delay = delay;
    },
	
    start : function(){
        this.running = true;
        this.reactor.fireEvery(this.delay, this, 'render');
        return this;
    },

    stop : function(){
        this.running = false;
        return this;
    },
	
    clear : function(){
        this.subscriptions['render'] = [];
        return this;
    },
	
    render : function(){
        if(!this.running) return false;
        this.fire('render', this);
    }
	
})