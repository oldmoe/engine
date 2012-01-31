var CreepDisplay = Class.create({

    initialize : function(owner, layers) {
        this.owner = owner;
        this.owner.attach(this, ['destroy']);
        var base = new Image();
        var cannon = new Image();
        base.src = 'tank1_base.png';
        cannon.src = 'tank1_canon.png';
        this.baseSprite = layers['creeps'].createSprite('base', owner, base, {shiftX: -32, shiftY: -47, frameWidth: 64, frameHeight: 64});
        this.cannonSprite = layers['creeps'].createSprite('canon', owner, cannon, {shiftX: -32, shiftY: -47, frameWidth: 64, frameHeight: 64});
        this.update();
    },

    destroy : function() {
        this.baseSprite.destroy();
        this.cannonSprite.destroy();
    }

});

