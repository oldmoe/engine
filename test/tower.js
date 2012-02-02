var Tower = Class.create(Unit, {

  klassName: 'Tower',
	theta :0,
	cannonTheta : 0,
  cannonRotation : 0,
	rank : 0,
	stateChange : false,
	upgradable :true,
	maxRank :3,
	canHitFlying: true,
	canHitGround: true,
	name : 'Belcher',
	hp:500, maxHp : 500, power:10, rate:0.2, price: 30, range: 2,
	upgradeValues : ['maxHp', 'power', 'rate', 'range'],
	upgrades : [{maxHp: 1100, power:18, price: 3},
							{maxHp: 1300, power:22, price: 8,range: 3},
							{maxHp: 1600, power:26, rate: 0.3, price: 21,range: 4}],

  initialize : function($super, scene){
    $super(scene);
    this.moveTo(0,0);
  },

  moveTo : function(x, y){
    if(this.map.grid[this.gridY])
      this.map.grid[this.gridY][this.gridX][0] = 0;
    this.x = x; 
    this.y = y;
    this.tile = this.scene.map.findTile(this.x, this.y);
    this.gridX = this.tile[0];
    this.gridY = this.tile[1];
    this.map.grid[this.gridY][this.gridX][0] = [this];
  },

  targetLayers : function(){
      if(!this.creepsLayers) this.creepsLayers = this.scene.map.entries.collect(function(entry){return entry.z})
      return this.creepsLayers;
  },

  targetTypes : function(){
    return ['Creep'];
  },

  effectivePower : function(){ 
    return this.power;
  },

  update : function(){
    if (this.dead)
      return false;
    this.target();
  },

  destroy : function(){
    this.map.grid[this.gridY][this.gridX][0] = 0;
    this.dead = true;
  }
  
});
