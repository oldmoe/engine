var TowerDisplay = Class.create({

    initialize : function(owner, layers) {
        this.owner = owner;
        var images = [];
        var im = new Image();
        im.src = 'images/belcher.png';
        this.sprite = layers['towers'].createSprite('', owner, im, {shiftX: 0, shiftY: 0, frameHeight : 34 , frameWidth : 64});
        this.sprite.show();
    }, 

    update : function(){
    } 

});

