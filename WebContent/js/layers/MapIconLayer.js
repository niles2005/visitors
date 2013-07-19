(function() {
    mapwork.MapIconLayer = MapIconLayer;

    MapIconLayer.ID = "MapIconLayer";

    var EXTEND = mapwork.MapElementLayer;

    function MapIconLayer(layerId) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        if(layerId) {
            this._layerId = layerId;
        } else {
            this._layerId = MapIconLayer.ID;
        }
        if(typeof this._layerId === 'string') {
            this._div.className = this._layerId;
        }
        this._div.style["zIndex"] = 400;
    }

    MapIconLayer.prototype = {
        empty: function(){
        	$(this._div).empty();
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapIconLayer, EXTEND);
    }    
})();