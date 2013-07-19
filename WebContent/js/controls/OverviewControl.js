(function() {
    mapwork.OverviewControl = OverviewControl;
    OverviewControl.ID = "OverviewControl";

    var EXTEND = mapwork.Control;
    var utils = mapwork.utils;
    
    function OverviewControl(isOpen) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._width = 125;
        this._height = 125;
        this._controlId = OverviewControl.ID;
        this._div.style["zIndex"] = 9900;
        this._div.style.position = "absolute";
        this._div.style.border = "2px solid #84A9D2";
        this._div.style["backgroundColor"] = "#FFF";
        this._div.style.overflow = "hidden";
        this._div.style["-webkit-user-select"] = "none";
        this._div.style.right =  "0px";
        this._div.style.bottom = "0px";
    
        this._bgRect = new mapwork.MapShadowRect("MapShadowRect");
        
        if(isOpen) {
            this._isOpen = true;
        } else {
            this._isOpen = false;
        }
    }

    OverviewControl.prototype = {
        setMap: function(map) {
            this._map = map;
            this._mapLocation = map.getMapLocation();
            this.createOverviewMap();
            this.createToggleButton();
            
            this.resetBGMap();
            this.resetCurrectMapSizeRect();
            
            if(this._isOpen) {
                this._div.style.width = this._width + "px";
                this._div.style.height = this._height + "px";
                this._toggleImage.style.left = "0px";
                this._toggleImage.style.top = "0px";
            } else {
                this._div.style.width = "17px";
                this._div.style.height = "17px";
                this._toggleImage.style.left = "-19px";
                this._toggleImage.style.top = "0px";
            }
            
            utils.bindEvent(this._div,'mousedown',function(event) {
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
            });
			
			utils.bindEvent(this._div,'click',function(event) {			
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
            });
            
            this._mapScaleControl = this._map.getControl(mapwork.MapScaleControl.ID);
            this.setScaleControlOffset();
            this._map.addEventListener(mapwork.MapEvent.RESIZE,this.onMapResize,this);
            this._map.addEventListener(mapwork.MapEvent.MOVING,this.onMapMoving,this);
            this._map.addEventListener(mapwork.MapEvent.MOVE_END,this.onMapMoved,this);
            this._map.addEventListener(mapwork.MapEvent.ZOOM_END,this.onMapZoom,this);
        },
        createOverviewMap: function() {
            var self = this;
            this._oMap = new mapwork.Map(this._div,{
                zoom: self._mapLocation.getZoom() - 4
            });
            this._oMapLocation = this._oMap.getMapLocation();
            this._oMapLocation._minZoom -= 4;
            var tileLayer = new mapwork.TileLayer("tileLayer");
            this._oMap.addLayer(tileLayer);
            this._layerContainer = this._oMap.getLayerContainer();
//            this._oMap.addControl(new mapwork.CenterCrossControl());

            this._shadowLayer = this._layerContainer.getLayer(mapwork.MapShadowLayer.ID);

            this._shadowLayer.addElement(this._bgRect);
            
            if(mapwork.isIE) {
                this._bgRect.setStyle({
                    "position":"absolute",
                    "border":"1px solid #f00",
                    "backgroundColor":"#f00",
                    "filter":"alpha(opacity=40)"
                });
            } else {
                this._bgRect.setStyle({
                    "position":"absolute",
                    "border":"1px solid #f00",
                    "backgroundColor":"#f00",
                    "opacity": 0.4
                });
            }

            this._rectFGDiv = document.createElement("div");
            this._rectFGDiv.style.position = "absolute";
            this._rectFGDiv.style.border = "2px solid #000";
            this._rectFGDiv.style.zIndex = 10000;

            var contentDiv = document.createElement("div");
            contentDiv.style.position = "absolute";
            contentDiv.style.backgroundColor = "#fff";
            
            contentDiv.style.opacity = 0.01;
            this._rectFGDiv.appendChild(contentDiv);
            
            this._div.appendChild(this._rectFGDiv);
            
            var self = this;
            utils.bindEvent(this._rectFGDiv,'mousedown',function(event) {
                self.onMouseDown.call(self,event);
            });
        },     
        createToggleButton: function() {
            var toggleDiv = document.createElement("div");
            toggleDiv.style.position = "absolute";
            toggleDiv.style.width = "19px";
            toggleDiv.style.height = "19px";
            toggleDiv.style.right = "-1px";
            toggleDiv.style.bottom = "-1px";
            toggleDiv.style.overflow = "hidden";
            toggleDiv.style.zIndex = 10000;
            this._div.appendChild(toggleDiv);
            this._toggleImage = document.createElement("img");
            toggleDiv.appendChild(this._toggleImage);
            this._toggleImage.style.left = "0px";
            this._toggleImage.style.top = "0px";
            this._toggleImage.src = "images/eagleeyerect.png";
            this._toggleImage.style.position = "absolute";
            var self = this;

            utils.bindEvent(toggleDiv,'mouseup',function(event) {
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
                self.doToggle();
            });
        },
        
        getDivBounds: function() {
            var $Div = $(this._div);
            var offset = $Div.offset();
            var width = $Div.width();
            var height = $Div.height();
            return new mapwork.Bounds(offset.left,offset.top,offset.left + width,offset.top + height);
        },
        getFGRectBounds: function() {
            var jFGRect = $(this._rectFGDiv);
            var offset = jFGRect.offset();
            var width = jFGRect.width();
            var height = jFGRect.height();
            return new mapwork.Bounds(offset.left,offset.top,offset.left + width,offset.top + height);
        },
        getFGRectCenterGPos: function(divBounds,fgRectBounds) {
            var mapOffsetX = fgRectBounds.getCenterX() -  divBounds.getMinX();
            var mapOffsetY = fgRectBounds.getCenterY() -  divBounds.getMinY();
            var fgRectGPos = this._oMapLocation.getGlobalPosFromMapPos(mapOffsetX,mapOffsetY);
            return fgRectGPos;
        },
        setScaleControlOffset: function() {
            if(this._isOpen) {
                if(this._mapScaleControl) {
                    this._mapScaleControl.setRightLength(130);
                }
            } else {
                if(this._mapScaleControl) {
                    this._mapScaleControl.setRightLength(20);
                }
            }
        },
        doToggle: function() {
            if(this._isOpen) {
                this._isOpen = !this._isOpen;
                this._toggleImage.style.left = "-19px";
                this._toggleImage.style.top = "0px";
                this._div.style.width = "17px";
                this._div.style.height = "17px";
            } else {
                this._isOpen = !this._isOpen;

                //reset current map pos and zoom
                var mapCenterGPos = this._mapLocation.getMapCenterGlobalPos();
                var zoom = this._mapLocation.getZoom() - 4;
                this._oMap.zoomToMapCenter(mapCenterGPos,zoom);
                
                var mapLTGPos = this._mapLocation.getWindowLeftTopGlobalPos();
                var mapRBGPos = this._mapLocation.getWindowRightBottomGlobalPos();
                this._bgRect.setLeftTopGlobalPos(mapLTGPos);
                this._bgRect.setRightBottomGlobalPos(mapRBGPos);

                this._toggleImage.style.left = "0px";
                this._toggleImage.style.top = "0px";
                this._div.style.width = this._width + "px";
                this._div.style.height = this._height + "px";
                this._shadowLayer.initLayer();
                this.resetCurrectMapSizeRect();
            }
            this.setScaleControlOffset();
        },
        resetBGMap: function() {
            var mapLocation  = this._map.getMapLocation();
            var mapLTGPos = mapLocation.getWindowLeftTopGlobalPos();
            var mapRBGPos = mapLocation.getWindowRightBottomGlobalPos();
            this._bgRect.setLeftTopGlobalPos(mapLTGPos);
            this._bgRect.setRightBottomGlobalPos(mapRBGPos);
            this._shadowLayer.initLayer();
        },
        resetCurrectMapSizeRect: function(offsetX,offsetY) {
            if(!offsetX) {
                offsetX = 0;
            }
            if(!offsetY) {
                offsetY = 0;
            }
            var mapSize = this._map.getSize();
            var rectWidth = mapSize.width / 16;
            var rectHeight = mapSize.height / 16;
            this._rectFGDiv.style.width = rectWidth + "px";
            this._rectFGDiv.style.height = rectHeight + "px";
            this._rectFGDiv.style.left = (this._width / 2 - rectWidth / 2 + offsetX) + "px";
            this._rectFGDiv.style.top = (this._height / 2 - rectHeight / 2 + offsetY) + "px";
        },
        onMapMoving: function() {
            if(!this._isOpen) {
                return;
            }
            var mapLocation = this._map.getMapLocation();
            var mapCenterGPos = mapLocation.getMapCenterGlobalPos();
            this._oMap.movingToMapCenter(mapCenterGPos);
        },
        onMapMoved: function() {
            var mapLocation = this._map.getMapLocation();
            var mapCenterGPos = mapLocation.getMapCenterGlobalPos();

            this._oMap.movedToMapCenter(mapCenterGPos);
            this.resetBGMap();
            this.resetCurrectMapSizeRect();
        },
        onMapResize: function() {
            this._oMap.resetSize({"width":this._width,"height":this._height});
            if(!this._isOpen) {
                return;
            }
            this.resetBGMap();
            this.resetCurrectMapSizeRect();
        },
        onMapZoom: function() {
            if(!this._isOpen) {
                return;
            }
            var mapLocation = this._map.getMapLocation();
            var mapCenterGPos = mapLocation.getMapCenterGlobalPos();
            var zoom = mapLocation.getZoom() - 4;
            this._oMap.zoomToMapCenter(mapCenterGPos,zoom);
            this.resetBGMap();
            this.resetCurrectMapSizeRect();
        },
        doMoving: function(offsetX,offsetY) {
            this._movingOffsetX = offsetX;
            this._movingOffsetY = offsetY;
            var self = this;
            function offset() {
                self._layerContainer.movingMap(-self._movingOffsetX,-self._movingOffsetY);
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
        },
        onMouseDown: function(event) {
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
            var pageX= utils.getPageX(event),
                pageY= utils.getPageY(event);
            var self = this;
            var draggingDiv = function(event) {
                if(event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                } else {//IE
                    event.cancelBubble = true;
                    event.returnValue = false;
                }
                var tx = utils.getPageX(event);
                var ty = utils.getPageY(event);
                
                self.resetCurrectMapSizeRect(tx - pageX,ty - pageY);
                var divBounds = self.getDivBounds();
                var fgBounds = self.getFGRectBounds();
                if(!divBounds.containBounds(fgBounds)) {
                    var offsetX = 0,offsetY = 0;
                    if(fgBounds.getMinX() < divBounds.getMinX()) {
                        offsetX = -1;
                    } else if(fgBounds.getMaxX() > divBounds.getMaxX()) {
                        offsetX = 1;
                    }
                    if(fgBounds.getMinY() < divBounds.getMinY()) {
                        offsetY = -1;
                    } else if(fgBounds.getMaxY() > divBounds.getMaxY()) {
                        offsetY = 1;
                    }
                    if(offsetX != 0 || offsetY != 0) {
                        self.doMoving(offsetX,offsetY);
                    } else {
                        self.stopMoving();
                    }
                } else {
                    self.stopMoving();
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
                utils.unbindEvent(document,'mousemove',draggingDiv);
                utils.unbindEvent(document,'mouseup',droppedDiv);
                
                var divBounds = self.getDivBounds();
                var bgBounds = self._bgRect.getPixelBounds();
                var fgBounds = self.getFGRectBounds();     
                var fgRectCenterGPos = self.getFGRectCenterGPos(divBounds,fgBounds);
                if(divBounds.containBounds(fgBounds)) {
                    if(bgBounds.intersectBounds(fgBounds)) {
                        self._map.slidingToMapCenter(fgRectCenterGPos,function() {
                            self.resetCurrectMapSizeRect();
                        });
                    } else {
                        self._map.movedToMapCenter(fgRectCenterGPos);
                        self.resetCurrectMapSizeRect();
                    }
                } else {
                    self.stopMoving();                    
                    self._map.movedToMapCenter(fgRectCenterGPos);
                    self.resetCurrectMapSizeRect();
                }
            }
            utils.bindEvent(document,'mousemove', draggingDiv);
            utils.bindEvent(document,'mouseup', droppedDiv);
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(OverviewControl, EXTEND);
    }    
})();