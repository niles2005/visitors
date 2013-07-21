(function() {
    mapwork.MapRect = MapRect;

    var EXTEND = null;
    

    function MapRect(lat1,lon1,lat2,lon2,latNum,lonNum) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._lat1 = lat1;
        this._lon1 = lon1;
        this._lat2 = lat2;
        this._lon2 = lon2;
        this._lonNum = lonNum;
        this._latNum = latNum;
        this._lonOffset = (this._lon2 - this._lon1)/  (this._lonNum + 1);
        this._latOffset = (this._lat1 - this._lat2)/  (this._latNum + 1);
        
        this.moduleItemArray = [];
    }

    MapRect.prototype = {
        addMoudleItem: function(moduleItem) {
            var indexX = this.moduleItemArray.length % this._lonNum + 1;
            var indexY = parseInt(this.moduleItemArray.length / this._lonNum) + 1;
            var lon = this._lon1 + this._lonOffset * indexX;
            var lat = this._lat1 - this._latOffset * indexY;
            var ePos = new mapwork.EarthPos(lat,lon, true);
            moduleItem.setEarthPos(ePos);
            this.moduleItemArray.push(moduleItem);
        }
    };

    if(EXTEND) {
        mapwork.utils.inherits(MapRect, EXTEND);
    }    
})();