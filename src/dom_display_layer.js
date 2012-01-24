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
                div.id = id;
        }
        this.container = $(container.appendChild(div))
        return this;
    },

    createSprite : function(type, owner, images, properties) {
        var sprite = new NE.DOMSprite(this, owner, images, properties);
    }


});