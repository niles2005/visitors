(function() {
    mapwork.Layer = Layer;
   
    var EXTEND = null;

    function Layer(layerId) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._layerId = layerId;
        this._div = document.createElement("div");
        if(typeof layerId === 'string') {
            this._div.className = layerId;
        }
        this._div.style.position = "absolute";
		
    }
    
    Layer.prototype = {
        getLayerId: function() {
            return this._layerId;
        },
        setMap: function(map) {
            this._map = map;
        },
        getMap: function() {
            return this._map;
        },
        getDiv: function() {
            return this._div;
        },
        getClassName: function() {
            return this._div.className;
        },
        setClassName: function(newClassName) {
            this._div.className = newClassName;
        },
        destroy: function() {
            
        },

        setLayerContainer: function(layerContainer) {
            this._layerContainer = layerContainer;
        },

        //init map,first map show
        initLayer: function() {
            
        },
        draggedLayer: function() {
            
        },
        resizeLayer: function() {
            
        },
        changedLayerZoom: function() {
            
        }
    };

	if(EXTEND) {
        mapwork.utils.inherits(Layer, EXTEND);
    }    
})();