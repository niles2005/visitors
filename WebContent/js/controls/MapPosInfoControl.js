(function() {
    mapwork.MapPosInfoControl = MapPosInfoControl;
    MapPosInfoControl.ID = "MapPosInfoControl";

    var EXTEND = mapwork.Control;

    function MapPosInfoControl() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._controlId = MapPosInfoControl.ID;
        this._div.style["zIndex"] = 9800;
        this._div.style.position = "absolute";
        this._div.style.left = "5px";
        this._div.style.bottom = "5px";
    }
	
    MapPosInfoControl.prototype = {
        setMap: function(map) {
            this._map = map;
            
            this._posInfoLabel = this.createRelativeSpan(this._div,"posInfoLabel");
            this._posInfoLabel.style.display = "inline";
            this._posInfoLabel.style.font = "normal 12px \u5b8b\u4f53,Verdana";
            this._posInfoLabel.style.color = "black";
            this._posInfoLabel.style["float"] = "left";
            this._posInfoLabel.style.padding = "1px";
            this._posInfoLabel.style.background = "white";
            this._posInfoLabel.style.cursor = "default";
            
            this._map.addEventListener(mapwork.MapEvent.ZOOM_END, this.onMapReset,this);
            this._map.addEventListener(mapwork.MapEvent.MOVING, this.onMapReset,this);
            this._map.addEventListener(mapwork.MapEvent.MOVE_END, this.onMapReset,this);
            this._map.addEventListener(mapwork.MapEvent.RESIZE, this.onMapReset,this);
        },
        onMapReset: function() {
            var mapLocation = this._map.getMapLocation();
            var mapCenterEPos = mapLocation.getMapCenterEarthPos();
            var info =  "Center:(" + mapCenterEPos.getLatLonString() + ")[" + mapLocation.getCenterTileId() + "]";
            this._posInfoLabel.innerText = info; 
        }
    };
	
	if(EXTEND) {
        mapwork.utils.inherits(MapPosInfoControl, EXTEND);
    }    
})();