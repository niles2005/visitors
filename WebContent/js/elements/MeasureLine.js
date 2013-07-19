(function() {
    mapwork.MeasureLine = MeasureLine;
    MeasureLine.INDEX = 0;
    var EXTEND = mapwork.MapPath;
    
    function MeasureLine(map) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._map = map;
        this._id = "Measure" + MeasureLine.INDEX++;
        this._iconLayer = this._map.getLayer(mapwork.MapIconLayer.ID);
        this._labelLayer = this._map.getLayer(mapwork.MapLabelLayer.ID);
        this._vectorLayer = this._map.getLayer(mapwork.MapVectorLayer.ID);
        this.setWidth(3);
        this.setOpacity(0.5);
        this.setColor("#f00");
        this._vectorLayer.addElement(this);
        
        this._mapIconStore = {};
        this._mapLabelStore = {};
        this._length = 0;
    }

    MeasureLine.prototype = {
		createIconId: function() {
			return this._id + "_I" + this.getPosCount();
		},
		createLabelId: function() {
			return this._id + "_L" + this.getPosCount();
		},
        addPos: function(pos) {
            if(pos instanceof mapwork.EarthPos) {
                this._ePosList.push(pos);
                this._gPosList.push(pos.convert2GlobalPos());
            } else if(pos instanceof mapwork.GlobalPos) {
                this._gPosList.push(pos);
                this._ePosList.push(pos.convert2EarthPos());
            }
            this._vectorLayer.resetElement(this);
        },
        clearPosList: function() {
            this._ePosList = [];
            this._gPosList = [];
            this._vectorLayer.resetElement(this);
        },
        removeLastPos: function() {
            var posCount = this.getPosCount();
            if(posCount > 0) {
                var lastIconId = this.createIconId();
                var mapIcon = this._mapIconStore[lastIconId];
                this._iconLayer.removeElement(mapIcon);
                delete this._mapIconStore[lastIconId];
                
                var lastLabelId = this.createLabelId();
                var mapLabel = this._mapLabelStore[lastLabelId];
                this._labelLayer.removeElement(mapLabel);
                delete this._mapLabelStore[lastLabelId];

                this._ePosList.pop();
                this._gPosList.pop();
            }
        },
        changeLastPos: function(pos) {
            if(this._ePosList.length > 0) {
                this._ePosList.pop();
                this._gPosList.pop();
                if(pos instanceof mapwork.EarthPos) {
                    this._ePosList.push(pos);
                    this._gPosList.push(pos.convert2GlobalPos());
                } else if(pos instanceof mapwork.GlobalPos) {
                    this._gPosList.push(pos);
                    this._ePosList.push(pos.convert2EarthPos());
                }
            }
            this._vectorLayer.resetElement(this);
        },
        
        addMeasurePos: function(pos,isLast) {
            this.addPos(pos);
            var posCount = this.getPosCount();
            if(posCount > 1) {
                var ePosY = this._ePosList[posCount - 2];
                var ePosZ = this._ePosList[posCount - 1];
                this._length += mapwork.gisUtils.getMeterLength(ePosY,ePosZ);
            }
            var id = this.createIconId();
            var mapIcon = new mapwork.MapIcon(id,"images/measurepoint.png",null,[5.5,5.5]);
            this._mapIconStore[id] = mapIcon;
            mapIcon.setPos(pos);
            this._iconLayer.addElement(mapIcon);
            this._iconLayer.resetElement(mapIcon);

            id = this.createLabelId();
            var labelName = mapwork.gisUtils.getDisplayLength(this._length);
            var mapLabel = new mapwork.MeasureLabel(id,labelName,pos,[10,-10],this);
            if(posCount == 1) {
                mapLabel.setFirst();
            }
            this._mapLabelStore[id] = mapLabel;
            this._labelLayer.addElement(mapLabel);
            this._labelLayer.resetElement(mapLabel);

        },
        changeLastMeasurePos: function(pos) {
            this.changeLastPos(pos);
        },
        doStop: function() {
            if(this._length <= 0) {
                this.doRemove();
            } else {
				
                var lastLabelId = this.createLabelId();
                var measureLabel = this._mapLabelStore[lastLabelId];
                if(measureLabel) {
                    measureLabel.setLast();
                }
            }
        },
        doRemove: function() {
            this._vectorLayer.removeElement(this);

            for(var k in this._mapIconStore) {
                this._mapIconStore[k].doRemove();
            }
            this._mapIconStore = {};

            for(k in this._mapLabelStore) {
                this._mapLabelStore[k].doRemove();
            }
            this._mapLabelStore = {};
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(MeasureLine, EXTEND);
    }    
})();