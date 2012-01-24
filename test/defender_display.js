var DefenderDisplay = Class.create(NE.DisplayScene, {

    initialize : function($super, scene) {
        $super(scene);
        var im = new Image();
        im.src = 'map.png';
        this.layers['map'] = new NE.CanvasDisplayLayer('body', 896, 449, {id: 'map'});
        this.layers['creeps'] = new NE.CanvasDisplayLayer('body', 896, 449, {id: 'creepsArena'});
        scene.attach(this, ['setupMap']);
    },

    update : function() {
        this.layers['creeps'].render();
    },

    setupMap : function(scene, map) {
        new MapDisplay(map, this.layers);
        this.layers['map'].render();
    }

});