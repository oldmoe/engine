var Unit = Class.create(NE.Publisher, {

    movingFactors : {
        0: [1,0],
        30: [1,1],
        90: [0,1],
        150: [-1,1],
        180: [-1,0],
        210: [-1,-1],
        270: [0,-1],
        330: [1,-1]
    },

    initialize : function(scene){
        this.scene = scene;
        this.map = scene.map;
    },

    target : function() {
        this.currentTarget = null;
        var units = this.map.neighborUnits(this.gridX, this.gridY, this.range, this.targetLayers());
        var targets = [];
        for (var i = 0, len = units.length; i < len; ++i) {
            if (units[i].klassName && this.targetTypes().indexOf(units[i].klassName) > -1)
                targets.push(units[i]);
        }
        this.currentTarget = this.pickTarget(targets);
        if (this.currentTarget != null) {
            this.aim();
        }
    },

    aim : function() {
        var dx = this.x - this.currentTarget.x;
        var dy = this.y - this.currentTarget.y;
        var theta = Math.atan(dy/dx) * 180 / Math.PI;
        this.cannonRotation = Math.round(theta/30) * 30;
        if (dx > 0) {
            this.cannonRotation += 180;
        }
        if (this.cannonRotation < 0) {
            this.cannonRotation += 360;
        }
        if (!this.movingFactors[this.cannonRotation] && this.movingFactors[this.cannonRotation] != 0) {
            this.cannonRotation += (this.cannonRotation > theta) ? (30) : (-30);
        }
        this.currentTarget.affect(this.effectivePower());
    },

    targetLayers : function(){
      return [];
    },

    targetTypes : function(){
      return ['unit'];
    },

    pickTarget : function(targets){
        if (targets[0])
            return targets[0];
        else
            return null;
    },
    
    effectivePower : function(){ 
        return 0;
    },

    affect : function(power){  
        this.hp -= power;
        if(this.hp <= 0) this.destroy();
    },
  
    destroy : function(){
    }

});
