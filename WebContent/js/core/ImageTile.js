(function() {
    mapwork.ImageTile = ImageTile;
    var EXTEND = null;
    
    function ImageTile() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._layer = null;
        this._tileX = 0;
        this._tileY = 0;
        this._zoom = 0;
        this._queued = false;
        this._loading = false;
        this._drawn = false;
        
//        this._errorImageSrc = "images/empty.png";//empty | error
        
        this._loadImage = true;
        if(this._loadImage) {
            this._image = document.createElement("img");
            this._image.style.position = "absolute";
            this._image.style.width = "256px";
            this._image.style.height = "256px";
            this._image.style["-moz-user-select"]="none";
            this._image.style["-webkit-user-select"]="none";
        } else {
            this._canvas = document.createElement("canvas");

            if(this._canvas && this._canvas.getContext) {
                this._context = this._canvas.getContext('2d');
            }

            this._canvas.style.position = "absolute";
            this._canvas.style.width = "256px";
            this._canvas.style.height = "256px";
            this._canvas.width="256";
            this._canvas.height="256";
        }
        
//        this._image.style.width = "256px";
//        this._image.style.height = "256px";
//        this._image.style.position = "absolute";
//        this._image.style["-moz-user-select"] = "none";
//        this._image.style["-webkit-user-select"] = "none";
        
        
//        this._errorDiv = document.createElement("div");
//        this._errorDiv.style.width = "256px";
//        this._errorDiv.style.height = "256px";
//        this._errorDiv.style.position = "absolute";
//        this._errorDiv.style["-moz-user-select"] = "none";
//        this._errorDiv.style["-webkit-user-select"] = "none";
//        this._errorDiv.style.display="none";
//        this._errorDiv.style.background="#f00";
        
    }
    
    ImageTile.prototype = {
        addToLayer: function(layer ,tileX ,tileY ,zoom ,left ,top ) {
                this._layer = layer;
                this._tileX = tileX;
                this._tileY = tileY;
                this._zoom = zoom;
                if(this._loadImage) {
                    layer.getDiv().appendChild(this._image);
                } else {
                    layer.getDiv().appendChild(this._canvas);
                }
                
//                layer.getDiv().appendChild(this._canvas);
//                
//                layer.getDiv().appendChild(this._errorDiv);
                this.moveTo(left,top);
        },
        offsetPos: function(offsetX,offsetY) {
            this.moveTo(this._left + offsetX, this._top + offsetY);
        },
        moveTo: function(left,top) {
            this._left = left;
            this._top = top;
                if(this._loadImage) {
                    this._image.style.left = (left) + "px";
                    this._image.style.top = ( top) + "px";
                } else {
                    this._canvas.style.left = (left) + "px";
                    this._canvas.style.top = ( top) + "px";
                }
            
                
                
//                this._errorDiv.style.left = left + "px";
//                this._errorDiv.style.top = top + "px";
        },
        destroy: function() {
                this.clear();
                if(this._layer) {
                        this._layer = null;
                }
                mapwork.TileStore.returnImageTile(this);
        },
        draw: function() {
                
            if(this._loadImage) {                
                var imageSrc = this._layer.makeTileUrl(this._tileX,this._tileY,this._zoom);
                if(!imageSrc) {
                    imageSrc = "mapwork/images/empty.png";
                }
//                if(this._image._src === imageSrc) {
//                    if(this._image.complete) {
//                        this._image.style.display="block";
//                    }
//                    return;
//                }
//                this._image._src = imageSrc;
//                if(mapwork.TileImageCache.getImage(imageSrc) == "error") {
////                    this._image.src=this._errorImageSrc;
//                    return;
//                }
                
                var tileX = this._tileX;
                var tileY = this._tileY;
                var tile = this;
                
                this._image.onload = function(event) {
                    if(tile._tileX == tileX && tile._tileY == tileY) {
                        tile._image.style.display="block";
                    }
                }
                
                this._image.onerror = function(event) {
                    if(tile._tileX == tileX && tile._tileY == tileY) {
//                        if(!mapwork.TileImageCache.getImage(imageSrc)) {
//                            mapwork.TileImageCache.cacheImage(imageSrc, "error");
//                        }
                        
//                        tile._image.src=tile._errorImageSrc;
                    }
                }
                try {
                    this._image.src = imageSrc;
                } catch(e) {
//                    console.dir(e);
                }
            } else {
                this._context.fillStyle="#000";
                this._context.clearRect(0,0,256,256);
                this._context.fillText(this._tileX + " " + this._tileY,30,30);
                this._context.strokeRect(2,2,252,252);
                this._canvas.style.display="block";
            }
        },
        clear: function() {
            if(this._loadImage) {
                this._image.style.display="none";
                this._layer.getDiv().removeChild(this._image);
            } else {
                this._canvas.style.display="none";
                this._layer.getDiv().removeChild(this._canvas);
            }
        }
    };

	if(EXTEND){
        mapwork.utils.inherits(ImageTile, EXTEND);
    }
})();