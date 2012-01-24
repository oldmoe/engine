NE.CanvasDisplayLayer = Class.create(NE.DisplayLayer, {

    initialize : function(container, width, height, options) {
        container = $(container);
        if (container.tagName == 'CANVAS') {
            this.container = container;
        } else {
            var canvas = $(document.createElement('CANVAS'));
            if(options){
                if(options.className)
                    canvas.addClassName(options.className);
                if(options.id)
                    canvas.setAttribute('id', options.id);
            }
            this.container = container.appendChild(canvas);
            this.needsClear = true;
        }
        this.width = width;
        this.height = height;
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        this.ctx = this.container.getContext("2d");
        return this;
    },

    createSprite : function(type, owner, images, properties) {
        var sprite = new NE.CanvasSprite(this, owner, images, properties);
        return sprite;
    },

    render : function() {
        if (this.needsClear) {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }
});