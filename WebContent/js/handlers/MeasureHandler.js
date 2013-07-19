(function() {
    mapwork.MeasureHandler = MeasureHandler;
    var utils = mapwork.utils;

    MeasureHandler.ID = "MeasureHandler";
    var EXTEND = mapwork.Handler;

    function MeasureHandler() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._handlerId = MeasureHandler.ID;
    }

    MeasureHandler.prototype = {
        beginMeasure: function() {
            this._map._div.style.cursor = "crosshair";
            this._map.setMode(1);
        },
        stopMeasure: function() {
            this._map.setMode(0);
            this._map._div.style.cursor = "default";
            if(this._measureLine) {
                this._measureLine.doStop();
                this._measureLine = null;
                if(this._currMeasureLine) {
                    this._currMeasureLine.doRemove();
                    this._currMeasureLine = null;
                }
                utils.unbindEvent(document,'mousemove',this._onMouseMove);
            }
        },
        addMeasurePoint: function(event) {
            if(!event) {
                return;
            }
            var mapLocation = this._map.getMapLocation();
            var tx = mapLocation.getPageX(event);
            var ty = mapLocation.getPageY(event);
            var ePos = mapLocation.getEarthPosFromMapPos(tx,ty);
            if(!this._measureLine) {
                this._measureLine = new mapwork.MeasureLine(this._map);
                this._currMeasureLine = new mapwork.MeasureLine(this._map);
                this._currMeasureLine.setDash("5");
                
                utils.bindEvent(document,'mousemove', this._onMouseMove);
            }
            this._measureLine.addMeasurePos(ePos);
            //clear first
            this._currMeasureLine.clearPosList();
            this._currMeasureLine.addPos(ePos);
            
        },
        setMap: function(map) {
            this._map = map;
            map.addEventListener("mouseup", this.onMouseUp,this);
            map.addEventListener("dblclick", this.onDblClick,this);
            
            var self = this;
            function onMouseMove(event) {
                if(self._map.getMode() != 1) {
                    return;
                }
                if(event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                } else {//IE
                    event.cancelBubble = true;
                    event.returnValue = false;
                }
                var mapLocation = self._map.getMapLocation();
                var tx = mapLocation.getPageX(event);
                var ty = mapLocation.getPageY(event);
                var size = self._map.getSize();

                //do map moving when mouse is out of map bounds
                var offsetX = 0,offsetY = 0;
                if(tx < 0) {
                    offsetX = -1;
                } else if(tx >= size.width-10) {
                    offsetX = 1;
                }
                if(ty < 0) {
                    offsetY = -1;
                } else if(ty >= size.height - 10) {
                    offsetY = 1;
                }
                if(offsetX != 0 || offsetY != 0) {
                    self.startMoving(offsetX,offsetY);
                } else {
                    self.stopMoving();
                }
                
                var ePos = mapLocation.getEarthPosFromMapPos(tx,ty);
                var currMeasureLine = self._currMeasureLine;
                if(currMeasureLine) {
                    if(currMeasureLine.getPosCount() == 1) {
                        currMeasureLine.addPos(ePos);
                    } else {
                        currMeasureLine.changeLastPos(ePos);
                    }
                }
            }
            //bind to this,used for unbind event
            this._onMouseMove = onMouseMove;
        },
        onMouseUp: function(event) {
            if(this._map.getMode() != 1) {
                return;
            }
            if(event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
                if(event.button != 0) {//只能左键，屏蔽右键的拖动
                    if(event.button == 2) {//右键，stop
                        this.stopMeasure();
                    }
                    return;
                }
            } else {//IE
                event.cancelBubble = true;
                event.returnValue = false;
                if(event.button != 1) {//只能左键，屏蔽右键的拖动
                    if(event.button == 2) {//右键，stop
                        this.stopMeasure();
                    }
                    return false;
                }
            }
            this.addMeasurePoint(event);
        },
        onDblClick: function(event) {
            if(this._map.getMode() != 1) {
                return;
            }
            if(event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
                if(event.button != 0) {//只能左键，屏蔽右键的拖动
                    return;
                }
            } else {//IE
                event.cancelBubble = true;
                event.returnValue = false;
            }
            this._measureLine.removeLastPos();
            this.stopMeasure();
			return false;
        },
        startMoving: function(offsetX,offsetY) {
            var layerContainer = this._map.getLayerContainer();
            function offset() {
                layerContainer.movingMap(-offsetX * 2,-offsetY * 2);
            }
            if(!this._movingInterval) {
                this._movingInterval = setInterval(offset, 1);
            }
        },
        stopMoving: function() {
            if(this._movingInterval) {
                clearInterval(this._movingInterval);
                this._movingInterval = null;
            }
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(MeasureHandler, EXTEND);
    }    
})();