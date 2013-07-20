(function() {
    mapwork.MapIcon = MapIcon;
    var utils = mapwork.utils;
    var EXTEND = mapwork.MapElement;
    var maxIndex = 100;

    function MapIcon(id, defaultIcon, hoverIcon, offsetPos, zIndex) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._zIndex = zIndex;
        this._defaultIcon = defaultIcon;
        this._hoverIcon = hoverIcon;
        this._offsetPos = offsetPos;

        this.init();
    }

    MapIcon.prototype = {
        init: function() {
            this._htmlObj = document.createElement("img");
            this._htmlObj.style.position = "absolute";
            this._htmlObj.style.cursor = "pointer";
            this.setIcon(this._defaultIcon);
            if (this._zIndex != undefined) {
                this._htmlObj.style["zIndex"] = this._zIndex;
            }
        },
        setIcon: function(icon) {
            if (typeof icon === 'string') {
                this._htmlObj.src = icon;
            } else if (icon instanceof mapwork.SpriteImage) {
                icon.wrapImage(this._htmlObj);
            }
        },
        setHoverImage: function() {
//            this.setIcon(this._hoverIcon);
            if (this._zIndex != undefined) {
                this._htmlObj.style["zIndex"] = 101;
            }

        },
        setDefaultImage: function() {
//            this.setIcon(this._defaultIcon);
            if (this._zIndex != undefined) {
                this._htmlObj.style["zIndex"] = this._zIndex;
            }
        },
        setContent: function(content) {
            this._content = content;
        },
        getEarthPos: function() {
            return this._ePos;
        },
        getGlobalPos: function() {
            return this._gPos;
        },
        setEarthPos: function(ePos) {
            if (ePos) {
                var gPos = ePos.convert2GlobalPos();
                if (gPos) {
                    this._gPos = gPos;
                    this._ePos = ePos;
                }
                this._htmlObj.style.display = "block";
            }
        },
        setPos: function(pos) {
            if (pos instanceof mapwork.EarthPos) {
                var gPos = pos.convert2GlobalPos();
                if (gPos) {
                    this._gPos = gPos;
                    this._ePos = pos;
                }
                this._htmlObj.style.display = "block";
            } else if (pos instanceof mapwork.GlobalPos) {
                var ePos = pos.convert2EarthPos();
                if (ePos) {
                    this._gPos = pos;
                    this._ePos = ePos;
                }
                this._htmlObj.style.display = "block";
            }
        },
        updateMapPos: function(size, edgeLen, mapCenterGPos, layerOffsetPos) {
            var px = size.width / 2 + edgeLen * (this._gPos.posX - mapCenterGPos.posX) - layerOffsetPos[0];
            var py = size.height / 2 + edgeLen * (this._gPos.posY - mapCenterGPos.posY) - layerOffsetPos[1];

            if (this._offsetPos) {
                px -= this._offsetPos[0];
                py -= this._offsetPos[1];
            }

            //used for draggable icon
            this._htmlObjPos = [px, py];

            this._htmlObj.style.left = px + "px";
            this._htmlObj.style.top = py + "px";
        },
        setFocus: function() {
            this.setHoverImage();
        },
        clearFocus: function() {
            this.setDefaultImage();
        },
        doClickFocus: function() {//used for inherits
            console.log('cccc')
//            if(this._layer && this._layer.focusPOI) {
//                this._layer.focusPOI(this._id,'layer');
//            }
        },
        doFocus: function() {
            this.setHoverImage();
            this._htmlObj.style["zIndex"] = maxIndex;
//            if(this._layer) {
//                var tipControl = this._layer.getMap().getControl(mapwork.TipControl.ID);
//                if(tipControl) {
//                    tipControl.displayContent(this._content,this._gPos);
//                }
//            }
        },
        doDeFocus: function() {
            this.setDefaultImage();
            this._htmlObj.style["zIndex"] = 0;
        },
        addEventListener: function(eventType, listener, caller, obj) {
            utils.bindEvent(this._htmlObj, eventType, function(event) {
                listener.call(caller, event, obj);
            });
        }
    }

    if (EXTEND) {
        mapwork.utils.inherits(MapIcon, EXTEND);
    }
})();