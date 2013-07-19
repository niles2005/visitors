(function() {
	var ARC = Math.PI/180;

    mapwork.gisUtils = {
        getMeterLength: function(ePosA,ePosB) {
            var c = ePosA.getDLat() * ARC;
            var d = ePosA.getDLon() * ARC;
            var e = ePosB.getDLat() * ARC;
            var f = ePosB.getDLon() * ARC;
            var g=c-e;
            var h=d-f;
            var i=2*Math.asin(Math.sqrt(Math.pow(Math.sin(g/2),2)+Math.cos(c)*Math.cos(e)*Math.pow(Math.sin(h/2),2)));
            return  i * 6378137;
        },
        
        getDisplayLength: function(meterLen) {
            if(meterLen>=1000){
                return (meterLen / 1000).toFixed(2) +" 公里";//公里
            }else{
                return meterLen.toFixed(2) +" 米";//米
            }
        }
    }

})();