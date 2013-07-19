(function() {
    mapwork.MapChannelInfoControl = MapChannelInfoControl;
    MapChannelInfoControl.ID = "MapChannelInfoControl";

    var EXTEND = mapwork.Control;

    function MapChannelInfoControl() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._controlId = MapChannelInfoControl.ID;
        this._div.style["zIndex"] = 9800;
    }
	
    MapChannelInfoControl.prototype = {
    	addItem: function(type,typeName,num,listener) {
			
		},
    	init: function(router){
    		this._router = router;
    		var jsonDate = this._router._currRouterLine._jsonData;
    		var poiList = jsonDate["poi"];
    		
    		//先清空控件menu
    		$(this._div).find(".ctrl_menu").empty();
    		//根据json渲染控件
    		for(var i in poiList){
    			var poi = poiList[i];
    			var type = poi["type"];
    			var typeName = poi["name"];
    			var num = poi["items"].length;
    			this._$Menu.append(
						"		<li name='" + type + "'>"+
		            	"			<span class='itemCheck'></span>"+
		            	"			<span class='icon' style='background:url(images/" + type + ".png)'></span>"+
		            	"			<span class='name'>" + typeName + "<span>"+
		            	"			<span class='number'>" + num + "个</span>"+
		            	"		</li>"
				);
    			if(num == 0){
    				this._$Menu.find("li:last").addClass("itemDisabled");
    			}
    		}
    		
    		//为li们设置事件
    		var self = this;
    		this._$Menu.find("li:not(.itemDisabled)").each(function(){
        		
            	//设置鼠标徘徊事件
            	$(this).hover(
        			function(){
        				$(this).addClass("on");
        				$(this).find(".itemCheck").addClass("on");
            		}, 
            		function(){
            			$(this).removeClass("on");
            			$(this).find(".itemCheck").removeClass("on");
            		}
        		);
        		//设置单击事件
            	$(this).click(
        			function(){
        				$(this).find(".itemCheck").toggleClass("click");
        				
        				//刷出被选中的POI
        				var isShow = false;
        				if($(this).find(".itemCheck").hasClass("click")){
        					isShow = true;
        				}
        				self._router.showPOI($(this).attr("name"), isShow);
            		}
            	);
            });
    		//显示控件
    		this.show();
    		
    	},
        setMap: function(map) {
            this._map = map;
            $(this._div).addClass("channelInfoControl");
            $(this._div).append(
            	"<div class='title'>途经信息</div>"+
            	"<div class='content'>"+
            	"	<ul class='ctrl_menu'>"+
//            	"		<li name='jyz'>"+
//            	"			<span class='itemCheck'></span>"+
//            	"			<span class='icon'></span>"+
//            	"			<span class='name'>加油站<span>"+
//            	"			<span class='number'></span>"+
//            	"		</li>"+
            	"	</ul>"+
            	"	<div class='drop'>"+
            	"		<img src='images/drapdown.png'/>"+
            	"	</div>"+
            	"</div>"
            );
            
            //设置滑动drop的单击动画事件
            var self = this;

            $(this._div).find(".title,.drop").click(function(){
            	var img = $(self._div).find(".drop > img");
            	var speed = 250;
            	if($(self._$Menu).css("display") != "none"){
            		//关闭,先把div宽度缩小，再把高度缩小
            		$(self._div).animate({width:"60px",height:"31px"},speed);
            		self._$Menu.hide();
            		img.attr("src", "images/drapdown.png");
            	}else{
            		//打开,先把div宽度放大，再把高度放大
            		$(self._div).animate({width:"160px",height:"118px"},speed);
            		self._$Menu.show(speed);
            		img.attr("src", "images/drapup.png");
            	}
            });
            
            this._$Menu = $(this._div).find(".ctrl_menu");
        },
        
        show: function(){
        	$(this._div).show();
        },
        
        hide: function(){
        	$(this._div).hide();
        }
    };
	
	if(EXTEND) {
        mapwork.utils.inherits(MapChannelInfoControl, EXTEND);
    }    
})();