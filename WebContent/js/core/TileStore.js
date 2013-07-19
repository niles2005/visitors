(function() {
    var imageTileStore = [], mapTileStore = [];
    mapwork.TileStore = {
        getImageTile: function() {
            var tile = imageTileStore.pop();
            if(tile) {
                    return tile;
            } else {
                    var newTile = new mapwork.ImageTile();
                    return newTile;
            }
        },
        returnImageTile: function(tile) {
                if(tile) {
                        imageTileStore.push(tile);
                }
        },
        getImageTileCount: function(){
                return imageTileStore.length;
        },
        
        
        getMapTile: function() {
            var tile = mapTileStore.pop();
            if(tile) {
                    return tile;
            } else {
                    var newTile = new mapwork.MapTile();
                    return newTile;
            }
        },
        returnMapTile: function(tile) {
                if(tile) {
                        mapTileStore.push(tile);
                }
        },
        getMapTileCount: function(){
                return mapTileStore.length;
        }
        
    };
})();