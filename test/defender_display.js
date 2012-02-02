var DefenderDisplay = Class.create(NE.DisplayScene, {

    initialize : function($super, scene) {
        $super(scene);
        var im = new Image();
        im.src = 'map.png';
        this.layers['map'] = new NE.CanvasDisplayLayer('body', 896, 536, {id: 'map'});
        this.layers['units'] = new NE.CanvasDisplayLayer('body', 896, 536, {id: 'unitsArena'});
        this.layers['controls'] = new NE.DOMDisplayLayer('body', {id: 'controlsArena'});
        this.control = new Control(this.scene, this.layers);
        scene.attach(this, ['setupMap']);
    },

    update : function() {
        this.layers['units'].render();
    },

    setupMap : function(scene, map) {
        new MapDisplay(map, this.layers);
        this.layers['map'].render();
    }

});
