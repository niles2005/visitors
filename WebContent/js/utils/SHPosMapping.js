(function() {

    var ePos0 = new mapwork.EarthPos(312354340,1214671520,true);
    var gPos0 = ePos0.convert2GlobalPos();

    mapwork.SHPosMapping = {
        convertShPosToGlobalPos: function(x,y) {
            x -= 660606.640282;
            var gPosX = x / 34280000 + gPos0.posX;
            
            y = 477300.294757 - y;
            var gPosY = -y / 34190000 + gPos0.posY;
            
            return new mapwork.GlobalPos(gPosX,gPosY);
        },
        convertShPosToEarthPos: function(x,y) {
            x -= 660606.640282;
            var gPosX = x / 34280000 + gPos0.posX;
            
            y = 477300.294757 - y;
            var gPosY = -y / 34190000 + gPos0.posY;
            
            var gPos = new mapwork.GlobalPos(gPosX,gPosY);
            return gPos.convert2EarthPos();
        }
    }

})();