NE.DisplayScene = Class.create({

    initialize : function() {
        this.renderLoops = {};
    },

    onattach : function(scene) {
        this.scene = scene;
        this.createRenderLoop('main', 1).start();
    },

    createRenderLoop : function(name, delay) {
        return this.renderLoops[name] = new NE.RenderLoop(this.scene, delay);
    }
    
});