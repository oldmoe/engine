var Tower = Class.create(NE.Publisher, {

    klassName: 'Tower',
    theta :0,
    cannonTheta : 0,
    rank : 0,
    stateChange : false,
    upgradable :true,
    maxRank :3,
    canHitFlying: true,
    canHitGround: true,
    name : 'Belcher',
    hp:500,
    maxHp : 500,
    power:10,
    rate:0.2,
    price: 30,
    range: 1,
    upgradeValues : ['maxHp', 'power', 'rate', 'range'],
    upgrades : [{
        maxHp: 1100,
        power:18,
        price: 3
    },

    {
        maxHp: 1300,
        power:22,
        price: 8,
        range: 3
    },

    {
        maxHp: 1600,
        power:26,
        rate: 0.3,
        price: 21,
        range: 4
    }],
    initialize : function(scene){
        this.x = 0;
        this.y = 0;
        this.scene = scene;
    },

    moveTo : function(x, y){
        this.x = x;
        this.y = y;
        this.neighbors = this.neighborTiles();
        this.pickTarget();
    },

    pickTarget : function(){
        var self = this;
        var targets = [];
        var tiles = this.neighbors;
        tiles.each(function(tile){
            for(var i = 1; i<scene.map.entries.length;i++)
            {
                var target = self.scene.map.grid[tile[1]][tile[0]][i];
                if(target.length && target[0].klassName==Creep.prototype.klassName)
                {
                    targets.push(target.first())
                }
            }
        });
        if(targets.length)
        {
    //console.log(targets)
    }
    },

    neighborTiles : function(){
        this.tile = this.scene.map.findTile(this.x, this.y);
        var neighborMoves = this.scene.map.neighborsEven;
        if(this.tile[1]%2) neighborMoves = this.scene.map.neighborsOdd;
        var oddMoves = [];
        oddMoves.push(this.scene.map.neighborsOdd.SE);
        oddMoves.push(this.scene.map.neighborsOdd.SW);
        oddMoves.push(this.scene.map.neighborsOdd.NE);
        oddMoves.push(this.scene.map.neighborsOdd.NW);
        var evenMoves = [];
        evenMoves.push(this.scene.map.neighborsEven.SE);
        evenMoves.push(this.scene.map.neighborsEven.SW);
        evenMoves.push(this.scene.map.neighborsEven.NE);
        evenMoves.push(this.scene.map.neighborsEven.NW);
        /* North Tile */
        var tiles = [];
        for(var range=1;range<=this.range;range++)
        {
            var corners = [];
            corners.push([this.tile[0] + neighborMoves.N[1]*range, this.tile[1] + neighborMoves.N[0]*range]);
            corners.push([this.tile[0] + neighborMoves.S[1]*range, this.tile[1] + neighborMoves.S[0]*range]);
            corners.push([this.tile[0] + neighborMoves.E[1]*range, this.tile[1] + neighborMoves.E[0]*range]);
            corners.push([this.tile[0] + neighborMoves.W[1]*range, this.tile[1] + neighborMoves.W[0]*range]);
            tiles = tiles.concat(corners);
            var directions = {};
            directions[corners[2][0]+'-'+corners[2][1]] = 0;
            directions[corners[3][0]+'-'+corners[3][1]] = 0;
            for(var j in directions)
            {
                var targetTile = j.split('-').collect(function(i){
                    return parseInt(i)
                    });
                for(var i=0;i<2;i++)
                {
                    var currTile = corners[i].clone();
                    steps = evenMoves;
                    if(currTile[1]%2) steps = oddMoves;
                    directions[corners[2][0]+'-'+corners[2][1]] = steps[i*2];
                    directions[corners[3][0]+'-'+corners[3][1]] = steps[i*2 +1];
                    currTile[0] += directions[j][1];
                    currTile[1] += directions[j][0];
                    while(currTile[0]!=targetTile[0] || currTile[1]!=targetTile[1])
                    {
                        tiles.push(currTile.clone());
                        steps = evenMoves;
                        if(currTile[1]%2) steps = oddMoves;
                        directions[corners[2][0]+'-'+corners[2][1]] = steps[i*2];
                        directions[corners[3][0]+'-'+corners[3][1]] = steps[i*2 +1];
                        currTile[0] += directions[j][1];
                        currTile[1] += directions[j][0];
                    }
                }
            }
        }
        return tiles;
    },

    update : function(){
        this.pickTarget();
        this.hp --;
    }
  
});
