Array.prototype.random = function(){
        return this[Math.round(Math.random()*(this.length-1))]
};