(function() {
    mapwork.MapShadowLayer = MapShadowLayer;

    MapShadowLayer.ID = "MapShadowLayer";

    var EXTEND = mapwork.MapElementLayer;

    function MapShadowLayer() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._layerId = MapShadowLayer.ID;
        if(typeof this._layerId === 'string') {
            this._div.className = this._layerId;
        }
        this._div.style["zIndex"] = 300;
    }

    MapShadowLayer.prototype = {
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapShadowLayer, EXTEND);
    }    
})();