NE.CanvasSprite = Class.create(NE.BasicSprite, {

    rotationAnimations: {0: 0, 330: 1, 270: 2, 210: 3, 180: 4, 150: 5, 90: 6, 30: 7},

    initialize : function($super, layer, owner, image, properties) {
        $super(layer, owner, image, properties);
        this.layer.attach(this, ['render']);
    },

    show : function() {
        this.visible = true;
        return this;
    },

    hide : function() {
        this.visible = false;
        return this;
    },

    render : function(layer) {
        if (!this.visible) 
            return;
        var ctx = layer.ctx
        ctx.save();
        ctx.translate(this.owner[this.xAttrib], this.owner[this.yAttrib]);
        // used in case of isometric rotation
        if (this.rotationAnimations[this.owner[this.rotationAttrib]] || this.rotationAnimations[this.owner[this.rotationAttrib]] == 0)
            this.currentAnimation = this.rotationAnimations[this.owner[this.rotationAttrib]];
        // in case of 'actual' canvas rotation
        if (this.owner[this.thetaAttrib] && this.owner[this.thetaAttrib] != 0)
            ctx.rotate(this.owner[this.thetaAttrib]);
        var srcX = this.currentAnimation * this.frameWidth;
        var srcY = this.currentFrame * this.frameHeight;
        if (srcY >= this.image.height) {
            srcY = 0;
            this.currentFrame = 0;
        }
        ctx.drawImage(this.image, srcX, srcY, this.frameWidth, this.frameHeight, this.shiftX, this.shiftY, this.frameWidth, this.frameHeight);
        ctx.restore();
        this.currentFrame++;
        return this;
    },

    destroy : function() {
        this.layer.detach(this, ['render']);
    }

});
