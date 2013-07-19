(function() {
    var CACHE_SIZE = 64,
        cacheIndex = 0,
        cacheNum = 0,
        cacheImages = {},
        cacheUrlArray = [CACHE_SIZE];
        
    mapwork.TileImageCache = {
        getImage: function(url) {
            return cacheImages[url];
        },
        cacheImage: function(url,image) {
            if(cacheNum < CACHE_SIZE) {
                cacheImages[url] = image;
                cacheUrlArray[cacheIndex] = url;
                cacheNum++;
            } else {
                var bakUrl = cacheUrlArray[cacheIndex];
                delete cacheImages[bakUrl];
                cacheUrlArray[cacheIndex] = url;
                cacheImages[url] = image;
            }
            cacheIndex++;
            if(cacheIndex >= CACHE_SIZE) {
               cacheIndex = 0;
            }
        }

    }
})();

