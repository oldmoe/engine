var Creep = Class.create(NE.Publisher, {

    klassName: 'Creep',
    parent : "creep",
    cannonTheta : 0,
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
    chosenDir : null,

    initialize : function(scene){
        this.map = scene.map;
        this.entry = this.map.entries.random();
        this.gridX = this.entry.x;
        this.gridY = this.entry.y;
        this.rotation = this.entry.theta;
        var bounds = this.map.locateTileBounds(this.entry.x, this.entry.y);
        this.placeOnEdge(bounds);
    },

    placeOnEdge : function(bounds) {
        if (this.rotation == 30) {
            this.x = bounds.SE.x;
            this.y = bounds.SE.y;
        } else if (this.rotation == 150) {
            this.x = bounds.SW.x;
            this.y = bounds.SW.y;
        } else if (this.rotation == 210) {
            this.x = bounds.NW.x;
            this.y = bounds.NW.y;
        } else if (this.rotation == 330) {
            this.x = bounds.NE.x;
            this.y = bounds.NE.y;
        }
    },

    /*
	returns an array of all possible moving directions (forward, left, right)
	according to current rotation and neighboring tiles
	*/
    validNeighbors : function() {
        var currentValue = this.map.tileValue(this.gridX, this.gridY, this.entry.z);
        var neighbors = (this.gridY % 2 == 0) ? (this.map.neighborsEven) : (this.map.neighborsOdd);
        var ret = [], forward = null, left = null, right = null;
        if (this.rotation == 30) {
            forward = neighbors.SE.clone();
            left = neighbors.NE.clone();
            right = neighbors.SW.clone();
        } else if (this.rotation == 150) {
            forward = neighbors.SW.clone();
            left = neighbors.SE.clone();
            right = neighbors.NW.clone();
        } else if (this.rotation == 210) {
            forward = neighbors.NW.clone();
            left = neighbors.SW.clone();
            right = neighbors.NE.clone();
        } else if (this.rotation == 330) {
            forward = neighbors.NE.clone();
            left = neighbors.NW.clone();
            right = neighbors.SE.clone();
        }
        // if a neighbor/adjacent tile has the same value as my current tile
        // (i.e. not necessarily '1') then it's safe to move in that tile's direction
        if (forward != null && this.map.tileValue(this.gridX + forward[1], this.gridY + forward[0], this.entry.z) == currentValue) ret.push(this.moves.FORWARD);
        if (left != null && this.map.tileValue(this.gridX + left[1], this.gridY + left[0], this.entry.z) == currentValue) ret.push(this.moves.LEFT);
        if (right != null && this.map.tileValue(this.gridX + right[1], this.gridY + right[0], this.entry.z) == currentValue) ret.push(this.moves.RIGHT);
        return ret;
    },

    update : function() {
        if (this.dead) return
        var move = false
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
                this.placeOnEdge(this.map.locateTileBounds(this.oldGridX, this.oldGridY));
            } else {
                // nowhere to go: probably reached the end of arena
                move = true;
            }
        } else {
            if (this.rotation == 0) {
                this.x += this.speed;
            } else if (this.rotation == 90) {
                this.y += this.speed;
            } else if (this.rotation == 180) {
                this.x -= this.speed;
            } else if (this.rotation == 270) {
                this.y -= this.speed;
            }
        }
        if (move) {
            if (this.rotation == 30) {
                this.x += this.map.cos30 * this.speed;
                this.y += this.map.sin30 * this.speed;
            } else if (this.rotation == 150) {
                this.x -= this.map.cos30 * this.speed;
                this.y += this.map.sin30 * this.speed;
            } else if (this.rotation == 210) {
                this.x -= this.map.cos30 * this.speed;
                this.y -= this.map.sin30 * this.speed;
            } else if (this.rotation == 330) {
                this.x += this.map.cos30 * this.speed;
                this.y -= this.map.sin30 * this.speed;
            }
        }
        var newTile = this.map.findTile(this.x, this.y);
        if (newTile[0] >= this.map.width || newTile[1] >= this.map.height || newTile[0] < 0 || newTile[1] < 0 ) {
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
                this.placeOnEdge(this.map.locateTileBounds(this.oldGridX, this.oldGridY));
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
        var cell = Map.grid[this.gridX][this.gridY];
        cell.splice(cell.indexOf(this), 1);
        this.dead = true
    }

});