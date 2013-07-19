(function() {
    mapwork.SpriteImage = SpriteImage;

    var EXTEND = null;

    function SpriteImage(imageUrl,width,height,offsetX,offsetY) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._imageUrl = imageUrl;
        this._width = width;
        this._height = height;
        this._offsetX = offsetX;
        this._offsetY = offsetY;
    }

    SpriteImage.prototype = {
        wrapImage: function(image) {
            image.src = "images/transparent.png";
            image.style.width = this._width + "px";
            image.style.height = this._height + "px";
            image.style.background = 'url(' + this._imageUrl + ') no-repeat ' + this._offsetX + 'px ' + this._offsetY + 'px';
        },
        setOffset: function(offsetX,offsetY) {
            this._offsetX = offsetX;
            this._offsetY = offsetY;
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(SpriteImage, EXTEND);
    }    
})();