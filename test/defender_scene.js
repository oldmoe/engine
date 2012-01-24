var DefenderScene = Class.create(NE.Scene, {

    initialize : function($super, delay, game){
        $super(delay, game);
    },

    start : function($super) {
        $super();
        this.setupMap();
        this.sendCreep();
    },
    
    sendCreep : function() {
        this.addObject(new Creep(this));
    },

    setupMap : function() {
        this.map = new Map(mapTestData);
        return this.map;
    }


});