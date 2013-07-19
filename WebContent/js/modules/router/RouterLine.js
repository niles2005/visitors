(function() {
    mapwork.RouterLine = RouterLine;
    RouterLine.INDEX = 0;
    var EXTEND = mapwork.MapPath;

    function RouterLine() {
    	if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._id = "router_" +  RouterLine.INDEX++;
        this.setWidth(6);
        this.setOpacity(0.7);
        this.setColor("#24409c");
    }

    RouterLine.prototype = {
    	setJsonData: function(data) {
			this._jsonData = data;
        	this.clearPosList();
	    	var segments = data.segments;
	        for (var index in segments) {
	        	var segment = segments[index];
	        	
	        	var ePosArray = [];
	        	//设置path的路径
	    		var points = segment["points"];
	    		var pointsArray = points.split(",");
	    		var lat, lon;
	    		for(var k =0;k<pointsArray.length;k += 2) {
	    			if(k == 0) {
	    				lat = parseInt(pointsArray[k]);
	    				lon = parseInt(pointsArray[k + 1]);
	    			} else {
	    				lat += parseInt(pointsArray[k]);
	    				lon += parseInt(pointsArray[k + 1]);
	    			}
	    			var ePos = new mapwork.EarthPos(lat * 10, lon * 10, true);
	    			this.addPos(ePos);
	    			ePosArray.push(ePos);
	    		}
	    		segment["ePosArray"] = ePosArray;
	    	}
		},
		getJsonData: function() {
			return this._jsonData;
		}
    }

    if(EXTEND) {
        mapwork.utils.inherits(RouterLine, EXTEND);
    }    
})();