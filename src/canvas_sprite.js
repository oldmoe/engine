NE.CanvasSprite = Class.create(NE.BasicSprite, {

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
        //ctx.save();
        //ctx.translate(this.owner.x + this.shiftX, this.owner.y + this.shiftY);
        if (this.owner.theta && this.owner.theta != 0)
            ctx.rotate(this.owner.theta);
        var srcX = this.currentAnimation * this.frameWidth;
        var srcY = this.currentFrame * this.frameHeight;
        if (srcY >= this.image.height) {
            srcY = 0;
            this.currentFrame = 0;
        }
        ctx.drawImage(this.image, srcX, srcY, this.frameWidth, this.frameHeight, this.owner.x + this.shiftX, this.owner.y + this.shiftY, this.frameWidth, this.frameHeight);
        this.currentFrame++;
        return this;
    },

});
