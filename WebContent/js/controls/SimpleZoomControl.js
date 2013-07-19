(function() {
    mapwork.SimpleZoomControl = SimpleZoomControl;
    
    SimpleZoomControl.ID = "SimpleZoomControl";
    
    var EXTEND = mapwork.Control;

    function SimpleZoomControl() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._div.style["zIndex"] = 1001;
        this._div.style.position = "absolute";
        this._div.style.top = "0px";
        this._div.style.left = "0px";
//        this._div.style.background="#0f0";
        this._controlId = SimpleZoomControl.ID;
    }
    
    SimpleZoomControl.prototype = {
        setMap: function(map) {
            this._map = map;
            this.createImage(this._div,"zoomdown","images/zoomrulerup.png",20,20,this.onClick);
            this.createImage(this._div,"zoomup","images/zoomrulerdown.png",50,20,this.onClick);
        },
        onClick: function(event) {
            var target = event.target;
            if(target.name == "zoomdown") {
                this._map.getMapLocation().offsetZoom(1);
            } else if(target.name == "zoomup") {
                this._map.getMapLocation().offsetZoom(-1);
            }
        }
    }

	if(EXTEND) {
        mapwork.utils.inherits(SimpleZoomControl, EXTEND);
    }    
})();