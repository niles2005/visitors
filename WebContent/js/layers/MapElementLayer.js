(function() {
    mapwork.MapElementLayer = MapElementLayer;

    var EXTEND = mapwork.Layer;

    function MapElementLayer() {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._elementStore = {};
    }

    MapElementLayer.prototype = {
        addElement: function(mapElement) {
            if (mapElement && mapElement.getHtmlObj()) {
                this._elementStore[mapElement.getElementId()] = mapElement;
                this._div.appendChild(mapElement.getHtmlObj());
                mapElement.setLayer(this);
            }
        },
        removeElement: function(mapElement) {
            if (mapElement) {
                this._div.removeChild(mapElement.getHtmlObj());
                delete this._elementStore[mapElement.getElementId()];
                mapElement.setLayer(null);
            }
        },
        resetElement: function(mapElement) {
            if (mapElement && mapElement.isDisplayAtZoom(zoom)) {
                var mapLocation = this._map.getMapLocation();
                var mapCenterGPos = mapLocation.getMapCenterGlobalPos();
                var edgeLen = mapLocation.getEdgeLen();
                var size = this._map.getSize();
                var layerOffsetPos = this._layerContainer.getLayerOffsetPos();
                var zoom = mapLocation.getZoom();

                mapElement.updateMapPos(size, edgeLen, mapCenterGPos, layerOffsetPos);
            } else {
                mapElement.hide();
            }
        },
        resetLayer: function() {
            var mapLocation = this._map.getMapLocation();
            var mapCenterGPos = mapLocation.getMapCenterGlobalPos();
            var edgeLen = mapLocation.getEdgeLen();
            var size = this._map.getSize();
            var layerOffsetPos = this._layerContainer.getLayerOffsetPos();
            var zoom = mapLocation.getZoom();
            for (var k in this._elementStore) {
                var mapElement = this._elementStore[k];
                if (mapElement.isDisplayAtZoom(zoom)) {
                    mapElement.updateMapPos(size, edgeLen, mapCenterGPos, layerOffsetPos);
                } else {
                    mapElement.hide();
                }
            }
      },
        initLayer: function() {
            this.resetLayer();
        },
        changedLayerZoom: function() {
            this.resetLayer();
        }
    }

    if (EXTEND) {
        mapwork.utils.inherits(MapElementLayer, EXTEND);
    }
})();