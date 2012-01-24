NE.DisplayScene = Class.create({

    initialize : function(scene) {
        this.renderLoops = {};
        this.layers = {};
        this.scene = scene;
        this.createRenderLoop('main', 1).start();
        this.scene.attach(this, ['update', 'addObject']);
    },

    createRenderLoop : function(name, delay) {
        return this.renderLoops[name] = new NE.RenderLoop(this.scene, delay);
    },

    addObject : function(scene, object) {
        var klass = eval(object.klassName + 'Display');
        new klass(object, this.layers);
    }
    
});