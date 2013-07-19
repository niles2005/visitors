(function() {
    mapwork.MapPath = MapPath;

    var EXTEND = mapwork.MapElement;
	
    function MapPath(id) {
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

			this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
			this._element.setAttribute("stroke-width", 4.0);
			this._element.setAttribute("stroke-dasharray", "solid");
			this._element.setAttribute("stroke-linejoin", "round");
			this._element.setAttribute("stroke-linecap", "round");
			this._element.setAttribute("stroke", "#0099ff");
			this._element.setAttribute("fill", "none");
			this._element.setAttribute("pointer-events", "auto");
			this._element.setAttribute("stroke-opacity", "1.0");
			this._svg.appendChild(this._element);
			

		} else {//vml
			this._element = document.createElement("v:shape");
			this._element.style.zIndex = 1;
			this._element.style.position = "absolute";
			this._element.style.top = "0px";
			this._element.style.left = "0px";
			this._element.style.width = "1000px";
			this._element.style.height = "1000px";
			this._element.strokeWeight = "4px";
			this._element.strokeColor = "#0099ff";
			this._element.filled="false";
			this._elementStroke = document.createElement("v:stroke");
			this._elementStroke.endcap = "round";
			this._element.appendChild(this._elementStroke);
//			this._svg.appendChild(this._element);
			this._htmlObj = this._element;			
		}
        
        this._ePosList = [];
        this._gPosList = [];
    }

    MapPath.prototype = {
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
        setOpacity: function(opacity) {
			if(mapwork.supportSVG) {//svg
	            this._element.setAttribute("stroke-opacity", opacity);
			} else {
				this._elementStroke.opacity = opacity;
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
        addPos: function(pos) {
            if(pos instanceof mapwork.EarthPos) {
                this._ePosList.push(pos);
                this._gPosList.push(pos.convert2GlobalPos());
            } else if(pos instanceof mapwork.GlobalPos) {
                this._gPosList.push(pos);
                this._ePosList.push(pos.convert2EarthPos());
            }
        },
        setEPosArray: function(ePosArray) {
			this._ePosList = [];
			this._gPosList = [];
            this._ePosList = ePosArray;
			for(var k in ePosArray) {
				var ePos = ePosArray[k];
				this._gPosList.push(ePos.convert2GlobalPos());
			}
        },
        setGPosArray: function(gPosArray) {
			this._ePosList = [];
			this._gPosList = [];
            this._gPosList = gPosArray;
			for(var k in gPosArray) {
				var gPos = gPosArray[k];
				this._ePosList.push(gPos.convert2EarthPos());
			}
        },
        clearPosList: function() {
            this._ePosList = [];
            this._gPosList = [];
        },
        getPosCount: function() {
            return this._ePosList.length;
        },
        changeLastPos: function(pos) {
            if(this._ePosList.length > 0) {
                this._gPosList.pop();
                if(pos instanceof mapwork.EarthPos) {
                    this._ePosList.push(pos);
                    this._gPosList.push(pos.convert2GlobalPos());
                } else if(pos instanceof mapwork.GlobalPos) {
                    this._gPosList.push(pos);
                    this._ePosList.push(pos.convert2EarthPos());
                }
            }
        },
        getCanvas: function() {
            return this._svg;
        },
        updateMapPos: function(size,edgeLen,mapCenterGPos,layerOffsetPos) {
			var ss,k,px,py,gPos;
			
            var bounds = new mapwork.Bounds();
			
			if(mapwork.supportSVG) {//svg
				ss = "M";
//				ss += "500 500 A500 500 0 1 1 500 501z";
				for(k in this._gPosList) {
					gPos = this._gPosList[k];
					px = size.width / 2 + edgeLen * (gPos.posX - mapCenterGPos.posX) - layerOffsetPos[0];
					py = size.height / 2 + edgeLen * (gPos.posY - mapCenterGPos.posY) - layerOffsetPos[1];
					bounds.expandToIncludePoint(px,py);
					if(k > 0) {
						ss += " ";
					}
					ss += px + "," + py;
				}
				this._svg.style.left = (bounds.getMinX() - 20) + "px";
				this._svg.style.top = (bounds.getMinY() - 20) + "px";
				this._svg.style.width = (bounds.getWidth() + 40) + "px";
				this._svg.style.height = (bounds.getHeight() + 40) + "px";
				this._svg.setAttribute('viewBox',"" + (bounds.getMinX() - 20) + " " + (bounds.getMinY() - 20) + " " + (bounds.getWidth() + 40) + " " + (bounds.getHeight() + 40));

				if(ss.length <= 1) {
					ss += "0,0";
				}
				this._element.setAttribute("d", ss);
			} else {//vml
				ss = "";
                for(i=0;i<this._gPosList.length;i++) {
                    gPos = this._gPosList[i];
                    px = Math.round(1.0 * size.width / 2 + edgeLen * (gPos.posX - mapCenterGPos.posX)  - layerOffsetPos[0]);
                    py = Math.round(1.0 * size.height / 2 + edgeLen * (gPos.posY - mapCenterGPos.posY) - layerOffsetPos[1]);
                    if(i == 0) {
                        ss += "m " + px + "," + py;
                    } else if(i == 1){
                        ss += " l " + px + "," + py;
                    } else {
                        ss += "," + px + "," + py;
                    }
                }
                this._element.path = ss;
			}
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapPath, EXTEND);
    }    
})();