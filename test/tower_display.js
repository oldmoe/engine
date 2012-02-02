var TowerDisplay = Class.create({

    frameHeight : 64,
    frameWidth : 64,
    
    initialize : function(owner, layers) {
        this.owner = owner;
        var images = [];
        var im = new Image();
        im.src = 'images/belcher_base.png';
        this.sprite = layers['towers'].createSprite('', owner, im, {shiftX: 0, shiftY: -32, 
                    frameHeight: this.frameHeight, frameWidth: this.frameWidth});
        im = new Image();
        im.src = 'images/belcher_cannon.png';
        this.sprite = layers['towers'].createSprite('', owner, im, {shiftX: 0, shiftY: -32, 
                    frameHeight: this.frameHeight, frameWidth: this.frameWidth});
        this.meterSprite = layers['controls'].createSprite('MeterBarSprite', owner, im, 
                 {shiftX: 0, shiftY: -this.frameHeight, className: 'meterBar', meter : 'hp', maxMeterVal : this.owner.maxHp});
        this.sprite.show();
        this.meterSprite.show();
    }, 

    update : function(){
    }

});

