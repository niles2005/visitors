(function() {
    mapwork.MapVectorLayer = MapVectorLayer;

    MapVectorLayer.ID = "MapVectorLayer";
    var EXTEND = mapwork.MapElementLayer;

    function MapVectorLayer() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._layerId = MapVectorLayer.ID;
        if(typeof this._layerId === 'string') {
            this._div.className = this._layerId;
        }
        this._div.style["zIndex"] = 200;
    }

    MapVectorLayer.prototype = {
        doTest: function() {
			var pathId = "Path" + new Date().getTime();
            var path = new mapwork.MapPath(pathId);
            path.addPos(new mapwork.EarthPos(31.241696,121.491722));
            path.addPos(new mapwork.EarthPos(31.245733,121.499576));
            path.addPos(new mapwork.EarthPos(31.242907,121.525453));
            this.addElement(path);
			
			//add circle
			var mapCircle = new mapwork.MapCircle("circle1");
			mapCircle.setCenterPos(new mapwork.EarthPos(31.230248,121.450051));
			mapCircle.setEdgePos(new mapwork.EarthPos(31.235496,121.457389));
			mapCircle.setStrokeOpacity(0.5);
			mapCircle.setFillOpacity(0.2);
			this.addElement(mapCircle);
//			this.resetElement(mapCircle);
			
			mapCircle = new mapwork.MapCircle("circle2");
			mapCircle.setCenterPos(new mapwork.EarthPos(31.2503813,121.4802679));
			mapCircle.setRadius(1000);
			mapCircle.setStrokeOpacity(0.8);
			mapCircle.setFillOpacity(0.6);
			this.addElement(mapCircle);
			
			
			this.initLayer();
			
			
			
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapVectorLayer, EXTEND);
    }    
})();