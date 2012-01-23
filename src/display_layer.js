NE.DisplayLayer = Class.create(NE.Publisher, {

    initialize : function(container, className) {
    },

    createSprite : function(type) {
        
    },

    render : function(){
    }

});

NE.CanvasDisplayLayer = Class.create(NE.DisplayLayer, {

    initialize : function(container, options) {
        container = $(container);
        if (container.tagName == 'CANVAS') {
            this.container = container;
        } else {
            var canvas = $(document.createElement('CANVAS'));
            if(options){
                if(options.className)
                    canvas.addClassName(options.className);
                if(options.id)
                    canvas.id = id;
            }
            this.container = container.appendChild(canvas);
            this.needsClear = true;
        }
        this.ctx = this.container.getContext("2d");
        return this;
    },

    createSprite : function(type, owner, images, properties) {
        var sprite = new NE.CanvasSprite(this, owner, images, properties);
    },

    render : function(){
    }
});

NE.DOMDisplayLayer = Class.create(NE.DisplayLayer, {

    initialize : function(container, options) {
        container = $(container);
        var div = $(document.createElement('DIV'));
        if(options){
            if(options.className)
                div.addClassName(options.className);
            if(options.zIndex)
                div.style.zIndex = options.zIndex;
            if(options.id)
                canvas.id = id;
        }
        this.container = $(container.appendChild(div))
        return this;
    },

    createSprite : function(type, owner, images, properties) {
        var sprite = new NE.DOMSprite(this, owner, images, properties);

    }


});
