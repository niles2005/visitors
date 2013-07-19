(function() {
    mapwork.MapCircle = MapCircle;

    var EXTEND = mapwork.MapElement;

    function MapCircle(id) {
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
        
		this._gCenterPos = null;
		this._eCenterPos = null;

		this._gEdgePos = null;
		this._eEdgePos = null;
		
		this._radius = 0;
    }

    MapCircle.prototype = {
		setZIndex: function(zIndex) {
			if(mapwork.supportSVG) {//svg
				this._svg.style.zIndex = zIndex;
			} else {
				this._element.style.zIndex = zIndex;
			}
		},
        setDash: function(dash) {
			if(mapwork.supportSVG) {//svg
				this._element.setAttribute("stroke-dasharray", dash);
			} else {
				this._elementStroke.dashstyle = "ShortDash";
			}
        },
        setWidth: function(width) {
			if(mapwork.supportSVG) {//svg
	            this._element.setAttribute("stroke-width", width);
			} else {
				this._element.strokeWeight = width + "px";
			}
        },
        setStrokeOpacity: function(opacity) {
			if(mapwork.supportSVG) {//svg
	            this._element.setAttribute("stroke-opacity", opacity);
			} else {
				this._elementStroke.opacity = opacity;
			}
        },
        setFillOpacity: function(opacity) {
			if(mapwork.supportSVG) {//svg
	            this._element.setAttribute("fill-opacity", opacity);
			} else {
				this._elementFill.opacity = opacity;
			}
        },
        setFillColor: function(color) {
			if(mapwork.supportSVG) {//svg
	            this._element.setAttribute("fill", color);
			} else {
				this._element.fill = color;
			}
        },
        setColor: function(color) {
			if(mapwork.supportSVG) {//svg
	            this._element.setAttribute("stroke", color);
			} else {
				this._element.strokeColor = color;
			}
        },
        setSVGAttr: function(key,value) {
            this._svg.setAttribute(key, value);
        },
        setSVGElementAttr: function(key,value) {
            this._element.setAttribute(key, value);
        },
        setCenterPos: function(pos) {
			if(!pos) {
				this._eCenterPos = null;
				this._gCenterPos = null;
			} else if(pos instanceof mapwork.EarthPos) {
				this._eCenterPos = pos;
				this._gCenterPos = pos.convert2GlobalPos();
            } else if(pos instanceof mapwork.GlobalPos) {
				this._gCenterPos = pos;
				this._eCenterPos = pos.convert2EarthPos();
            }
        },
        getECenterPos: function(){
        	return this._eCenterPos;
        },
        setEdgePos: function(pos) {
			if(!pos) {
				this._eEdgePos = null;
				this._gEdgePos = null;
			} else if(pos instanceof mapwork.EarthPos) {
				this._eEdgePos = pos;
				this._gEdgePos = pos.convert2GlobalPos();
            } else if(pos instanceof mapwork.GlobalPos) {
				this._gEdgePos = pos;
				this._eEdgePos = pos.convert2EarthPos();
			}
        },
        getEEdgePos: function(){
        	return this._eEdgePos;
        },
		setRadius: function(length) {//circle radius, unit:meter(米)
			this._gEdgePos = null;
			this._eEdgePos = null;
			this._radius = length;
		},
		getRadius: function(){
			return this._radius;
		},
		
        clearPos: function() {
			this._gCenterPos = null;
			this._eCenterPos = null;

			this._gEdgePos = null;
			this._eEdgePos = null;
        },
        getCanvas: function() {
            return this._svg;
        },
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
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapCircle, EXTEND);
    }    
})();