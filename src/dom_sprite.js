NE.DOMSprite = Class.create(NE.BasicSprite, {

    initialize : function($super, layer, owner, images, properties){
        this.attachedMethods = ['moveTo', 'moveBy', 'rotateTo', 'rotateBy', 'show', 'hide', 'destroy'];
        $super(layer, owner, images, properties);
        this.div = $(document.createElement('DIV'))
        this.image = images[0].clone();
        if(this.className)
            this.div.addClassName(this.className);
        this.layer.div.appendChild(this.div);
        this.div.appendChild(this.image);
        this.owner.attach(this, this.attachedMethods)
    },

    moveTo : function(owner){
        this.div.setStyle({top : owner.y + this.shiftY + 'px', left: owner.x + this.shiftX + 'px', position : 'absolute'});
        return this;
    },

    moveBy : function(owner){
        this.moveTo(owner)
        return this;
    },

    rotateTo : function(owner){

    },

    rotateBy : function(owner){

    },

    show : function(owner){
        this.div.show();
        return this;
    },

    hide : function(owner){
        this.div.hide();
        return this;
    },

    destroy : function(owner){

    }

});

