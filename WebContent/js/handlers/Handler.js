(function() {
    mapwork.Handler = Handler;
    
    var EXTEND = null;

    function Handler() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._handlerId = null;
    }
    
    Handler.prototype = {
        getHandlerId: function() {
            return this._handlerId;
        },
        setMap: function(map) {
            this._map = map;
        }
    }

	if(EXTEND) {
        mapwork.utils.inherits(Handler, EXTEND);
    }    
})();