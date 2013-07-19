(function() {
    mapwork.MapLocation = MapLocation;
    MapLocation.LIMIT_MAX_ZOOM = 18;
    MapLocation.LIMIT_MIN_ZOOM = 7;
    
    var EXTEND = null;

    function MapLocation(map, lat, lon, zoom) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._centerTileEdgeX = 0;
        this._centerTileEdgeY = 0;

        lat = lat || mapwork.configs.defaultLat;
        lon = lon || mapwork.configs.defaultLon;
        zoom = zoom || mapwork.configs.defaultZoom;
        
        this._maxZoom = MapLocation.LIMIT_MAX_ZOOM;
        this._minZoom = MapLocation.LIMIT_MIN_ZOOM;

        this._map = map;
        this._mapCenterEPos = new mapwork.EarthPos(lat,lon); 
        this._mapCenterGPos = this._mapCenterEPos.convert2GlobalPos();
        this._zoom = zoom;
        if(zoom > MapLocation.LIMIT_MAX_ZOOM) {
            this._zoom = MapLocation.LIMIT_MAX_ZOOM;
        } else if(zoom < MapLocation.LIMIT_MIN_ZOOM) {
            this._zoom = MapLocation.LIMIT_MIN_ZOOM;
        }
        
        this._edgeNum = Math.pow(2, this._zoom);
        this._edgeLen = this._edgeNum * 256;
        this._centerTileEdgeX = this._edgeNum * this._mapCenterGPos.posX;
        this._centerTileEdgeY = this._edgeNum * this._mapCenterGPos.posY;
    }
    
    MapLocation.prototype = {
        getCenterTileX: function() {
            return parseInt(this._centerTileEdgeX);
        },
        getCenterTileY: function() {
            return parseInt(this._centerTileEdgeY);
        },
        getLatitude: function() {
            return this._mapCenterEPos.getDLat();
        },
        getLongitude: function() {
            return this._mapCenterEPos.getDLon();
        },
        _movingMapCenterGlobalPos: function(gPos) {
            this._mapCenterGPos = gPos;
            this._mapCenterEPos = this._mapCenterGPos.convert2EarthPos();
            this._centerTileEdgeX = this._edgeNum * this._mapCenterGPos.posX;
            this._centerTileEdgeY = this._edgeNum * this._mapCenterGPos.posY;
            this._map.fireEvent(mapwork.MapEvent.MOVING,this._map);
        },
        _movedToMapCenterGlobalPos: function(gPos) {
            this._mapCenterGPos = gPos;
            this._mapCenterEPos = this._mapCenterGPos.convert2EarthPos();
            this._centerTileEdgeX = this._edgeNum * this._mapCenterGPos.posX;
            this._centerTileEdgeY = this._edgeNum * this._mapCenterGPos.posY;
            this._map.fireEvent(mapwork.MapEvent.MOVE_END,this._map);
        },
        _zoomToMapCenter: function(pos,zoom) {
            if(!this.isValidZoom(zoom)) {
                return;
            }
            
            var gPos,ePos;
            if(pos instanceof mapwork.GlobalPos) {
                gPos = pos;
                ePos = gPos.convert2EarthPos();
            } else if(pos instanceof mapwork.EarthPos) {
                ePos = pos;
                gPos = ePos.convert2GlobalPos();
            } else {//else if(pos instanceof String) {}
                return;
            }
            
            this._zoom = zoom;
            this._edgeNum = Math.pow(2, this._zoom);
            this._edgeLen = this._edgeNum * 256;
            this._mapCenterGPos = gPos;
            this._mapCenterEPos = ePos; 
            this._centerTileEdgeX = this._edgeNum * this._mapCenterGPos.posX;
            this._centerTileEdgeY = this._edgeNum * this._mapCenterGPos.posY;
            this._map.fireEvent(mapwork.MapEvent.ZOOM_END,this._map);
        },
        
        setZoom: function(zoom) {
            if(!this.isValidZoom(zoom)) {
                return;
            }
            if(this._zoom === zoom) {
                return;
            }
            this._zoom = zoom;
            this._edgeNum = Math.pow(2, this._zoom);
            this._edgeLen = this._edgeNum * 256;
            this._centerTileEdgeX = this._edgeNum * this._mapCenterGPos.posX;
            this._centerTileEdgeY = this._edgeNum * this._mapCenterGPos.posY;
            this._map.fireEvent(mapwork.MapEvent.ZOOM_END, this._map);
        },
        offsetZoom: function(zoomOffset) {
            this.setZoom(this._zoom + zoomOffset);
        },
        
        getWindowLeftTopGlobalPos: function() {
            var gx = this._mapCenterGPos.posX - this._map._size.width / 2 / this._edgeLen;
            var gy = this._mapCenterGPos.posY - this._map._size.height / 2 / this._edgeLen;
            return new mapwork.GlobalPos(gx,gy);
        },

        getWindowRightBottomGlobalPos: function() {
            var gx = this._mapCenterGPos.posX + this._map._size.width / 2 / this._edgeLen;
            var gy = this._mapCenterGPos.posY + this._map._size.height / 2 / this._edgeLen;
            return new mapwork.GlobalPos(gx,gy);
        },
        isValidZoom: function(zoom) {
            if(zoom < this._minZoom) {
                return false;
            } else if(zoom > this._maxZoom) {
                return false;
            }
            return true;
        },
        getCenterTileEdgeX : function() {
            return this._centerTileEdgeX;
        },
        getCenterTileEdgeY : function() {
            return this._centerTileEdgeY;
        },
        getMapCenterGlobalPos: function() {
            return this._mapCenterGPos;
        },
        getMapCenterEarthPos: function() {
            return this._mapCenterEPos;
        },
        getGlobalPosFromMapPos: function(offsetPixelX,offsetPixelY) {
            var gx = (offsetPixelX - this._map._size.width / 2) / this._edgeLen + this._mapCenterGPos.posX;
            var gy = (offsetPixelY - this._map._size.height / 2) / this._edgeLen + this._mapCenterGPos.posY;
            return new mapwork.GlobalPos(gx,gy);
        },
        getMapPosFromGlobalPos: function(gPos) {
            var posX = (gPos.posX - this._mapCenterGPos.posX) * this._edgeLen + this._map._size.width / 2;
            var posY = (gPos.posY - this._mapCenterGPos.posY) * this._edgeLen + this._map._size.height / 2;
            return [posX,posY];
        },
        getEarthPosFromMapPos: function(offsetPixelX,offsetPixelY) {
            var gPos = this.getGlobalPosFromMapPos(offsetPixelX,offsetPixelY);
            var ePos = gPos.convert2EarthPos();
            return ePos;
        },
        getZoom: function() {
            return this._zoom;
        },
        getEdgeNum: function() {
            return this._edgeNum;
        },
        getEdgeLen: function() {
            return this._edgeLen;
        },
        getMap: function() {
            return this._map;
        },
        getCenterTileId: function() {
            return this.getCenterTileX() + "," + this.getCenterTileY() + "," + this.getZoom();            
        },
        getWindowBounds: function() {   
            var ltGPos = this.getWindowLeftTopGlobalPos();
            var rbGPos = this.getWindowRightBottomGlobalPos();
            var ltEPos = ltGPos.convert2EarthPos();
            var rbEPos = rbGPos.convert2EarthPos();
            var lon1 = ltEPos.getILon();
            var lon2 = rbEPos.getILon();
            if(lon2 < lon1 && lon2 < 0) {
                    lon2 = 180000000;
            }
            var arr =[ltEPos.getILat(),lon1,rbEPos.getILat(),lon2];
            return arr;
        },
        getWindowGlobalPosBounds: function() {
            var offsetX = this._map._size.width / 2 / this._edgeLen
            var offsetY = this._map._size.height / 2 / this._edgeLen
            var gx1 = this._mapCenterGPos.posX - offsetX;
            var gy1 = this._mapCenterGPos.posY - offsetY;
            var gx2 = this._mapCenterGPos.posX + offsetX;
            var gy2 = this._mapCenterGPos.posY + offsetY;
            return new mapwork.Bounds(gx1,gy1,gx2,gy2);
        },
        getWindowPixelBounds: function() {
            var centerPixelX = this._edgeLen * this._mapCenterGPos.posX;
            var centerPixelY = this._edgeLen * this._mapCenterGPos.posY;
            var x1 = centerPixelX - this._map._size.width / 2;
            var x2 = centerPixelX + this._map._size.width / 2;
            var y1 = centerPixelY - this._map._size.height / 2;
            var y2 = centerPixelY + this._map._size.height / 2;
            return new mapwork.Bounds(x1,y1,x2,y2);
        },
        getPageX: function(event) {
            if(mapwork.isIE && mapwork.IEVersion < 9) {
                return event.x;
            } else {
                return event.clientX - this._map._div.offsetLeft;
            }
        },
        getPageY: function(event) {
            if(mapwork.isIE && mapwork.IEVersion < 9) {
                return event.y;
            } else {
                return event.clientY - this._map._div.offsetTop;
            }
        }
    };

	if(EXTEND) {
        mapwork.utils.inherits(MapLocation, EXTEND);
    }    
})();