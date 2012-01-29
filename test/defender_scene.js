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
        this.sendCreep();
        this.user = new User(this.gameData.data);
        /* Create User Towers */  
    },
  
    sendCreep : function() {
        this.addObject(new Creep(this));
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
