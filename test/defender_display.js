var DefenderDisplay = Class.create(NE.DisplayScene, {

    initialize : function($super) {
        $super();
        console.log("display setup!");
    },

    update : function() {
        console.log("scene display update");
    },

    sendCreep : function(scene, creep){
        new CreepDisplay(creep)
    },

});