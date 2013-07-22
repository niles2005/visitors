(function() {
    mapwork.Map = Map;
    var utils = mapwork.utils;
    var EXTEND = null;

    function Map(wrapDiv, options) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._div = document.createElement("div");
        this._controlsDiv = document.createElement("div");
        this._controlsDiv.style.zIndex = 10000;
        this._div.className = "mapcontainer";
        utils.extend(this, options);


        this._div.style.width = "100%";
        this._div.style.height = "100%";
        this._div.style.position = "relative";
        this._div.style.cursor = "default";
        this._div.style.overflow = "hidden";

        if (wrapDiv) {
            if (typeof wrapDiv === 'string') {
                wrapDiv = document.getElementById(wrapDiv);
                if (wrapDiv) {
                    wrapDiv.appendChild(this._div);
                }
            } else {
                wrapDiv.appendChild(this._div);
            }
        }

        this._mapPos = {"x": 0, "y": 0};
        this._size = {"width": 0, "height": 0};

        this._modules = {};

        this._mapLocation = new mapwork.MapLocation(this, this.lat, this.lon, this.zoom);
        this._controls = {};
        this._layerContainer = new mapwork.LayerContainer(this);
        this._div.appendChild(this._layerContainer._div);
        this._div.appendChild(this._controlsDiv);
        this._handlers = {};
        this._mode = 0;//normal:0,meagure:1
        this._menu = new mapwork.Menu(this);
        var mapTipLayer = this._layerContainer.getLayer(mapwork.MapTipLayer.ID);
        if (mapTipLayer) {
            this._tip = new mapwork.MapTip(this);
            mapTipLayer.addElement(this._tip);
        }
    }

    Map.prototype = {
        setMode: function(mode) {
            this._mode = mode;
        },
        getMode: function() {
            return this._mode;
        },
        destroy: function() {
            if (this._controls) {
                for (var i = this._controls.length; i >= 0; i--) {
                    this._controls[i].destroy();
                }
                this._controls = null;
            }
        },
        resetSize: function(size) {
            if (size) {
                this._size.width = size.width;
                this._size.height = size.height;
            } else {
                this._size.width = this._div.clientWidth;
                this._size.height = this._div.clientHeight;
            }
            this.fireEvent(mapwork.MapEvent.RESIZE, this);
        },
        addLayer: function(layer) {
            this._layerContainer.addLayer(layer);
        },
        getLayerContainer: function() {
            return this._layerContainer;
        },
        getLayer: function(layerId) {
            return this._layerContainer.getLayer(layerId);
        },
        removeLayer: function(layer) {
            this._layerContainer.removeLayer(layer);
        },
        addControl: function(control) {
            if (control instanceof mapwork.Control) {
                var controlId = control.getControlId();
                if (controlId) {
                    this._controls[controlId] = control;
                    control.setMap(this);
                    control.appendToDiv(this._controlsDiv);
                }
            }
        },
        getControl: function(controlId) {
            return this._controls[controlId];
        },
        addHandler: function(handler) {
            if (handler instanceof mapwork.Handler) {
                var handlerId = handler.getHandlerId();
                if (handlerId) {
                    this._handlers[handlerId] = handler;
                    handler.setMap(this);
                }
            }
        },
        getHandler: function(handlerId) {
            return this._handlers[handlerId];
        },
        getSize: function() {
            return this._size;
        },
        getMapPos: function() {
            return this._mapPos;
        },
        getMenu: function() {
            return this._menu;
        },
        getMapLocation: function() {
            return this._mapLocation;
        },
        addEventListener: function(eventType, listener, caller, params) {
            if (eventType.startsWith("mapwork.")) {//MapEvent
                this.addListener(eventType, function() {
                    listener.call(caller, params);
                });
            } else {//DefaultEvent:  MouseEvent,KeyEvent...
                utils.bindEvent(this._div, eventType, function(event) {
                    listener.call(caller, event, params);
                });
            }
        },
        openTip: function(ePos, name, appendDiv, tailDiv, offsetTop, closeCallback) {
            if (this._tip) {
                this._tip.open(ePos, name, appendDiv, tailDiv, offsetTop, closeCallback);
            }
        },
        hideTip: function() {
            if (this._tip) {
                this._tip.doHide();
            }
        },
        isTipDisplay: function() {
            if (this._tip) {
                return this._tip.isDisplay();
            }
            return false;
        },
        movedToMapCenter: function(pos) {
            this._layerContainer.movedToMapCenter(pos);
        },
        movingToMapCenter: function(pos) {
            this._layerContainer.movingToMapCenter(pos);
        },
        zoomToMapCenter: function(pos, zoom) {
            if (this._mapLocation.getZoom() === zoom) {//如果层级未改变，只需发移动事件，否则对TileLayer有影响
                this._layerContainer.movedToMapCenter(pos);
            } else {
                this._mapLocation._zoomToMapCenter(pos, zoom);
            }
        },
        slidingToMapCenter: function(pos, listener, stepNum) {
            var gPos;
            if (pos instanceof mapwork.GlobalPos) {
                gPos = pos;
            } else if (pos instanceof mapwork.EarthPos) {
                gPos = pos.convert2GlobalPos();
            } else {//else if(pos instanceof String) {}
                return;
            }
            var edgeLen = this._mapLocation.getEdgeLen();
            var mapCenterGPos = this._mapLocation.getMapCenterGlobalPos();
            var offsetX = (mapCenterGPos.posX - gPos.posX) * edgeLen;
            var offsetY = (mapCenterGPos.posY - gPos.posY) * edgeLen;
            if (!stepNum) {
                stepNum = 50;
            }
            var stepX = offsetX / stepNum;
            var stepY = offsetY / stepNum;
            var layerContainer = this._layerContainer;
            var index = 0;
            function offset() {
                layerContainer.movedMap(stepX, stepY);
                index++;
                if (index >= stepNum) {
                    if (interval) {
                        clearInterval(interval);
                        interval = null;
                        if (listener) {
                            listener.call();
                        }
                    }
                }
            }
            var interval = setInterval(offset, 1);
        },
        fitBounds: function(bounds) {
            if (bounds.isNull()) {
                return;
            }
            var width = this._size.width;
            var height = this._size.height;
            if (width > 0 && height > 0) {
                var centerGPosX = (bounds.getMinX() + bounds.getMaxX()) / 2;
                var centerGPosY = (bounds.getMinY() + bounds.getMaxY()) / 2;
                var widthEdgeLen = width / bounds.getWidth();
                var heightEdgeLen = height / bounds.getHeight();
                var minEdgeLen = widthEdgeLen;
                if (heightEdgeLen < minEdgeLen) {
                    minEdgeLen = heightEdgeLen;
                }
                var fitZoom = mapwork.utils.getFitZoom(minEdgeLen);
                this.zoomToMapCenter(new mapwork.GlobalPos(centerGPosX, centerGPosY), fitZoom);
            }
        },
        addModule: function(module) {
            if (module instanceof mapwork.Module) {
                var moduleId = module.getModuleId();
                if (moduleId) {
                    this._modules[moduleId] = module;
                    module.setMap(this);
                }
            }
        },
        getModule: function(moduleId) {
            var module = this._modules[moduleId];
            if (!module) {
                return this._modules[mapwork.UserItem.ID];
            }
            return module;
        },
        openModule: function(moduleId) {
            if (!this._modules[moduleId]) {
                return;
            }
            var module = this._modules[moduleId];
            module.init();
            module.doListQuery();
            module.doPageQuery();
            this._currentModule = module;
        }
    }

    if (EXTEND) {
        mapwork.utils.inherits(Map, EXTEND);
    }
    mapwork.utils.extend(Map.prototype, mapwork.eventBase);
})();