var CreepDisplay = Class.create({

    rotationAnimations: {0: 0, 330: 1, 270: 2, 210: 3, 180: 4, 150: 5, 90: 6, 30: 7},

    initialize : function(owner, layers) {
        this.owner = owner;
        this.owner.attach(this, ['update']);
        var im = new Image();
        im.src = 'tank1.png';
        this.sprite = layers['creeps'].createSprite('', owner, im, {shiftX: -32, shiftY: -45, frameWidth: 64, frameHeight: 64});
        this.update();
    },

    update : function() {
        this.sprite.currentAnimation = this.rotationAnimations[this.owner.rotation];
    }

});

