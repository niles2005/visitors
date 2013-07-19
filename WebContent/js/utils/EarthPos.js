(function() {
    mapwork.EarthPos = EarthPos;
    
    EarthPos.MAX_LAT = 850511287;
    EarthPos.MIN_LAT = -850511287;
    
    EarthPos.SCALE_FACTOR = 10000000;

    
    function EarthPos(lat,lon,isInt7) {
        if(isInt7) {
            this._latitude = lat;
            this._longitude = lon;
        } else {
            this._latitude = Math.round(lat * EarthPos.SCALE_FACTOR);
            this._longitude = Math.round(lon * EarthPos.SCALE_FACTOR);
        }
    }
    
    EarthPos.prototype = {
        getILat :  function() {
                return this._latitude;
        },
        getILon : function() {
            return this._longitude;
        },
        getDLat : function() {
            return 1.0 * this._latitude / EarthPos.SCALE_FACTOR;
        },
        getDLon : function() {
            return 1.0 * this._longitude / EarthPos.SCALE_FACTOR;
        },
        convert2GlobalPos : function() {
            var posX,posY;
            posX = (1.0 * this._longitude / EarthPos.SCALE_FACTOR + 180) / 360;
            posY = Math.log(Math.tan((1.0 * this._latitude / EarthPos.SCALE_FACTOR + 90) * Math.PI / 360));
            posY = 0.5 - posY / 2 / Math.PI;
            return new mapwork.GlobalPos(posX,posY);
        },
        getLatLonString : function() {
            return this.getDLat() + "," + this.getDLon();
        },
        equals : function(ePos) {
            return this._latitide == ePos._latitide && this._longitude === ePos._longitude;
        },
        toString : function() {
            return "EarthPos:[" + this._latitude + "," + this._longitude + "]";
        }
        
    };
})();