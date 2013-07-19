(function() {
    mapwork.JTZB = JTZB;

    var EXTEND = mapwork.ModuleItem;
	JTZB.ID = "JTZB";

	JTZB.setting = {
		ID : JTZB.ID,
        pageUrl : "queryJTZB",
        listUrl : "queryAllJTZB",
		detailUrl : "queryJTZBById",
		
		newModuleItem: function(module,index) {
			return new JTZB(module, index);
		}
	}

	//交通直播
    function JTZB(module, index) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
    }

    JTZB.prototype = {
        setJsonData: function(json){
            this._json = json;
            this._id = json.id;
            if(this._index == undefined){//小图
            	this._name = this._json.name;
                this.setIcon("images/jtzb_2-18.png");
                this.setHoverIcon("images/jtzb_2-18.png");
                this.setOffsetPos([9,9]);
            }else{//大图
                this._name = this._json.name;
                this.setZIndex(100 - parseInt(this._index));
                this.setIcon("images/r0" + this._index + ".png");
                this.setHoverIcon("images/b0" + this._index + ".png");
                this.setDescribe("<p>类型:道路视频</p>");
                this.setOffsetPos([11,31]);
            }
			if(json.posX && json.posY) {
				var lat = parseFloat(json.posX);
				var lon = parseFloat(json.posY);
				this.setEarthPos(new mapwork.EarthPos(lat, lon));
			}
        },
        getTipTitle: function(){
    		return this._json.name;
    	},
        getTipContent: function() {
            return "<iframe src='http://114.80.221.26/jsp/gis/jtskForLive.jsp?videoId=" + (parseInt(this._id) - 1) + "' height='254' width='330' scrolling='no' name='dlzdInfN'" 
            	+ " id='dlzdInf' frameborder='0' noresize='' marginheight='0' marginwidth='0'></iframe>";
        },
    	getDetailParam: function(){
    		var queryParam={};
            queryParam["jtzb.id"]=this._id;
            return queryParam;
    	},
    	isNeedItemQuery: function(){
    		if(!this._id){
    			return true;
    		}
    	}
    }

    if(EXTEND) {
        mapwork.utils.inherits(JTZB, EXTEND);
    }    
})();