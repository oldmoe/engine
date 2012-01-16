var DefenderScene = Class.create(NE.Scene, {

    initialize : function($super, delay, game){
        $super(delay, game);
    },

    init : function() {
        this.map = new Map(mapTestData);
    }

});