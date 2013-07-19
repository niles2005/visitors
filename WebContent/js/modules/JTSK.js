(function() {
    mapwork.JTSK = JTSK;

    var EXTEND = mapwork.ModuleItem;
	JTSK.ID = "JTSK";
	
	JTSK.setting = {
		ID : JTSK.ID,
        pageUrl : "queryJTSK",
        listUrl : "queryAllJTSK",
		detailUrl : "queryJTSKById",
		
		newModuleItem: function(module,index) {
			return new JTSK(module, index);
		}
	}

	//交通实况直播
    function JTSK(module, index) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
    }

    JTSK.prototype = {
        setJsonData: function(json){
            var ePos;
            this._json = json;
            this._id = json.sxjId;
            if(this._index == undefined){//小图
            	this._name = this._json.name;
                this.setIcon("images/photo.png");
                this.setHoverIcon("images/photoH.png");
                this.setOffsetPos([8,8]);
            }else{//大图
                this._name = this._json.name;
                this.setZIndex(100 - parseInt(this._index));
                this.setIcon("images/r0" + this._index + ".png");
                this.setHoverIcon("images/b0" + this._index + ".png");
                this.setDescribe("<p>摄像机编号: " + json.sxjId + "</p>" + 
                				 "<p>类型: " + json.sxjType + "</p>");
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
            return "<p>" + "<img width='350' height='250' src='" + this._json.imageUrl + "' />"  + "</p>"
            		+ "<img src='images/vedio_logo.gif' style='left:245px;top:260px;position:absolute;'>";
        },
    	getDetailParam: function(){
    		var queryParam={};
            queryParam["jtsk.sxjId"]=this._id;
            return queryParam;
    	},
    	
    	isNeedItemQuery: function(){
    		if(!this._json.imageUrl){
    			return true;
    		}
    	}
    }

    if(EXTEND) {
        mapwork.utils.inherits(JTSK, EXTEND);
    }    
})();