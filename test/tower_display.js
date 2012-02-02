var TowerDisplay = Class.create({

    frameHeight : 34,
    frameWidth : 64,
    initialize : function(owner, layers) {
        this.owner = owner;
        var images = [];
        var im = new Image();
        im.src = 'images/belcher.png';
        this.sprite = layers['towers'].createSprite('', owner, im, {shiftX: 0, shiftY: 0, 
                    frameHeight: this.frameHeight, frameWidth: this.frameWidth});
        this.meterSprite = layers['controls'].createSprite('MeterBarSprite', owner, im, 
                 {shiftX: 0, shiftY: -this.frameHeight, className: 'meterBar', meter : 'hp', maxMeterVal : this.owner.maxHp});
        this.sprite.show();
        this.meterSprite.show();
    }, 

    update : function(){
    } 

});

