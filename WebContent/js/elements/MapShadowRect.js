(function() {
    mapwork.MapShadowRect = MapShadowRect;

    var EXTEND = mapwork.MapElement;

    function MapShadowRect() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._div = document.createElement("div");
		this._htmlObj = this._div;
        this._ltGPos = null;
        this._rbGPos = null;
		
    }

    MapShadowRect.prototype = {
        setStyle: function(style) {
            if(style) {
                for(var k in style) {
                    this._div.style[k] = style[k];
                }
            }
        },
        getLeftTopGlobalPos: function() {
            return this._ltGPos;
        },
        setLeftTopGlobalPos: function(ltGPos) {
            this._ltGPos = ltGPos;
        },
        getRightBottomGlobalPos: function() {
            return this._rbGPos;
        },
        setRightBottomGlobalPos: function(rbGPos) {
            this._rbGPos = rbGPos;
        },
		updateMapPos: function(size,edgeLen,mapCenterGPos,layerOffsetPos) {
			if(this._ltGPos && this._rbGPos) {
				var p1x = size.width / 2 + edgeLen * (this._ltGPos.posX - mapCenterGPos.posX) - layerOffsetPos[0];
				var p1y = size.height / 2 + edgeLen * (this._ltGPos.posY - mapCenterGPos.posY) - layerOffsetPos[1];
				var p2x = size.width / 2 + edgeLen * (this._rbGPos.posX - mapCenterGPos.posX) - layerOffsetPos[0];
				var p2y = size.height / 2 + edgeLen * (this._rbGPos.posY - mapCenterGPos.posY) - layerOffsetPos[1];

				this._p1x = p1x;
				this._p1y = p1y;
				this._div.style.left = p1x + "px";
				this._div.style.top = p1y + "px";
				this._div.style.width = (p2x - p1x) + "px";
				this._div.style.height = (p2y - p1y) + "px";
			}
		},

        setPixelOffset: function(offsetX,offsetY) {
            this._div.style.left = (this._p1x + offsetX) + "px";
            this._div.style.top = (this._p1y + offsetY) + "px";
        },
        getPixelBounds: function() {
            var $Div = $(this._div);
            var offset = $Div.offset();
            var width = $Div.width();
            var height = $Div.height();
            return new mapwork.Bounds(offset.left,offset.top,offset.left + width,offset.top + height);
        }
        
    }

    if(EXTEND) {
        mapwork.utils.inherits(MapShadowRect, EXTEND);
    }    
})();