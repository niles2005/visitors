(function() {
    mapwork.ClickLocationHandler = ClickLocationHandler;
    ClickLocationHandler.ID = "ClickLocationHandler";
	
    var EXTEND = mapwork.Handler;

	
    function ClickLocationHandler() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._handlerId = ClickLocationHandler.ID;
    }
    
    ClickLocationHandler.prototype = {
        setMap: function(map) {
            this._map = map;
            map.addEventListener("mousedown", this.onMouseDown,this);
            map.addEventListener("dblclick", this.onClick,this);
            map.getPanelDivPos();
        },
        onMouseDown: function(event) {
            if(this._map.getMode() != 0) {
                return;
            }
            this._mouseDownPos = [event.offsetX,event.offsetY];
        },
        onClick: function(event) {
            if(this._map.getMode() != 0) {
                return;
            }
            if(this._mouseDownPos) {
                var mapLocation = this._map.getMapLocation();
                var mapX = mapwork.utils.getMapLayerX(event,mapLocation);
                var mapY = mapwork.utils.getMapLayerY(event,mapLocation);
                var mouseUpPos = [event.offsetX, event.offsetY];
                if(mouseUpPos[0] == this._mouseDownPos[0] && mouseUpPos[1] == this._mouseDownPos[1]) {
                        var offsetX = (this._map._size.width /2 - mapX);
                        var offsetY = (this._map._size.height / 2 - mapY) ;
                        var layerContainer = this._map.getLayerContainer();
                        layerContainer.movedMap(offsetX,offsetY);
                        this._mouseDownPos = null;
                }
            }
        }
    }
    
	if(EXTEND) {
        mapwork.utils.inherits(ClickLocationHandler, EXTEND);
    }    
})();