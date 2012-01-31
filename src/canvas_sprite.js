NE.CanvasSprite = Class.create(NE.BasicSprite, {

    initialize : function($super, layer, owner, images, properties) {
        $super(layer, owner, images, properties);
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
        ctx.drawImage(this._currentImage(), this.owner.x + this.shiftX, this.owner.y + this.shiftY);
        return this;
    },

});
