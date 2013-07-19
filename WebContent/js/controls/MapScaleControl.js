(function() {
    mapwork.MapScaleControl = MapScaleControl;
    MapScaleControl.ID = "MapScaleControl";
    
    var EXTEND = mapwork.Control;

    function MapScaleControl() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._controlId = MapScaleControl.ID;
        this._div.style["zIndex"] = 9900;
        this._div.style.position = "absolute";
        this._div.style.right = "10px";
        this._div.style.bottom = "10px";
    }
    
    MapScaleControl.prototype = {
        setMap: function(map) {
            this._map = map;
            this._scaleDiv = this.createDiv(this._div,"scalediv");
			this._scaleDiv.style["position"] = "absolute";
            this._scaleDiv.style["border"] = "0px";
            this._scaleDiv.style["textAlign"] = "center";
            this._scaleDiv.style["align"] = "center";
            this._scaleDiv.style["borderColor"] = "#000";
            this._scaleDiv.style.bottom = "0px";
            this._scaleDiv.style.right = "0px";
            this._scaleDiv.style.height = "20px";
            this._scaleDiv.align = "center";
			//this._scaleDiv.style.background = "#f00";
            this._scaleLabel = this.createRelativeSpan(this._scaleDiv,"scaleLabel","",0,-15);
            this._scaleLabel.style.font = "normal 12px \"宋体\",Verdana";
            this._scaleLabel.style.color = "black";
//            this._scaleLabel.style.background = "white";
            this._scaleLabel.align = "center";
            this._scaleLabel.style.width = "100%";
            
            var rulerDiv = this.createDiv(this._scaleDiv,"scalediv");
            rulerDiv.style["position"] = "absolute";
            rulerDiv.style["background"] = "#000";
            rulerDiv.style["width"] = "100%";
            rulerDiv.style["bottom"] = "4px";
            rulerDiv.style["height"] = "2px";
            rulerDiv.style["fontSize"] = "0px";
			rulerDiv.style["left"] = "0px";
            
            rulerDiv = this.createDiv(this._scaleDiv,"scalediv");
            rulerDiv.style["position"] = "absolute";
            rulerDiv.style["background"] = "#000";
            rulerDiv.style["width"] = "1px";
            rulerDiv.style["left"] = "0px";
            rulerDiv.style["height"] = "10px";
            rulerDiv.style["bottom"] = "0px";
            rulerDiv.style["fontSize"] = "0px";
            
            rulerDiv = this.createDiv(this._scaleDiv,"scalediv");
            rulerDiv.style["position"] = "absolute";
            rulerDiv.style["background"] = "#000";
            rulerDiv.style["width"] = "1px";
            rulerDiv.style["height"] = "10px";
            rulerDiv.style["bottom"] = "0px";
            rulerDiv.style["fontSize"] = "0px";
            rulerDiv.style["right"] = "0px";
            
            
            this._map.addEventListener(mapwork.MapEvent.ZOOM_END, this.onReset,this);
            this._map.addEventListener(mapwork.MapEvent.MOVE_END, this.onReset,this);
            this._map.addEventListener(mapwork.MapEvent.RESIZE, this.onReset,this);
        },
        setRightLength: function(len) {
            this._div.style.right = (len + 10) + "px";
        },
        onReset: function() {
            var mapLocation = this._map.getMapLocation();
            var rulerLen = 160;
            var size = this._map.getSize();
            if(rulerLen >= size.width / 3) {
                rulerLen = parseInt(size.width / 3);
            }
            var edgeLen = mapLocation.getEdgeLen();
            var mapCenter = mapLocation.getMapCenterGlobalPos();
            var ruler = mapwork.MapRulerBuilder.createMapRuler(mapCenter, mapLocation.getZoom(),edgeLen, rulerLen);
            if(ruler) {
                this._scaleDiv.style.display = "block";
                this._scaleLabel.innerText = ruler.metricText;
                if(mapwork.isFirefox) {
                    this._scaleLabel.textContent = ruler.metricText;
                }
                if(ruler.metricLength)
                this._scaleDiv.style.width = ruler.metricLength + "px";
                this._scaleDiv.align = "center";
            } else {
                this._scaleDiv.style.display = "none";
            }
        }
    };
    
	if(EXTEND) {
        mapwork.utils.inherits(MapScaleControl, EXTEND);
    }    
})();

