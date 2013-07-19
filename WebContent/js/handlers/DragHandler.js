(function() {
    mapwork.DragHandler = DragHandler;
    DragHandler.ID = "DragHandler";
	
    var EXTEND = mapwork.Handler;

    function DragHandler() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._handlerId = DragHandler.ID;
    }
    
    DragHandler.prototype = {
        setMap: function(map) {
            this._map = map;
            var layerContainer = map.getLayerContainer();
            map.addEventListener("mousedown",layerContainer.onMouseDown,layerContainer);
        }
    }

	if(EXTEND) {
        mapwork.utils.inherits(DragHandler, EXTEND);
    }    
})();