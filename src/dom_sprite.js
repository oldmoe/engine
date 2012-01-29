NE.DomSprite = Class.create(NE.BasicSprite, {

    initialize : function($super, layer, owner, image, properties){
        this.attachMethods(['moveTo', 'moveBy', 'rotateTo', 'rotateBy', 'show', 'hide', 'destroy']);
        $super(layer, owner, image, properties);
        this.div = $(document.createElement('DIV'))
        if(this.className)
            this.div.addClassName(this.className);
        this.layer.div.appendChild(this.div)
        this.owner.attach(owner, this.attachedMethods)
    },

    moveTo : function(owner){
        this.div.setStyle({top : owner.y + this.shiftY, left: owner.x + this.shiftX})
    },

    moveBy : function(owner){
        this.moveTo(owner)
    },

    rotateTo : function(owner){

    },

    rotateBy : function(owner){

    },

    show : function(owner){
        this.div.show();
    },

    hide : function(owner){
        this.div.hide();
    },

    destroy : function(owner){

    }

});

