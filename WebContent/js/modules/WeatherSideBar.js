(function() {
    mapwork.WeatherSideBar = WeatherSideBar;

    var EXTEND = mapwork.BaseSideBar;

    var html = "<div class='weatherbox'>"
    	+ "<div id='btnReturn' class='wb_top'><a href='javascript:void(0);' title='返回' class='wb_back'>返回</a></div>"
    	+ "<div class='wb_title'>点击城市，了解天气状况</div>"
    	//置顶的日历
    	+ "<ul class='wb_date'>"
    	+ "<li id='d0' class='on'>"
        + " <p class='date'></p>"
        + " <p class='month'></p>"
        + "</li>"
        + "<li id='d1'>"
        + "	<p class='date'></p>"
        + " <p class='month'></p>"
        + "</li>"
        + "<li id='d2'>"
        + "	<p class='date'></p>"
        + " <p class='month'></p>"
        + "</li>"
        + "</ul>"
        
    	//天气的UL,由weatherObject提供
        + "<ul class='wb_details'>"
        + "</ul>";

    var $ConentDiv = $(html);
    var $Title = $ConentDiv.find(".wb_title");
    var $Li = $ConentDiv.find(".wb_date li");
    var $Content = $ConentDiv.find(".wb_details");
    
    function WeatherSideBar(module) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
    }

    WeatherSideBar.prototype = {
		init: function() {
	        $("#indexbox").hide();
			
			this._$SideBarDiv = $("#sidebar");
	        this._$SideBarDiv.empty();
			
	        this._$SideBarDiv.append($ConentDiv);
	        
	        var self = this;
	        //初始化时绑定置顶日历的单击事件:为日历和天气列表设置选中效果,并切换到指定日期的天气
	        $Li.each(function(index) {
	            $(this).click(function() {
	            	//日历
	                $(this).addClass("on");
	                $(this).siblings().removeClass("on");
	                //天气
	                $("ul.wb_details > li:eq(" + index + ")").addClass("on");
	                $("ul.wb_details > li:eq(" + index + ")").siblings().removeClass("on");
	                //刷新work中的_listObjectArray
					self._module.workAllListItem(function(moduleItem) {
						moduleItem.changeDate(index);
					});
	            });
	        });
	        
	        this._$SideBarDiv.show();
			
			$("#btnReturn").click(function() {
				self.doReturn();
			});
			
	    },
	    getWeatherDate: function(dayIndex){
            var date = this._date;
            if(dayIndex > 0) {
                date = new Date();
            	date.setTime(this._date.getTime() + 86400000 * dayIndex);
            }
            return (date.getMonth() + 1) + "月:" + date.getDate();
        },
        onListQueryResult: function(jsonResult) {
        	var data = jsonResult;
            if (data) {
                if (!data.m_detail) {
                    if ($.isArray(data.rows)) {
                    	var weather = data.rows[0];
                    	var year = weather.time.substring(0,4);
                    	var month = weather.time.substring(4,6);
                    	var day = weather.time.substring(6,8);
                    	this._date = new Date();
                    	this._date.setFullYear(year, parseInt(month-1), day);
                    	//当ajax数据查询完毕后,初始化置顶日历的显示信息
                    	var self = this;
                    	$Li.each(function(index) {
                            var date = self.getWeatherDate(index);
                            $(this).find(".date").html(date.split(":")[1]);
                    	 	$(this).find(".month").html(date.split(":")[0]);
                        });
                    } 
                } 
            }    	
        },
        
        //点击返回时做的清空操作
        clean: function(){
        	$Li.each(function(index) {
        		$(this).removeClass("on");
                $(this).find(".date").empty();
                $(this).find(".month").empty();
                $Title.html("点击城市，了解天气状况");
            });
        	$Li.eq(0).addClass("on");
        	$Content.empty();
        	this._$SideBarDiv.empty();
        },
		doReturn: function(){
			$("div[name='indexDiv']").show();
			this._$SideBarDiv.hide();
			this._module.clean();
		}
		
    }

    if(EXTEND) {
        mapwork.utils.inherits(WeatherSideBar, EXTEND);
    }    
})();