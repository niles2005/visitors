(function() {
    mapwork.CenterCrossControl = CenterCrossControl;
    CenterCrossControl.ID = "CenterCrossControl";
    
    var EXTEND = mapwork.Control;

    function CenterCrossControl() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._controlId = CenterCrossControl.ID;

        this._div.style["zIndex"] = 9700;
        this._div.style.position = "absolute";
        this._div.style.top = "0px";
        this._div.style.left = "0px";

        this._imageWidth = 19;
        this._imageHeight = 19;
    }
    
    CenterCrossControl.prototype = {
        setMap: function(map) {
            this._map = map;

            this._crossImage = this.createImage(this._div,"center","images/center.gif",0,0);
            this._crossWidth = mapwork.utils.getStyleWidth(this._crossImage);
            this._crossHeight = mapwork.utils.getStyleHeight(this._crossImage);
            this._map.addEventListener(mapwork.MapEvent.RESIZE, this.onMapResize,this);
        },
        onMapResize: function() {
            var size = this._map.getSize();
            
            var x = size.width/2 - this._imageWidth / 2;
            var y = size.height/2 - this._imageHeight / 2;
            this._crossImage.style.left = x + "px";
            this._crossImage.style.top = y + "px";
        }
    }
    
	if(EXTEND) {
        mapwork.utils.inherits(CenterCrossControl, EXTEND);
    }    
})();

