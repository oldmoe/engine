var DefenderScene = Class.create(NE.Scene, {

    initialize : function($super, delay, game){
        $super(delay, game);
    },

    start : function($super) {
        $super();
        this.loadData();
    },

    _start : function(){
        this.setupMap();
        this.fireEvery(10, this, 'sendCreep');
        this.user = new User(this.gameData.data);
        /* Create User Towers */  
    },
  
    sendCreep : function() {
        this.addObject(new Creep(this));
        if (this.stopCreeps)
            return false;
    },

    sendTower : function() {
        var tower = new Tower(this)
        this.addObject(tower);
        return tower;
    },

    setupMap : function() {
        this.map = new Map(mapTestData);
        return this.map;
    },
  
    loadData : function() {
        this.gameData = new GameData();
        this.gameData.subscribe('loaded', this, '_start');
        this.gameData.load();
    }

});
