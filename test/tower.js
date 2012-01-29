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
	hp:500, maxHp : 500, power:10, rate:0.2, price: 30, range: 2,
	upgradeValues : ['maxHp', 'power', 'rate', 'range'],
	upgrades : [{maxHp: 1100, power:18, price: 3},
							{maxHp: 1300, power:22, price: 8,range: 3},
							{maxHp: 1600, power:26, rate: 0.3, price: 21,range: 4}],
  initialize : function(scene){
    this.x = 10;
    this.y = 10;
  },

  update : function(){
  }
  
});
