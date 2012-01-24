var MapDisplay = Class.create({

    initialize : function(owner, layers) {
        this.owner = owner;
        var images = [];
        var im = new Image();
        im.src = 'map.png';
        images[0] = im;
        layers['map'].createSprite('', owner, images, {}).show();
    }

});