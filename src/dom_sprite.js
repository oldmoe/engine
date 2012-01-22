NE.DomSprite = Class.create(NE.BasicSprite, {

    initialize : function($super, images, properties){
        this.attachMethods(['moveTo', 'moveBy', 'rotateTo', 'rotateBy', 'show', 'hide', 'destroy']);
        $super(images, properties);
        this.div = $(document.createElement('DIV'))
        this.container.appendChild(this.div)
    },

    moveTo : function(){
        this.div.setStyle({top : this.owner.y + this.shiftY, left: this.owner.x + this.shiftX})
    },

    moveBy : function(){
        this.moveTo()
    },

    rotateTo : function(){

    },

    rotateBy : function(){

    },

    show : function(){
        this.div.show();
    },

    hide : function(){
        this.div.hide();
    },

    destroy : function(){

    }

});

