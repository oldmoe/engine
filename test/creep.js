var Creep = Class.create(NE.Publisher, {

    parent : "creep",
    //speeds : [0, 1.08, 2.245, 4.852, 6.023, 7.945, 11.71, 22.625],
    //  speeds : [0, 1.08, 2.245, 4.852, 15.771, 19.483, 24.248, 33.941],
    angles : [0, 3.75, 7.5, 15, 18, 22.5, 30, 45],
    cannonTheta : 0,
    olderTheta : 0,
    oldestTheta: 0,
    hp : 100,
    maxHp : 100,
    speed : 4,
    price : 4,
    evading : false,
    direction : 0,
    rate : 0.1,
    power: 1.0,
    cannonDisplacement : [-4, 0],
    turningPoint : [0, 0],
    range : 1,
    moves : {
        FORWARD : 0,
        LEFT : -1,
        RIGHT : 1
    },
    chosenDir : null,

    initialize : function(scene){
        scene.subscribe('update', this, 'update')
        this.map = scene.map;
        this.entry = this.map.entry.random();
        var bounds = this.map.locateTileBounds(this.entry.x, this.entry.y);
    },

    /*
	returns an array of all possible moving directions (forward, left, right)
	according to current rotation and neighboring tiles
	*/
    validNeighbors : function(){
        var currentTile = this.map.findTile(this.x, this.y);
        var currentValue = this.map.tileValue(currentTile[0], currentTile[1], this.entry.z);
        var neighbors = (currentTile[1] % 2 == 0) ? (Map.neighborsEven) : (Map.neighborsOdd);
        var ret = [];
        var forward = [currentTile[0], currentTile[1]];
        var left = [currentTile[0], currentTile[1]];
        var right = [currentTile[0], currentTile[1]];
        if (this.rotation == 30) {
            forward[0]  += neighbors.SE[0];
            forward[1] += neighbors.SE[1];
            left[0] += neighbors.NE[0];
            left[1] += neighbors.NE[1];
            right[0] += neighbors.SW[0];
            right[1] += neighbors.SW[1];
        } else if (this.rotation == 150) {
            forward[0]  += neighbors.SW[0];
            forward[1] += neighbors.SW[1];
            left[0] += neighbors.SE[0];
            left[1] += neighbors.SE[1];
            right[0] += neighbors.NW[0];
            right[1] += neighbors.NW[1];
        } else if (this.rotation == 210) {
            forward[0]  += neighbors.NW[0];
            forward[1] += neighbors.NW[1];
            left[0] += neighbors.SW[0];
            left[1] += neighbors.SW[1];
            right[0] += neighbors.NE[0];
            right[1] += neighbors.NE[1];
        } else if (this.rotation == 330) {
            forward[0]  += neighbors.NE[0];
            forward[1] += neighbors.NE[1];
            left[0] += neighbors.NW[0];
            left[1] += neighbors.NW[1];
            right[0] += neighbors.SE[0];
            right[1] += neighbors.SE[1];
        }
        // if a neighbor/adjacent tile has the same value as my current tile
        // (i.e. not necessarily '1') then it's safe to move in that tile's direction
        if (Map.value(forward[0], forward[1], this.entry.z) == currentValue) ret.push(this.moves.FORWARD);
        if (Map.value(left[0], left[1], this.entry.z) == currentValue) ret.push(this.moves.LEFT);
        if (Map.value(right[0], right[1], this.entry.z) == currentValue) ret.push(this.moves.RIGHT);
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
            } else {
                // nowhere to go: probably reached the end of arena
                move = true;
            }
            if (!move) {
                this.rotating = true;
                this.oldTheta = this.rotation;
                this.oldSpeed = this.speed;
                var self = this;
                this.index = this.speeds.collect(function(speed, index){
                    return [Math.abs(self.speed - speed * 1.5), index];
                    }).select(function(t){
                    if(t[0] <= self.speed) return true
                    }).sort(function(a, b){
                    return a[0] - b[0];
                })[0][1]
                this.speed = 1.5 * this.speeds[this.index]
            }
        } else {
            this.rotation += this.direction * this.angles[this.index];
            this.x += this.speed * Math.cos(this.rotation * Math.PI / 180 );
            this.y += this.speed * Math.sin(this.rotation * Math.PI / 180 );
            if(Math.abs(this.rotation - this.oldTheta) >= 90){
                this.rotation = this.oldTheta + this.direction * 90;
                if(this.rotation < 0) this.rotation += 360;
                if(this.rotation >= 360) this.rotation -= 360;
                this.speed = this.oldSpeed;
                this.rotating = false;
                this.x = Math.round((this.x/4))*4;
                this.y = Math.round((this.y/4))*4;
                this.turningPoint = [0, 0];
            }
        }
        if (move) {
            if (this.rotation == 30) {
                this.x += Map.cos30 * this.speed;
                this.y -= Map.sin30 * this.speed;
            } else if (this.rotation == 150) {
                this.x -= Map.cos30 * this.speed;
                this.y -= Map.sin30 * this.speed;
            } else if (this.rotation == 210) {
                this.x -= Map.cos30 * this.speed;
                this.y += Map.sin30 * this.speed;
            } else if (this.rotation == 330) {
                this.x += Map.cos30 * this.speed;
                this.y += Map.sin30 * this.speed;
            }
        }
        var newGridX = Math.floor(this.x / Map.pitch)
        var newGridY = Math.floor(this.y / Map.pitch)
        if (newGridX >= Map.width || newGridY >= Map.height || newGridX < 0 || newGridY < 0 ) {
            this.scene.escaped += 1
            this.destroy()
        } else if (this.gridX != newGridX || this.gridY != newGridY) {
            var oldArr = Map.grid[this.gridX][this.gridY]
            oldArr.splice(oldArr.indexOf(this), 1);
            this.gridX = newGridX
            this.gridY = newGridY
            // now we need to nullify chosenDir to make sure it's re-calculated in the next tile
            this.chosenDir = null
            if (newGridX < Map.width) {
                Map.grid[newGridX][newGridY].push(this);
            } else {
            // we are going out, do nothing for now;
            }
        }
        this.target();			//for specifying the target to hit
    },
    getTargetfromCell: function(cell, targets){
        if(cell.tower){
            targets.push(cell.tower)
        }
    },

    pickTarget: function(targets){
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