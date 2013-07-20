(function() {
    mapwork.MapRectManager = MapRectManager;

    var EXTEND = null;

    function MapRectManager() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this.rects = {};
        this.rects["building1"] = new mapwork.MapRect(312739670,1218214740,312696020,1218272250,4,5);
        this.rects["building2"] = new mapwork.MapRect(312739670,1218272250,312696020,1218332760,4,5);
        this.rects["factory"] = new mapwork.MapRect(312690150,1218189200,312674190,1218358070,2,10);
    }

    MapRectManager.prototype = {
        addModuleItem: function(moduleItem) {
            var locate = moduleItem._json.locate;
            console.log(locate);
            if(locate) {
                var mapRect = this.rects[locate];
                if(mapRect) {
                    mapRect.addMoudleItem(moduleItem);
                }
            }
            
        }
    };

    if(EXTEND) {
        mapwork.utils.inherits(MapRectManager, EXTEND);
    }    
})();