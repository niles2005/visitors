(function() {
    mapwork.MapPopLayer = MapPopLayer;

    MapPopLayer.ID = "MapPopLayer";

    var EXTEND = mapwork.MapElementLayer;

    function MapPopLayer() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._layerId = MapPopLayer.ID;
        if(typeof this._layerId === 'string') {
            this._div.className = this._layerId;
        }
        this._div.style["zIndex"] = 600;
    }

    MapPopLayer.prototype = {
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapPopLayer, EXTEND);
    }    
})();