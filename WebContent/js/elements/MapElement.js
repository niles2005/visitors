(function() {
    mapwork.MapElement = MapElement;

    var EXTEND = null;
    var ElementIndex1 = 0;
    var ElementIndex2 = 0;
    function MapElement(id) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._id = id;

        //used as the store id in elementLayer
        this._elementId = ElementIndex1 + "_" + ElementIndex2;
        ElementIndex1++;
        if (ElementIndex1 > 100000000) {
            ElementIndex2++;
            ElementIndex1 = 0;
        }
        this._htmlObj = null;
    }

    MapElement.prototype = {
        getElementId: function() {
            return this._elementId;
        },
        getId: function() {
            return this._id;
        },
        getLayer: function() {
            return this._layer;
        },
        setLayer: function(layer) {
            this._layer = layer;
        },
        getHtmlObj: function() {
            return this._htmlObj;
        },
        doRemove: function() {
            if (this._layer) {
                this._layer.removeElement(this);
            }
        },
        show: function() {
            this._htmlObj.style.display = "block";
        },
        hide: function() {
            this._htmlObj.style.display = "none";
        },
        updateMapPos: function(size, edgeLen, mapCenterGPos, layerOffsetPos) {
//			var px = size.width / 2 + edgeLen * (gPos.posX - mapCenterGPos.posX) - layerOffsetPos[0];
//			var py = size.height / 2 + edgeLen * (gPos.posY - mapCenterGPos.posY) - layerOffsetPos[1];

        },
        updateMapZoom: function(zoom) {//set part of label show or hide
    
        }

    }

    if (EXTEND) {
        mapwork.utils.inherits(MapElement, EXTEND);
    }
})();