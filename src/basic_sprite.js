NE.BasicSprite = Class.create(NE.Publisher, {
    
    shiftX : 0,
    shiftY : 0,
    transitionX: 0,
    transitionY: 0,
    frameWidth: 0,
    frameHeight: 0,
    
    initialize : function(layer, owner, image, properties){
        this.image = image;
        this.layer = layer;
        this.owner = owner;
        this.currentAnimation = 0;
        this.currentFrame = 0;
        this.visible = true;
        this.rotationAttrib = 'rotation';
        this.thetaAttrib = 'theta';
        this.xAttrib = 'x';
        this.yAttrib = 'y';
        Object.extend(this, properties);
    },

    moveTo : function(){

    },

    moveBy : function(){

    },

    rotateTo : function(){

    },

    rotateBy : function(){

    },

    show : function(){

    },

    hide : function(){

    },

    update : function(){

    },

    render : function(){

    },

    destroy : function(){

    }

})