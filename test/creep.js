var Creep = Class.create(NE.Publisher, {

    klassName: 'Creep',
    parent : "creep",
    cannonRotation : 0,
    olderTheta : 0,
    oldestTheta: 0,
    hp : 100,
    maxHp : 100,
    speed : 5,
    price : 4,
    evading : false,
    direction : 0,
    rate : 0.1,
    power: 1.0,
    cannonDisplacement : [-4, 0],
    range : 1,
    moves : {
        FORWARD : 0,
        LEFT : 1,
        RIGHT : 2
    },
    transitionAngles: {
        30: {1: [0,330], 2: [90,150]},
        150: {1: [90,30], 2: [180,210]},
        210: {1: [180,150], 2: [270,330]},
        330: {1: [270,210], 2: [0,30]}},
    orientations: {
        30: {0: 'SE', 1: 'NE', 2: 'SW'},
        150: {0: 'SW', 1: 'SE', 2: 'NW'},
        210: {0: 'NW', 1: 'SW', 2: 'NE'},
        330: {0: 'NE', 1: 'NW', 2: 'SE'}
    },
    chosenDir : null,

    initialize : function(scene){
        this.map = scene.map;
        this.entry = this.map.entries.random();
        this.gridX = this.entry.x;
        this.gridY = this.entry.y;
        this.rotation = this.entry.theta;
        var bounds = this.map.locateTileBounds(this.entry.x, this.entry.y);
        this.placeOnEdge(bounds, this.rotation);
        this.dx = this.map.cos30 * this.speed;
        this.dy = this.map.sin30 * this.speed;
    },

    placeOnEdge : function(bounds, rotation) {
        this.moveTo(bounds[this.orientations[rotation][0]].x, bounds[this.orientations[rotation][0]].y);
    },

    /*
	returns an array of all possible moving directions (forward, left, right)
	according to current rotation and neighboring tiles
	*/
    validNeighbors : function() {
        var currentValue = this.map.tileValue(this.gridX, this.gridY, this.entry.z);
        var neighbors = (this.gridY % 2 == 0) ? (this.map.neighborsEven) : (this.map.neighborsOdd);
        var ret = [];
        var forward = neighbors[this.orientations[this.rotation][0]].clone();
        var left = neighbors[this.orientations[this.rotation][1]].clone();
        var right = neighbors[this.orientations[this.rotation][2]].clone();
        // if a neighbor/adjacent tile has the same value as my current tile
        // (i.e. not necessarily '1') then it's safe to move in that tile's direction
        if (forward != null && this.map.tileValue(this.gridX + forward[1], this.gridY + forward[0], this.entry.z) == currentValue) ret.push(this.moves.FORWARD);
        if (left != null && this.map.tileValue(this.gridX + left[1], this.gridY + left[0], this.entry.z) == currentValue) ret.push(this.moves.LEFT);
        if (right != null && this.map.tileValue(this.gridX + right[1], this.gridY + right[0], this.entry.z) == currentValue) ret.push(this.moves.RIGHT);
        return ret;
    },

    update : function() {
        if (this.dead)
            return false;
        var move = false;
        if (!this.rotating) {
            // chosenDir is a randomly-selected direction the creep will take when it
            // faces a crossroads. Once decided, it will be remembered until 1 whole
            // tile has passed.
            if (this.chosenDir == null) {
                var canMove = this.validNeighbors();
                this.chosenDir = canMove.random();
            }
            if (this.chosenDir == this.moves.FORWARD) {
                // keep moving forward
                move = true;
            } else if (this.chosenDir == this.moves.LEFT || this.chosenDir == this.moves.RIGHT) {
                // road goes left/right -> turn clockwise / counter-clockwise
                this.direction = this.chosenDir;
                // start rotating
                this.rotating = true;
                this.oldRotation = this.rotation;
                this.rotation = this.transitionAngles[this.oldRotation][this.chosenDir][0];
            } else {
                // nowhere to go: probably reached the end of arena
                move = true;
            }
        } else {
            if (this.rotation == 0) {
                this.moveBy(this.speed, 0);
            } else if (this.rotation == 90) {
                this.moveBy(0, this.speed);
            } else if (this.rotation == 180) {
                this.x -= this.speed;
                this.moveBy(-this.speed, 0);
            } else if (this.rotation == 270) {
                this.moveBy(0, -this.speed);
            }
        }
        if (move) {
            if (this.rotation == 30) {
                this.moveBy(this.dx, this.dy);
            } else if (this.rotation == 150) {
                this.moveBy(-this.dx, this.dy);
            } else if (this.rotation == 210) {
                this.moveBy(-this.dx, -this.dy);
            } else if (this.rotation == 330) {
                this.moveBy(this.dx, -this.dy);
            }
        }
        var newTile = this.map.findTile(this.x, this.y);
        if (newTile == null) {
            this.destroy();
        } else if (this.gridX != newTile[0] || this.gridY != newTile[1]) {
            var oldArr = this.map.grid[this.gridY][this.gridX][this.entry.z];
            oldArr.splice(oldArr.indexOf(this), 1);
            this.oldGridX = this.gridX;
            this.oldGridY = this.gridY;
            this.gridX = newTile[0];
            this.gridY = newTile[1];
            if (this.rotating) {
                // end of rotation
                this.rotating = false;
                this.rotation = this.transitionAngles[this.oldRotation][this.chosenDir][1];
                this.placeOnEdge(this.map.locateTileBounds(this.oldGridX, this.oldGridY), this.rotation);
            }
            // now we need to nullify chosenDir to make sure it's re-calculated in the next tile
            this.chosenDir = null;
            if (this.gridX < this.map.width && this.gridY < this.map.height) {
                this.map.grid[newTile[1]][newTile[0]][this.entry.z].push(this);
            } else {
                // we are going out, do nothing for now;
            }
        }
        //this.target();	//for specifying the target to hit
    },

    moveTo : function(x, y) {
        this.x = x;
        this.y = y;
    },

    moveBy : function(dx, dy) {
        this.x += dx;
        this.y += dy;
    },
    
    getTargetfromCell : function(cell, targets){
        if(cell.tower){
            targets.push(cell.tower)
        }
    },

    pickTarget : function(targets){
        if(this.dead) return
        targets.sort(function(a,b){
            return a.hp - b.hp
        })
        var target = targets[0]
        var dx = this.x - target.x
        var dy = this.y - target.y
        var theta = Math.atan(dy/dx) *  180 / Math.PI
        if(dx < 0){
            this.cannonTheta =  theta - this.rotation
        }else{
            this.cannonTheta =  theta - this.rotation + 180
        }
        if(this.reloaded){
            target.takeHit(this.power)
            if(target.dead&&this.scene.scenario)this.scene.scenario.notify({
                name:"creepDestroyedTower",
                method: false,
                unit:this
            })
            this.reloaded = false;
            this.fired = true;
        }
    },
    
    die : function(){
        this.destroy()
        this.killed = true
        this.scene.money += Math.round(this.price);
        this.scene.stats.creepsDestroyed++
        this.scene.score += Math.round(this.maxHp/20)*this.scene.config.level
    },

    destroy : function(){
        /*var cell = Map.grid[this.gridX][this.gridY];
        cell.splice(cell.indexOf(this), 1);*/
        this.dead = true
    }

});