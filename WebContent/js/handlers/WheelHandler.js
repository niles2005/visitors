(function() {
    mapwork.WheelHandler = WheelHandler;
    WheelHandler.ID = "WheelHandler";
	
    var EXTEND = mapwork.Handler;

    function WheelHandler() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this.interval = 0;
        this._handlerId = WheelHandler.ID;
        if(mapwork.isIE) {
            this.interval = 200;
        }
		this._lastWheelTime = 0;
    }
    WheelHandler.prototype = {
        setMap: function(map) {
            this._map = map;
            var mouseScrollEvent = "mousewheel";
            if(mapwork.isFirefox) {
                mouseScrollEvent = "DOMMouseScroll";
            }
            map.addEventListener(mouseScrollEvent,this.onMouseWheel,this);
        },
        onMouseWheel: function(event) {
			var currWheelTime = new Date().getTime();
			if(Math.abs(currWheelTime - this._lastWheelTime) > 200) {
				this._lastWheelTime = currWheelTime;
			} else {
				return;
			}
           if(event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
            } else {//IE
                event.cancelBubble = true;
                event.returnValue = false;
            }
            var mapLocation = this._map.getMapLocation();
            var delta = 0;
            if(!event) {//For IE
                event = window.event;
            }
            if(event.wheelDelta == -120 || event.wheelDelta == 120) {//IE,Opera,Chrome
                delta = event.wheelDelta / 40;
                if (window.opera) {
                    delta = -delta;
                }
            } else if(event.detail) {//Mozilla
                delta = -event.detail;
            }
            var newZoom = mapLocation.getZoom();
            if(delta == -3) {
                    newZoom--;
                    this._isZoomUp = true;
            } else if(delta == 3) {
                    newZoom++;
                    this._isZoomUp = false;
            }
            if(!mapLocation.isValidZoom(newZoom)) {
                    return;
            }

            var mouseX,mouseY;
            if(mapwork.isIE) {
                mouseX = event.x;
                mouseY = event.y;
            } else {
                //对于chrome，如果直接在TileLayer上操作，可以使用event.offsetX/Y，代替鼠标指向的TileLayer窗口的相对位置。
                //一般对于滚轮事件，不移动鼠标，此鼠标位置值应该保持不变。
                //如果在TileLayer之上出现其他图层或者其他div，（popo图标等），此鼠标事件会产生针对此图层的相对位置。此时，就会出现错误。（因为需要
                //的是针对TileLayer的相对位置，而非其他DIV对象）
                //所以，此处，采用event.clientX - mapLocation._map._div.offsetLeft来取代offsetX。
                
//                mouseX = event.offsetX;
//                mouseY = event.offsetY;
//                if(mouseX == undefined) {
                    mouseX = event.clientX - mapLocation._map._div.offsetLeft;
                    mouseY = event.clientY - mapLocation._map._div.offsetTop;
//                }
            }

            if(this.interval) {
                var self = this;
                if(!this._timeoutId) {
                    this._timeoutId = window.setTimeout(
                        function(){
                            self.doWheel(mouseX,mouseY,mapLocation,newZoom);
    //                        this.wheelZoom(e);
                        },
                        this.interval
                    );
                }
            } else {
                this.doWheel(mouseX,mouseY,mapLocation,newZoom);
            }
        },
        doWheel: function(mouseX,mouseY,mapLocation,newZoom) {
            window.clearTimeout(this._timeoutId);
            this._timeoutId = null;
            this._wheelRectControl = this._map.getControl(mapwork.WheelRectControl.ID);
            if(this._wheelRectControl) {
                this._wheelRectControl.doWheelFocus(this._isZoomUp,mouseX,mouseY);
            }
//                    map.focusWave.doWheelFocus(isZoomUp,event.stageX,event.stageY);
            var wheelGPos = mapLocation.getGlobalPosFromMapPos(mouseX,mouseY);
//            var mapCenterGPos = mapLocation.getMapCenterGlobalPos();
            var newEdgeLen = Math.pow(2,8 + newZoom);
            var newGPosX = wheelGPos.posX + (this._map._size.width / 2 - mouseX) / newEdgeLen;
            var newGPosY = wheelGPos.posY + (this._map._size.height / 2 - mouseY) / newEdgeLen;
            this._map.zoomToMapCenter(new mapwork.GlobalPos(newGPosX,newGPosY),newZoom);
        }
    }
    
    if(EXTEND) {
        mapwork.utils.inherits(WheelHandler, EXTEND);
    }    
})();