var TowerDisplay = Class.create(Unit, {

    frameHeight : 64,
    frameWidth : 64,
    
    initialize : function(owner, layers) {
        this.owner = owner;
        this.owner.attach(this, ['update','destroy']);
        var images = [];
        var im = new Image();
        im.src = 'images/belcher_base.png';
        this.baseSprite = layers['units'].createSprite('base', owner, im, {
            shiftX: -31,
            shiftY: -50,
            frameHeight: this.frameHeight,
            frameWidth: this.frameWidth
        });
        im = new Image();
        im.src = 'images/belcher_cannon.png';
        this.cannonSprite = layers['units'].createSprite('canon', owner, im, {
            shiftX: -31,
            shiftY: -50,
            rotationAttrib: 'cannonTheta',
            frameHeight: this.frameHeight,
            frameWidth: this.frameWidth
        });
        this.meterSprite = layers['controls'].createSprite('MeterBarSprite', owner, im, 
        {
            shiftX: 0,
            shiftY: -this.frameHeight,
            className: 'meterBar',
            meter : 'hp',
            maxMeterVal : this.owner.maxHp
        });
        this.meterSprite.show();
    }, 

    update : function(){
        this.cannonSprite.currentFrame = this.cannonSprite.rotationAnimations[this.owner.cannonRotation];
        if (this.owner.currentTarget)
            this.highlightTile(this.owner.currentTarget.gridX, this.owner.currentTarget.gridY, 1);
    },

    destroy : function() {
        this.baseSprite.destroy();
        this.cannonSprite.destroy();
        this.meterSprite.destroy();
    },

    highlightTile: function(j, i, w) {
        var d = this.owner.map.locateTileBounds(j, i);
        this.baseSprite.layer.ctx.strokeStyle = 'rgba(160,0,0,0.8)';
        this.baseSprite.layer.ctx.fillStyle = 'rgba(160,0,0,0.4)';
        this.baseSprite.layer.ctx.beginPath();
        this.baseSprite.layer.ctx.moveTo(d.topX, d.topY+this.owner.map.tileH/2);
        this.baseSprite.layer.ctx.lineTo(d.topX+(w*this.owner.map.tileW/2), d.topY-((w-1)*this.owner.map.tileH/2));
        this.baseSprite.layer.ctx.lineTo(d.topX+(w*this.owner.map.tileW), d.topY+this.owner.map.tileH/2);
        this.baseSprite.layer.ctx.lineTo(d.topX+(w*this.owner.map.tileW/2), d.topY+((w+1)*this.owner.map.tileH/2));
        this.baseSprite.layer.ctx.closePath();
        this.baseSprite.layer.ctx.stroke();
        this.baseSprite.layer.ctx.fill();
    }

});

