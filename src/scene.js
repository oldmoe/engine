NE.Scene = Class.create(NE.Reactor, {
  
    //initializes the delay of the reactor
    initialize : function($super, delay, game){
        $super(delay)
        this.game = game;
    },

    init : function(){
    },
	
    /* runs the reactor , starts the update function */
    start : function(){
        this.init();
        // starting reactor
        this.run();
        this.fireEvery(1, this, 'update');
        return this;
    },

    addObject : function(object){
        this.attach(object, ['update']);
        return object;
    },
    /* calls *update* on all subscribed objects */
    update : function() {
    }
	
});
