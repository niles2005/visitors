(function() {
    mapwork.MapSearchCircle = MapSearchCircle;

    var EXTEND = mapwork.MapCircle;

//support circle drag
//support circle change size
    function MapSearchCircle() {
		if(EXTEND) {
			EXTEND.apply(this,arguments);
		}
		if(mapwork.supportSVG) {//svg
			this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			this._svg.style.zIndex = 1;
			this._svg.style.position = "absolute";
			this._svg.setAttribute('version', '1.1');
			this._svg.setAttribute('type', 'system');
	//        this._svg.style["backgroundColor"] = "rgb(232, 140, 43)";

			this._svg.setAttribute('baseProfile', 'full');  
			this._svg.setAttribute('pointer-events', 'none');  

			this._htmlObj = this._svg;

			this._element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			this._element.setAttribute("stroke-width", 4.0);
			this._element.setAttribute("stroke-dasharray", "solid");
			this._element.setAttribute("stroke-linejoin", "round");
			this._element.setAttribute("stroke-linecap", "round");
			this._element.setAttribute("stroke", "#0099ff");
			this._element.setAttribute("fill", "red");
			this._element.setAttribute("pointer-events", "auto");
			this._element.setAttribute("stroke-opacity", 1.0);
			this._element.setAttribute("fill-opacity", 1.2);
			this._svg.appendChild(this._element);
			

		} else {//vml
			this._element = document.createElement("v:oval");
			this._element.style.zIndex = 1;
			this._element.style.position = "absolute";
//			this._element.style.top = "0px";
//			this._element.style.left = "0px";
//			this._element.style.width = "1000px";
//			this._element.style.height = "1000px";
			this._element.strokeWeight = "4px";
			this._element.strokeColor = "#0099ff";
			this._element.filled="true";
			this._element.fillColor ="red";
			this._elementStroke = document.createElement("v:stroke");
			this._elementStroke.endcap = "round";
			this._element.appendChild(this._elementStroke);
			this._elementFill = document.createElement("v:fill");
			this._elementFill.endcap = "round";
			this._element.appendChild(this._elementFill);
			this._htmlObj = this._element;			
		}		
		var self = this;
		mapwork.utils.bindEvent(this._element,"mousedown",function(event) {
			self.onMouseDown(event);
		});
		
    }

    MapSearchCircle.prototype = {
        updateMapPos: function(size,edgeLen,mapCenterGPos,layerOffsetPos) {
			var cx,cy,ex,ey,r;
			if(!this._gEdgePos) {
				var offsetLon = mapwork.MapRulerBuilder.getOffsetLon4RangeLength(this._eCenterPos,this._radius);
				if(offsetLon) {
					this._eEdgePos = new mapwork.EarthPos(this._eCenterPos.getILat(),this._eCenterPos.getILon() + offsetLon,true);
					this._gEdgePos = this._eEdgePos.convert2GlobalPos();
				}
			}
			if(!this._gEdgePos) {
				return;
			}
            var bounds = new mapwork.Bounds();
			
			cx = size.width / 2 + edgeLen * (this._gCenterPos.posX - mapCenterGPos.posX) - layerOffsetPos[0];
			cy = size.height / 2 + edgeLen * (this._gCenterPos.posY - mapCenterGPos.posY) - layerOffsetPos[1];

			ex = size.width / 2 + edgeLen * (this._gEdgePos.posX - mapCenterGPos.posX) - layerOffsetPos[0];
			ey = size.height / 2 + edgeLen * (this._gEdgePos.posY - mapCenterGPos.posY) - layerOffsetPos[1];
			r = Math.sqrt((cx - ex) * (cx - ex) + (cy - ey) * (cy - ey));
			
			if(mapwork.supportSVG) {//svg
				bounds.expandToIncludePoint(cx - r,cy - r);
				bounds.expandToIncludePoint(cx + r,cy + r);
				this._element.setAttribute("cx", cx);
				this._element.setAttribute("cy", cy);
				this._element.setAttribute("r", r);

				this._svg.style.left = (bounds.getMinX() - 20) + "px";
				this._svg.style.top = (bounds.getMinY() - 20) + "px";
				this._svg.style.width = (bounds.getWidth() + 40) + "px";
				this._svg.style.height = (bounds.getHeight() + 40) + "px";
				this._svg.setAttribute('viewBox',"" + (bounds.getMinX() - 20) + " " + (bounds.getMinY() - 20) + " " + (bounds.getWidth() + 40) + " " + (bounds.getHeight() + 40));
			} else {//vml
				this._element.style.left = (cx - r) + "px";
				this._element.style.top = (cy - r) + "px";
				this._element.style.width = (r * 2) + "px";
				this._element.style.height = (r * 2) + "px";
			}
        },
		
       onMouseDown: function(event) {
		   var map = this._layer.getMap();
		   map.setMode(2);
//            if(map.getMode() != 0) {
//                return;
//            }
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
            var self = this;
            var tx0= mapwork.utils.getPageX(event),
                ty0= mapwork.utils.getPageY(event);
			var bakCenterGPosX = self._gCenterPos.posX,
				bakCenterGPosY = self._gCenterPos.posY;
			var edgeLen = map.getMapLocation().getEdgeLen();
            var draggingDiv = function(event) {
                if(event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                } else {//IE
                    event.cancelBubble = true;
                    event.returnValue = false;
                }
                var tx = mapwork.utils.getPageX(event);
                var ty = mapwork.utils.getPageY(event);
				var newX = bakCenterGPosX + (tx - tx0) / edgeLen;
				var newY = bakCenterGPosY + (ty - ty0) / edgeLen;
				self.setCenterPos(new mapwork.GlobalPos(newX,newY));
				self.setEdgePos(null);
				self._layer.resetElement(self);
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
//                var tx = utils.getPageX(event);
//                var ty = utils.getPageY(event);
                map.setMode(0);
            }
            
            mapwork.utils.bindEvent(document,'mousemove', draggingDiv);
            mapwork.utils.bindEvent(document,'mouseup', droppedDiv);
        }
    }

    if(EXTEND) {
		mapwork.utils.inherits(MapSearchCircle, EXTEND);
    }    
})();