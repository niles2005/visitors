(function() {
    mapwork.MapIconLabel = MapIconLabel;

    var EXTEND = mapwork.MapIcon;

    function MapIconLabel(id,defaultIcon,hoverIcon,imageOffset,zIndex) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this.init();
    }

    MapIconLabel.prototype = {
        init: function() {
            this._htmlObj = document.createElement("div");
            this._htmlObj.style.position = "absolute";
            this._htmlObj.style["textAlign"]= "center";

            this._image = document.createElement("img");
            this._htmlObj.appendChild(this._image);

            this._labelDiv = document.createElement("p");
            this._labelDiv.style["backgroundColor"] = "#FFF";
            this._labelDiv.style["fontSize"] = "12px";
            this._labelDiv.style["cursor"] = "default";
            this._htmlObj.appendChild(this._labelDiv);
            
            this.setIcon(this._defaultIcon);
            if(this._zIndex != undefined) {
                this._htmlObj.style["zIndex"] = this._zIndex;
            }
        },
        setIcon: function(icon) {
            if(typeof icon === 'string') {
                this._image.src = icon;
            } else if(icon instanceof mapwork.SpriteImage) {
                icon.wrapImage(this._image);
            }
        },        
        setLabel: function(label) {
            this._labelDiv.innerHTML = label;
        },
        setHoverImage: function() {
            this.setIcon(this._hoverIcon);
            if(this._zIndex != undefined) {
                this._htmlObj.style["zIndex"] = 101;
            }
            this._labelDiv.style["fontWeight"] = "bold";
        },
        setDefaultImage: function() {
            this.setIcon(this._defaultIcon);
            if(this._zIndex != undefined) {
                this._htmlObj.style["zIndex"] = this._zIndex;
            }
            this._labelDiv.style["fontWeight"] = "normal";
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapIconLabel, EXTEND);
    }    
})();