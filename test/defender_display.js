var DefenderDisplay = Class.create(NE.DisplayScene, {

    initialize : function($super) {
        $super();
        console.log("display setup!");
        this.layers = {};
        this.layers['ground'] = new CanvasDisplayLayer('body', {id: 'map'});
    },

    update : function() {
        console.log("scene display update");
    },

    sendCreep : function(scene, creep){
        new CreepDisplay(creep, this.layers);
    }

});