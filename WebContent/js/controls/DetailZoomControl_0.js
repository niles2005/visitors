(function() {
    mapwork.DetailZoomControl = DetailZoomControl;
    
    DetailZoomControl.ID = "DetailZoomControl";
    var EXTEND = mapwork.Control;
    
    var ImgZoomRectEnable = "images/zoomrectenable.png";
    var ImgZoomRectDisable = "images/zoomrectdisable.png";
    
    function DetailZoomControl(displayZoomText) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._controlId = DetailZoomControl.ID;
        this._div.style["zIndex"] = 1002;
        this._div.style.position = "absolute";
        this._div.style.top = "10px";
        this._div.style.left = "10px";
        this._div.style.width = "50px";
        this._div.style.height = "300px";
        this._div.style["-moz-user-select"] = "none";
        this._div.style["-webkit-user-select"] = "none";    
        this._displayZoomText = displayZoomText || true;
    }
    
    DetailZoomControl.prototype = {
        setMap: function(map) {
            this._map = map;
            this.createImage(this._div,"zoomorient","images/zoomorient.png",0,0,this.onClick);
            this._zoomRectImg = this.createImage(this._div,"zoomrect",ImgZoomRectEnable,11,47,this.onClick);
            this._rulerButton = this.createImage(this._div,"zoomruler","images/zoomruler.png",12,77,this.onClick);
            this._sliderButton = this.createImage(this._div,"zoomslider","images/zoomslider.png",15,75,this.onClick);
            if(this._displayZoomText) {
                this._zoomLabel = this.createAbsoluteSpan(this._div,"zoomLabel","10",35,100);
                this._zoomLabel.style.font = "normal 12px Verdana";
                this._zoomLabel.style.color = "#646464";
            }
            
            this._map.addEventListener(mapwork.MapEvent.ZOOM_END, this.onMapZoom,this);
            this._map.addEventListener(mapwork.MapEvent.DRAGSTATUS_CHANGE, this.changeDragStatus,this);
            this.resetSlider();
        },
        onClick: function(event) {
            if(event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
            } else {//IE
                event.cancelBubble = true;
                event.returnValue = false;
            }
            var target = event.target;
            if(!target) {
                target = event.srcElement;
            }
            var offsetX = event.offsetX;
            var offsetY = event.offsetY;
            if(offsetX == undefined || offsetY == undefined) {
                var offset = mapwork.utils.getOffset(event);
                offsetX = offset.offsetX;
                offsetY = offset.offsetY;
            }
            var mapLocation = this._map.getMapLocation();
            if(target.name == "zoomorient") {
                    if(event.stopImmediatePropagation) {
                        event.stopImmediatePropagation();
                    } else {
                        event.cancelBubble = true;
                    }
                    var layerContainer = this._map.getLayerContainer();
                    if(offsetX > 18 && offsetX < 29) {
                            if(offsetY > 4 && offsetY < 17) {//north
                                    layerContainer.movedMap(0,200);
                                    return;
                            } else if(offsetY > 28 && offsetY < 48) {//south
                                    layerContainer.movedMap(0,-200);
                                    return;
                            }
                    } else if(offsetX > 3 && offsetX <= 17) {
                            if(offsetY > 18 && offsetY < 29) {//west
                                    layerContainer.movedMap(200,0);
                                    return;
                            }
                    } else if(offsetX > 30 && offsetX <= 44) {
                            if(offsetY > 18 && offsetY < 29) {//east
                                layerContainer.movedMap(-200,0);
                                    return;
                            }
                    }

                    if(offsetX >= 11 && offsetX <= 17) {
                            if(offsetY >= 11 && offsetY <= 17) {//northWest
                                    layerContainer.movedMap(150,150);
                                    return;
                            } else if(offsetY >= 30 && offsetY <= 36) {//southWest
                                    layerContainer.movedMap(150,-150);
                                    return;
                            }
                    } else if(offsetX >= 30 && offsetX <= 36) {
                            if(offsetY >= 11 && offsetY <= 17) {//northEast
                                    layerContainer.movedMap(-150,150);
                                    return;
                            } else if(offsetY >= 30 && offsetY <= 36) {//southEast
                                    layerContainer.movedMap(-150,-150);
                                    return;
                            }
                    }
            } else if(target.name == "zoomruler") {
                if(event.stopImmediatePropagation) {
                    event.stopImmediatePropagation();
                } else {
                    event.cancelBubble = true;
                }
                if(offsetY > 1 && offsetY < 14) {
                        mapLocation.offsetZoom(1); 
                } else if(offsetY > 204 && offsetY < 219) {
                        mapLocation.offsetZoom(-1); 
                } else if(offsetY >= 15 && offsetY <= 203) {
                        this.setSliderPos(offsetY);
                }
            } else if(target.name == "zoomslider") {
            } else if(target.name == "zoomrect") {
                mapwork.DragRectControl.doDragRect = !mapwork.DragRectControl.doDragRect;
                this.changeDragStatus();
            } else if(target.name == "center") {

            }
        },
        onMapZoom: function(event) {
            this.resetSlider();	
        },
        setSliderPos: function(yPos) {
            var thezoom = (yPos - 15) * 19; 
            thezoom = thezoom / 181;
            var zoom = 19 - parseInt(thezoom + 0.3) ;
            var oldZoom = this._map.getMapLocation().getZoom();
            if(zoom != oldZoom) {
                    this._map.getMapLocation().setZoom(zoom);
            }
        },
        resetSlider: function() {
            var zoom = this._map.getMapLocation().getZoom();
            if(!zoom) {
                if(zoom !== 0) {
                    return;
                }
            }
            var rulerTop = mapwork.utils.getStyleTop(this._rulerButton);
            var newY = (181 * (19 - zoom) / 19 + rulerTop + 15);
            if(this._displayZoomText) {
                this._zoomLabel.innerText = "" + zoom;
                this._zoomLabel.style.top = (newY - 4) + "px";
            }
            if(zoom >= 18) {
                newY -= 1;
            }
            this._sliderButton.style.top = newY + "px";
        },
        changeDragStatus: function() {
            if(mapwork.DragRectControl.doDragRect) {
                this._zoomRectImg.src = ImgZoomRectDisable;
            } else {
                this._zoomRectImg.src = ImgZoomRectEnable;
            }
        }
        
    }
    
    if(EXTEND){
        mapwork.utils.inherits(DetailZoomControl, EXTEND);
    }
    
})();

