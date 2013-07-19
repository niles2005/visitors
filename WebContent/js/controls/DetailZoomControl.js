(function() {
    mapwork.DetailZoomControl = DetailZoomControl;
    
    DetailZoomControl.ID = "DetailZoomControl";
    var EXTEND = mapwork.Control;
    
    var ImgZoomRectEnable = "images/zoomrectenable.png";
    var ImgZoomRectDisable = "images/zoomrectdisable.png";
    
    var orientRects = {
        "up":[[27,8,43,22],[25,10,45,20],[23,12,47,18],[22,14,22,14],[22,14,49,16],[29,6,41,24],[31,4,39,25],[32,3,38,27],[33,2,37,28]],
        "left":[[9,26,23,42],[7,28,26,39],[5,30,28,37],[3,32,29,36],[11,24,21,44],[13,23,19,45],[14,21,18,47]],
        "right":[[46,27,62,40],[44,30,65,38],[42,31,67,36],[48,25,60,43],[50,23,59,45],[52,21,56,47]],
        "down":[[27,46,43,60],[24,48,46,58],[22,51,48,55],[29,44,42,62],[31,42,39,64],[33,40,37,66]]
    }
	var rulerButtonWidth = 32;
	var rulerButtonHeight = 23;
    
	var rulerWidth = 12;
	var rulerHeight = 146;
	var usedMinZoom = 7;
	var usedMaxZoom = 18;
	var usedZooms = usedMaxZoom - usedMinZoom + 2;//加上两端空白
	
	//displayZoomText:    false: 不显示标尺层级   true:显示标尺层级  缺省为true
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
		if(displayZoomText == undefined) {
			displayZoomText = true;
		}
		this._displayZoomText = displayZoomText === true;
    }
    
    DetailZoomControl.prototype = {
        setMap: function(map) {
            this._map = map;
            this._orientImage = this.createImage(this._div,"zoomorient","images/zoomorient.png",5,5,this.onClick);
//            this._zoomRectImg = this.createImage(this._div,"zoomrect",ImgZoomRectEnable,11,47,this.onClick);
            this._rulerButton = this.createImage(this._div,"zoomruler","images/zoomruler.png",35,77 + rulerButtonHeight - 2,this.onClick);
            this._rulerUpButton = this.createImage(this._div,"zoomrulerup","images/zoomrulerup.png",25,77,this.onClick);
            this._rulerDownButton = this.createImage(this._div,"zoomrulerdown","images/zoomrulerdown.png",25,77 + rulerButtonHeight + rulerHeight - 4,this.onClick);
            this._sliderButton = this.createImage(this._div,"zoomslider","images/zoomslider.png",25,75,this.onClick);
            if(this._displayZoomText) {
                this._zoomLabel = this.createAbsoluteSpan(this._div,"zoomLabel","10",55,105);
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
                    for(var k in orientRects) {
                        var item = orientRects[k];
                        if(item.length > 0) {
                            var isInRect = false;
                            for(var i=0;i<item.length;i++) {
                                var rect = item[i];
                                if(offsetX >= rect[0] && offsetX <= rect[2] && offsetY >= rect[1] && offsetY <= rect[3]) {
                                    isInRect = true;
                                    break;
                                }
                            }
                            if(isInRect) {
                                if(k === "up") {
                                    layerContainer.movedMap(0,200);
                                    return;
                                } else if(k === "left") {
                                    layerContainer.movedMap(200,0);
                                    return;
                                } else if(k === "right") {
                                    layerContainer.movedMap(-200,0);
                                    return;
                                } else if(k === "down") {
                                    layerContainer.movedMap(0,-200);
                                    return;
                                }
                            }
                        }
                    }
            } else if(target.name == "zoomruler") {
                if(event.stopImmediatePropagation) {
                    event.stopImmediatePropagation();
                } else {
                    event.cancelBubble = true;
                }
//                if(offsetY > 1 && offsetY < 14) {
//                        mapLocation.offsetZoom(1); 
//                } else if(offsetY > 204 && offsetY < 219) {
//                        mapLocation.offsetZoom(-1); 
//                } else 
                if(offsetY >= 0 && offsetY <= rulerHeight) {
                        this.setSliderPos(offsetY);
                }
            } else if(target.name == "zoomrulerup") {
                mapLocation.offsetZoom(1); 
            } else if(target.name == "zoomrulerdown") {
                mapLocation.offsetZoom(-1); 
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
            var thezoom = (yPos - 5) * usedZooms; 
            thezoom = thezoom / rulerHeight;
            var zoom = usedMaxZoom - parseInt(thezoom) ;
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
            var newY = (rulerHeight * (usedMaxZoom - zoom) / usedZooms + rulerTop + 5);
            if(this._displayZoomText) {
                this._zoomLabel.innerText = "" + zoom;
                this._zoomLabel.style.top = (newY - 2) + "px";
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

