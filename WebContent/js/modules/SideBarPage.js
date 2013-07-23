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
            +'            <div class="btn-group pull-left">'
            +'              <button id="polygon_button" class="btn polygon drawing_mode pull-left" data-toggle="tooltip" data-placement="bottom" title=""><i class="icon-circle-blank">A</i> </button> '
            +'              <button id="circle_button" class="btn polygon drawing_mode pull-left" data-toggle="tooltip" data-placement="bottom" title=""><i class="icon-circle-blank">S</i></button>'
            +'              <button id="circle_button" class="btn polygon drawing_mode pull-left" data-toggle="tooltip" data-placement="bottom" title=""><i class="icon-circle-blank">W</i></button>'
            +'              <button id="circle_button" class="btn polygon drawing_mode pull-left" data-toggle="tooltip" data-placement="bottom" title=""><i class="icon-circle-blank">G</i></button>'
            +'            </div>'
            +'            <div class="map-search pull-left">'
            +'              <form name="searchMap" action="" class="searchMap" method="post" onsubmit="return false;"> '
            +'                <div class="input-append"> '
            +'                  <input name="searchInput" class="searchInput pull-left" size="10" type="text" placeholder="搜索…" data-toggle="tooltip" data-placement="bottom" title="在这里输入你要查找的人" autocomplete="off"> '
            +'                  <button type="submit" class="btn btn-primary searchInputBtn pull-left"><i class="icon-search icon-large"></i></button>'
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
                })
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
        onPageQueryResult: function(jsonResult) {
            this.reset();
            var data = jsonResult;
            if (data) {
                if (!data.m_detail) {
                    if (jsonResult) {
                        this._$Right.show();
                        this._$RecordCount.html(data.total);
                        for (var i in jsonResult) {
                            var row = jsonResult[i];
//                            if (row._moduleItem) {
                                
                                this._$Content.prepend(row.getSidebarElement());
//                                this._$Content.append(row._moduleItem.getSidebarElement());
//                            }
                        }

//                        this.doPage(data.page, data.pageSize, data.total);
                    } else {
                        this._$Right.hide();
                        this._$Content.html('<td colspan="5" style="text-align:center;">无相关信息</td>');
                    }
                } else {
                    this._$Right.hide();
                    this._$Content.html('<td colspan="5" style="text-align:center;">' + data.m_message + '</td>');
                }

            } else {
                this._$Right.hide();
                this._$Content.html('<td colspan="5" style="text-align:center;">无相关信息</td>');
            }

            //滚动条
//            this._$Content.mCustomScrollbar({
//                scrollButtons: {
//                    enable: true
//                }
//            });
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
            this._$Content.empty();
            this._$RecordCount.empty();
        },
        //分页
        doPage: function(pageIndex, pageSize, total) {
            pageSize = 10;
            var pageCount = parseInt(total / pageSize);
            pageCount = total % pageSize == 0 ? pageCount : pageCount + 1;

            var preIndex = pageIndex == 1 ? 1 : pageIndex - 1;
            var nxtIndex = pageIndex == pageCount ? pageIndex : pageIndex + 1;

            var bg = 1;
            var ed = pageCount;
            var numcount = 4;
            if (pageCount > numcount) {
                bg = pageIndex - parseInt(numcount / 2);
                if (bg < 1)
                    bg = 1;
                ed = bg + numcount - 1;
                if (ed > pageCount) {
                    ed = pageCount;
                    bg = ed - numcount + 1;
                }
            }
            if (preIndex == pageIndex) {
                this._$A.get(0).pageInfo = null;
            }
            else {
                this._$A.get(0).pageInfo = {"pageIndex": preIndex, "pageSize": pageSize, "total": total};
            }
            var index = 1;
            for (var i = bg; i <= ed; i++) {
                this._$A.eq(index).html(i);

                if (i == pageIndex) {
                    this._$A.eq(index).addClass("selected");
                    this._$A.get(index).pageInfo = null;
                }
                else {
                    this._$A.eq(index).removeClass("selected");
                    this._$A.get(index).pageInfo = {"pageIndex": i, "pageSize": pageSize, "total": total};
                }
                index++;
            }
            if (nxtIndex == pageIndex) {
                this._$A.get(5).pageInfo = null;
            }
            else {
                this._$A.get(5).pageInfo = {"pageIndex": nxtIndex, "pageSize": pageSize, "total": total};
            }

        },
        doReturn: function() {
            $("div[name='indexDiv']").show();
            this._$SideBarDiv.hide();
            this._module.clean();
        }

    }

    if (EXTEND) {
        mapwork.utils.inherits(SideBarPage, EXTEND);
    }
})();