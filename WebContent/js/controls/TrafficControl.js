(function() {
    mapwork.TrafficControl = TrafficControl;

    TrafficControl.ID = "TrafficControl";

    var EXTEND = mapwork.Control;

    function retrunFalse() {
        return false;
    }
	
	function getCurrentTime() {
		var date = new Date();
		var hour = date.getHours();
		if(hour < 10) {
			hour = "0" + hour;
		}
		var minute = date.getMinutes();
		if(minute < 10) {
			minute = "0" + minute;
		}
		return hour + ":" + minute;
	}

    function TrafficControl() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._controlId = TrafficControl.ID;        
        this._div.style["zIndex"] = 1001;
        this._div.style.position = "absolute";
        this._div.style.right = "0px";
        this._div.style.left = "0px";
        this._trafficButtonOpen = false;
    }

    TrafficControl.prototype = {
        setMap: function(map) {
            this._map = map;
            this._trafficButtonOpen = false;
			this._wrapDiv = document.createElement("div");
            this._wrapDiv.style.position = "absolute";
            this._wrapDiv.style.right = "146px";
            this._wrapDiv.style.top = "20px";
            this._wrapDiv.style.width = "280px";
            this._wrapDiv.style.height = "30px";
            this._wrapDiv.style.background = "url(images/trafficOpen.png) no-repeat 0 0";
			
            this._image = document.createElement("img");
            this._image.src = "images/refresh0.gif";
            this._image.style.position = "absolute";
            this._image.style.left = "10px";
            this._image.style.top = "6px";
			this._image.title = "刷新";
			this._image.style.cursor =  "pointer";
            this._image.ondragstart = retrunFalse;
			this._wrapDiv.appendChild(this._image);
			var self = this;
			mapwork.utils.bindEvent(this._image, "mousedown", function() {
				self.onClick.apply(self,arguments);
			});

            this._span = document.createElement("span");
            this._span.style.position = "absolute";
            this._span.style.right = "10px";
            this._span.style.top = "7px";
			this._span.innerText = "刷新时间: " + getCurrentTime();
			this._wrapDiv.appendChild(this._span);
		},
		openReloadTimer: function() {
			var self = this;
			if(this._timer) {
				clearInterval(this._timer);
				this._timer = null;
			}
			this._timer = setInterval(function() {
				if(self._trafficTileLayer){
					self.refreshTrafficPage();
				}
			},mapwork.trafficRefreshTime);
		},
		closeReloadTimer: function() {
			if(this._timer) {
				clearInterval(this._timer);
				this._timer = null;
			}
		},
        openTraffic: function() {
            var tileLayer = this._map.getLayer(mapwork.TileLayer.ID);
			if(tileLayer) {
				tileLayer.changeUrl(mapwork.mapStyle3);
			}
			
            this._trafficTileLayer = this._map.getLayer(mapwork.TrafficTileLayer.ID);
            if(!this._trafficTileLayer){
                this._trafficTileLayer = new mapwork.TrafficTileLayer();
            }
            this._map.addLayer(this._trafficTileLayer);
            this._trafficTileLayer.initLayer();
            this._div.appendChild(this._wrapDiv);
			this.openReloadTimer();
//            this._map._layerContainer.onMapZoom();
//            this._trafficTileLayer.resizeLayer();
        },
        closeTraffic: function() {
			this.closeReloadTimer();
            this._trafficTileLayer = this._map.getLayer(mapwork.TrafficTileLayer.ID);
            if(this._trafficTileLayer){
                this._map.removeLayer(this._trafficTileLayer);
            }
            this._div.removeChild(this._wrapDiv);
			this._trafficTileLayer = null;

			var mapStyle = getCookie("mapStyle");
			if(!mapStyle) {
				mapStyle = mapwork.mapStyle1;
				setCookie("mapStyle",mapStyle,999999);
			}
            var tileLayer = this._map.getLayer(mapwork.TileLayer.ID);
			if(tileLayer) {
				tileLayer.changeUrl(mapStyle);
			}
			
        },
        toggleTraffic: function() {
            this._trafficButtonOpen = !this._trafficButtonOpen;
            if(this._trafficButtonOpen) {
                this.openTraffic();
            } else {
                this.closeTraffic();
            }
			return this._trafficButtonOpen;
        },
        onClick: function(event) {
            if(event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
            } else {//IE
                event.cancelBubble = true;
                event.returnValue = false;
            }
			if(this._trafficButtonOpen) {
				if(this._trafficTileLayer){
					this.refreshTrafficPage();
				}
			}
            return false;
        },
		refreshTrafficPage: function() {
			this._image.src = "images/refresh.gif";
			var self = this;
			window.setTimeout(function() {
				self._image.src = "images/refresh0.gif";
			},500);
			this._span.innerText = "刷新时间: " + getCurrentTime();
			this._trafficTileLayer.refreshPage();
		},
        createTrafficImage: function(name,url,right,top, clickListener) {
            var image = document.createElement("img");
            if(name) {
                image.name = name;
            }
            image.src = url;
            image.style.position = "absolute";
            image.style.right = right + "px";
            image.style.top = top + "px";
            image.ondragstart = retrunFalse;
            if(clickListener) {
                var self = this;
                mapwork.utils.bindEvent(image, "mousedown", function() {
                    clickListener.apply(self,arguments);
                });
            }
            return image;
        }
		
    }

    if(EXTEND) {
        mapwork.utils.inherits(TrafficControl, EXTEND);
    }    
})();