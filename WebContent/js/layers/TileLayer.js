(function() {
    mapwork.TileLayer = TileLayer;
    
    TileLayer.ID = "tileLayer";
    var EXTEND = mapwork.Layer;
    var TileStore = mapwork.TileStore;
    
    function TileLayer(layerId) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        if(layerId) {
            this._layerId = layerId;
        } else {
            this._layerId = TileLayer.ID;
        }
        if(typeof this._layerId === 'string') {
            this._div.className = this._layerId;
        }
        this._div.style["zIndex"] = 0;
		
		
		this._urlPath = mapwork.configs[this._layerId + "_url"] + "&dataset=" + mapwork.mapStyle;
        this._grid = [];
    }
    
    
    function resetColumn(tileLayer,mapCenter,mapZoom,edgeLen,size) {
        var grid = tileLayer._grid;
        var tile,newX,i,theRow;
        var viewTileX1 = Math.floor((mapCenter.posX * edgeLen - size.width / 2) / 256);
        var viewTileX2  = Math.floor((mapCenter.posX * edgeLen + size.width / 2) / 256);
        var row = grid[0];
        if(!row){
        	return;
        }
        var tileA = row[0];
//        console.log("add tile0:" + viewTileX1 + "   " + viewTileX2 + "  " + tileA._tileX)
        while(viewTileX1 < tileA._tileX) {
            newX = tileA._tileX - 1;
            for (i =0; i<grid.length; i++) {
                theRow = grid[i];
                tile = theRow.pop();
                tile.destroy();
                tile = TileStore.getImageTile();
                        
                var posX = theRow[0]._left - 256;
                var posY = theRow[0]._top;
                tile.addToLayer(tileLayer,newX,theRow[0]._tileY,mapZoom,posX,posY);
                tile.draw();
                theRow.unshift(tile);
            }
            tileA = row[0];
        } 
        var tileZ = row[row.length - 1];
        while(viewTileX2 > tileZ._tileX) {
            newX = tileZ._tileX + 1;
            for (i =0; i< grid.length; i++) {
                theRow = grid[i];
                tile = theRow.shift();
                tile.destroy();
                tile = TileStore.getImageTile();
                        
                posX = theRow[theRow.length - 1]._left + 256;
                posY = theRow[theRow.length - 1]._top;
                tile.addToLayer(tileLayer,theRow[theRow.length - 1]._tileX + 1,theRow[theRow.length - 1]._tileY,mapZoom,posX,posY);
                        
                tile.draw();
                theRow.push(tile);
            }
            tileZ = row[row.length - 1];
        }
    }
    
    function resetRow(tileLayer,mapCenter,mapZoom,edgeLen,size) {
        var row,tile,i,posX,posY;
        var grid = tileLayer._grid;
        var viewTileY1  = Math.floor((mapCenter.posY * edgeLen - size.height / 2) / 256);
        var viewTileY2 = Math.floor((mapCenter.posY * edgeLen + size.height / 2) / 256);
            
        var rowA = grid[0];   
        
        while(viewTileY1 < rowA[0]._tileY) {
            row = grid.pop();
            grid.unshift(row);
            var colsNum = row.length;
                
            for (i =0; i<colsNum; i++) {
                row[i].destroy();

                tile = TileStore.getImageTile();

                posX = rowA[i]._left;
                posY = rowA[i]._top - 256;
                tile.addToLayer(tileLayer,rowA[i]._tileX,rowA[i]._tileY - 1,mapZoom,posX,posY);

                tile.draw();
                row[i] = tile;
            }
            rowA = grid[0];   
        }
        var rowZ = grid[grid.length - 1];
        while(viewTileY2 > rowZ[0]._tileY) {
            row = grid.shift();
            grid.push(row);
                
            for (i =0; i<row.length; i++) {
                row[i].destroy();

                tile = TileStore.getImageTile();

                posX = rowZ[i]._left;
                posY = rowZ[i]._top + 256;
                tile.addToLayer(tileLayer,rowZ[i]._tileX,rowZ[i]._tileY + 1,mapZoom,posX,posY);

                tile.draw();
                row[i] = tile;
            }
            rowZ = grid[grid.length - 1];
        }
    }    
    
    
    TileLayer.prototype = {
        setMap: function(map) {
            this._map = map;
            this._mapLocation = this._map.getMapLocation();
        },
        getMapZoom: function() {
            return this._mapLocation.getZoom();
        },
        getMapCenterGlobalPos: function() {
            return this._mapLocation.getMapCenterGlobalPos();
        },
        getEdgeNum: function() {
            return this._mapLocation.getEdgeNum();
        },
        getEdgeLen: function() {
            return this._mapLocation.getEdgeLen();
        },
        getSize: function() {
            return this._map.getSize();
        },
            
        initLayer: function() {
			//console.log("initLayer")
            this.resetLayer();
        },
        
        resetLayer: function() {
            var row,tile;
            while(this._grid.length > 0) {
                row = this._grid.pop();
                while (row.length > 0) {
                    tile = row.pop();
                    if (tile) {
                        tile.destroy();
                    }
                }
            }
            
            var mapZoom = this.getMapZoom();
            var mapCenterGPos = this.getMapCenterGlobalPos();
            var edgeNum = this.getEdgeNum();
            var edgeLen = this.getEdgeLen();
            var size = this.getSize();

            var layerOffsetPos = this._map._layerContainer.getLayerOffsetPos();
            var centerTileEdgeX = edgeNum * mapCenterGPos.posX + layerOffsetPos[0]/256;
            var centerTileEdgeY = edgeNum * mapCenterGPos.posY + layerOffsetPos[1]/256;

            var centerTileX = Math.floor(centerTileEdgeX); 
            var centerTileY = Math.floor(centerTileEdgeY);

            var centerPosX = size.width / 2 + 0.05;//临时性解决image在chrome中半个像素，在0附近取整造成的偏差一个像素问题。chrome使用math.Round()来处理
            var centerPosY = size.height / 2 + 0.05;
            
            var tileX1 = Math.floor((mapCenterGPos.posX * edgeLen  - size.width / 2) / 256);
            var tileY1  = Math.floor((mapCenterGPos.posY * edgeLen - size.height / 2) / 256);
            var tileX2  = Math.ceil((mapCenterGPos.posX * edgeLen + size.width / 2) / 256);
            var tileY2 = Math.ceil((mapCenterGPos.posY * edgeLen + size.height / 2) / 256);
            
            var rectLocateX = parseInt((centerTileEdgeX - centerTileX) * 256); 
            var rectLocateY = parseInt((centerTileEdgeY - centerTileY) * 256);
            var centerTilePosX = centerPosX - rectLocateX;
            var centerTilePosY = centerPosY - rectLocateY;

            //+1 is foor the tils loop
            this._rows = tileY2 - tileY1 + 1;
            this._cols = tileX2 - tileX1 + 1;
            
            for(var r =0;r<this._rows;r++) {
                row = [];
                this._grid.push(row);
                for(var c =0;c<this._cols;c++) {
                    tile = TileStore.getImageTile();
                    row.push(tile);

                    var posX = centerTilePosX + 256 * (c + tileX1 - centerTileX);
                    var posY = centerTilePosY + 256 * (r + tileY1 - centerTileY);
                    tile.addToLayer(this,c + tileX1,r + tileY1,mapZoom,posX,posY);
                            
                    tile.draw();    
                }
            }
        },
        draggedLayer: function(gPos) {
			//console.log("draggedLayer")
            var mapZoom = this.getMapZoom();
            var mapCenterGPos = null;
            if(gPos) {
                mapCenterGPos = gPos;
            } else {
                mapCenterGPos = this.getMapCenterGlobalPos();
            }
            var edgeLen = this.getEdgeLen();
            var size = this.getSize();
            if(size.width <= 0 || size.height <= 0) {
                return;
            }
            resetColumn(this,mapCenterGPos,mapZoom,edgeLen,size);
            resetRow(this,mapCenterGPos,mapZoom,edgeLen,size);
        },
        resizeLayer: function() {
            var i,tile,posX,posY,newX,theRow,row;

            var mapZoom = this.getMapZoom();
            var mapCenterGPos = this.getMapCenterGlobalPos();
            var edgeLen = this.getEdgeLen();
            var size = this.getSize();
            if(size.width <= 0 || size.height <= 0) {
                return;
            }
            var viewTileX1 = Math.floor((mapCenterGPos.posX * edgeLen  - size.width / 2) / 256);
            var viewTileY1  = Math.floor((mapCenterGPos.posY * edgeLen - size.height / 2) / 256);
            var viewTileX2  = Math.ceil((mapCenterGPos.posX * edgeLen + size.width / 2) / 256);
            var viewTileY2 = Math.ceil((mapCenterGPos.posY * edgeLen + size.height / 2) / 256);
            
            //+1 is foor the tils loop
            this._rows = viewTileY2 - viewTileY1 + 1;
            this._cols = viewTileX2 - viewTileX1 + 1;
            
            
            var grid = this._grid;
            var rowA = grid[0];   
            while(viewTileY1 < rowA[0]._tileY) {
                row = [];
                grid.unshift(row);
                var colsNum = rowA.length;

                for (i =0; i<colsNum; i++) {
                    tile = TileStore.getImageTile();

                    posX = rowA[i]._left;
                    posY = rowA[i]._top - 256;
                    tile.addToLayer(this,rowA[i]._tileX,rowA[i]._tileY - 1,mapZoom,posX,posY);

                    tile.draw();
                    row.push(tile);
                }
                rowA = grid[0];
            }
            var rowZ = grid[grid.length - 1];
            while(viewTileY2 > rowZ[0]._tileY) {
                row = [];
                grid.push(row);
                colsNum = rowZ.length;

                for (i =0; i<colsNum; i++) {
                    tile = TileStore.getImageTile();

                    posX = rowZ[i]._left;
                    posY = rowZ[i]._top + 256;
                    tile.addToLayer(this,rowZ[i]._tileX,rowZ[i]._tileY + 1,mapZoom,posX,posY);

                    tile.draw();
                    row.push(tile);
                }
                rowZ = grid[grid.length - 1];
            }

            row = grid[0];
            while(viewTileX1 < row[0]._tileX) {
                newX = row[0]._tileX - 1;
                for (i =0; i<grid.length; i++) {
                    theRow = grid[i];
                    tile = TileStore.getImageTile();

                    posX = theRow[0]._left - 256;
                    posY = theRow[0]._top;
                    tile.addToLayer(this,newX,theRow[0]._tileY,mapZoom,posX,posY);

                    tile.draw();
                    theRow.unshift(tile);
                }
            } 
            while(viewTileX2 > row[row.length - 1]._tileX) {
                newX = row[row.length - 1]._tileX + 1;
                for (i =0; i< grid.length; i++) {
                    theRow = grid[i];
                    tile = TileStore.getImageTile();

                    posX = theRow[theRow.length - 1]._left + 256;
                    posY = theRow[theRow.length - 1]._top;
                    tile.addToLayer(this,theRow[theRow.length - 1]._tileX + 1,theRow[theRow.length - 1]._tileY,mapZoom,posX,posY);

                    tile.draw();
                    theRow.push(tile);
                }
            }
        },
        changedLayerZoom: function() {
			//console.log("changedLayerZoom")
            this.resetLayer();
        },
		changeUrl: function(mapStyle) {
			if(mapStyle) {
				this._urlPath = mapwork.configs[this._layerId + "_url"] + "&dataset=" + mapStyle;
			} else {
				this._urlPath = mapwork.configs[this._layerId + "_url"] + "&dataset=" + mapwork.mapStyle;
			}
			for(var k in this._grid) {
				var row = this._grid[k];
				for(var j in row) {
					row[j].draw();
				}
			}
		},
		
        setUrlPath: function(newUrl) {
            if(!newUrl) {
                return;
            }
            if(this._urlPath == newUrl) {
                return;
            }
            this._urlPath = newUrl;
			this.changeUrl();
        },

        getUrlPath: function() {
            return this._urlPath;
        },
        makeTileUrl: function(x,y,zoom) {
            if(this._urlPath) {
                return this._urlPath + "&x=" + x + "&y=" + y + "&zoom=" + zoom;
//                return this._urlPath.replace("@x",x).replace("@y",y).replace("@zoom",zoom);
            }
            return null;
        }
    };
    
    if(EXTEND) {
        mapwork.utils.inherits(TileLayer, EXTEND);
    }

})();