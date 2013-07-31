(function() {
    mapwork.SideBarPage = SideBarPage;

    var EXTEND = mapwork.BaseSideBar;

    var pageHtml =
//            '<div>' +
//            '<div class="search_title" style="background:red;height:40px;">' +
//            '<span id="btnReturn" class="left back"><a href="javascript:void(0);">返回</a></span>' +
//            '<div class="right">共有<span class="padlr5"></span>条搜索记录</div>' +
//            '</div>' +
//            '<div class="public-listings stretch scroll">'+
//            '<ul id="listings" class="listings"><div class="result_search lists_has_weibo"></div></ul>' +
//            '</div>';

         '<div class="map-tool">'
            +'<div class="row">'
            +'          <div class="span5">     '
//            +'            <div class="btn-group pull-left">'
//            +'              <button id="polygon_button" class="btn polygon drawing_mode pull-left" data-toggle="tooltip" data-placement="bottom" title=""><i class="icon-circle-blank">A</i> </button> '
//            +'              <button id="circle_button" class="btn polygon drawing_mode pull-left" data-toggle="tooltip" data-placement="bottom" title=""><i class="icon-circle-blank">S</i></button>'
//            +'              <button id="circle_button" class="btn polygon drawing_mode pull-left" data-toggle="tooltip" data-placement="bottom" title=""><i class="icon-circle-blank">W</i></button>'
//            +'              <button id="circle_button" class="btn polygon drawing_mode pull-left" data-toggle="tooltip" data-placement="bottom" title=""><i class="icon-circle-blank">G</i></button>'
//            +'            </div>'
            +'            <div class="map-search pull-left">'
            +'              <form> '
            +'                <div class="input-append"> '
            +'                  <input name="searchInput" class="searchInput pull-left" size="10" type="text" placeholder="搜索…" data-toggle="tooltip" data-placement="bottom" title="输入你要查找的卡ID或名称" autocomplete="off"> '
//            +'<span style="padding-left: 60px"></span>'
//             +'                  <span id="refresh" class="btn btn-primary searchInputBtn"><i>刷新</i></span>'
            +'                </div> '
            +'              </form> '
            +'            </div>   '
            +'          </div>   '
            +'        </div>   '
            +'        </div>   '
            +'<div class="public-listings stretch scroll">'
            +    '<ul id="listings" class="listings"><div class="result_search lists_has_weibo"></div></ul>'
            +'</div>';




    function SideBarPage(module) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
    }

    SideBarPage.prototype = {
        init: function() {
            $("#indexbox").hide();

            this._$SideBarDiv = $("#sidebar");
            this._pageQuery = this._module.doPageQuery;
            this._$SideBarDiv.empty();

            this._$ConentDiv = $(pageHtml);
            this._$Right = this._$ConentDiv.find(".right");
            this._$RecordCount = this._$ConentDiv.find(".search_title .padlr5");
            this._$Content = this._$ConentDiv.find(".result_search");
            this._$Page = this._$ConentDiv.find(".page");
            this._$A = this._$ConentDiv.find("li a");
            this._$searchInput = this._$ConentDiv.find(".searchInput");
            var self = this;
            this._$searchInput.keyup(function(event) {
                if (event.which === 13) {
                    event.preventDefault();
                }
                var cards = self._module.findCards(this.value);
                if(cards) {
                    self.onPageQueryResult(cards,self);
                }
            });
            this._$refresh = this._$ConentDiv.find("#refresh");


            this._$SideBarDiv.append(this._$ConentDiv);

            this._$SideBarDiv.show();
            if (this._pageQuery) {
                var self = this;
                this._$A.each(function(index) {
                    this.onclick = function() {
                        if (this.pageInfo) {
                            self._pageQuery.call(self._module, this.pageInfo.pageIndex, this.pageInfo.pageSize);
                        }
                    };
                });
            }
            this.adjustSideBarHeight();

            $("#btnReturn").click(function() {
                self.doReturn();
            });
        },
        //调整左边菜单内容的实际高度,以适应浏览器的窗口大小
        adjustSideBarHeight: function() {
            var westHeight = $("#w").height();
            var titleHeight = $(".search_title").outerHeight();
            var mbLineHeight = $(".mb_line").height();
            var pageHeight = this._$Page.outerHeight();
            this._$Content.height(westHeight - mbLineHeight - titleHeight - pageHeight);
        },
        //文档窗口改变大小时触发
        //由每个业务的来实现
        resize: function() {
            this.adjustSideBarHeight();
        },
        //由各个业务类实现此方法
        //被module的onPageQueryResult调用
        onPageQueryResult: function(json,caller) {
            this.reset();
            if(caller !== this) {
                this._$searchInput.val("");
            }
            this._json = json;
            if (json) {
                if (!json.m_detail) {
                    this._$Right.show();
                    this._$RecordCount.html(json.total);
                    for (var i in json) {
                        this._$Content.prepend(json[i].getSidebarElement());
                    }
                } else {
                    this._$Right.hide();
                    this._$Content.html('<td colspan="5" style="text-align:center;">' + json.m_message + '</td>');
                }

            } else {
                this._$Right.hide();
                this._$Content.html('<td colspan="5" style="text-align:center;">无相关信息</td>');
            }
        },
        //点击返回时做的清空操作
        clean: function() {
            this._$SideBarDiv.empty();
            //reset page bar
            for (var i = 0; i <= 5; i++) {
                if (i >= 1 && i < 5) {
                    this._$A.eq(i).html("");
                    this._$A.eq(i).removeClass("selected");
                }
                this._$A.get(i).pageInfo = null;
                this._$A.get(i).onclick = null;
            }
        },
        //分页时做的清空操作
        reset: function() {
            if(this._json) {
                for (var i in this._json) {
                    this._json[i].reset();
                }
            }
            
            this._$Content.empty();
            this._$RecordCount.empty();
        },
        doReturn: function() {
            $("div[name='indexDiv']").show();
            this._$SideBarDiv.hide();
            this._module.clean();
        }
    };

    if (EXTEND) {
        mapwork.utils.inherits(SideBarPage, EXTEND);
    }
})();