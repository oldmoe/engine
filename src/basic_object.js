var Nezal = {}
Nezal.PubSub = {
	
	subscribe : function(event, subscriber, method){
		if(!this.subscriptions)this.subscriptions = {}
		if(!this.subscriptions[event])this.subscriptions[event] = []
		this.subscriptions[event].push([subscriber, method])
	},
	
	fire : function(event, options){
		var subscriptions = [];
		var length = this.subscriptions[event].length;
		while(this.subscriptions[event].length > 0){
			var subscription = this.subscriptions.shift()
			var object = subscription[0]
			var method = subscription[1] || event
			if(object[method](options) === false){
			}else{
				subscriptions.push(subscription)
			}
		}
		this.subscriptions[event] = subscriptions	
	},
	
	unsubscribe : function(event, subscriber){
		this.subscriptions[event] = this.subscriptions[event].reject(function(element){return relement[0] == subscriber})
	},
	
	attach : function(object, methods){
		for(var i=0; i<methods.length;i++){
			var method = methods[i]
			this.subscribe(method, object)
		}
		if(!this["__"+method+"__"]) this._wrap(method)
		if(object.onattach) object.onattach(this);
	},
	
	_wrap : function(method){
		this["__"+method+"__"] = this[method]
		this[method] = function(){
			result = this["__"+method+"__"].apply(this, arguments)
			this.fire(method, this)
			return result
		}
	},
	
	detach : function(object, methods){
		for(var i=0; i<methods.length;i++){
			var method = methods[i];
			this.unsubscribe(method, object);
		}
	}
	
}