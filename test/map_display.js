var MapDisplay = Class.create({

    initialize : function(owner, layers) {
        this.owner = owner;
        var images = [];
        var im = new Image();
        im.src = 'map.png';
        layers['map'].createSprite('', owner, im, {frameWidth: 896, frameHeight: 536}).show();
    },

    update : function() {
        // nothing to do here
    }

});