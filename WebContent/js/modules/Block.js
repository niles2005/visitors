(function() {
    mapwork.Block = Block;

    var EXTEND = mapwork.ModuleItem;
	Block.ID = "Block";
	
	Block.setting = {
		ID : Block.ID,
        pageUrl : "queryRoadEvents",
        listUrl : "queryAllRoadEvents",
		detailUrl : "queryRoadEventsById",
		
//		newSidebar: function(module) {
//			return new mapwork.SideBarPage(module);
//		},
		newModuleItem: function(module,index) {
			return new Block(module, index);
		},
		clean: function(module){
			//删除所有阻断线
			if(module._blockLineArray){
				for(var i in module._blockLineArray){
					module._blockLineArray[i].doRemove();
				}
			}
			
			//删除断点
			if(module._breakPointArray){
				for(var i in module._breakPointArray){
					module._breakPointArray[i].doRemove();
				}
			}
			//删除桩号标签
			if(module._numLabelArray){
				for(var i in module._numLabelArray){
					module._numLabelArray[i].doRemove();
				}
			}
		}
	}

	//道路阻断
    function Block(module, index) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        
        this._vectorlayer = this._module._map.getLayer(mapwork.MapVectorLayer.ID);
        
		this._tipOffsetTop4Icon = 5;
		this._tipOffsetTop4Pop = 30;
    }

    Block.prototype = {
        setJsonData: function(json){
            var ePos;
            this._json = json;
            this._id = json.tableId + "_" + json.tableKey;
            if(this._index == undefined){//小点
            	this._name = this._json.roadName ;
                this.setIcon("images/block_" + json.imageType + ".png");
                this.setHoverIcon("images/block_" + json.imageType + "H.png");
                this.setOffsetPos([9,9]);
            }else{//大点
                this._name = this._json.roadName ;
                this.setZIndex(100 - parseInt(this._index));
                this.setIcon("images/r0" + this._index + ".png");
                this.setHoverIcon("images/b0" + this._index + ".png");
                this.setDescribe("<p>桩号: " + json.startNumDis + " - " + json.endNumDis + "</p>" +
                		"<p>处置措施: " + json.precautionName + "</p>" + 
                		"<p>预计恢复时间: " + json.planTime + "</p>");
                this.setOffsetPos([11,31]);
            }
			if(json.markingNumber) {
				var arr = json.markingNumber.split(",");
				var x = parseInt(arr[0]);
				var y = parseInt(arr[1]);
				ePos = mapwork.SHPosMapping.convertShPosToEarthPos(x,y);
				this.setEarthPos(ePos);
			}
        },
		
		getDetailParam: function(){
    		var queryParam={};
            queryParam["roadEvents.tableKey"]=this._json.tableKey;
            queryParam["roadEvents.tableId"]=this._json.tableId;
            return queryParam;
    	},
		getTipTitle : function() {
			return this._json.roadName;
		},
		getTipContent : function() {
			var content =  "<div>" + 
								"<p><span style='font-weight:bolder'>路线编号:</span> " + this._json.roadNumber + "&nbsp;&nbsp;&nbsp;" + 
								"<input id='blockButton' style='display:none;' title='放大此路段' type='image' src='images/glass.png'/>" + 
								"</p>" + 
								"<p><span style='font-weight:bolder'>起 止 位 置:</span> 桩号(" + this._json.startNumDis + " - " + this._json.endNumDis + ")</p>" +
					    		"<p><span style='font-weight:bolder'>处置措施:</span> " + this._json.precautionName + "</p>" +
					    		"<p><span style='font-weight:bolder'>开 始 时 间:</span> " + this._json.detectionTime + "</p>" +
					    		"<p><span style='font-weight:bolder'>预计恢复时间:</span> " + this._json.planTime + "</p>" +
					    		"<p><span style='font-weight:bolder'>阻 断 原 因:</span> " + this._json.reasonName + "</p>" +
					    		"<p><span style='font-weight:bolder'>描       述:</span> " + this._json.describe1 + "</p>" + 
				    		"</div>";
			
			var $Content = $(content);
			
			//放大镜:画出阻断路线
			var ePosArray = this.getBlockEPosList();
			if(ePosArray){
				var self = this;
				var blockButton = $Content.find("#blockButton");
				blockButton.show();
				blockButton.click(function(){
					//阻断线
					//阻断线数组
					self._module._blockLineArray = [];
					self.createBlockLine(ePosArray);
				});
			}
			
			return $Content;
		},
		
		//"637581,486141;637294,486178;|637294,486178;636745,486249;|636745,486249;636451,486286;|636451,486286;636180,486322;|636180,486322;636155,486326;|636155,486326;635422,486447;|635422,486447;635184,486503;634534,486689;634155,486767;|634155,486767;633901,486812;|633901,486812;633874,486817;|633874,486817;633719,486844;|633719,486844;633682,486850;|633682,486850;633535,486876;|633535,486876;633342,486911;|633342,486911;633125,486949;|633125,486949;632868,486984;|632868,486984;632827,486984;|632827,486984;632499,486965;|632499,486965;632355,486956;|632355,486956;632150,486935;|632150,486935;631971,486908;|631971,486908;631834,486884;631727,486848;|631727,486848;631654,486814;|631654,486814;631550,486768;631053,486607;"
        getBlockEPosList: function() {
			var points = this._json.points;
			if(points.trim().length == 0){
				return null;
			}
//			var points = "637581,486141;637294,486178;|637294,486178;636745,486249;|636745,486249;636451,486286;|636451,486286;636180,486322;|636180,486322;636155,486326;|636155,486326;635422,486447;|635422,486447;635184,486503;634534,486689;634155,486767;|634155,486767;633901,486812;|633901,486812;633874,486817;|633874,486817;633719,486844;|633719,486844;633682,486850;|633682,486850;633535,486876;|633535,486876;633342,486911;|633342,486911;633125,486949;|633125,486949;632868,486984;|632868,486984;632827,486984;|632827,486984;632499,486965;|632499,486965;632355,486956;|632355,486956;632150,486935;|632150,486935;631971,486908;|631971,486908;631834,486884;631727,486848;|631727,486848;631654,486814;|631654,486814;631550,486768;631053,486607;";
			points = points.replace(new RegExp("[|]","gm"),"");   
			points = points.replace(new RegExp(";","gm"),",");
			if(points.charAt(points.length - 1) == ',') {
				points = points.substring(0, points.length - 1);
			}
			var retList = [];
			var ss = points.split(",");
			for(var k =0;k<ss.length;k+=2) {
				var x = parseInt(ss[k]);
				var y = parseInt(ss[k+1]);
				retList.push(mapwork.SHPosMapping.convertShPosToEarthPos(x,y));
			}
			return retList;
		},
		
		//绘制阻断路线
		createBlockLine: function(ePosArray){
			var blockLine = new mapwork.MapPath("blockLine");
			blockLine.setColor("yellowGreen");
			blockLine.setWidth("5");
			blockLine.setOpacity("0.7");
			blockLine.setEPosArray(ePosArray);
			this._vectorlayer.addElement(blockLine);
			this._vectorlayer.resetElement(blockLine);
			//放入数组
			this._module._blockLineArray.push(blockLine);
			
			//fitBounds
			var bounds = new mapwork.Bounds();
			for(i in ePosArray){
				var gPos = ePosArray[i].convert2GlobalPos();
				bounds.expandToIncludePoint(gPos.getPosX(), gPos.getPosY());
			}
			//聚焦
			this._module._map.fitBounds(bounds);
		},
		
		//显示阻断查询页面
		showQueryBlock: function(){
			//去掉分页样式
			$(".result_search").height($(".result_search").height() + $(".page").innerHeight());
			$(".page").remove();
			$(".search_title .right").remove();
			
			//阻断线数组
			this._sxxList = {"0":"无上下行","1":"上行","2":"下行","12":"上下行"};
			this._module._blockLineArray = [];
			this.setMap(this._module._map);
			var queryDiv = $("<div id='queryBlock' style='margin-top:10px; border-bottom:1px #EBEBEB solid;'>" +
								"<div style='padding:3px 0;margin-left:18px;'>" +
									"<div style='padding:3px 0;position:relative;'>" +
										"<span>路线编码:</span><input id='lxbm' style='width:150px; margin-left:20px;' type='text' value=''  />" +
										"<span class='show' style='display: block; position:absolute;color:#BBB;font-size:10px;left:80px;top:7px; '>请输入以G/Y/X开头的编码</span>" + 
									"</div>" + 
									"<div id='suggest' style='display:none;position:absolute;border:1px solid #96AECE;background:white; overflow:hidden; width:152px; height:150px;left:91px;top:41px;'></div>" + 
									"<div style='padding:3px 0;'>" +
										"<span>桩号范围:<span>" +
										"<input id='startNum' style='width:40px; margin-left:20px;' type='text' value='0' />" + " k ~ " +
										"<input id='endNum' style='width:40px;' type='text' value='0.5' />" +  " k " + 
									"</div>" +
									"<div style='padding:3px 0;'>" +
										"<span>上下行:<span>" +
										"<select id='sxx' style='margin-left:32px;'>" +
											"<option value='1'>上行</option>" +
											"<option value='2'>下行</option>" +
											"<option value='12'>上下行</option>" +
											"<option value='0'>无上下行</option>" +
										"</select>" + 
									"</div>" + 
									"<div style='padding:2px 0;'><span>步进:<span><input id='step' style='width:40px; margin-left:45px;' type='text' value='0.1' />  公里</div>" +
									"<div style='margin:8px 8px 5px 200px;'><input id='query' type='image' id='rangeSearchButton' src='images/btn_tips_search.gif'></div>" + 
								"</div>" + 
						   "</div>" + 
						   "<div id='content'>" +
						   "</div>");
			
			var self = this;
			
			//处理返回结果,加入一个reuslt
			function doQueryResult(data){
				if(!self._blockQueryCount){
					self._blockQueryCount = 0;
				}
				
				//"显示桩号"
				var displayNumStr = "";
				if(data.displayStartNum && data.displayEndNum){
					displayNumStr = data.displayStartNum + "k" + " - " +  data.displayEndNum + "k";
				}
				var result =  $(  "<div class='list'>" 
						+ "  <div class='list_num'>" + "<span style='font-size:18px; color:yellowGreen'>" + (++self._blockQueryCount) + "</span>" + "</div>"
						+ "  <div class='list_text'>"
						+ "  	<h2><span>" + data.lxbm + "</span></h2>"
						+ "		<p>查询桩号:" + data.startNum + "k" + " - " +  data.endNum + "k" + "</p>"
						+ "		<p>显示桩号:" + displayNumStr + "</p>"
						+ "		<p>路线桩号:" + data.roadStartNum + "k" + " - " +  data.roadEndNum + "k" + "</p>"
						+ "		<p>上下行:" + self._sxxList[data.sxx] + "</p>"
						+ "		<p>步进:" + data.step + "公里" + "</p>"
						+ "	 </div>"
						+ "  <div style='position:relative;float:right;top:-115px;'><img style='opacity:0.7' src='images/fork.png' /></div>"
						+ "</div>");
				
				//数据缓存
				result.data("param",{"lxbm":data.lxbm, "startNum":data.startNum, "endNum":data.endNum, "sxx":data.sxx, "step":data.step});
				
				//绑定关闭图标的悬浮和单击事件
				result.find("img").hover(
	    			function(){
	    				$(this).css("opacity","1");
	        		}, 
	        		function(){
	        			$(this).css("opacity","0.7");
	        		}
		    	);
				result.find("img").click(function(){
					result.animate({height: '0', width: '0'},'fast', 
						function(){
							result.remove();
						}
					);
					//更新滚动条
//					$(".result_search").mCustomScrollbar("update");
				});
				
				//成功响应
				if(data.status == 'ok'){
					//绑定标题的单击事件
					result.find("h2").click(function(){
						var param = result.data("param");
						var lxbm = param.lxbm;
						var startNum = param.startNum;
						var endNum = param.endNum;
						var sxx = param.sxx;
						var url = mapwork.configs["segmentQuery_url"] + "?lxbm=" + lxbm + "&sxx=" + sxx + "&startNum=" + startNum + "&endNum=" + endNum + "&step=0.1";
						mapwork.utils.loadJsonData(url, function(json) {
							self.show(json);
						});
//						/*$.ajax({
//			                url : url,
//			                dataType : "json",
//			                success : self.show(data)
//			            });*/
//						
//						FlyJSONP.get({
//					        url: url,
//					        success: function (json) {
//								self.show(json);
//					        },
//					        error: function (errorMsg) {
//					            //console.log(errorMsg);
//					        }
//					    });
						
					});
					//绘制阻断图
					self.show(data);
					
				//失败响应	
				}else{
					result.find("h2 span").html(data.message);
				}
				//执行动画并加入content
				result.animate({height: '+130px', width: '+260px'},'normal'); 
				$(".result_search #content").prepend(result);
				
				//更新滚动条
//				$(".result_search").mCustomScrollbar("update");
			}
			
			
			//路线编码的自动搜索功能
			queryDiv.find("#lxbm").bind("keyup", function(event){
				var str = $("#lxbm").val();
				if(str && str.trim().length > 0){
					//数据量较大,只请求一次
					if(!self._lxbmData){
						function doAutoSearchResult(data){
							self._lxbmData = data;
						}
						var url = mapwork.configs["segmentQuery_url"] + "?list";
						mapwork.utils.loadJsonData(url, function(json) {
							doAutoSearchResult(json);
						});
						
//						/*$.ajax({
//			                url : url,
//			                dataType : "json",
//			                success : doAutoSearchResult
//			            });*/
//						
//						FlyJSONP.get({
//					        url: url,
//					        success: function (json) {
//								doAutoSearchResult(json);
//					        },
//					        error: function (errorMsg) {
//					            //console.log(errorMsg);
//					        }
//					    });
					}
					
					var lxbmArray = [];
					//根据输入条件筛选出搜索结果
					for(var i in self._lxbmData){
						var info = self._lxbmData[i];
						var lxbm = info.lxbm;
						var sxx = info.sxx;
						if(lxbm.indexOf(str) == 0){
							var matchStr = str.bold().fontcolor("#0044BB").fontsize(2);
							var lxbmDis = matchStr + lxbm.substring(str.length);
							lxbmArray.push({"lxbm":lxbm, "sxx":sxx, "lxbmDis":lxbmDis});
						}
					}
					
					if(lxbmArray.length > 0){
						var suggestDiv = $("#suggest");
						suggestDiv.empty();
						suggestDiv.slideDown();
						suggestDiv.append("<ul class='suggestList'>");
						for(var i = 0; i < lxbmArray.length; i ++){
							var info = lxbmArray[i];
							var lxbm = info.lxbm;
							var lxbmDis = info.lxbmDis
							var sxx = info.sxx;
							var suggestItem = $("<li class='suggestItem' style='padding:2px 10px;cursor: pointer;'>" +
													"<input type='hidden' id='lxbmStr' value='" + lxbm + "'/><sapn id='lxbmDis'>" + lxbmDis + "</span>" +
												"</li>");
							//记录上下行数据
							suggestItem.data("sxx" , sxx);
							suggestDiv.append(suggestItem);
						}
						suggestDiv.append("</ul>");
						
						//提示框的鼠标离开及悬浮事件
						$("#suggest .suggestItem").mousedown(function(){
							var itemStr = $(this).find("#lxbmStr").val();
							$("#lxbm").val(itemStr);
							
							//上下行
							var sxxSelects = $(this).data("sxx").split(",");
							$("#sxx").html("");
							for(var i = 0; i < sxxSelects.length; i ++){
								var selectValue = sxxSelects[i];
								var selectName = self._sxxList[selectValue];
								$("#sxx").append("<option value='" + selectValue + "'>" + selectName + "</option>");
							}
							
							suggestDiv.empty();
							$("#suggest").slideUp();
						});
						
						$("#suggest .suggestItem").hover(
			    			function(){
			    				$(this).css("background", "#F3F7FD");
			        		}, 
			        		function(){
			        			$(this).css("background", "white");
			        		}
			    		);
					}
				}else{
					$("#suggest").empty();
					$("#suggest").slideUp();
				}
			});
			
			//当点击show框时,隐藏show框并使自动搜索框聚焦
			queryDiv.find(".show,#lxbm").click(function(){
				$(".show").hide();
				queryDiv.find("#lxbm").focus();
			});
			//失去焦点后把提示框缩回去
			queryDiv.find("#lxbm").bind("blur", function(){
				$("#suggest").slideUp();
			});
			
			//查询按钮单击事件
			queryDiv.find("#query").click(function(){
				var lxbm = $("#queryBlock").find("#lxbm").val();
				var startNum = $("#queryBlock").find("#startNum").val();
				var endNum = $("#queryBlock").find("#endNum").val();
				var sxx = $("#queryBlock").find("#sxx").val();
				var step = $("#queryBlock").find("#step").val();
				if(lxbm){
					var url = mapwork.configs["segmentQuery_url"] + "?lxbm=" + lxbm + "&sxx=" + sxx + "&startNum=" + startNum + "&endNum=" + endNum + "&step=" + step;
					mapwork.utils.loadJsonData(url, function(json) {
							doQueryResult(json);
						});					
//					/*$.ajax({
//		                url : url,
//		                dataType : "json",
//		                success : doQueryResult
//		            });*/
//					
//					FlyJSONP.get({
//				        url: url,
//				        success: function (json) {
//							doQueryResult(json);
//				        },
//				        error: function (errorMsg) {
//				            //console.log(errorMsg);
//				        }
//				    });
				}
			});
			$(".result_search").html(queryDiv);
			
			//滚动条
//			$(".result_search").mCustomScrollbar({
//				scrollButtons:{
//					enable:true
//				}
//			});  
			
		},
		//绘制一个阻断图
		show: function(json){
			
			//删除所有阻断线
			for(var i in this._module._blockLineArray){
				this._module._blockLineArray[i].doRemove();
			}
			this._module._blockLineArray = [];
			
			//删除断点
			if(this._module._breakPointArray){
				for(var i in this._module._breakPointArray){
					this._module._breakPointArray[i].doRemove();
				}
			}
			//删除桩号标签
			if(this._module._numLabelArray){
				for(var i in this._module._numLabelArray){
					this._module._numLabelArray[i].doRemove();
				}
			}
			
        	var mapPopLayer = this._map.getLayer(mapwork.MapPopLayer.ID);
        	//路线
        	var points = json.points;
        	
        	//起止桩号标签
        	this._json = {};
        	this._json.startNumDis = json.displayStartNum + "k";
        	this._json.endNumDis = json.displayEndNum + "k";
        	
        	//断点的数组
    		this._module._breakPointArray = [];
    		//桩号标签的数组
    		this._module._numLabelArray = [];
        	
        	//起始桩号标签
        	if(json.displayStartPoint){
        		var sDisplayStart = json.displayStartPoint.split(",");
				var startEpos = mapwork.SHPosMapping.convertShPosToEarthPos(sDisplayStart[0],sDisplayStart[1]);
				
				//起始桩号ball
				var startPoint = new mapwork.MapIcon("startBall", "images/spop.png", "images/spop.png" ,[4.5,15],100);
        		this._module._breakPointArray.push(startPoint);
        		startPoint.setPos(startEpos);
	        	mapPopLayer.addElement(startPoint);
	        	mapPopLayer.resetElement(startPoint);
				
	        	//起始桩号label
				var startNumLabel = new mapwork.MapLabel("startNumLabel");
				startNumLabel.setPos(startEpos);
				startNumLabel.setName("起始桩号: " + this._json.startNumDis);
				startNumLabel._offsetPos = [-50,-35];
				this._module._numLabelArray.push(startNumLabel);
				this._vectorlayer.addElement(startNumLabel);
				this._vectorlayer.resetElement(startNumLabel);
        	}
			//结束桩号标签
        	if(json.displayEndPoint){
        		var sDisplayEnd = json.displayEndPoint.split(",");
				var endEpos = mapwork.SHPosMapping.convertShPosToEarthPos(sDisplayEnd[0],sDisplayEnd[1]);
				
				//结束桩号ball
				var endPoint = new mapwork.MapIcon("endBall", "images/spop.png", "images/spop.png" ,[4.5,15],100);
        		this._module._breakPointArray.push(endPoint);
        		endPoint.setPos(endEpos);
	        	mapPopLayer.addElement(endPoint);
	        	mapPopLayer.resetElement(endPoint);
	        	
				//结束桩号label
				var endNumLabel = new mapwork.MapLabel("endNumLabel");
				endNumLabel.setPos(endEpos);
				endNumLabel.setName("结束桩号: " + this._json.endNumDis);
				endNumLabel._offsetPos = [-50,-35];
				this._module._numLabelArray.push(endNumLabel);
				this._vectorlayer.addElement(endNumLabel);
				this._vectorlayer.resetElement(endNumLabel);
        	}
        	
    		//有step步进:每个步进点加上断点，增加条纹线，打上桩号标签
    		if(json.steps){
        		var stepsArray = json.steps.split(",");
        		//步进的epos数组
        		var stepsEposArray = [];
        		for(var i = 0; i < stepsArray.length; i += 3){
        			var x = parseInt(stepsArray[i]);
    				var y = parseInt(stepsArray[i+1]);
    				var ePos = mapwork.SHPosMapping.convertShPosToEarthPos(x,y);
    				stepsEposArray.push(ePos);
    				var number = parseFloat(stepsArray[i+2]) + "k";
    				
    				var k = 0;
    				//断点
	        		var point = new mapwork.MapIcon("boll" + k, "images/ball.png", "images/ball.png" ,[5,5],100);
	        		this._module._breakPointArray.push(point);
	        		point.setPos(ePos);
    	        	mapPopLayer.addElement(point);
    	        	mapPopLayer.resetElement(point);
    	        	//桩号标签
					var numLabel = new mapwork.MapLabel("numLabel" + k);
					this._module._numLabelArray.push(numLabel);
					numLabel.setPos(ePos);
					numLabel.setName(number);
					numLabel._offsetPos = [-25,-25];
    				this._vectorlayer.addElement(numLabel);
    				this._vectorlayer.resetElement(numLabel);
    				k++;
        		}
        		
        		/**暂时不用
        		//条纹线
        		for(var i = 0; i < stepsEposArray.length; i++){
					var streakLine = new mapwork.MapPath("streakLine" + i);
					if(i % 2 == 0){
						streakLine.setColor("#E67F11");
					}else{
						streakLine.setColor("blue");
					}
					streakLine.setWidth("4");
					streakLine.setOpacity("0.8");
					streakLine.addPos(stepsEposArray[i]);
					streakLine.addPos(stepsEposArray[i + 1]);
    				this._vectorlayer.addElement(streakLine);
    				this._vectorlayer.resetElement(streakLine);
        		}
        		**/
    		}
        	
        	//阻断线
        	var line = points.split("|");
        	for(var i = 0; i < line.length; i ++){
        		var ePosArray = [];
				var ss = line[i].split(",");
				for(var k =0;k<ss.length;k+=2) {
					var x = parseInt(ss[k]);
					var y = parseInt(ss[k+1]);
					ePosArray.push(mapwork.SHPosMapping.convertShPosToEarthPos(x,y));
				}
				this.createBlockLine(ePosArray);
        	}
		},
		
		showBlockSearchResultDiv: function(json, id){
			
			//中心点
			var mapPopLayer = this._map.getLayer(mapwork.MapPopLayer.ID);
			var focusPoint = json.focusPoint;
        	focusPoint = focusPoint.split(",");
        	var icon = new mapwork.MapIcon("focusPointIcon", "images/block_roadevent.png", "images/block_roadevent.pngH", [9,9], "");
        	icon.setPos(mapwork.SHPosMapping.convertShPosToEarthPos(focusPoint[0], focusPoint[1]));
        	mapPopLayer.addElement(icon);
        	mapPopLayer.resetElement(icon);
        	
			//范围搜索
        	var name = "交通直播";
        	var rangeSearchHandler = this._map.getHandler(mapwork.RangeSearchHandler.ID);
        	rangeSearchHandler._defaultRadius = 2000;
    		rangeSearchHandler.openRangeSearchControl(icon.getEarthPos());
    		rangeSearchHandler.doSearch(name);
    		
    		//搜索结果
    		var currentModule = rangeSearchHandler._map._currentModule;
    		this._searchResult = currentModule._pageQueryResult;
			
			var div = $("#" + id);
			div.append(
					"<div style='height:20px;line-height:20px;width:100px;text-align:center'>" +
					"搜索半斤:" + rangeSearchHandler._defaultRadius + "米" + 
					"</div>");
			div.append("<div class='_list' style='width:100px; height:300px;  border:1px solid #e2e2e2; float: left;'></div>");
			div.append("<div class='_content' style='width:500px; height:300px;  margin-left: 105px;'></div>");
			
			if(this._searchResult){
				for(var i in this._searchResult.rows){
					var row = this._searchResult.rows[i];
					div.find("._list").append("<div class='_item' style='height:26px; line-height:26px; cursor:pointer;'>" + row.name + "</div>");
					
					$("._list > ._item:last").click(function(){
						$("._content").empty();
						$("._content").append(
							"<iframe src='http://114.80.221.26/jsp/gis/jtskForLive.jsp?videoId=" + (parseInt(row.pid) - 1) + "' height='254' width='330' scrolling='no' name='dlzdInfN'" +
	        			    " id='dlzdInf' frameborder='0' noresize='' marginheight='0' marginwidth='0'></iframe>"
						);
					});
				}
			}
		},
		
        isNeedItemQuery: function(){
    		if(!this._json.describe1){
    			return true;
    		}
    	}
    }

    if(EXTEND) {
        mapwork.utils.inherits(Block, EXTEND);
    }    
})();