var DefenderScene = Class.create(NE.Scene, {

    initialize : function($super, delay, game){
        $super(delay, game);
    },

    start : function($super) {
        $super();
        this.setupMap();
        this.fireEvery(10, this, 'sendCreep');
    },
    
    sendCreep : function() {
        this.addObject(new Creep(this));
        if (this.stopCreeps)
            return false;
    },

    setupMap : function() {
        this.map = new Map(mapTestData);
        return this.map;
    },


});