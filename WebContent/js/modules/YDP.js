(function() {
    mapwork.YDP = YDP;

    var EXTEND = mapwork.ModuleItem;
	YDP.ID = "YDP";
	
	YDP.setting = {
		ID : YDP.ID,
        pageUrl : "queryYDP",
        listUrl : "queryAllYDP",
		detailUrl : "queryYDPById",
 
		newModuleItem: function(module,index) {
			return new YDP(module, index);
		}
	}

	//诱导牌
    function YDP(module, index) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
    }

    YDP.prototype = {
        setJsonData: function(json){
            var ePos;
            this._json = json;
            this._id = json.xxbId;
            if(this._index == undefined){//小图
            	this._name = this._json.name;
                this.setIcon("images/xinxiban-18.png");
                this.setHoverIcon("images/xinxiban-18.png");
                this.setOffsetPos([9,9]);
            }else{//大图
                this._name = this._json.name;
                this.setZIndex(100 - parseInt(this._index));
                this.setIcon("images/r0" + this._index + ".png");
                this.setHoverIcon("images/b0" + this._index + ".png");
                this.setDescribe("<p>诱导牌编号: " + json.xxbId + "</p>" +
                				 "<p>更新时间: " + json.fdtTimeDis + "</p>");
                this.setOffsetPos([11,31]);
            }
			if(json.posX && json.posY) {
				var x = parseInt(json.posX);
				var y = parseInt(json.posY);
				ePos = mapwork.SHPosMapping.convertShPosToEarthPos(x,y);
				this.setEarthPos(ePos);
			}
        },
        getTipTitle: function(){
    		return this._json.name;
    	},
        getTipContent: function() {
            return "<p>" + "<img width='350' height='300' src='" + this._json.picPath + "' />"  + "</p>"
            	+ "<p style='text-align:center'>" + this._json.fdtTimeDis + "<p>";
        },
        getTipTail: function() {
            return null;
        },
    	getDetailParam: function(){
    		var queryParam={};
            queryParam["ydp.xxbId"]=this._id;
            return queryParam;
    	},
    	
    	isNeedItemQuery: function(){
    		if(!this._json.picPath){
    			return true;
    		}
    	}
    }

    if(EXTEND) {
        mapwork.utils.inherits(YDP, EXTEND);
    }    
})();