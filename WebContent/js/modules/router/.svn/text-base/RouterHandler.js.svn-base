(function() {
	//寻路的处理类
    mapwork.RouterHandler = RouterHandler;

    RouterHandler.ID = "RouterHandler";
    
    var EXTEND = mapwork.Handler;

    function RouterHandler() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._handlerId = RouterHandler.ID;
    }

    RouterHandler.prototype = {
    		
    	setMap: function(map) {
	        this._map = map;
	        this._router = new mapwork.Router(map,true);
	        
	        var self = this;
			
	        //设置菜单及菜单单击事件
	        var menu = this._map.getMenu();
	        var routerMenu = new mapwork.MenuGroup("\u5bfb\u8def",1);//寻路

			function doMeun(isStart) {
	        	var mapLocation = self._map.getMapLocation();
	        	var mousePos = menu.getMousePos();
	        	var ePos = mapLocation.getEarthPosFromMapPos(mousePos.posX,mousePos.posY);
				self._router.setRoutePos(ePos,isStart);
			}

			routerMenu.addMenuItem("\u4ee5\u6b64\u4e3a\u8d77\u70b9",function() {//以此为起点
				doMeun(true);
	        });
	        routerMenu.addMenuItem("\u4ee5\u6b64\u4e3a\u7ec8\u70b9",function() {//以此为终点
				doMeun(false);
	        });
	        
	        menu.addMenuGroup(routerMenu);
	        
    	}
    }

    if(EXTEND) {
        mapwork.utils.inherits(RouterHandler, EXTEND);
    }    
})();