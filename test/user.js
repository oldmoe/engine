var User = Class.create({

  data : {}, 

  initialize : function(gameData){
    this.gameData = gameData;
    var initialVals = {
      "coins":1000,
      "rank":"Col",
      "exp":500,
      "newbie":true,
      "locale":"arabic", 
      "towers":{},
      "weapons":{},
      "campaigns":{},
      "music" : true,
      "sound" : true
    }
    for(var i in initialVals) 
    {
      if(this.data[i]==undefined) this.data[i] = initialVals[i];
    }
    var self = this;
    ['towers', 'weapons'].each(function(key){
      for(var item in self.gameData[key])
      {
        if(self.gameData[key][item]['unlocked'] == true && !(self.data[key][item]))
        {
          self.data[key][item] = {'upgrades' :  self.gameData[key][item]['upgradeLevel']}        
        }
      }
    });
    this.saveData(this.data);
  },

  getData : function(callback){
    var data = {};
    if(localStorage)
    {
      if(localStorage['userData']) data = JSON.parse(localStorage['userData']);
    }else if(dataStore){
      var loadedData = dataStore.load();
      if(loadedData) data = JSON.parse(loadedData);
    }
    this.data = data;
    for(var i in this.data.campaigns)
    {
      if(this.data.campaigns[i].missions)
        this.data.campaigns[i].missions = JSON.parse(this.data.campaigns[i].missions);
    }
    this.initialize();
    callback(this.data);
  },

  saveData : function(data){
    if(localStorage)
    {
      localStorage['userData'] = JSON.stringify(data);
    }else if(dataStore){
      dataStore.save(JSON.stringify(data));
    }
  },

  unlock : function(gameData, itemData, callback){
    var self = this;
    var operation = function(){
      var cost = parseInt(gameData[itemData['type']][itemData['item_id']]['cost']);
      var exp = parseInt(gameData[itemData['type']][itemData['item_id']]['exp']);
      if(cost <= self.data.coins && exp <= self.data.exp)
      {
        self.data.coins -= cost
        if(!self.data[itemData['type']][itemData['item_id']])
          self.data[itemData['type']][itemData['item_id']] = {'upgrades' : gameData[itemData['type']][itemData['item_id']]['upgradeLevel']}
      }
      self.saveData(self.data);
      if(callback) callback(self.data);
    }
    this.getData(operation);
  },

  upgrade : function(gameData, itemData, callback) {
    var self = this;
    var operation = function(){
      var upgrade = self.data[itemData['type']][itemData['item_id']]['upgrades']
      var upgrades = gameData[itemData['type']][itemData['item_id']]['upgrades']
      if(upgrades[upgrade]) 
      {
        var cost = parseInt(upgrades[upgrade]['cost']);
        if(cost <= self.data.coins && upgrades[upgrade]['exp'] <= self.data.exp )
        {
          self.data.coins -= cost
          self.data[itemData['type']][itemData['item_id']]['upgrades'] += 1
        }
      }
      self.saveData(self.data);
      if(callback) callback(self.data);
    }
    this.getData(operation);
  },

  newbieNoMore : function(gameData, ranks, callback){
    var self = this;
    var operation = function(){
      self.data.exp += 500;
      self.data.newbie = false;
      self.data.rank = self.rank(self.data.exp, gameData.ranks);
      self.saveData(self.data);
      if(callback) callback(self.data);
    }
    this.getData(operation);
  },

  rank : function(exp, ranks){
    var rank = null;
    for(var i in ranks)
    {
      if(!rank) rank = i;
      if(exp >= ranks[i][0] && (exp < ranks[i][1] || ranks[i][1] < 0))
      {
        rank = i;
        break;
      }   
    }
    return rank;
  },

  initializeCampaign : function(){
    return { 'missions' : [ { 'order' : 1, 'score' : 0 } ], 'levels' : { '1' : 1, '2' : 1, '3' : 1 } }
  },

  campaign : function(campaign, callback){
    var self = this;
    var operation = function(){
      if(!self.data.campaigns[campaign])
      {
        self.data.campaigns[campaign] = self.initializeCampaign();
        self.saveData(self.data);
      }
      if(callback) callback(self.data.campaigns[campaign]);
    }
    this.getData(operation);
  },

  playCampaign : function(ranks, campData, data, callback){
    var WIN_COIN_FACTOR = 1.0/300.0;
    var WIN_EXP_FACTOR = 1.5/50.0;
    var LOSE_EXP_FACTOR = 1.0/50.0;
    var self = this;
    var operation = function(){
      if(campData['missions'][data['mission'] -1])
      {
        var userCampaignData = self.data.campaigns[data['campaign']];
        var oldScore = self.data.campaigns[data['campaign']]['missions'][data['mission'] -1]['score']
        if(userCampaignData['missions'][data['mission'] -1]['score'] < data['score'])
	        userCampaignData['missions'][data['mission'] -1]['score'] = data['score']
	      if(userCampaignData['missions'][data['mission'] -1]['score'] < 100000)
        {											
      		userCampaignData.score -= oldScore;
	      	userCampaignData.score += self.data.campaigns[data['campaign']]['missions'][data['mission'] -1]['score'];
        } else {
      		
        }
        if (data['win'])
        {
          if(!userCampaignData['missions'][data['missions']]) userCampaignData['missions'][data['mission']]={ 'order' : data['mission'] + 1, 'score' : 0 }
          if (userCampaignData['levels'][data['level']] == data['mission'])
            userCampaignData['levels'][data['level']] = data['mission'] + 1;
          self.data.exp += Math.round(data['score'] * WIN_EXP_FACTOR);
          self.data.coins += Math.round(data['score']*WIN_COIN_FACTOR);
        } else {
          self.data.exp += Math.round(data['score'] * LOSE_EXP_FACTOR);
        }
      }
      self.data.rank = self.rank(self.data.exp, ranks);
      self.saveData(self.data);
      if(callback) callback({user_data : self.data, campaign_data : userCampaignData});
    }
    this.getData(operation);
  }, 

  selectLanguage : function(language, callback){
    var self = this;
    var operation = function(){
      self.data.locale = language;
      self.saveData(self.data);
      if(callback) callback(self.data);
    }
    this.getData(operation);
  },

  setSound : function(flag, callback){
    var self = this;
    var operation = function(){
      self.data.sound = flag;
      self.saveData(self.data);
      if(callback) callback(self.data);
    }
    this.getData(operation);
  },

  setMusic : function(flag, callback){
    var self = this;
    var operation = function(){
      self.data.music = flag;
      self.saveData(self.data);
      if(callback) callback(self.data);
    }
    this.getData(operation);
  }

});
