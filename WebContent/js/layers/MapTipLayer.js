(function() {
    mapwork.MapTipLayer = MapTipLayer;

    MapTipLayer.ID = "MapTipLayer";

    var EXTEND = mapwork.MapElementLayer;
    
    function MapTipLayer() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._layerId = MapTipLayer.ID;
        if(typeof this._layerId === 'string') {
            this._div.className = this._layerId;
        }
        this._div.style["zIndex"] = 800;
    }

    MapTipLayer.prototype = {
        
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapTipLayer, EXTEND);
    }    
})();