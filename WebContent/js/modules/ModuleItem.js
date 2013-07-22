(function() {
    var tailDiv = '<div class="lineWrap">' +
            '<div>' +
            '</div>' +
            '</div>' +
            '<div class="tips_show">' +
            '<div class="dis" id="tms1">' +
            '   <div class="tips_left">' +
            '        <span><a name="JTSK" href="javascript:void(0);">交通实况</a></span>' +
            '        <span><a name="JTZB" href="javascript:void(0);">交通直播</a></span>' +
            '        <span><a name="YDP" href="javascript:void(0);">诱导牌</a></span>' +
            '    </div>' +
            '    <div class="tips_right">' +
            '		 <form name="rangeSearchForm">' +
            '        <span><input type="text" id="rangeSearchName" class="text_03"></span>' +
            '        <span><input type="image" src="images/btn_tips_search.gif"></span>' +
            '		 </form>' +
            '    </div>' +
            '</div>' +
            '</div>' +
            '</div>';


    mapwork.ModuleItem = ModuleItem;
    ModuleItem.tailDiv = tailDiv;


    var EXTEND = null;
    ModuleItem.selectItem = null;
    function ModuleItem(module, index) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._module = module;
        this._index = index;
        this._tipOffsetTop4Icon = 5;//tip offset top pos,this is map background icon
        this._tipOffsetTop4Pop = 30;//tip offset top pos,this is map pop icon

        this._isEditable = false;
    }

    ModuleItem.prototype = {
        setSidebar: function(sideBar) {
            this._sideBar = sideBar;
        },
        setIndex: function(index) {
            this._index = index;
        },
        setZIndex: function(zIndex) {
            this._zIndex = zIndex;
        },
        getZIndex: function() {
            return this._zIndex;
        },
        setId: function(id) {
            this._id = id;
        },
        getId: function() {
            return this._id;
        },
        setName: function(name) {
            this._name = name;
        },
        getName: function() {
            return this._name;
        },
        setDescribe: function(describe) {
            this._discribe = describe;
        },
        getDescribe: function() {
            return this._discribe;
        },
        setIcon: function(icon) {
            this._icon = icon;
        },
        getIcon: function() {
            return this._icon;
        },
        setHoverIcon: function(icon) {
            this._hoverIcon = icon;
        },
        getHoverIcon: function() {
            return this._hoverIcon;
        },
        setOffsetPos: function(offsetPos) {
            this._offsetPos = offsetPos;
        },
        getOffsetPos: function() {
            return this._offsetPos;
        },
        setJsonData: function(json) {
            this._json = json;
        },
        getJsonData: function() {
            return this._json;
        },
        setMap: function(map) {
            this._map = map;
        },
        getMap: function() {
            return this._map;
        },
        setEarthPos: function(ePos) {
            this._ePos = ePos;
        },
        getEarthPos: function() {
            return this._ePos;
        },

        //将每个moduleItem的HTML信息刷到sideBar中.
        //被各sideBar的实现类中的onPageQueryResult或onListQueryResult调用
        getSidebarElement: function() {
            this._$Content = $(this.getSidebarContent(this._id));
            this._$ContentImage = this._$Content.find("img");

            this._$Datepicker = $('<span  class=" "> '
                    +' <div class="input-append date" id="dp3" data-date-format="yyyy-mm-dd"> '
                    +'<input class="span2" size="12" type="text" readonly/> '
                    +'    <span class="add-on"><i class="icon-th"></i></span>    '
                    +' </div> '
                    +'</span>');

            var self = this;
            //给content设置鼠标徘徊事件
            this._$Content.hover(
                    function() {
                        self.doHover();
                    },
                    function() {
                        self.deHover();
                    }
            );
            //给content设置单击事件
            this._$Content.click(
                    function() {
//                        event.preventDefault();
//                        event.stopPropagation();
//                        console.dir(self._$Content);
//                        self.doFocus();
//                        var $trackDiv = $(self._$Content).find('>.popuplist-main');
//                        $trackDiv.toggle("slow");
                    }
            );

            this._$Content.find('.expand').click(
                function() {
                        event.preventDefault();
                        event.stopPropagation();
                        var $trackDiv = $(self._$Content).find('>.popuplist-main');
                        $trackDiv.toggle("slow");

                        var jQrow = self._$Content.find('.modal-header>.row');
                        var jQdatepicker = $('#dp3');
                        if (jQdatepicker.length == 0) {
                            jQrow.append(self._$Datepicker);
                            jQdatepicker = $('#dp3');
                        } else {
                            jQrow.append(jQdatepicker);
                        }
                        jQdatepicker.datepicker('update');

                }
            );


            return this._$Content.get(0);
        },
        //创建并获得mapIcon对象
        //设置图片资源,设置坐标,绑定徘徊及单击事件
        getMapIcon: function() {
            if (!this._mapIcon) {
                this._mapIcon = this.createMapIcon();
                if (this._mapIcon) {
                    this._mapIcon.setEarthPos(this._ePos);
                    var self = this;
                    $(this._mapIcon.getHtmlObj()).hover(
                            function() {
                                self.doHover();
                                //显示标签
                                self.showHoverLabel(event);
                            },
                            function() {
                                self.deHover();
                                //隐藏标签
                                self.hideHoverLabel();
                            }
                    );
                    this._mapIcon.getHtmlObj().onclick = function(event) {
                        self.doFocus();
                    };
                    this._mapIcon.getHtmlObj().ondblclick = function(event) {
                        if (event.stopPropagation) {
                            event.stopPropagation();
                            event.preventDefault();
                        } else {//IE
                            event.cancelBubble = true;
                            event.returnValue = false;
                        }
                    }
                }
            }
            return this._mapIcon;
        },
        getDetailUrl: function() {
            return this._module._setting.detailUrl;
        },
        getDetailParam: function(json) {
            return null;
        },
        isNeedItemQuery: function() {
            return true;
        },
        doItemDetailInfo: function() {
            var self = this;
            function onResult(data) {
                self.onItemQueryResult(data);
            }

            $.ajax({
                url: this.getDetailUrl(),
                async: false,
                dataType: "json", //这里的dataType就是返回回来的数据格式了html,xml,json 
                cache: false, //设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false 
                data: this.getDetailParam(),
                success: onResult
            });
        },
        onItemQueryResult: function(data) {
            mapwork.utils.extend(this._json, data);
        },
        doBeforeOpenTip: function() {

        },
        getTipTitle: function() {
            return this._name;
        },
        getTipContent: function() {
            return "";
        },
        getTipTail: function() {

            var $tailDiv = $(tailDiv)
            var rangeSearchForm = $tailDiv.find("form[name='rangeSearchForm']").get(0);
            var rangeSearchHandler = this._map.getHandler(mapwork.RangeSearchHandler.ID);
            if (rangeSearchForm) {
                //设置搜索类型的单击事件
                var self = this;
                $tailDiv.find(".tips_left a").each(function() {
                    this.onclick = function() {
                        var tag = $(this).html();
                        rangeSearchHandler.openRangeSearchControl(self._mapIcon.getEarthPos());
                        rangeSearchHandler.doSearch(tag);
                    };
                });

                rangeSearchForm.onsubmit = function() {
                    var name = $tailDiv.find("#rangeSearchName").val();
                    rangeSearchHandler.openRangeSearchControl(self._mapIcon.getEarthPos());
                    rangeSearchHandler.doSearch(name);
                    return false;
                };
            }

            return $tailDiv;
        },
        doOpenTip: function() {
            this.doBeforeOpenTip();
            if (this._index == undefined) {
                this._map.openTip(this._ePos, this.getTipTitle(), this.getTipContent(), this.getTipTail(), this._tipOffsetTop4Icon);
            } else {
                this._map.openTip(this._ePos, this.getTipTitle(), this.getTipContent(), this.getTipTail(), this._tipOffsetTop4Pop);
            }
        },
        doRemove: function() {
            this._mapIcon.doRemove();
        },
        //每一个moduleItem的HTML信息
        getSidebarContent: function(id) {
            if (id) {
                id = "id='" + id + "'";
            } else {
                id = "";
            }
//            return    "<div " + id + " class='list'>"
//                    + "  <div class='list_num'>" + "<img src='" + this.getIcon() + "'></img>" + "</div>"
//                    + "  <div class='list_text'>"
//                    + "  	<h2><span>" + this.getName() + "</span></h2>"
//                    + "		<p>" + this.getDescribe() + "</p>"
//                    + "	 </div>"
//                    + "</div>"

            return '<div ' + id + ' class="listing"> '
                +' <div class="main viewed on">'
                +'<div class="row">'
                +'<div class="info span4">'
                +'<div class="first_photo_imagebox thumbnail lazy"> <img src=' + this.getIcon() + '></img></div>'
                +'<div class="title ellipsis multiline" >' + this.getName() + '</div>'
                +'</div>'
                +'<ul class="meta-three-block">'
                +'<li class="price">最近动态</li>'
                +'<li class="timeago">' + this.getDescribe() + '</li>'
                +'</ul>'
                +'</div>'

                +'<div class="row list_footer">'
                +'<div class="span list-footer-left">'
                +'  <span class="follower-count">562粉</span>'
                +'</div>'
                +'<div class="span3 list-footer-right">'
                +'<span class="qiuorchu label label-chuzu">出</span>'
                +'<span class="qiuorchu label label-ru">入</span>'
                +'<div class="right pull-right span2"><span class="expand">查看详细记录</span></div>'
                +'</div>'
                +'</div> '

                +'</div>'

                +' <div class="popuplist-main hide">'
                +'<div class="modal-header">  '
                +'    <div class="row">    '

//                +'   <span  class=" "> '
//                +' <div class="input-append date" id="datepicker" data-date-format="dd-mm-yyyy"> '
//                +'<input class="span2" size="12" type="text" value >  '
//                +'    <span class="add-on"><i class="icon-th"></i></span>    '
//                +' </div> '
//                +'</span>'

//                +'       <span class="verification"><a href="#" >行踪记录 <i class="icon-ok icon-large"></i></a></span>'
                +'        </div>                '
                +'    </div>                      '
                +'     <div class="popuplist-main-body modal-body">   '
                +'        <div class="popuplist-descr">           '
                +'            <div class="row infobox descrbox chu_descr ellipsis multiline">' +
                '<h5>关于房子</h5>' +
                '<p>房子具体位置在<span class="metadata">中国北京市北京西城区黄寺大街双旗杆东里</span>。户型两居。要出租的房间是<span class="metadata">整套</span>。出租的屋子面积<span class="metadata">60</span>。</p>' +
                '<h5>租金和租期</h5>' +
                '<p>租金每月<span class="metadata">5000</span>。可入住时间是<span class="metadata">2013/07/19</span>。租期一年。</p>' +
                '<h5>关于室友和设施</h5>' +
                '<p><span class="metadata">男女不限</span>。</p>' +
                '<h5>联系方式</h5>' +
                '<p><span class="metadata">beshop@139.com</span></p>' +
                '<h5>其他补充</h5>' +
                '<p><span class="metadata">中介勿扰，已经挂了，希望租户是附近上学的一家三口，价格可以再商量</span></p>'
                +'</div>'
                +'        </div>'
                +'        <a type="button" class="yuantie btn btn-link btn-block" href="#">查看完整内容 <i class="icon-share"></i></a>'
                +'</div>'
                +'</div> '

                +'</div>'
        },




        setHoverImage: function() {
            if (this._$ContentImage) {
                this._$ContentImage.attr("src", this._hoverIcon);
            }
        },
        setDefaultImage: function() {
            if (this._$ContentImage) {
                this._$ContentImage.attr("src", this._icon);
            }
        },
        setHoverDiv: function() {
            if (this._$Content) {
                this._$Content.addClass("on");
            }
        },
        setDefaultDiv: function() {
            if (this._$Content) {
                this._$Content.removeClass("on");
            }
        },
        showHoverLabel: function(event) {
            if (this._name) {
                var pageX = this._map._mapLocation.getPageX(event);
                var pageY = this._map._mapLocation.getPageY(event);
                var ePos = this._map._mapLocation.getEarthPosFromMapPos(pageX, pageY);
                var mapPopLayer = this._map.getLayer(mapwork.MapPopLayer.ID);
                if (!this._hoverLabel) {
                    this._hoverLabel = new mapwork.MapLabel("hoverLabel");
                    this._hoverLabel._htmlObj.style["zIndex"] = 101;
                    this._hoverLabel._offsetPos = [8, 8];
                }
                this._hoverLabel.setPos(ePos);
                this._hoverLabel.setName(this._name);
                mapPopLayer.addElement(this._hoverLabel);
                mapPopLayer.resetElement(this._hoverLabel);
            }
        },
        hideHoverLabel: function() {
            if (this._hoverLabel) {
                this._hoverLabel.doRemove();
            }
        },
        doHover: function() {
            //div高亮
            this.setHoverDiv();
            //div中的图标高亮
            this.setHoverImage();
            //地图中的图标高亮
            this.getMapIcon().setHoverImage();
        },
        deHover: function() {
            this.setDefaultDiv();
            if (this != ModuleItem.selectItem) {
                this.setDefaultImage();
                this.getMapIcon().setDefaultImage();
            }
        },
        doFocus: function() {
//        	//判断是否是小点
//        	if(this._index == undefined){
//                this.doItemDetailInfo();//如果是小点,则发送请求,执行小点对应的js
//            }else{
//            	var selectedObject = ModuleItem.selectItem;
//    			if(selectedObject && selectedObject != this) {
//    				selectedObject.setDefaultImage();
//    				if(selectedObject._$Content){
//    					selectedObject._$Content.removeClass("clicked");
//    				}
//    				selectedObject.getMapIcon().setDefaultImage();
//    			}
//    			ModuleItem.selectItem = this;
//    			if(this._$Content){
//    				this._$Content.addClass("clicked");
//    			}
//    			this.setHoverImage();
//    			this.getMapIcon().setHoverImage();
//                this.doOpenTip();
//                if(this._$Content){
//                	this._$Content.scrollIntoView();
//                }
//            }

            if (this.isNeedItemQuery()) {
                this.doItemDetailInfo();
            }
            this.doOpenTip();
            if (this._index == undefined) {
                this.getMapIcon().setHoverImage();
            } else {
                var selectedObject = ModuleItem.selectItem;
                if (selectedObject && selectedObject != this) {
                    selectedObject.setDefaultImage();
                    if (selectedObject._$Content) {
                        selectedObject._$Content.removeClass("clicked");
                    }
//                    selectedObject.getMapIcon().setDefaultImage();
                    selectedObject.getMapIcon().clearFocus();
                }
                ModuleItem.selectItem = this;
                if (this._$Content) {
                    this._$Content.addClass("clicked");
                }
//                this.setHoverImage();
//                this.getMapIcon().setHoverImage();
                this.getMapIcon().doFocus();
                if(this._$Content){
                	this._$Content.scrollintoview();
                }
//				if(this._sideBar) {
//					this._sideBar._$Content.mCustomScrollbar("scrollTo","#" + this._id);
//				}
            }

        },
        createMapIcon: function() {
            var id = this._id;
            var icon = this._icon;
            var hoverIcon = this._hoverIcon;
            var iconOffset = this._offsetPos;
            var mapIcon = new mapwork.MapIcon(id, icon, hoverIcon, iconOffset, this._zIndex);
            return mapIcon;
        }
    }

    if (EXTEND) {
        mapwork.utils.inherits(ModuleItem, EXTEND);
    }
})();