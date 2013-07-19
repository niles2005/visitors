(function() {
	//周边搜索的处理类
    mapwork.RangeSearchHandler = RangeSearchHandler;

    RangeSearchHandler.ID = "RangeSearchHandler";
    
    var EXTEND = mapwork.Handler;

    function RangeSearchHandler() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._handlerId = RangeSearchHandler.ID;
    }

    RangeSearchHandler.prototype = {
    		
    	setMap: function(map) {
	        this._map = map;
	        this._vectorlayer = this._map.getLayer(mapwork.MapVectorLayer.ID);
	        this._mapPopLayer = this._map.getLayer(mapwork.MapPopLayer.ID);
	        this._mapLabelLayer = this._map.getLayer(mapwork.MapLabelLayer.ID);
	        
	        //初始化周边搜索的DIV
	        this._rangeSearchDiv = document.createElement("div");
            $(this._rangeSearchDiv).addClass("rangeSearch");
            $(this._rangeSearchDiv).append(
            		"<div class = 'searchType'>" +
            			"<a name='JTSK' href='javascript:void(0);'>交通实况</a>" + 
            			"<a name='JTZB' href='javascript:void(0);'>交通直播</a>" + 
            			"<a name='YDP' href='javascript:void(0);'>诱导牌</a>" + 
            			"<a name='TextBoard' href='javascript:void(0);'>可变信息板</a>" + 
            			"<a name='Travel' href='javascript:void(0);'>旅游景点</a>" + 
            		"</div>" +
            		"<div class = 'toolsContainer'>" +
            			"<div class = 'title'>" +
            				"<form name='rangeSearchForm'>" +
		            			"<input type='text' id='rangeSearchName'/>" +
		            			"<input type='image' id='rangeSearchButton' src='images/btn_tips_search.gif'>" +
	            			"</form>" +
            			"</div>" + 
            			"<div class = 'content'>" +
            				"<div class = 'aroundRule'>" +
            					"<div class = 'ruleBg'></div>" +
            					"<div class = 'ruleBar'></div>" +
            					"<div class = 'ruleCursor'></div>" +
            				"</div>" +
            				"<div class = 'scale'>" +
            					"<span style='left: 0%' class='tall'><ins style='margin-left: -4px; '>0</ins></span>" + 
            					"<span style='left: 10%'></span>" + 
            					"<span style='left: 20%' class='tall'><ins style='margin-left: -10.5px; '>1km</ins></span>" + 
            					"<span style='left: 30%'></span>" + 
            					"<span style='left: 40%' class='tall'><ins style='margin-left: -10.5px; '>2km</ins></span>" + 
            					"<span style='left: 50%'></span>" +
            					"<span style='left: 60%' class='tall'><ins style='margin-left: -10.5px; '>3km</ins></span>" +
            					"<span style='left: 70%'></span>" +
            					"<span style='left: 80%' class='tall'><ins style='margin-left: -10.5px; '>4km</ins></span>" +
            					"<span style='left: 90%'></span>" +
            					"<span style='left: 100%' class='tall'><ins style='margin-left: -10.5px; '>5km</ins></span>" +
            				"</div>" +
            			"</div>" +
            		"</div>"
            );
            
            //设置游标的拖动事件并屏蔽单击事件
            this._$RuleCursor = $(this._rangeSearchDiv).find(".ruleCursor");
            this._ruleCursor = this._$RuleCursor.get(0);
            this._ruleBar = $(this._rangeSearchDiv).find(".ruleBar").get(0);
            var self = this;
            //屏蔽单击事件
            mapwork.utils.bindEvent(this._ruleCursor, "click", function(event){
            	if(event.stopPropagation) {
					event.stopPropagation();
					event.preventDefault();
				} else {//IE
					event.cancelBubble = true;
					event.returnValue = false;
				}
            });
            mapwork.utils.bindEvent(this._ruleCursor, "mousedown", function(event){
            	self.dragRuleCursor(event);
            });
            
            //设置尺子的单击事件
            this._aroundRule = $(this._rangeSearchDiv).find(".aroundRule").get(0);
			mapwork.utils.bindEvent(this._aroundRule, "click", function(event){
            	self._ruleCursorOffsetX = event.offsetX;
            	self._currentRadius = event.offsetX * 20;
	        	self.doAnimate(event.offsetX);
	        	//点击后自动搜索
	        	self.doSearch();
            });
            
            //form表单
            var rangeSearchForm = $(this._rangeSearchDiv).find("form[name='rangeSearchForm']").get(0);
            rangeSearchForm.onsubmit = function(){
            	self.doSearch();
            	return false;
            };
            
            //设置搜索类型的单击事件
            $(this._rangeSearchDiv).find(".searchType > a").each(function(){
            	this.onclick = function(){
            		var tag = $(this).html(); 
            		$(self._rangeSearchDiv).find("#rangeSearchName").val(tag);
            		self.doSearch();
            	};
            });
            
            //图钉的Y偏移量
            this._pinOffsetY = 34;
            //圈的默认半径
            this._defaultRadius = 500;
            
            //把周边搜索加入菜单
	        var menu = this._map.getMenu();
	        var searchGroup = new mapwork.MenuGroup("search",2);
	        searchGroup.addMenuItem("周边搜索", function() {
	        	self.doMenu(menu.getMousePos());
	        });
	        menu.addMenuGroup(searchGroup);
	        
    	},
    	
    	//设置菜单及菜单单击事件
    	doMenu: function(mousePos){
    		var mapLocation = this._map.getMapLocation();
        	var ePos = mapLocation.getEarthPosFromMapPos(mousePos.posX,mousePos.posY);
        	this.openRangeSearchControl(ePos);
    	},
    	
    	//打开范围搜索控件
    	openRangeSearchControl: function(ePos){
    		var self = this;
    		var closeTip = function(){
    			self.doClose();
    		};
    		this._map.openTip(ePos, "周边搜索", this._rangeSearchDiv, "", this._pinOffsetY, closeTip);
        	//创建圆圈,图钉,阴影,距离label等
    		var radius = this._currentRadius ? this._currentRadius : this._defaultRadius;
        	this.createControl(ePos, radius);
        	//设置初始刻度尺位置
        	this._ruleCursorOffsetX = radius/20;
        	this._ruleCursor.style.left = radius/20 + "px";
    		this._ruleBar.style.width = radius/20 + "px";
    	},
    	
    	//创建控件
    	createControl: function(ePos, radius){
    		//圆
    		if(!this._searchCircle){
    			this._searchCircle = new mapwork.MapCircle("rangeSearchCircle");
    			this._searchCircle.setColor("#1791fc");
    			this._searchCircle.setFillColor("#1791fc");
    			this._searchCircle.setFillOpacity("0.2");
    			this._searchCircle.setStrokeOpacity("0.8");
    			this._searchCircle.setWidth("1");
    		}
    		this._searchCircle.setCenterPos(ePos);
    		this._searchCircle.setRadius(radius);
        	this._vectorlayer.addElement(this._searchCircle);
        	this._vectorlayer.resetElement(this._searchCircle);
        	
        	var eEdgePos = this._searchCircle.getEEdgePos();
        	
        	//半径线
        	if(!this._radiusLine){
        		this._radiusLine = new mapwork.MapPath("radiusLine");
        		this._radiusLine.setDash("5,5");
        		this._radiusLine.setColor("#1791fc");
        		this._radiusLine.setWidth("1");
        	}
        	this._radiusLine.clearPosList();//先清空线的点
        	this._radiusLine.addPos(ePos);
        	this._radiusLine.addPos(eEdgePos);
        	this._vectorlayer.addElement(this._radiusLine);
        	this._vectorlayer.resetElement(this._radiusLine);
        	
        	//距离标签
        	if(eEdgePos){
        		if(!this._circleLabel){
        			this._circleLabel = new mapwork.MapLabel("circleLabel");
        		}
        		this._circleLabel.setPos(eEdgePos);
        		this._circleLabel.setName(parseInt(radius) + "米");
        		this._circleLabel._offsetPos = [6,-13];
        		this._mapLabelLayer.addElement(this._circleLabel);
        		this._mapLabelLayer.resetElement(this._circleLabel);
        	}
        	
        	//圆球
        	if(eEdgePos){
	        	if(!this._ball){
	        		this._ball = new mapwork.MapIcon("boll", "images/ball.png", "images/ball.png" ,[5,5],100);
	        		var self = this;
	        		//暂时去掉拖拽事件
//	        		this._ball.getHtmlObj().onmousedown = function(event){
//	                	self.dragRuleCursor(event);
//	                };
	        	}
	        	this._ball.setPos(eEdgePos);
	        	this._mapPopLayer.addElement(this._ball);
	        	this._mapPopLayer.resetElement(this._ball);
        	}
        	
        	//图钉
        	if(!this._pin){
        		this._pin = new mapwork.MapDraggableIcon("pin", "images/arrow.png", "images/arrow.png" ,[11,this._pinOffsetY],100);
				var self = this;
				//图钉的拖拽后续事件
				this._pin.setDraggedFunc(function() {
					var draggedEPos = self._pin.getEarthPos();
					if(draggedEPos){
						ePos = draggedEPos;
					}
					self.openRangeSearchControl(ePos);
					self.doSearch();
				});
	    		//图钉的阴影
        		this._pinShadow = new mapwork.MapIcon("pinShadow", "images/arrowshadow.png", "images/arrowshadow.png" ,[0,22],90);
        		this._pin.setShadowIcon(this._pinShadow);
        	}
        	//图钉的单击事件
        	var self = this;
			this._pin.getHtmlObj().onclick = function(){
    			self.openRangeSearchControl(ePos);
    		};
        	this._pin.setPos(ePos);
        	this._pinShadow.setPos(ePos);
        	this._mapPopLayer.addElement(this._pin);
        	this._mapPopLayer.addElement(this._pinShadow);
        	this._mapPopLayer.resetElement(this._pin);
        	this._mapPopLayer.resetElement(this._pinShadow);
    	},
    	
    	//清空圆圈,半径线,距离标签,图钉,阴影
    	doClose: function(){
    		if(this._searchCircle){
    			this._searchCircle.doRemove();
    			this._searchCircle = null;
    		}
    		if(this._radiusLine){
    			this._radiusLine.doRemove();
    			this._radiusLine = null;
    		}
    		if(this._circleLabel){
    			this._circleLabel.doRemove();
    			this._circleLabel = null;
    		}
    		if(this._ball){
    			this._ball.doRemove();
    			this._ball = null;
    		}
    		if(!this._searched){
    			this.closePin();
    		}
    	},
    	//清空图钉
    	closePin: function(){
    		this._pin.doRemove();
			this._pinShadow.doRemove();
			this._pin = null;
			this._pinShadow = null;
    	},
    	
    	//游标的拖动事件
    	dragRuleCursor: function(event){
    		this._pressX = mapwork.utils.getPageX(event);
    		if(event.stopPropagation) {
                event.stopPropagation();
				event.preventDefault();
                if(event.button != 0) {
                    return;
                }
            }
    		//单击变色
    		this._$RuleCursor.addClass("ruleCursorHover");
    		var self = this;
    		var dragging = function(event) {
				if(event.stopPropagation) {
					event.stopPropagation();
					event.preventDefault();
				}
				var offsetX = self._ruleCursorOffsetX + mapwork.utils.getPageX(event) - self._pressX;
				if(offsetX >= 0 && offsetX <= 250){
					//动画效果:改变刻度尺,改变圈大小,改变半径线,改变圆球,改变距离标签
					self.doAnimate(offsetX);
				}
			}
    		
			var dropped = function(event) {
				if(event.stopPropagation) {
					event.stopPropagation();
					event.preventDefault();
				}
				$(document).unbind("mousemove", dragging);
				$(document).unbind("mouseup", dropped);
				//放掉变色
				self._$RuleCursor.removeClass("ruleCursorHover");
				//记录位置
				self._ruleCursorOffsetX = self._$RuleCursor.position().left;
				self._currentRadius = self._$RuleCursor.position().left * 20;
				//鼠标放掉后自动搜索
				self.doSearch();
			}
			
    		$(document).bind("mousemove", dragging);
    		$(document).bind("mouseup", dropped);
    	},
    	
    	doAnimate: function(offsetX){
    		//改变刻度尺长度
    		this._ruleCursor.style.left = offsetX + "px";
    		this._ruleBar.style.width = offsetX + "px";
    		//设置圈的半径
    		this.setCircleRadius(offsetX);
    		//设置距离label
    		this.setCircleLabel(offsetX);
    		//设置半径线
    		this.setRadiusLine();
    		//设置圆球
    		this.setBall();
    	},
    	
    	//设置圈的半径
    	setCircleRadius: function(offsetX){
    		this._searchCircle.setRadius(offsetX * 20);
    		this._vectorlayer.resetElement(this._searchCircle);
    	},
    	//设置距离label
    	setCircleLabel: function(offsetX){
    		var length = parseInt(offsetX * 20);
    		this._circleLabel.setName(length + "米");
    		var newEPos = this._searchCircle.getEEdgePos();
    		this._circleLabel.setPos(newEPos);
    		this._mapLabelLayer.resetElement(this._circleLabel);
    	},
    	//设置半径线
    	setRadiusLine: function(){
    		//先清空半径线的点数据
    		this._radiusLine.clearPosList();
    		var eCenterPos = this._searchCircle.getECenterPos();
    		var eEdgePos = this._searchCircle.getEEdgePos();
    		this._radiusLine.addPos(eCenterPos);
        	this._radiusLine.addPos(eEdgePos);
        	this._vectorlayer.resetElement(this._radiusLine);
    	},
    	//设置圆球
    	setBall: function(){
    		var newEPos = this._searchCircle.getEEdgePos();
    		this._ball.setPos(newEPos);
    		this._mapPopLayer.resetElement(this._ball);
    	},
    	
    	doSearch: function(name){
    		var searchName = name ? name : $(this._rangeSearchDiv).find("#rangeSearchName").val();
			if($.trim(searchName) == "") {
				return;
			}
			$(this._rangeSearchDiv).find("#rangeSearchName").val(searchName);
			//是否搜索过了
    		this._searched = true;
    		//1.清空原当前module中的大图标
    		var currentModule = this._map._currentModule;
    		if(currentModule){
    			currentModule.doRemoveIconList();
    		}
    		//2.清空原当前module中的小图标
        	var listLayer = this._map.getLayer("moduleListLayer");
        	if(listLayer){
        		listLayer.empty();
        	}
        	
        	var searchModule = this._map.getModule(mapwork.Search.ID);
        	searchModule.init();
        	searchModule.setSearchHandler(this);
        	this._map._currentModule = searchModule;
        	searchModule.setSearchType("range");
        	var epos = this._searchCircle._eCenterPos;
        	var radius = this._searchCircle._radius;
        	searchModule.setSearchCenterEPos(epos);

        	searchModule.setSearchRadius(radius);
        	searchModule.doPageQuery(null,null,searchName);
    	}
    }

    if(EXTEND) {
        mapwork.utils.inherits(RangeSearchHandler, EXTEND);
    }    
})();