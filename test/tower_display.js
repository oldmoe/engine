var TowerDisplay = Class.create({

    initialize : function(owner, layers) {
        this.owner = owner;
        var images = [];
        var im = new Image();
        im.src = 'images/belcher.png';
        images[0] = im;
        this.sprite = layers['towers'].createSprite('', owner, images, {shiftX: 100, shiftY: 100})
        this.sprite.show();
    }

});

