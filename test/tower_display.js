var TowerDisplay = Class.create(Unit, {

    frameHeight : 64,
    frameWidth : 64,
    initialize : function(owner, layers) {
        this.owner = owner;
        this.owner.attach(this, ['update','destroy']);
        var images = [];
        var im = new Image();
        im.src = 'images/belcher_base.png';
        this.baseSprite = layers['units'].createSprite('base', owner, im, {shiftX: 0, shiftY: -32, 
                    frameHeight: this.frameHeight, frameWidth: this.frameWidth});
        im = new Image();
        im.src = 'images/belcher_cannon.png';
        this.cannonSprite = layers['units'].createSprite('canon', owner, im, {shiftX: 0, shiftY: -32, rotationAttrib: 'cannonTheta',
                    frameHeight: this.frameHeight, frameWidth: this.frameWidth});
        this.meterSprite = layers['controls'].createSprite('MeterBarSprite', owner, im, 
                 {shiftX: 0, shiftY: -this.frameHeight, className: 'meterBar', meter : 'hp', maxMeterVal : this.owner.maxHp});
        this.meterSprite.show();
    }, 

    update : function(){
      this.cannonSprite.currentFrame = this.cannonSprite.rotationAnimations[this.owner.cannonRotation];
    },

    destroy : function() {
        this.baseSprite.destroy();
        this.cannonSprite.destroy();
        this.meterSprite.destroy();
    }, 

});

