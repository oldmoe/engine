var CreepDisplay = Class.create({

    rotationAnimations: {0: 0, 330: 1, 270: 2, 210: 3, 180: 4, 150: 5, 90: 6, 30: 7},

    initialize : function(owner, layers) {
        this.owner = owner;
        var base = new Image();
        var cannon = new Image();
        base.src = 'tank1_base.png';
        cannon.src = 'tank1_canon.png';
        this.baseSprite = layers['creeps'].createSprite('base', owner, base, {shiftX: -32, shiftY: -47, frameWidth: 64, frameHeight: 64});
        this.cannonSprite = layers['creeps'].createSprite('canon', owner, cannon, {shiftX: -32, shiftY: -47, frameWidth: 64, frameHeight: 64});
        this.update();
    },

    update : function() {
        this.baseSprite.currentAnimation = this.rotationAnimations[this.owner.rotation];
        this.cannonSprite.currentAnimation = this.rotationAnimations[this.owner.cannonRotation];
    },

    destroy : function() {
        this.baseSprite.destroy();
        this.cannonSprite.destroy();
    }

});

