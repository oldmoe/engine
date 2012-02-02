NE.DOMMeterBarSprite = Class.create(NE.BasicSprite, {

    initialize : function($super, layer, owner, images, properties){
        this.attachedMethods = ['moveTo', 'moveBy', 'rotateTo', 'rotateBy', 'show', 'hide', 'destroy', 'update'];
        $super(layer, owner, images, properties);
        this.div = $(document.createElement('DIV'));
        this.fullDiv = $(document.createElement('DIV'));
        this.emptyDiv = $(document.createElement('DIV'));
        if(this.className)
        {
            this.div.addClassName(this.className);
            this.fullDiv.addClassName(this.className + 'Full');
            this.emptyDiv.addClassName(this.className + 'Empty');
        }
        this.layer.div.appendChild(this.div);
        this.div.appendChild(this.emptyDiv);
        this.div.appendChild(this.fullDiv);
        var self = this;
        [this.emptyDiv, this.fullDiv].each(function(div){
            div.setStyle({
                position:'absolute',
                left:'0px',
                top:'0px',
                width : self.div.getWidth()+'px',
                height : self.div.getHeight()+'px',
                'border-radius': '5px'
            });
            div.style.setProperty('-moz-border-radius','5px','');
        });
        this.width = self.div.getWidth();
        this.owner.attach(this, this.attachedMethods)
    },

    update : function(owner){
        var newFullWidth = owner[this.meter] / this.maxMeterVal;
        this.fullDiv.style.setProperty('width', this.width*newFullWidth +'px', '');
    },

    moveTo : function(owner){
        this.div.setStyle({
            top : owner.y + this.shiftY + 'px',
            left: owner.x + this.shiftX + 'px',
            position : 'absolute'
        });
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

