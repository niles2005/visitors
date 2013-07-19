(function() {
    mapwork.MapLabel = MapLabel;

    var EXTEND = mapwork.MapElement;

    function MapLabel(id,label,pos,offsetPos) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._id = id;
        if(!offsetPos) {
            offsetPos = [0,0];
        } else {
            this._offsetPos = offsetPos;
        }
        this._div = document.createElement("div");
        this._div.style.position = "absolute";
        this._div.style["whiteSpace"] = "nowrap";
        this._div.style.border = "1px solid #4C4C4C";
        this._div.style.padding = "2px 7px";
        this._div.style["-webkit-box-shadow"] = "rgb(160, 160, 160) 2px 2px 8px";
        this._div.style["box-shadow"] = "rgb(160, 160, 160) 2px 2px 8px";
        this._div.style["lineHeight"] = "15px";
        this._div.style["fontWeight"] = "bold";
        this._div.style["backgroundColor"] = "#FFF";
        this._div.style["borderRadius"] = "5px";
        
        this._htmlObj = this._div;
		
        this._contentDiv = document.createElement("div");
        this._div.appendChild(this._contentDiv);
        
        this._labelSpan = document.createElement("span");
        this._labelSpan.style["backgroundColor"] = "#FFF";
        this._labelSpan.style["fontSize"] = "12px";
        this._labelSpan.style["cursor"] = "default";
        this._contentDiv.appendChild(this._labelSpan);
        
        this.setName(label);
        if(pos) {
            this.setPos(pos);
        }
    }

    MapLabel.prototype = {
        setName: function(name) {
            this._labelSpan.innerHTML = name;
        },
        getName: function() {
            return this._labelSpan.innerHTML;
        },
        setPos: function(pos) {
            if(pos instanceof mapwork.EarthPos) {
                var gPos = pos.convert2GlobalPos();
                if(gPos) {
                    this._gPos = gPos;
                    this._ePos = pos;
                }
                this._div.style.display = "block";
            } else if(pos instanceof mapwork.GlobalPos) {
                var ePos = pos.convert2EarthPos();
                if(ePos) {
                    this._gPos = pos;
                    this._ePos = ePos;
                }
                this._div.style.display = "block";
            }
        },
        getEarthPos: function() {
            return this._ePos;
        },
        getGlobalPos: function() {
            return this._gPos;
        },
	    updateMapPos: function(size,edgeLen,mapCenterGPos,layerOffsetPos) {
			var px = size.width / 2 + edgeLen * (this._gPos.posX - mapCenterGPos.posX) - layerOffsetPos[0];
			var py = size.height / 2 + edgeLen * (this._gPos.posY - mapCenterGPos.posY) - layerOffsetPos[1];
			
            if(this._offsetPos) {
                px += this._offsetPos[0];
                py += this._offsetPos[1];
            }
            this._div.style.left = px + "px";
            this._div.style.top = py + "px";
		}
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapLabel, EXTEND);
    }    
})();