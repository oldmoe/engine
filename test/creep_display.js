var CreepDisplay = Class.create({

    initialize : function(owner) {
        this.owner = owner;
        var sprite = new Sprite([]);
        this.owner.attach(sprite, sprite.attachMethods);
    }


});

