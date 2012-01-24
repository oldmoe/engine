var CreepDisplay = Class.create({

    initialize : function(owner, layers) {
        this.owner = owner;
        var images = [];
        var im = new Image();
        im.src = 'tank-small.png';
        images[0] = im;
        layers['creeps'].createSprite('', owner, images, {shiftX: -30, shiftY: -25}).show();
    }

});

