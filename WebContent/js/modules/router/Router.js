(function() {
	//寻路
    mapwork.Router = Router;

    var EXTEND = null;

    function Router(map,locateRoutePosOnRoadFirst) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
		this._map = map;
		var RouterId = "routeLayer";
        this._urlPath = mapwork.configs[RouterId + "_url"];
        this._routeType = "t";//t: time   l:length
        
		//是否需要对导航点先定位到路线上的处理。false，不做处理   true，处理，鼠标点击的点会设到路线上。
		this._locateRoutePosOnRoadFirst = locateRoutePosOnRoadFirst;
		
		this._vectorLayer = this._map.getLayer(mapwork.MapVectorLayer.ID);
		this._popLayer = this._map.getLayer(mapwork.MapPopLayer.ID);
		
		//起止点图标
		this._startPopo = new mapwork.MapDraggableIcon("startPopo", "images/routestart.png","images/routestart.png",[15,40],1);
		this._endPopo = new mapwork.MapDraggableIcon("endPopo", "images/routeend.png","images/routeend.png",[15,40],1);
		
		//图标拖拽事件
		var self = this;
		this._startPopo.setDraggedFunc(function(newEPos) {
            self.setRoutePos(newEPos,true);
        });
        this._endPopo.setDraggedFunc(function(newEPos) {
            self.setRoutePos(newEPos,false);
        });
        
		this._focusRouteLine = new mapwork.RouterLine();
		this._hoverRouteLine = new mapwork.RouterLine();
		this._focusRouteLine.setColor("#62d8ff");
		this._hoverRouteLine.setColor("#62d8ff");
		this._focusRouteLine.setWidth(3);
		this._hoverRouteLine.setWidth(3);
		this._focusRouteLine.setZIndex(9);
		this._hoverRouteLine.setZIndex(10);
		this._focusRouteLine.setOpacity(1);
		this._hoverRouteLine.setOpacity(1);
		
        this._routerLines = {};
    }

    Router.prototype = {
    		
    	//寻路入口	
    	setRoutePos: function(ePos,isStart) {
			if(this._locateRoutePosOnRoadFirst) {//是否需要把导航点预先定位到路线上
				if(!this._urlPath) {
					return;
				}
				var url = this._urlPath + "?v=" + ePos.getILat() + "," + ePos.getILon();

				var self = this;
				//根据初始坐标,通过R树算法得到最近一条路的相应坐标
				function onResult(data) {
					if(data.pos) {
						var arr = data.pos.split(",");
						if(arr.length == 2) {
							var lat = Number(arr[0]);
							var lon = Number(arr[1]);
							var ePos = new mapwork.EarthPos(lat,lon,true);
							if(isStart) {
								self._startEPos = ePos;
							} else {
								self._endEPos = ePos;
							}
							//重新定位popo图标的坐标
							self.setRoutePopoPos(ePos,isStart);
							self.clearAllRouteLines();
							//开始寻路
							self.doRoute();
						} else {
							if(isStart) {
								self.setRoutePopoPos(self._startEPos,isStart);
							} else {
								self.setRoutePopoPos(self._endEPos,isStart);
							}
						}
					} else if(data.error) {
						if(isStart) {
							self.setRoutePopoPos(self._startEPos,isStart);
						} else {
							self.setRoutePopoPos(self._endEPos,isStart);
						}
					}
				}
				mapwork.utils.loadJsonData(url, function (json) {
						onResult(json)
					});
	//	        /*$.ajax({
	//	            url : url, 
	//				dataType : "json",//这里的dataType就是返回回来的数据格式了html,xml,json 
	//	            cache: false,//设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false 
	//	            success : onResult
	//	        });*/
	//	        
	//	        FlyJSONP.get({
	//		        url: url,
	//		        success: function (json) {
	//	        		onResult(json)
	//		        },
	//		        error: function (errorMsg) {
	//		            //console.log(errorMsg);
	//		        }
	//		    });
			} else {
				this.setRoutePopoPos(ePos,isStart);
				if(isStart) {
					this._startEPos = ePos;
				} else {
					this._endEPos = ePos;
				}
				this.clearAllRouteLines();
				this.doRoute();
			}

    	},
    	
    	//定位icon图标的坐标
    	setRoutePopoPos: function(ePos,isStart) {
	        if(isStart) {
	        	this._startPopo.setEarthPos(ePos);
				if(!this._startPopo.getLayer()) {
					this._popLayer.addElement(this._startPopo);
				}
	        	this._popLayer.resetElement(this._startPopo);
	        } else {
	        	this._endPopo.setEarthPos(ePos);
				if(!this._endPopo.getLayer()) {
					this._popLayer.addElement(this._endPopo);
				}
	        	this._popLayer.resetElement(this._endPopo);
	        }
	    },
	    
	    //开始寻路
        doRoute: function() {
			if(this._currRouterLine) {
				this._currRouterLine.doRemove();
			}
			this._focusRouteLine.doRemove();
			this._hoverRouteLine.doRemove();
			
			//先清空所有途径图标
        	this.clearChannelInfoIcons();
			
			//如果存在当前路线，则直接刷出左边菜单，否则请求后台
	    	this._currRouterLine = this._routerLines[this._routeType];
	    	if(this._currRouterLine){
				this._vectorLayer.addElement(this._currRouterLine);
	    		//刷新RouterLine
	    		this._vectorLayer.resetElement(this._currRouterLine);
	        	//刷出左边菜单
	            this.openSideBar(this._currRouterLine);
	            this.openChannelInfoControl(this);
	            return;
	    	}
	    	
            if(this._startEPos && this._endEPos) {
                var url = this._urlPath + "?p=" + this._startEPos.getILat() + "," + this._startEPos.getILon() 
                		+ "," + this._endEPos.getILat() + "," + this._endEPos.getILon() + "&type=" + this._routeType;
                var self = this;
                
                function onResult(data) {
                    self.onRouteResult(data, self._routeType);
                }
				
		        mapwork.utils.loadJsonData(url, function (json) {
	        		onResult(json)
		        });
				
//                /*$.ajax({
//                    url : url, 
//                    dataType : "json",//这里的dataType就是返回回来的数据格式了html,xml,json 
//                    cache: false,//设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false 
//                    success : onResult
//                });*/
//                
//                FlyJSONP.get({
//    		        url: url,
//    		        success: function (json) {
//    	        		onResult(json)
//    		        },
//    		        error: function (errorMsg) {
//    		            //console.log(errorMsg);
//    		        }
//    		    });
            }
        },
        
        //绘路线图,刷出左菜单
        onRouteResult: function(data, routeType) {
        	if(!data){
        		return;
        	}
        	
        	var currentModule = this._map._currentModule;
        	if(currentModule && currentModule != this){
        		currentModule.clean();
			}
        	
            //创建routerLine
            this._currRouterLine = new mapwork.RouterLine();
			this._currRouterLine.setJsonData(data);
	    	this._routerLines[routeType] = this._currRouterLine;
        	
			this._vectorLayer.addElement(this._currRouterLine);
        	//刷新RouterLine
	    	this._vectorLayer.resetElement(this._currRouterLine);
            
        	//刷出左边菜单
            this.openSideBar(this._currRouterLine);
            
            //刷出途经信息控件
            this.openChannelInfoControl();
        },
        
		
        //显示寻路的sideBar
        openSideBar: function(routerLine){
        	this._jSideBarDiv = $("#sidebar");
            this._sideBarDiv = this._jSideBarDiv.get(0);
            if(!this._sideBar){
            	this._sideBar = new mapwork.RouterSideBar(this, this._sideBarDiv);
            }
            //清空左边菜单
            this._map._currentModule = this;//注册当前module,为了让mapPage中的sideBarResize方法调用到
            this._sideBar.reset();
            this._sideBar.init();
            this._sideBar.onListQueryResult(routerLine);
            
        },
        
        //显示途经信息控件
        openChannelInfoControl: function(){
        	
        	if(!this._channelInfoControl){
        		this._channelInfoControl = this._map.getControl(mapwork.MapChannelInfoControl.ID);
        	}
        	this._channelInfoControl.init(this);
        },
        
        focusSegment: function(segment) {
			this._focusRouteLine.clearPosList();
			if(segment) {
				var ePosArray = segment.ePosArray;
				if(ePosArray) {
					this._focusRouteLine.setEPosArray(ePosArray);
				}
			}
			if(!this._focusRouteLine.getLayer()) {
				this._vectorLayer.addElement(this._focusRouteLine);
			}
			this._vectorLayer.resetElement(this._focusRouteLine);
		},
		
		hoverSegment: function(segment) {
			this._hoverRouteLine.clearPosList();
			if(segment) {
				var ePosArray = segment.ePosArray;
				if(ePosArray) {
					this._hoverRouteLine.setEPosArray(ePosArray);
				}
			}
			
			if(!this._hoverRouteLine.getLayer()) {
				this._vectorLayer.addElement(this._hoverRouteLine);
			}
	
			this._vectorLayer.resetElement(this._hoverRouteLine);
		},
        
        //根据poiNames显示途径信息POI图标
        showPOI: function(poiName, isShow){
			
			var self = this;
			function _bindClick(mapIcon, name) {
				$(mapIcon.getHtmlObj()).click(function(){
					self._map._tip.setTrigger(mapIcon);
					self._map.openTip(mapIcon.getEarthPos(),name,"",null,5);
				});
        	}
			
        	if(this._currRouterLine){
        		var poiList = this._currRouterLine._jsonData["poi"];
        		for(var i in poiList){
        			var poi = poiList[i];
        			if(poiName == poi["type"]){
        				var items = poi["items"];
        				for(var k in items){
        					var item = items[k];
        		        	if(isShow){
        		        		//利用json格式
	                			if(!item["mapIcon"]) {
		        					var name = item["name"];
		                			var pos = item["pos"];
		                			var lat = pos.split(",")[0];
		                			var lon = pos.split(",")[1];
		                			var mapIcon = new mapwork.MapIcon(poiName + k, "images/" + poiName + ".png","images/" + poiName + ".png",[7,7],this.k);
		                			mapIcon.setEarthPos(new mapwork.EarthPos(lat, lon, true));
		                			
		                			//设置图标的单击事件
		                			_bindClick(mapIcon, name);
		                			item["mapIcon"] = mapIcon;
	                			}
	                			this._popLayer.addElement(item["mapIcon"]);
	        	        		this._popLayer.resetElement(item["mapIcon"]);
        		        	} else {
	                			if(item["mapIcon"]) {
	                				//如果tip为显示状态，则判断其触发者是否为当前图标，如果是，则关闭tip
	                				if(this._map._tip.isDisplay()){
		                				if(this._map._tip.getTrigger() == item["mapIcon"]){
		                					this._map.hideTip();
		                				}
	                				}
	                				item["mapIcon"].doRemove();
	                			}
        		        	}
        				}
        			}
        		}
        	}
        },
        //点击返回时的操作,清空popLayer图层
        clean: function(){
        	//清空起止点坐标信息
        	this._startEPos = null;
        	this._endEPos = null;
        	//清空图标和图层的绑定
        	this._startPopo.doRemove();
        	this._endPopo.doRemove();
        	
        	//清空途经图标
        	this.clearChannelInfoIcons();
        	
        	//隐藏途径控件
        	if(this._channelInfoControl){
        		this._channelInfoControl.hide();
        	}
        	//清空tip层
        	this._map.hideTip();
        	
        	//清空所有路线
			this.clearAllRouteLines();
			
			this._currRouterLine = null;
        },
        
        //清空所有途径图标
        clearChannelInfoIcons: function(){
        	//清空tip层
        	this._map.hideTip();
        	
        	if(this._currRouterLine){
        		var poiList = this._currRouterLine._jsonData["poi"];
        		for(var i in poiList){
        			var poi = poiList[i];
    				var items = poi["items"];
    				for(var k in items){
    					var item = items[k];
            			if(item["mapIcon"]) {
            				item["mapIcon"].doRemove();
            			}
    				}
        		}
        	}
        },
        
        //清空所有路线
        clearAllRouteLines: function() {
    		for(var k in this._routerLines) {
    			var routeLine = this._routerLines[k];
    			routeLine.doRemove();
    		}
            this._routerLines = {};
			
			this._focusRouteLine.doRemove();
			this._hoverRouteLine.doRemove();
    	}
    }

    if(EXTEND) {
        mapwork.utils.inherits(Router, EXTEND);
    }    
})();