var Control = Class.create(NE.Publisher, {
  
  initialize : function(layers){
    this.klassName = 'control'
    var self = this;
    this.x = 100;
    this.y = 100;
    this.layer = layers.controls;
    this.layer.container.observe('click', function(){alert('hi');});
    this.sprites = [];
    var im = new Image();
    im.src = 'images/build.png';
    this.sprites.push(this.layer.createSprite('', this, [im], {shiftX: 0, shiftY: 0}));
    ['belcher', 'exploder', 'patriot', 'reaper'].each(function(tower, towerIndex){
      im = new Image();
      im.src = 'images/'+tower+'.png';
      var sprite = self.layer.createSprite('', self, [im],
           {shiftX: 20 + 64*(towerIndex%2), shiftY: 35*(Math.floor(towerIndex/2))});
      sprite.show();
      sprite.render(self.layer);
      self.sprites.push(sprite);
    });
    console.log(this.sprites);
  },

  update : function(){
  }

/*
  registerDroppingGroundEvents : function(){
    $$('.towerBuild')[0].hide();
    $$('.towerOptions')[0].hide();
    var self = this;
    $('droppingGround').observe('click', function(e){
      $$('.towerBuild a img.on').each(function(element){
        element.stopObserving('click');
      });
      $$('.towerOptions a').each(function(element){
        element.stopObserving('click');
      });
  		var x=0,y=0
	    if(e.layerX){x = e.layerX;y = e.layerY}					//other than opera
	    else{x=e.x;y=e.y}						
	    //opera
      var tile = Map.findTile(x,y)
	    GhostTurret.xGrid = tile[0];
	    GhostTurret.yGrid = tile[1];
	    GhostTurret.validate();
	    if(GhostTurret.valid && !GhostTurret.selected ){
		    GhostTurret.selected = true
        for(var i=0; i < self.nameMapping.towers.length; i++)
        {
          var klass = eval(self.nameMapping.classes[i]);
          if(!Config.towers[i] ||  klass.prototype.price > game.scene.money)
          {
            $$('.towerBuild a')[i].addClassName('inactive');
            $$('.towerBuild a img')[i].removeClassName('on');
            $$('.towerBuild a img')[i].src = Loader.images.background[self.nameMapping.classes[i].toLowerCase() + 
                                              '_button.png'].getAttribute('data');
          }else{
            $$('.towerBuild a')[i].removeClassName('inactive');
            $$('.towerBuild a img')[i].addClassName('on');
            $$('.towerBuild a img')[i].src = Loader.images.background[self.nameMapping.classes[i].toLowerCase() + 
                                              '_button.png'].getAttribute('data');
            $$('.towerBuild a img')[i].setAttribute('tower', self.nameMapping.classes[i]);
          }
        }
        $$('.towerBuild a img.on').each(function(element){
          element.observe('click', function(){
    		    GhostTurret.selected = false;
            game.scene.addTurret(element.getAttribute('tower'),  GhostTurret.xGrid, GhostTurret.yGrid);
            $$('.towerBuild')[0].hide();
          });
        });
        var towersDiv = $$('.towerBuild')[0];
        towersDiv.setStyle({left :(GhostTurret.xGrid*Map.pitch + Map.pitch/2  - parseInt(towersDiv.getStyle('width'))/2)+ 'px',
                           top : (GhostTurret.yGrid*Map.pitch + Map.pitch - parseInt(towersDiv.getStyle('height'))/2 )+'px'});
        towersDiv.show();
	    }	    
      else if(GhostTurret.valid && GhostTurret.selected ){
		    GhostTurret.selected = false
        $$('.towerBuild')[0].hide();
      }
	    else if (Map.grid[GhostTurret.xGrid][GhostTurret.yGrid].tower){
        if(!Map.grid[GhostTurret.xGrid][GhostTurret.yGrid].tower.upgradable)
        {
          $$('.towerOptions .upgradeBtn')[0].addClassName('inactive');
          $$('.towerOptions .upgradeBtn')[0].removeClassName('active');
        }else{
          $$('.towerOptions .upgradeBtn')[0].addClassName('active');
          $$('.towerOptions .upgradeBtn')[0].removeClassName('inactive');
        }
		    GhostTurret.selected = false
        var tile = Map.findTile(x, y)
		    game.scene.selectTower(tile[0], tile[1])
        var towersDiv = $$('.towerOptions')[0];
        towersDiv.setStyle({left :(GhostTurret.xGrid*Map.pitch + Map.pitch/2  - parseInt(towersDiv.getStyle('width'))/2)+ 'px',
                           top : (GhostTurret.yGrid*Map.pitch + Map.pitch - parseInt(towersDiv.getStyle('height'))/2 )+'px'});
        $$('.towerOptions .cancelBtn')[0].observe('click', function(){
          towersDiv.hide();
          game.scene.selectedTower.display.rangeSprite.visible = false;
          game.scene.selectedTower = null;
        });
        $$('.towerOptions .sellBtn')[0].observe('click', function(){
          game.scene.sellSelectedTower(); 
          towersDiv.hide();
        });
        $$('.towerOptions .upgradeBtn')[0].observe('click', function(){
          if($$('.towerOptions .upgradeBtn')[0].hasClassName('active'))
          {
            game.scene.upgradeSelectedTower(); 
            if(!Map.grid[GhostTurret.xGrid][GhostTurret.yGrid].tower.upgradable)
            {
              $$('.towerOptions .upgradeBtn')[0].addClassName('inactive');
              $$('.towerOptions .upgradeBtn')[0].removeClassName('active');
            }else{
              $$('.towerOptions .upgradeBtn')[0].addClassName('active');
              $$('.towerOptions .upgradeBtn')[0].removeClassName('inactive');
            }
          }
        });
        towersDiv.show();
	    }
	    else{
			    Sounds.play(Sounds.gameSounds.wrong_tower)
	    }
    });
  }
*/

});
