(function() {

	mapwork.version = 3.1;

        mapwork.LIMIT_MAX_ZOOM = 17;
        mapwork.LIMIT_MIN_ZOOM = 15;

	mapwork.mapStyle1 = "sd";
	mapwork.mapStyle2 = "sh2";
	mapwork.mapStyle3 = "sh3";
	mapwork.mapStyleT = "shT";

	mapwork.trafficRefreshTime = 120*1000; //2min

//	var mapStyle = getCookie("mapStyle");
//	if(!mapStyle) {
//		mapStyle = mapwork.mapStyle1;
//		setCookie("mapStyle",mapStyle,999999);
//	}
	mapwork.mapStyle = mapwork.mapStyle1;
        console.log("mapstyle:" + mapwork.mapStyle)
	
	mapwork.serviceAddress0 = "http://127.0.0.1:8080/";
	mapwork.serviceAddress1 = "http://172.16.0.119:8080/";
	mapwork.serviceAddress2 = "http://localhost:8080/";
	mapwork.serviceAddress3 = "/";
	mapwork.serviceAddress4 = "http://172.16.0.119/";
	mapwork.serviceAddress = mapwork.serviceAddress3;
	mapwork.configs = {

        defaultLat:31.271757,
        defaultLon:121.827236,

        defaultZoom:16,
        
        "tileLayer_url":mapwork.serviceAddress + "tile?v=" + mapwork.version,
        "trafficTileLayer_url": mapwork.serviceAddress + "gisserver/mt?v=" + mapwork.version,
        "routeLayer_url":mapwork.serviceAddress + "gisserver/rr",
		"searchLayer_url":mapwork.serviceAddress + "gisserver/ss",

		"segmentQuery_url":mapwork.serviceAddress1 + "gisserver/bb",
		
		setAddress: function(address){
			mapwork.serviceAddress = address;
			mapwork.configs["tileLayer_url"] = mapwork.serviceAddress + "gisserver/mt?v=" + mapwork.version;
			mapwork.configs["trafficTileLayer_url"] = mapwork.serviceAddress + "gisserver/mt?v=" + mapwork.version;
			mapwork.configs["routeLayer_url"] = mapwork.serviceAddress + "gisserver/rr";
			mapwork.configs["searchLayer_url"] = mapwork.serviceAddress + "gisserver/ss",
			mapwork.configs["segmentQuery_url"] = mapwork.serviceAddress + "gisserver/bb"
		}
    }

})();