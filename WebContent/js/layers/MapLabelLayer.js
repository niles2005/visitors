(function() {
    mapwork.MapLabelLayer = MapLabelLayer;

    MapLabelLayer.ID = "MapLabelLayer";
    
    var EXTEND = mapwork.MapElementLayer;

    function MapLabelLayer() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._layerId = MapLabelLayer.ID;
        if(typeof this._layerId === 'string') {
            this._div.className = this._layerId;
        }
        this._div.style["zIndex"] = 500;
    }

    MapLabelLayer.prototype = {
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapLabelLayer, EXTEND);
    }    
})();