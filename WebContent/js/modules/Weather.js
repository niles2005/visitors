(function() {
    mapwork.Weather = Weather;

    var EXTEND = mapwork.ModuleItem;

	Weather.ID = "Weather";
	
	Weather.setting = {
		ID : Weather.ID,
        pageUrl : null,
        listUrl : "queryWeatherReport",
		detailUrl : null,
		
		newSidebar: function(module) {
			return new mapwork.WeatherSideBar(module);
		},
		
		newModuleItem: function(module,index) {
			return new Weather(module, index);
		}
	}
	var Weather_xx = {"00":"晴","01":"多云","02":"阴","03":"阵雨","04":"雷阵雨","05":"冰雹","06":"雨夹雪","07":"小雨","08":"中雨","09":"大雨","10":"暴雨",
						"11":"大暴雨","12":"特大暴雨","13":"阵雪","14":"小雪","15":"中雪","16":"大雪","17":"暴雪","18":"雾","19":"冻雨","20":"沙尘暴",
						"21":"小雨到中雨","22":"中雨到大雨","23":"大雨到暴雨","24":"暴雨到大暴雨","25":"大暴雨到特大暴雨",
						"26":"小雪到中雪","27":"中雪到大雪","28":"大雪到暴雪","29":"浮尘","30":"扬沙","31":"强沙尘暴"};

	var Weather_fx = {"0":"","1":"东北风","2":"东风","3":"东南风","4":"南风","5":"西南风","6":"西风","7":"西北风","8":"北风","9":"旋转风"};

	var Weather_fs = {"0":"","1":"3-4级","2":"4-5级","3":"5-6级","4":"6-7级","5":"7-8级","6":"8-9级","7":"9-10级","8":"10-11级","9":"11-12级"};

	var DisplayZoomInfo = {"58027_7":true,"58238_7":true,"58321_7":true,"58457_7":true,"58370_7":true,"58752_7":true,"58437_7":true,"58570_7":true,"58044_7":true,"58633_7":true,
		"58027_8":true,"58238_8":true,"58321_8":true,"58457_8":true,"58370_8":true,"58752_8":true,"58433_8":true,
		"58221_8":true,"58334_8":true,"58559_8":true,"58567_8":true,"58254_8":true,"58269_8":true,"58647_8":true,
		"58633_8":true,"58437_8":true,"58424_8":true,"58203_8":true,"58044_8":true,"58145_8":true,"58354_8":true,"58450_8":true,"58570_8":true,
		"_9":true,"_10":true,"_11":true,"_12":true,"_13":true,"_14":true,"_15":true,"_16":true};

    var weekday=["周日","周一","周二","周三","周四","周五","周六"];
    var dayName = ["今天","明天","后天","","","",""];
    //默认天气图片大小
    var iconWidth = 32,iconHeight = 32;
    
    function Weather(module, index) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
    }

    Weather.prototype = {
        setJsonData: function(json){
            this._json = json;
            this._id = json.id;
            var iconOffset = this.getDayIconOffset(0);
         	//计算气象图的偏移量
			this.setIcon(new mapwork.SpriteImage("images/weathers.png",iconWidth,iconHeight,iconOffset[0],iconOffset[1]));
			this.setZIndex(50);
			this.setOffsetPos([35,48]);
			//设置坐标
			if(json.posX && json.posY) {
				var x = parseInt(json.posX);
				var y = parseInt(json.posY);
				var ePos = mapwork.SHPosMapping.convertShPosToEarthPos(x,y);
				this.setEarthPos(ePos);
			}
			
			//设置当天日期
			var year = this._json.time.substring(0,4);
        	var month = this._json.time.substring(4,6);
        	var day = this._json.time.substring(6,8);
        	this._date = new Date();
        	this._date.setFullYear(year, parseInt(month-1), day);
        },
        changeDate: function(dayIndex) {
            var offset = this.getDayIconOffset(dayIndex);
            var weatherLabel = this.getMapIcon();
            this.getIcon().setOffset(offset[0],offset[1]);
            weatherLabel.setIcon(this.getIcon());
            weatherLabel.setLabel(this._json.pointName , this.getWeahterWD(dayIndex));
        },
        //计算气象图的偏移量
        getDayIconOffset: function(index) {
			var h,l;
            if(index == 0) {
                h = parseInt(this._json.XX1) % 8; 
                l = parseInt(parseInt(this._json.XX1) / 8);
            } else if(index == 1) {
                h = parseInt(this._json.XX2) % 8; 
                l = parseInt(parseInt(this._json.XX2) / 8);
            } else if(index == 2) {
                h = parseInt(this._json.XX3) % 8; 
                l = parseInt(parseInt(this._json.XX3) / 8);
            }
			var offsetX = -h * iconWidth;
			var offsetY = -l * iconHeight;
            return [offsetX,offsetY];
        },
        getTipContent: function() {
            return "";
        },
        getTipTitle: function(){
    		return this._json.pointName;
    	},
        createMapIcon: function() {
            var id = this._id;
            var icon = this._icon;
            var hoverIcon = this._hoverIcon;
            var iconOffset = this._offsetPos;
            var weatherLabel = new mapwork.WeatherLabel(id, icon,hoverIcon,iconOffset,this._zIndex,this);
            weatherLabel.setLabel(this._json.pointName,this.getWeahterWD(0));
            return weatherLabel;

        },
        doHover: function(){
            this.getMapIcon().setHoverImage();
        },
        deHover: function(){
       		this.getMapIcon().setDefaultImage();
        },
        doFocus: function(){
        	var self = this;
        	$(".wb_details").fadeOut("fast", function(){
                $(".wb_details").empty();
        		$(".wb_details").fadeIn("fast"); 
            	$(".wb_details").append(self.getDisplayContent());
            	
            	//绑定天气列表的单击事件:为日历和天气列表设置选中效果,并切换到指定日期的天气
            	$("ul.wb_details > li").each(function(index){
            		$(this).click(function() {
                    	//天气
                        $(this).addClass("on");
                        $(this).siblings().removeClass("on");
                        //日历
                        $("ul.wb_date > li:eq(" + index + ")").addClass("on");
                        $("ul.wb_date > li:eq(" + index + ")").siblings().removeClass("on");
                        //刷新work中的_listObjectArray
                        var listQueryResult = self._module._listQueryResult;
                        for (var i in listQueryResult.rows) {
                        	var item = listQueryResult.rows[i];
                        	if(item._moduleItem) {
                        		item._moduleItem.changeDate(index);
         					}
                        }
                    });
            	});
        	});
        },
        getDisplayContent: function(){
    		return $(this.getSidebarContent());
        },
        
        getSidebarContent: function(){
        	var html =    this.getWeatherInfo(0)
			        	+ this.getWeatherInfo(1)
			        	+ this.getWeatherInfo(2);
        	
        	var wrap = $("<div>" + html + "</div>");
        	//设置title
        	$(".wb_title").html(this.getTipTitle() + "  " + "未来三天天气预报 ");
        	//根据日历设置天气列表的选中效果
        	$("ul.wb_date >li").each(function(index){
        		if($(this).attr("class")){
        			wrap.find("li:eq(" + index + ")").addClass("on");
        			return false;
        		}
        	});
            return wrap.html();
        },
        
        getWeatherInfo: function(dayIndex){
        	//气象图的偏移量
        	var offset = this.getDayIconOffset(dayIndex);
        	
        	return    "<li>"
		            + "	<div class='date'>" + this.getWeatherDate(dayIndex) + "</div>"
		            + "    <div class='weather'>"
		            + "    	<p>" + this.getWeahterXX(dayIndex) + "</p>"
		            + "     <p>" + this.getWeahterWD(dayIndex) + "</p>"
		            + "     <p>" + this.getWeahterFX(dayIndex) + "</p>"
		            + "    </div>"
		            + "    <div class='wd_more'>"
		            + "    <img src='images/transparent.png'  style='width:" + iconWidth + "px; height:" + iconHeight + "px;"
		            + "       background:url(" + this.getIcon()._imageUrl + ")"
					+ "       no-repeat " + offset[0] + "px " + offset[1] + "px'/>"
		            + "    </div>"
		            + "</li>"
        	
        	//旧的样式
//        	return "<div class='list on' style='margin:1px 0px 1px 0px;'>"
//			+ "<div class='list_num' style='width:70px'>" + this.getWeahterDay(dayIndex) + "</div>"
//			+ "<div class='list_text' style='width:160px'>"
//			+ "<h2><span>" + this.getWeahterWD(dayIndex) + "</span></h2>"
//			+ "<h2><span>" + this.getWeahterXX(dayIndex) + "</span></h2>"
//			+ "<h2><span>" + this.getWeahterFX(dayIndex) + "</span></h2>"
//			+ "</div>"
//			+ "<div class='list_text' style='width:50px; position:absolute; right:10px;'>"
//			+ "<img src='images/transparent.png'  style='width:" + iconWidth + "px; height:" 
//			+ iconHeight + "px; background:url(" 
//			+ this.getIcon()._imageUrl + ") no-repeat " + offset[0] + "px " + offset[1] + "px'/>"
//			+ "</div>"
//			+ "</div>";
        },
        //礼拜几和周几的信息
        getWeahterDay: function(dayIndex){
            var index = (this._date.getDay() + dayIndex) % 7;
        	var str = dayName[dayIndex] + " (" + weekday[index] + ") " ;
        	return str;
        },
        //几月几号
        getWeatherDate: function(dayIndex){
            var date = this._date;
            if(dayIndex > 0) {
                date = new Date();
            	date.setTime(this._date.getTime() + 86400000 * dayIndex);
            }
            return (date.getMonth() + 1) + "/" + date.getDate();
        },
        //温度
        getWeahterWD: function(dayIndex){
        	var str;
        	if(dayIndex == 0){
        		str =  this._json.WD1 + "℃~" + this._json.WD1_ + "℃" ;
        	}else if(dayIndex == 1){
        		str =  this._json.WD2 + "℃~" + this._json.WD2_ + "℃" ;
        	}else if(dayIndex == 2){
        		str =  this._json.WD3 + "℃~" + this._json.WD3_ + "℃" ;
        	}
        	return str;
        },
        //天气现象
        getWeahterXX: function(dayIndex){
        	var str;
        	if(dayIndex == 0){
        		str =  Weather_xx[this._json.XX1] ;
        	}else if(dayIndex == 1){
        		str =  Weather_xx[this._json.XX2] ;
        	}else if(dayIndex == 2){
        		str =  Weather_xx[this._json.XX3] ;
        	}
        	return str;
        },
        //风速和风向
        getWeahterFX: function(dayIndex){
        	var str;
        	if(dayIndex == 0){
        		str =  Weather_fx[this._json.FX1] + Weather_fs[this._json.FS1] ;
        	}else if(dayIndex == 1){
        		str =  Weather_fx[this._json.FX2] + Weather_fs[this._json.FS2] ;
        	}else if(dayIndex == 2){
        		str =  Weather_fx[this._json.FX3] + Weather_fs[this._json.FS3] ;
        	}
        	return str;
        },
		isDisplayAtZoom: function(zoom) {
			if(DisplayZoomInfo["_" + zoom] || DisplayZoomInfo[this._id + "_" + zoom]){
				return true;
			}
			return false;
		}
    }

    if(EXTEND) {
        mapwork.utils.inherits(Weather, EXTEND);
    }    
})();