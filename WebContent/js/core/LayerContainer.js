(function() {
    mapwork.LayerContainer = LayerContainer;
    
    var EXTEND = mapwork.Layer;
    var utils = mapwork.utils;
    
    function LayerContainer(map) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._layerId = "LayerContainer";
        this._basePos = null;//Left up corner global pos
        this._initMapY = 0;
        this._layers = {};
        this._map = map;
        this._mapLocation = map.getMapLocation();
        this._div.style.position = "absolute";
        this._div.id = "layerContainer";
        this._layerOffsetPos = [0,0];
        this._div.style.left = this._layerOffsetPos[0] + "px";
        this._div.style.top = this._layerOffsetPos[1] + "px";
//        this._div.style["backgroundColor"] = "#f00";
		
		//此变量防止页面在没有resize前就做拖动，层级变换等操作
		this.initMapSize = false;

		this.initMapEvent();
        
		
		this.addLayer(new mapwork.TileLayer());
        this.addLayer(new mapwork.MapVectorLayer());
        this.addLayer(new mapwork.MapShadowLayer());
        this.addLayer(new mapwork.MapIconLayer());
        this.addLayer(new mapwork.MapLabelLayer());
        this.addLayer(new mapwork.MapPopLayer());
//        this.addLayer(new mapwork.MapTipLayer());
    }
        
    LayerContainer.prototype = {
        getLayerOffsetPos: function() {
            return this._layerOffsetPos;
        },
        initMapEvent: function() {
            this._map.addEventListener(mapwork.MapEvent.RESIZE,this.onMapResize,this);
            this._map.addEventListener(mapwork.MapEvent.MOVING,this.onMapMoving,this);
            this._map.addEventListener(mapwork.MapEvent.MOVE_END,this.onMapMoved,this);
            this._map.addEventListener(mapwork.MapEvent.ZOOM_END,this.onMapZoom,this);
        },
        onMapResize: function() {
            var k;
			this.initMapSize = true;
            var mapSize = this._map.getSize();
            var edgeLen = this._mapLocation.getEdgeLen();
            if(this._basePos == null) {
                for(k in this._layers) {
                    this._layers[k].initLayer();
                }
                var centerGPos = this._mapLocation.getMapCenterGlobalPos();
                this._basePos = [centerGPos.posX - 1.0 * mapSize.width / 2 /edgeLen, centerGPos.posY - 1.0 * mapSize.height / 2 /edgeLen];
            } else {
				var newGPosX = this._basePos[0] + (-this._layerOffsetPos[0] + mapSize.width / 2) / edgeLen;
				var newGPosY = this._basePos[1] + (-this._layerOffsetPos[1] + mapSize.height / 2 ) / edgeLen;
                this._mapLocation._movedToMapCenterGlobalPos(new mapwork.GlobalPos(newGPosX,newGPosY));
                for(k in this._layers) {
                    this._layers[k].resizeLayer();
                }
            }
        },
        onMapMoved: function() {
			if(!this.initMapSize) {
				return;
			}
            for(var k in this._layers) {
                this._layers[k].draggedLayer();
            }
        },
        onMapZoom: function() {
			if(!this.initMapSize) {
				return;
			}
            this._layerOffsetPos = [0,0];
            this._div.style.left = this._layerOffsetPos[0] + "px";
            this._div.style.top = this._layerOffsetPos[1] + "px";
            
            for(var k in this._layers) {
                this._layers[k].changedLayerZoom();
            }
            var mapCenterGPos = this._mapLocation.getMapCenterGlobalPos();
            var mapSize = this._map.getSize();
            var edgeLen = this._mapLocation.getEdgeLen();
            this._basePos = [mapCenterGPos.posX - 1.0 * mapSize.width / 2 /edgeLen, mapCenterGPos.posY - 1.0 * mapSize.height / 2 /edgeLen];
        },
        addLayer: function(layer) {
            if(layer && layer instanceof mapwork.Layer) {
                var layerId = layer.getLayerId();
                if(layerId) {
                    this._layers[layerId] = layer;
                    layer.setMap(this._map);
                    layer.setLayerContainer(this);
                    this._div.appendChild(layer.getDiv());
                }
            }
        },
        removeLayer: function(layer) {
            if(layer) {
                delete this._layers[layer.getLayerId()];
                this._div.removeChild(layer.getDiv());
            }
        },
        getLayer: function(layerId) {
            return this._layers[layerId];
        },
        getLayers: function() {
            return this._layers;
        },
        onMapMoving: function() {
            for(var k in this._layers) {
                this._layers[k].draggedLayer();
            }
        },
        
        movingToMapCenter: function(pos) {
            var gPos;
            if(pos instanceof mapwork.GlobalPos) {
                gPos = pos;
            } else if(pos instanceof mapwork.EarthPos) {
                gPos = pos.convert2GlobalPos();
            } else {//else if(pos instanceof String) {}
                return;
            }
            var mapLocation = this._map.getMapLocation(),
                edgeLen= mapLocation.getEdgeLen(),
				size = this._map.getSize();
				
            this._layerOffsetPos[0] = (this._basePos[0] - gPos.posX) * edgeLen + size.width / 2;
            this._layerOffsetPos[1] = (this._basePos[1] - gPos.posY) * edgeLen + size.height / 2;
            this._div.style.left = this._layerOffsetPos[0]+ "px";
            this._div.style.top = this._layerOffsetPos[1]+ "px";
            
            mapLocation._movingMapCenterGlobalPos(gPos);
        },
        movedToMapCenter: function(pos) {
            var gPos;
            if(pos instanceof mapwork.GlobalPos) {
                gPos = pos;
            } else if(pos instanceof mapwork.EarthPos) {
                gPos = pos.convert2GlobalPos();
            } else {//else if(pos instanceof String) {}
                return;
            }
                
            var mapLocation = this._map.getMapLocation(),
                edgeLen= mapLocation.getEdgeLen(),
				size = this._map.getSize();
            this._layerOffsetPos[0] = (this._basePos[0] - gPos.posX) * edgeLen + size.width / 2;
            this._layerOffsetPos[1] = (this._basePos[1] - gPos.posY) * edgeLen + size.height/ 2;
            this._div.style.left = this._layerOffsetPos[0]+ "px";
            this._div.style.top = this._layerOffsetPos[1]+ "px";
            
            mapLocation._movedToMapCenterGlobalPos(gPos);
        },
        movedMap: function(pixelX,pixelY) {
            var mapLocation = this._map.getMapLocation(),
                edgeLen= mapLocation.getEdgeLen(),
				size = this._map.getSize();
			this._layerOffsetPos[0] += pixelX;
			this._layerOffsetPos[1] += pixelY;
			
            this._div.style.left = this._layerOffsetPos[0] + "px";
            this._div.style.top = this._layerOffsetPos[1] + "px";
            var newGPosX = this._basePos[0] + (-this._layerOffsetPos[0] + size.width / 2) / edgeLen;
            var newGPosY = this._basePos[1] + (-this._layerOffsetPos[1] + size.height / 2 ) / edgeLen;
            mapLocation._movedToMapCenterGlobalPos(new mapwork.GlobalPos(newGPosX,newGPosY));
        },
        movingMap: function(pixelX,pixelY) {
            var mapLocation = this._map.getMapLocation(),
                edgeLen= mapLocation.getEdgeLen(),
				size = this._map.getSize();
			this._layerOffsetPos[0] += pixelX;
			this._layerOffsetPos[1] += pixelY;
            this._div.style.left = this._layerOffsetPos[0] + "px";
            this._div.style.top = this._layerOffsetPos[1] + "px";
            var newGPosX = this._basePos[0] + (-this._layerOffsetPos[0] + size.width / 2) / edgeLen;
            var newGPosY = this._basePos[1] + (-this._layerOffsetPos[1] + size.height / 2 ) / edgeLen;
            mapLocation._movingMapCenterGlobalPos(new mapwork.GlobalPos(newGPosX,newGPosY));
        },
        dragMap:function(newX,newY) {
            
            this._div.style.left = newX + "px";
            this._div.style.top = newY + "px";
            
            for(var k in this._layers) {
                this._layers[k].draggedLayer();
            }
        },
        onMouseDown: function(event,actionDiv) {
            if(this._map.getMode() != 0) {
                return;
            }
 			if(!this.initMapSize) {
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
                if(event.button != 1) {//只能左键，屏蔽右键的拖动
                    return;
                }
            }
            if(mapwork.DragRectControl.doDragRect) {
                var dragRectControl = this._map.getControl(mapwork.DragRectControl.ID);
                if(dragRectControl) {
                    dragRectControl.startDrag(event,this._mapLocation,actionDiv);
                }
                return;
            }
            var initDivX = this._layerOffsetPos[0];
            var initDivY = this._layerOffsetPos[1];
            var timeY = 0,timeZ = 0,draggingTimeOffset = 0;//last three event time,use to check mouse drag speed
            var timeYPosX = 0,timeYPosY = 0,timeZPosX = 0,timeZPosY = 0;
            var self = this;
            var pageX= utils.getPageX(event),
                pageY= utils.getPageY(event),
                tmpX,tmpY;
            var draggingDiv = function(event) {
                if(event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                } else {//IE
                    event.cancelBubble = true;
                    event.returnValue = false;
                }
                if(actionDiv) {
//                    actionDiv.style.cursor = "move";
                }
                var tx = utils.getPageX(event);
                var ty = utils.getPageY(event);
                timeZ = (new Date()).getTime();
                draggingTimeOffset = timeZ - timeY;
                timeY = timeZ;
                
                timeYPosX = timeZPosX;
                timeYPosY = timeZPosY;
                timeZPosX = tx;
                timeZPosY = ty;
                
                if(tmpX == tx && tmpY == ty) {
                    
                } else {
                    tmpX = tx;
                    tmpY = ty;
                    var xx = tx - pageX + initDivX - self._layerOffsetPos[0];
                    var yy = ty - pageY + initDivY - self._layerOffsetPos[1];
                    self.movingMap(xx,yy);
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
                if(actionDiv) {
//                    actionDiv.style.cursor = "default";
                }
                utils.unbindEvent(document,'mousemove',draggingDiv);
                utils.unbindEvent(document,'mouseup',droppedDiv);
                var tx = utils.getPageX(event);
                var ty = utils.getPageY(event);
                
                timeZ = (new Date()).getTime();
                draggingTimeOffset += timeZ - timeY;
                timeZPosX = tx;
                timeZPosY = ty;
                if(draggingTimeOffset > 0 && draggingTimeOffset < 20) {
                    self.doAfterDragMove((timeZPosX - timeYPosX),(timeZPosY - timeYPosY));
                } else {
                    var xx = tx - pageX + initDivX - self._layerOffsetPos[0];
                    var yy = ty - pageY + initDivY - self._layerOffsetPos[1];
                    self.movedMap(xx,yy);
                }
            }
            
            utils.bindEvent(document,'mousemove', draggingDiv);
            utils.bindEvent(document,'mouseup', droppedDiv);
        },
        doAfterDragMove: function(offsetPosX,offsetPosY) {
            var stepNum = 50;
            var stepX = offsetPosX * 5 / stepNum;
            var stepY = offsetPosY * 5 / stepNum;
            var index = 0;
            var self = this;
            function offset() {
                self.movingMap(stepX,stepY);
                index++;
                if(index >= stepNum) {
                    if(interval) {
                        clearInterval(interval);
                        interval = null;
                        self.movedMap(0,0);
                    }
                }
            }
            var interval = setInterval(offset, 1);
        }
    }
    
    if(EXTEND){
        mapwork.utils.inherits(LayerContainer, EXTEND);
    }
})();