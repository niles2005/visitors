(function() {
    mapwork.WeatherLabel = WeatherLabel;

    var EXTEND = mapwork.MapIcon;

    var labelHtml = '<div style="padding:0;margin:0;border:0;overflow:hidden;width:70px;height:48px;cursor:pointer;background: url(images/weatherbg.png) no-repeat;">' + 
                '<div class="city" style="position: absolute;left:8px;top:6px;font-size:14px;color:#FFF;"></div>' + 
                '<div class="temp" style="position: absolute;top:24px;text-align:center;width:100%;color:#e5edfe;font-size:11px;font-weight:bold;font-family:"></div>' + 
                '<img  style="right:-10px; top:-10px; position:absolute;"src="images/transparent.png"> ' + 
            '</div>';
    function WeatherLabel(id,defaultIcon,hoverIcon,imageOffset,zIndex,moduleItem) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
		this._moduleItem = moduleItem;
        this.init();
    }

    WeatherLabel.prototype = {
        init: function() {
            this._htmlObj = document.createElement("div");
            this._htmlObj.style.position = "absolute";
            
            this._$Element = $(this._htmlObj);
            this._$Element.append(labelHtml);
            this._$CityDiv = this._$Element.find(".city");
            this._$TempDiv = this._$Element.find(".temp");
            this._image = this._$Element.find("img").get(0);
            
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
        setLabel: function(city,temp) {
            this._$CityDiv.html(city);
            this._$TempDiv.html(temp);
        },
        setHoverImage: function() {
            this.setIcon(this._hoverIcon);
            if(this._zIndex != undefined) {
                this._htmlObj.style["zIndex"] = 101;
            }
            this._$CityDiv.css("fontWeight","bold");
            this._$TempDiv.css("color","black");
        },
        setDefaultImage: function() {
            this.setIcon(this._defaultIcon);
            if(this._zIndex != undefined) {
                this._htmlObj.style["zIndex"] = this._zIndex;
            }
            this._$CityDiv.css("fontWeight","normal");
            this._$TempDiv.css("color","white");
        },
		isDisplayAtZoom: function(zoom) {
            if(this._moduleItem) {
				return this._moduleItem.isDisplayAtZoom(zoom);
            }
			return true;
		}
    }

    if(EXTEND) {
        mapwork.utils.inherits(WeatherLabel, EXTEND);
    }    
})();