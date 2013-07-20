(function() {
    mapwork.MapRect = MapRect;

    var EXTEND = null;

    function MapRect() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
    }

    MapRect.prototype = {
        
    };

    if(EXTEND) {
        mapwork.utils.inherits(MapRect, EXTEND);
    }    
})();