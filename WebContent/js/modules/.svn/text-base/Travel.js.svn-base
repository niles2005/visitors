(function() {
	
	var myTailDiv = '<div style="padding: 0px 15px;"><form><span>经纬度:</span><input type="text" class="text_LatLon"/><input type="button" value="提交"/></form></div>';
    var $TailDiv = $(myTailDiv);
    
    mapwork.Travel = Travel;

	var EXTEND = mapwork.ModuleItem;
	Travel.ID = "Travel";
	
	Travel.setting = {
		ID : Travel.ID,
        pageUrl : "queryTravelPoi",
        listUrl : "queryAllTravelPoi",
		detailUrl : "queryTravelPoiById",
		
		newModuleItem: function(module,index) {
			return new Travel(module, index);
		}
	}

	//旅游景点
    function Travel(module, index) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._tipOffsetTop = [9,30];//tip offset top pos,arr0 is item tip offset,arr1 is pop tip offset
        
        //是否可编辑
        this._isEditable = false;
    }

    Travel.prototype = {
        setJsonData: function(json){
            this._json = json;
            this._id = json.id;
            if(this._index == undefined){//小图
            	this._name = this._json.name;
                this.setIcon("images/point.png");
                this.setHoverIcon("images/point.png");
                this.setOffsetPos([4.5,4.5]);
            }else{//大图
                this._name = this._json.name;
                this.setZIndex(100 - parseInt(this._index));
                this.setIcon("images/r0" + this._index + ".png");
                this.setHoverIcon("images/b0" + this._index + ".png");
                this.setDescribe("<p>省/市: " + (json.province? json.province : "") + "</p>" + 
       				 			 "<p>市/区: " + (json.city? json.city : "") + "</p>");
                this.setOffsetPos([11,31]);
            }
			if(json.lat && json.lon) {
				var x = parseInt(json.lat);
				var y = parseInt(json.lon);
				this.setEarthPos(new mapwork.EarthPos(x,y,true));
			} else {
				var lat = 338101423 + parseInt(Math.random()*6000000+1);
				var lon = 1223580530 + parseInt(Math.random()*6000000+1);
				this.setEarthPos(new mapwork.EarthPos(lat,lon,true));
			}
        },
        getTipTitle: function(){
    		return this._json.name;
    	},
        getTipContent: function() {
            return "<p>" + "<img width='200px' height='200px' src='images/lyjd/" 
            	+ this._id + "." + this._json.imageFormat + "' style='float:left; margin:0px 10px 0px 0px;'/>"  + "</p>"
            	+ "<p style='text-indent: 2em;' >" + this._json.content + "</p>";
        },
    	getTipTail: function() {
    		if(this._isEditable){
    			var self = this;
    			$TailDiv.find(":button").get(0).onclick = function(){
    				var param = {};
    				param["poi.id"] = self._json.id;
    				param["poi.latLonString"] = $TailDiv.find(".text_LatLon").val();
    				$.ajax({
    					url : "updatePoi",
    					dataType : "json",
    					data : param,
    					success : function(data){
	    					if(!data.m_detail){
	    						alert(data.msg);
	                    	}else{
	                    		alert(data.m_detail);
	                    	}
    					}
    				});
    			};
    			
    			return $TailDiv;
    		}else{
    			return mapwork.ModuleItem.tailDiv;
    		}
        },
    	getDetailParam: function(){
    		var queryParam={};
            queryParam["poi.id"]=this._id;
            return queryParam;
    	},
        doBeforeOpenTip: function() {
            $TailDiv.find(".text_LatLon").val(this._ePos.getLatLonString());
        },
        
        //重写
        createMapIcon: function() {
            var id = this._id;
            var icon = this._icon;
            var hoverIcon = this._hoverIcon;
            var iconOffset = this._offsetPos;
            var mapIcon = new mapwork.MapDraggableIcon(id, icon,hoverIcon,iconOffset,this._zIndex);
            return mapIcon;
        },
        
        isNeedItemQuery: function(){
    		if(!this._json.imageFormat){
    			return true;
    		}
    	}
        
    }

    if(EXTEND) {
        mapwork.utils.inherits(Travel, EXTEND);
    }    
})();