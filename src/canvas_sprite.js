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
        ctx.translate(this.owner.x, this.owner.y);
        // used in case of isometric rotation
        if (this.rotationAnimations[this.owner.rotation] || this.rotationAnimations[this.owner.rotation] == 0)
            this.currentAnimation = this.rotationAnimations[this.owner.rotation];
        // in case of 'actual' canvas rotation
        if (this.owner.theta && this.owner.theta != 0)
            ctx.rotate(this.owner.theta);
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
