(function() {
    mapwork.MapDraggableIcon = MapDraggableIcon;

    var EXTEND = mapwork.MapIcon;
	var utils = mapwork.utils;

    function MapDraggableIcon() {
		if(EXTEND) {
			EXTEND.apply(this,arguments);
		}
		this._bindDraggableEvent();
    }

    MapDraggableIcon.prototype = {
        _bindDraggableEvent: function() {
			var self = this;
			mapwork.utils.bindEvent(this._htmlObj,"mousedown", function(event) {
				self.onMouseDown(event);
			});
		},
        setDraggedFunc: function(draggedFunc) {
            this._draggedFunc = draggedFunc;
        },
        
        setShadowIcon: function(icon){
        	this._shadowIcon = icon;
        },
		
        onMouseDown: function(event) {
			if(this._layer._map.getMode() != 0) {
				return;
			}
            this._pressX = utils.getPageX(event);
            this._pressY = utils.getPageY(event);
            if(event.stopPropagation) {
                event.stopPropagation();
				event.preventDefault();
                if(event.button != 0) {//只能右键，屏蔽左键的拖动
                    return;
                }
            } else {//IE
                event.cancelBubble = true;
				event.returnValue = false;
                if(event.button != 1) {//只能右键，屏蔽左键的拖动
                    return;
                }
            }
			var self = this;
			
			//被拖拽标志
			this._isDragged = false;

			var draggingDiv = function(event) {
				if(event.stopPropagation) {
					event.stopPropagation();
					event.preventDefault();
				} else {//IE
					event.cancelBubble = true;
					event.returnValue = false;
				}
				var x = utils.getPageX(event);
				var y = utils.getPageY(event);
				//是否被拖拽
				self._isDragged = true;
				self._htmlObj.style.left = (self._htmlObjPos[0] + x - self._pressX) + "px";
				self._htmlObj.style.top = (self._htmlObjPos[1] + y - self._pressY) + "px";
				var shadowIcon = self._shadowIcon;
				if(shadowIcon){
					shadowIcon._htmlObj.style.left = (shadowIcon._htmlObjPos[0] + x - self._pressX) + "px";
					shadowIcon._htmlObj.style.top = (shadowIcon._htmlObjPos[1] + y - self._pressY) + "px";
				}
			}
			var droppedDiv = function(event) {
				if(event.stopPropagation) {
					event.stopPropagation();
					event.preventDefault();
				} else {//IE
					event.cancelBubble = true;
					event.returnValue = false;
				}
				mapwork.utils.unbindEvent(document,'mousemove',draggingDiv);
				mapwork.utils.unbindEvent(document,'mouseup',droppedDiv);
				//如果已经被拖拽
				if(self._isDragged){
					var mapLocation = self._layer._map.getMapLocation();
					var edgeLen = mapLocation.getEdgeLen();
					
					var x = utils.getPageX(event);
					var y = utils.getPageY(event);
					
					var newGPosX = self._gPos.posX + (x - self._pressX) / edgeLen;
					var newGPosY = self._gPos.posY + (y - self._pressY) / edgeLen;
					var ePos = new mapwork.GlobalPos(newGPosX,newGPosY).convert2EarthPos();
					self.setEarthPos(ePos)
	//				if(self._layer._map.isTipDisplay()) {
	//					self._displayObject.doOpenTip();
	//				}
					self._htmlObjPos = [self._htmlObjPos[0] + x - self._pressX,self._htmlObjPos[1] + y - self._pressY];
	
					self._htmlObj.style.left = self._htmlObjPos[0] + "px";
					self._htmlObj.style.top = self._htmlObjPos[1] + "px";
					if(self._draggedFunc) {
						self._draggedFunc.call(self,ePos);
					}
				}
			}
			mapwork.utils.bindEvent(document,'mousemove', draggingDiv);
			mapwork.utils.bindEvent(document,'mouseup', droppedDiv);
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapDraggableIcon, EXTEND);
    }    
})();