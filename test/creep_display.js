var CreepDisplay = Class.create({

    initialize : function(owner, layers) {
        this.owner = owner;
        var im = new Image();
        im.src = 'bldg3.png';
        this.layers['ground'].createSprite('', owner, [im], {});
    }


});

