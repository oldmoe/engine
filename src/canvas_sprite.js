NE.CanvasSprite = Class.create(NE.BasicSprite, {

    initialize : function($super, images, properties) {
        this.attachMethods(['render', 'show', 'hide', 'destroy']);
        $super(images, properties);
    },

    show : function() {
        this.visible = true;
    },

    hide : function() {
        this.visible = false;
    },

    render : function(ctx) {
        if (!this.visible) 
            return;
        ctx.save();
        ctx.translate(this.owner.x + this.shiftX, this.owner.y + this.shiftY);
        if (this.owner.theta && this.owner.theta != 0)
            ctx.rotate(this.owner.theta);
        ctx.drawImage(this._currentImage(), this.transitionX, this.transitionY);
    },

});