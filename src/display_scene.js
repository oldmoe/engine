NE.DisplayScene = Class.create({

    initialize : function() {
        this.renderLoops = {};
        this.createRenderLoop('main', 1).start();
    },

    onattach : function(scene) {
        this.scene = scene;
    },

    createRenderLoop : function(name, delay) {
        return this.renderLoops[name] = new NE.RenderLoop(this.scene, delay);
    }
    
});