(function() {
    var html = 

    	'<div class="search_title">'+
		'	<span class="left back"><a href="javascript:void(0);">返回</a></span>'+
		'</div>'+
		'<div class="container">' + 
			'<div class="bus_main" id="bus_scroll">'+
			'</div>'+
		'</div>' + 
        '<div class="busline">'+
	    '	<div class="left">'+
	    '    	<span><a href="#" title="">重选起终点</a></span>'+
	    '        <span><a href="#" title="">纠错</a></span>'+
	    '    </div>'+
	    '    <div class="right">'+
	    '    	<span>查看：</span>'+
	    '        <span><a href="#" title="">返程</a></span>'+
	    '    </div>'+
        '</div>';
    
    var jConentDiv = $(html);
    var jContainerDiv = jConentDiv.find(".bus_main");
    
    mapwork.RouterSideBar = RouterSideBar;
    var EXTEND = mapwork.SideBar;
    
    RouterSideBar.selectObject = null;

    function RouterSideBar(router, wrapDiv) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._wrapDiv = wrapDiv;
        this._jWrapDiv = $(wrapDiv);
        this._jWrapDiv.empty();
        this._router = router;
    }

    RouterSideBar.prototype = {
		init: function() {
	    	var self = this;
	    	
	    	//返回按钮单击事件
	    	jConentDiv.find(".left.back > a").click(function(){
	    		self.clean();
	    		self._router.clean();
	    	});
	    	
	        this._jWrapDiv.append(jConentDiv);
	        this._jWrapDiv.show();
	        //调整左边菜单内容的实际高度,以适应浏览器的窗口大小
            this.adjustSideBarHeight();
	    },
	    
	    //调整左边菜单内容的实际高度,以适应浏览器的窗口大小
        adjustSideBarHeight: function(){
	    	jContainerDiv.height($("#w").height() - $(".mb_line").outerHeight() - $(".busline").outerHeight() - $(".busline:last").outerHeight());
        },
		
        //文档窗口改变大小时触发
        //由每个业务的来实现
        resize: function(){
			this.adjustSideBarHeight();
        },
        
        onListQueryResult: function(routerLine) {
	    	var data = routerLine.getJsonData();
	    	var segmentArray = data["segments"];
            if (data) {
                function wrapContent(index,info){
                	return   $('<div class="list">'+
	    					  '	<div class="list_top">'+
	    					  '     <div class="index">' + (parseInt(index) + 1) + ". " + '</div>'+
	    					  '		<div class="list_title">' + info + '</div>'+
	    		        	  '	</div>'+
	    		        	  '</div>');
            	}

            	
            	var routeType = data["routeType"];
                var from = data["fromName"];
                var to = data["toName"];
                var totallen = data["totallen"];
                var totaltime = data["totaltime"];
                
                var self = this;
                
                jContainerDiv.html(	
                		'	<div class="bus_show">'+
                		'    	<ul class="bus_menu">'+
                		'            <li id="bm1" class="on">最少时间</li>'+
                		'            <li id="bm2" class="off">最短路程</li>'+
                		'        </ul>'+
                		'        <div class="bus_result">'+
                					//最少时间,最短距离公用
                		'        	<div class="dis" id="bms1">'+
                		'            	<div class="bs_top">'+
                		'                	<span class="padlr10"><b>全程</b></span>'+
                		'                    <span></span>'+
                		'                </div>'+
                		'                <div class="bs_start">'+
                		'                	<span class="bs_title"></span>'+
                		'                </div>'+
                		'                <div class="listbox" id="resultbox">'+
                		
//                		'                    <div class="list">'+
//                		'                        <div class="list_top">'+
//                		'                        	<div class="list_title">1.从起点到内环高架</div>'+
//                		'                            <div class="list_show">收起</div>'+
//                		'                        </div>'+
//                		'                    </div>'+
                		
                		'                </div>'+
                		'                <div class="bs_end"></div>'+
                		'            </div>'+
                		'        </div>' +
                		'    </div>');
                
                this._jListbox = jContainerDiv.find(".listbox");
                
            	//起点
                jContainerDiv.find(".bs_start .bs_title").html(from);
            	//终点
                jContainerDiv.find(".bs_end").html(to);
            	//全程的距离和时间
                if(totallen && totaltime){
                	jContainerDiv.find(".bs_top").find("span:last").html("约" + totallen + "/ " + totaltime);
                }else{
                	jContainerDiv.find(".bs_top").html("抱歉，没有找到从[" + from + "]到[" + to + "]的路线");
                }
                
                if(self._router._routeType == "t"){
                	var bm1 = jContainerDiv.find("#bm1");
                	bm1.siblings().removeClass("on");
                	bm1.siblings().addClass("off");
                	bm1.addClass("on");
                }else{
                	var bm2 = jContainerDiv.find("#bm2");
                	bm2.siblings().removeClass("on");
                	bm2.siblings().addClass("off");
                	bm2.addClass("on");
                }
                
                //最少时间单击事件
    	    	jConentDiv.find(".bus_menu > #bm1").click(function(){
    	    		self._router._routeType = "t"
    	    		self._router.doRoute();
    	    	});
    	    	
    	    	//最短路程单击事件
    	    	jConentDiv.find(".bus_menu > #bm2").click(function(){
    	    		self._router._routeType = "l"
    	    		self._router.doRoute();
    	    	});
            	
            	for (var i in segmentArray) {
                    var segment = segmentArray[i];
                    var jContent = segment["content"];
                    if(!jContent) {
                        jContent = wrapContent(i,segment.info);
                        segment["content"] = jContent;
                    }
					if(jContent) {
						var div = jContent.get(0);
						div.segment = segment;
						jContent.hover(function() {
							$(this).addClass("on");
							self._router.hoverSegment(this.segment);
						}, function() {
							$(this).removeClass("on");
							self._router.hoverSegment(null);
						})
						jContent.click(function() {
							
							var selectedObject = mapwork.RouterSideBar.selectObject;
							if(selectedObject && selectedObject != $(this)) {
								selectedObject.removeClass("clicked");
							}
							mapwork.RouterSideBar.selectObject = $(this);
							$(this).addClass("clicked");
							self._router.focusSegment(this.segment);
						})
						
	                    this._jListbox.append(jContent);
					}
                }
                
            }
            
            //滚动条
//            jContainerDiv.mCustomScrollbar({
//				scrollButtons:{
//					enable:true
//				}
//			});
        },
        //点击返回时做的清空操作
        clean: function(){
        	$("div[name='indexDiv']").show();
        	$("#sidebar").hide();
        	jConentDiv.find(".bus_menu > #bm1").removeClass("off");
	    	jConentDiv.find(".bus_menu > #bm1").addClass("on");
	    	jConentDiv.find(".bus_menu > #bm2").removeClass("on");
	    	jConentDiv.find(".bus_menu > #bm2").addClass("off");
        	this.reset();
        },
        
        //刷新左菜单
        reset: function(){
        	if(this._jListbox){
        		this._jListbox.empty();
        	}
        	this._jWrapDiv.empty();
        }
        
    }

    if(EXTEND) {
        mapwork.utils.inherits(RouterSideBar, EXTEND);
    }    
})();