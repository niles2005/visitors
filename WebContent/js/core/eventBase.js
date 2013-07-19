(function() {
    mapwork.eventBase = {
        addListener : function(type,listener) {
            this.getListeners(type).push(listener);
        },
        removeListener : function(type,listener) {
            var listeners = getListeners(type);
            mapwork.utils.removeItem(listeners,listener);
        },
        fireEvent: function(type) {
            var listeners = this.getListeners(type);
            for(var k in listeners) {
                listeners[k].apply(this,arguments);
            }
        },
        getListeners: function(type) {
            type = type.toLowerCase();
            if(!this._listeners) {
                this._listeners = {};
            }
            if(!this._listeners[type]) {
                this._listeners[type] = [];
            }
            return this._listeners[type];
        }
    }
})();