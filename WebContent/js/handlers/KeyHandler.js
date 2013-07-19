(function() {
    mapwork.KeyHandler = KeyHandler;
    KeyHandler.ID = "KeyHandler";

	var EXTEND = mapwork.Handler;

	function KeyHandler() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._handlerId = KeyHandler.ID;
	    this._offsetStep = 5;
		this._isOverMap = false;
    }
    
    KeyHandler.prototype = {
        setMap: function(map) {
            this._map = map;
			var self = this;

            mapwork.utils.bindEvent(this._map._div,'mouseover',function(event) {
				self._isOverMap = true;
			});
            mapwork.utils.bindEvent(this._map._div,'mouseout',function(event) {
				self._isOverMap = false;
			});
            mapwork.utils.bindEvent(document,'keydown',function(event) {
				self.onKeyDown(event);
			});
            mapwork.utils.bindEvent(document,'keyup',function(event) {
				self.onKeyUp(event);
			});
        },
        onKeyDown: function(event) {
			if(!this._isOverMap) {
				return;
			}
            this._offsetStep += 2; 
            var mapLocation = this._map.getMapLocation();
            var layerContainer = this._map.getLayerContainer();
            if(event.keyCode == 38) {//up
                    layerContainer.movedMap(0,this._offsetStep);
            } else if(event.keyCode == 40) {//down
                    layerContainer.movedMap(0,-this._offsetStep);
            } else if(event.keyCode == 37) {//left
                    layerContainer.movedMap(this._offsetStep,0);
            } else if(event.keyCode == 39) {//right
                    layerContainer.movedMap(-this._offsetStep,0);
            } else if(event.keyCode == 33) {//pageUp
                    mapLocation.offsetZoom(1);
            } else if(event.keyCode == 34) {//pageDn
                    mapLocation.offsetZoom(-1);
            } else if(event.keyCode == 187) {//+
                    mapLocation.offsetZoom(1);
            } else if(event.keyCode == 189) {//-
                    mapLocation.offsetZoom(-1);
            }
        },
        onKeyUp: function(event) {
			if(!this._isOverMap) {
				return;
			}
            this._offsetStep = 5;
        }
    }
    
	if(EXTEND){
        mapwork.utils.inherits(KeyHandler, EXTEND);
    }
})();