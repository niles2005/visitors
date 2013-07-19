(function() {
mapwork.GlobalPos = GlobalPos;

function GlobalPos(posX, posY) {
    this.posX = posX;
    this.posY = posY;
}

GlobalPos.prototype = {
    getPosX : function() {
        return this.posX;
    },
    getPosY : function() {
        return this.posY;
    },
    convert2EarthPos : function() {
        var lat, lon;
        if(this._posY < 0 || this._posY > 1) {
            return null;
        }
        lon = this.posX * 360 - Math.floor(this.posX) * 360 - 180;
        if(this.posX == 1) {
            lon = 180.0;
        }
        lat = (0.5 - this.posY) * 2 * Math.PI;
        lat = Math.atan(Math.exp(lat)) / Math.PI * 360 - 90;
        return new mapwork.EarthPos(lat, lon, false);
    },
    toString : function() {
        return "GlobalPos:[" + this.posX + "," + this.posY + "]";
    }
}    
})();