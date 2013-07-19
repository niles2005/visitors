(function() {
    mapwork.MapBlockControl = MapBlockControl;
    MapBlockControl.ID = "MapBlockControl";

    var EXTEND = mapwork.Control;
    var utils = mapwork.utils;
    
    function MapBlockControl() {
        this._controlId = MapBlockControl.ID;
        this._div.style["zIndex"] = 9800;
        this._div.style.position = "absolute";
        this._div.style.border = "1px solid #E88C2B";
        this._div.style["backgroundColor"] = "rgba(232, 140, 43, 0.5)";
        this._div.style.left =  "100px";
        this._div.style.top = "100px";
        this._div.style.width = "200px";
        this._div.style.height = "200px";



	}

	if(EXTEND) {
        mapwork.utils.inherits(MapBlockControl, EXTEND);
    }    
})();