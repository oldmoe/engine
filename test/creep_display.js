var CreepDisplay = Class.create({

    frameHeight : 64,
    initialize : function(owner, layers) {
        this.owner = owner;
        this.owner.attach(this, ['update','destroy']);
        var base = new Image();
        var cannon = new Image();
        base.src = 'tank1_base.png';
        cannon.src = 'tank1_canon.png';
        this.baseSprite = layers['creeps'].createSprite('base', owner, base, {shiftX: -32, shiftY: -47, frameWidth: 64, frameHeight: 64});
        this.cannonSprite = layers['creeps'].createSprite('canon', owner, cannon, {shiftX: -32, shiftY: -47, frameWidth: 64, frameHeight: 64, rotationAttrib: 'cannonRotation'});
        this.meterSprite = layers['controls'].createSprite('MeterBarSprite', owner, null,
                 {shiftX: -20, shiftY: -40, className: 'meterBar', meter : 'hp', maxMeterVal : this.owner.maxHp});
        this.meterSprite.show();
        this.update();
    },

    update : function() {
        if (this.owner.hit)
            this.highlightTile(this.owner.currentTarget.gridX, this.owner.currentTarget.gridY, 1);
    },

    destroy : function() {
        this.baseSprite.destroy();
        this.cannonSprite.destroy();
        this.meterSprite.destroy();
        this.meterSprite.hide();
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

