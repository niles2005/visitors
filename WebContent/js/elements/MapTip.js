(function() {
    mapwork.MapTip = MapTip;

	var tipHtml = 
		'<div class="tips_jt" id="tips_jt"><img src="images/bg_tips_04.png" class="png"></div>' + 
				'<div class="tips_box">' + 
				'<div class="tips_top"></div>' + 
				'<div class="tips_close" id="tips_close"><img src="images/tips_close_02.gif"></div>' + 
				'<div class="tips_main">' + 
				'<div class="tips_content">' + 
				'</div>' + 
				'<div class="tips_tail">' +     
				'</div>' + 
				'</div>';

    var EXTEND = mapwork.MapElement;

    function MapTip(map) {
		if(EXTEND) {
			EXTEND.apply(this,arguments);
		}
		this._map = map;
        this._tipDiv = document.createElement("div");
        this._tipDiv.className = "tips_02";
        this._tipDiv.id = "tips_02";
        this._tipDiv.style.display = "none";
		
		this._htmlObj = this._tipDiv;
		
        mapwork.utils.bindEvent(this._tipDiv,"mousedown",function(event) {
            if(event.stopPropagation) {
                event.stopPropagation();
            } else {//IE
                event.cancelBubble = true;
            }
        });
    }

    MapTip.prototype = {
    	
    	//设置触发者
    	setTrigger: function(mapElement){
    		this._trigger = mapElement;
    	},
    	getTrigger: function(){
    		return this._trigger;
    	},
        open: function(ePos,name,contentDiv,tailDiv,offsetTop,closeCallback) {
        	
        	//先把tip设置为none
        	this._tipDiv.style.display = "none";
            if(!ePos) {
                return;
            }
			this._closeCallback = closeCallback;
            this._offsetTop = offsetTop;
            if(!this._offsetTop) {
                this._offsetTop = 0;
            }
            if(!this._isInit) {
                this.initTip();
            }
            if(!this._shadowIcon) {
                this.initShadow();
            }
            this._tipEPos = ePos;
            this._tipGPos = ePos.convert2GlobalPos();
            
            this._$TipTop.empty();
            if(name) {
                this._$TipTop.append(name);
            }
            
            this._$TipContent.empty();
            if(contentDiv) {
                this._$TipContent.append(contentDiv);
            }
            
            this._$TipTail.empty();
            if(tailDiv) {
                this._$TipTail.append(tailDiv);
            }
            
            this._tipDiv.style.display = "block";
            this.showShadow();
			this._layer.resetElement(this);
            
            this.fitWindow();
        },
        fitWindow: function() {
            
            var mapLocation = this._map.getMapLocation();
            var size = this._map.getSize();
            
            var mapBounds = mapLocation.getWindowPixelBounds();
            var tipPos = this.getTipPixelPos();
            var tipBounds = this.getTipBounds();
            if(mapBounds.containBounds(tipBounds)) {//in range ,not work
                
            } else {
                mapBounds.expandBy(200,200);
                if(mapBounds.containPoint(tipPos[0],tipPos[1])) {//in expand range,move to
                    var mapCenterX = mapBounds.getCenterX();
                    var mapCenterY = mapBounds.getCenterY();
                    
                    if(tipBounds.getHeight() > size.height / 2) {
                        tipPos[1] -= tipBounds.getHeight() - size.height / 2 + 5;
                    }
                    var offsetX = mapCenterX - tipPos[0];
                    var offsetY = mapCenterY - tipPos[1];

//                    var stepNum = Math.abs(offsetX);
//                    if(Math.abs(offsetY) > stepNum) {
//                        stepNum = Math.abs(offsetY);
//                    }
                    var stepNum = 50;
                    var stepX = offsetX / stepNum;
                    var stepY = offsetY / stepNum;
                    var layerContainer = this._map.getLayerContainer();
                    var index = 0;
                    function offset() {
                        layerContainer.movedMap(stepX,stepY);
                        index++;
                        if(index >= stepNum) {
                            if(interval) {
                                clearInterval(interval);
                                interval = null;
                            }
                        }
                    }
                    var interval = setInterval(offset, 1);
                    
                } else {//not in expand range,fly to
                    var flyToGPos = this._tipGPos;
                    if(tipBounds.getHeight() > size.height / 2) {
                        var gPosX = flyToGPos.getPosX();
                        var gPosY = flyToGPos.getPosY();
                        var edgeLen = mapLocation.getEdgeLen();
                        gPosY -= (tipBounds.getHeight() - size.height / 2 + 5) / edgeLen;
                        flyToGPos = new mapwork.GlobalPos(gPosX,gPosY);
                    }
                    this._map.movedToMapCenter(flyToGPos);
                }
            }
            
        },
        initShadow: function() {
            var id = "shadow";
            var iconUrl = "images/bg_tips_03.png";
            var hoverIconUrl = null;
            var iconOffset = [190,172 + this._offsetTop];//offset shadow with tip window
            this._shadowIcon = new mapwork.MapIcon(id, iconUrl,hoverIconUrl,iconOffset);

            this._mapShadowLayer = this._map.getLayer(mapwork.MapShadowLayer.ID);

            this._mapShadowLayer.addElement(this._shadowIcon);
        },
        showShadow: function() {
            if(this._tipEPos) {
                this._shadowIcon.setEarthPos(this._tipEPos);
                this._shadowIcon.show();
                this._mapShadowLayer.initLayer();
            }
        },
        initTip: function() {
            this._isInit = true;
            this._tipDiv.innerHTML = tipHtml;

            this._$TipTop = $(this._tipDiv).find(".tips_top");
            this._$TipContent = $(this._tipDiv).find(".tips_content");
            this._$TipTail = $(this._tipDiv).find(".tips_tail");
//            $("#tips_jt").get(0).ondragstart = function(event) {
//                    return false;
//            };
            var self = this;
            $("#tips_close").click(function(event) {
                self.doHide();
				if(self._closeCallback) {
					self._closeCallback.call();
				}
            });
        },
        getTipBounds: function() {
            var tipWidth = this._tipDiv.clientWidth;
            var tipHeight = this._tipDiv.clientHeight;

            var mapLocation = this._map.getMapLocation();
            var edgeLen = mapLocation.getEdgeLen();

            var tipPixelX = edgeLen * this._tipGPos.posX;
            var tipPixelY = edgeLen * this._tipGPos.posY;
            var x1 = tipPixelX - 182;
            var x2 = tipPixelX - 182 + tipWidth;
            var y1 = tipPixelY - tipHeight - this._offsetTop;
            var y2 = tipPixelY;
            return new mapwork.Bounds(x1,y1,x2,y2);
        },
        getTipPixelPos: function() {
            var mapLocation = this._map.getMapLocation();
            var edgeLen = mapLocation.getEdgeLen();

            var tipPixelX = edgeLen * this._tipGPos.posX;
            var tipPixelY = edgeLen * this._tipGPos.posY;
            return [tipPixelX,tipPixelY];
        },
        doHide: function() {
        	if(this._shadowIcon){
	            this._tipDiv.style.display = "none";
	            this._shadowIcon.hide();
        	}
        },
        isDisplay: function() {
            return this._tipDiv.style.display != "none";
        },
	    updateMapPos: function(size,edgeLen,mapCenterGPos,layerOffsetPos) {
			if(this._tipGPos) {
				var tipHeight = this._tipDiv.clientHeight;
				var px = size.width / 2 + edgeLen * (this._tipGPos.posX - mapCenterGPos.posX) - layerOffsetPos[0] - 182;
				var py = size.height / 2 + edgeLen * (this._tipGPos.posY - mapCenterGPos.posY) - layerOffsetPos[1] - tipHeight - this._offsetTop;

				this._tipDiv.style.left = px + "px";
				this._tipDiv.style.top = py + "px";
			}
		}
    }

    if(EXTEND) {
		mapwork.utils.inherits(MapTip, EXTEND);
    }    
})();