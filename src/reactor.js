/*
	Class Reactor
	Implements the Reactor pattern, inherits from Publisher to provide full event management
*/
NE.Reactor = Class.create(NE.Publisher, {
	
	initialize : function(delay){
		this.delay = delay || 50
		this.events = []
		this.ticks = 0
		this.running = false
	},
	
	/* is the reactor running ? */
	isRunning : function(){
		return this.running;
	},
	
	/* returns the elapsed time since the reactor started (not accurate and does not account for pause time) */
	currentTime : function(){
		return this.ticks * this.delay
	},
	
	/* pause the reactor, keep every thing intact */
	pause : function(){
		this.running = false;
		return this;
	},
  
	/* resume the reactor */
	resume : function(){
		this.running = true;
		this.tick();
		return this;
	},
	
	/* stop the reactor, clears all pending timed events (but not subscribers and observers)*/
	stop : function(){
		this.running = false;
		this.events = [];
		this.ticks = 0;
		return this;
	},
	/* starts the reactor */
	run : function(){
		this.running = true;
		this.runOnce();
		return this;
	},
	
	/* the heart of the reactor, the runOnce function is run at every interval and it is responsible for firing the events */
	runOnce : function(){
		if(!this.running) return;
		var self = this;
		var toFire = [];
		var event = this.events[this.events.length - 1];
		while(event && event[0] <= this.ticks){
			var length = this.events.length - 1;
			toFire.push(this.events.pop());
			event = this.events[this.events.length - 1];
		}
		for(var i = 0; i < toFire.length; i++){
			var object = toFire[i][1];
			var method = toFire[i][2];
			object[method || 'tick']()
		}
		this.ticks++
		if(this.running)setTimeout(function(){self.runOnce()}, this.delay)
		return this;
	},
  	
	/* 
		push a handler to the reactor, 
		it accepts the tick at which it will fire, 
		the handler function and an optional scope for the function 
	*/
	fireAfter : function(ticks, object, method){
		var delay = this.ticks + ticks;
		this.events.splice(this._eventIndex(delay, true), 0, [delay, object, method]);
		return this;
	},
		
	/* 
		push a handler to be run every certain ticks
		The handler is deactivated if it returns an explicit false value
	*/
	fireEvery : function(ticks, object, method){
		var self = this;
		var method = method || 'tick';
		object[method+'__reactor'] = function(){
			var	result = object[method]();
			if(!(result === false)){
				self.fireAfter(ticks, object, method+'__reactor');
			}
		}
		object[method+'__reactor']();
		return this;
	},
		
	/* convert a certain time duration in milliseconds to ticks */
	timeToTicks : function(time){
		return Math.round(time / this.delay);		
	},
	
	_eventIndex : function(ticks, insert){
		var h = this.events.length, l = -1, m;
		while(h - l > 1)
			if(this.events[m = (h + l) >> 1][0] > ticks) l = m;
			else h = m;
		return this.events[h] && this.events[h][0] != ticks ? insert ? h : -1 : h;
	}
	
})
