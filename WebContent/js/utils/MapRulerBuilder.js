(function() {
    var _mKilometers = "\u516c\u91cc";//km
    var _mMiles  = "\u82f1\u91cc";//mi
    var _mMeters = "\u7c73";//m
    var _mFeet = "\u82f1\u5c3a";//ft
    var arc = Math.PI/180;
    
    function round125(a){
        var b=a,c = 0;
        if(b>1){
            while(b>=10){
                b=b/10;
                c=c+1;
            }
            if(b>=5){
                b=5;
            }else if(b>=2){
                b=2;
            }else{
                b=1;
            }
            while(c>0){
                b=b*10;
                c=c-1;
            }
        }
        return b;
    }
        
    function vd(a,b){
        var c=a.getDLat()*arc,
        d=a.getDLon()*arc,
        e=b.getDLat()*arc,
        f=b.getDLon()*arc,
        g=c-e,
        h=d-f,
        i=2*Math.asin(Math.sqrt(Math.pow(Math.sin(g/2),2)+Math.cos(c)*Math.cos(e)*Math.pow(Math.sin(h/2),2)));
        return 6378137*i;
    }
    
    mapwork.MapRulerBuilder = {
		//rangeLength: unit meter
        getOffsetLon4RangeLength: function(ePos,rangeLength) {
			if(!ePos || rangeLength <= 0) {
				return null;
			}
            var L1 = Math.sin(1.0 * rangeLength / 6378137 / 2);
            var L2 = L1 * L1;

            var c = Math.cos(ePos.getDLat() *arc);
            var c2 = c * c;
            var h = Math.asin(Math.sqrt(L2 / c2)) * 2;
            var offLon = parseInt(10000000.0 * h / arc + 0.5);
            return offLon;
        },
        createMapRuler: function(globalPos,zoom,edgeLen,maxLength) {
            if(!globalPos) {
                return null;
            }
            if(!edgeLen) {
                if(zoom || zoom == 0) {
                    edgeLen = 1 << (8 + zoom);
                } else {
                    return null;
                }
            }
            
            var GlobalPos1 = new mapwork.GlobalPos(globalPos.posX - maxLength/2/edgeLen,globalPos.posY);
            var GlobalPos2 = new mapwork.GlobalPos(globalPos.posX + maxLength/2/edgeLen,globalPos.posY);

            var earthPos1 = GlobalPos1.convert2EarthPos();
            var earthPos2 = GlobalPos2.convert2EarthPos();
            return this.decideScale(earthPos1,earthPos2,maxLength);
        },
        decideScale: function(earthPos1,earthPos2,maxLength){
            if(earthPos1 == null || earthPos2 == null) {
                return null;
            }
            var c=vd(earthPos1,earthPos2);
            var d=round125(c);
            if(d<1){
                return null;
            }
            var metricText,metricLength,g,meters = 0;
            if(d>=1000){
                g=round125(c/1000);
                metricLength=Math.round(maxLength*g/(c/1000));
                metricText=parseInt(g) +" "+_mKilometers;
                meters = g * 1000;
            }else{
                metricLength=Math.round(maxLength*d/c);
                metricText=parseInt(d)+" "+_mMeters;
                meters = d;
            }


            var h=c/1609.344, i=c*3.28084, fpsLength,fpsText,q,o;
            if(h>=1){
                q=round125(h);
                fpsLength=Math.round(maxLength*q/h);
                fpsText=parseInt(q)+" "+_mMiles;
            }else{
                o=round125(i);
                fpsLength=Math.round(maxLength*o/i);
                fpsText=parseInt(o)+" "+_mFeet;
            }

            return {
                fpsLength:fpsLength,
                metricLength:metricLength,
                fpsText:fpsText,
                metricText:metricText,
                meters:meters
            };
        }
    };
})();

