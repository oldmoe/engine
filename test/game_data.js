var GameData = Class.create(NE.Publisher, {

  initialize : function(){
  },
  load : function(){
    var self = this;
    new Ajax.Request( 'data/game_data.html', {method:'get',
      onSuccess: function(t){
        var data = JSON.parse(t.responseText);
        self.data = data["gameData"];
        for(var i in self.data.towers)
        {
          self.data.towers[i].upgrades = JSON.parse(self.data.towers[i].upgrades);
        }
        for(var i in self.data.weapons)
        {
            self.data.weapons[i].upgrades = JSON.parse(self.data.weapons[i].upgrades);
        }
        self.ranks = JSON.parse(data["ranks"]);
        self.fire('loaded');
      },
      onFailure: function(){
          if(errorCallback)
            errorCallback();
      }
    });
  }
});
