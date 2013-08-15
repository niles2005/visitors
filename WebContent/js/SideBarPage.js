(function() {
    visitors.SideBarPage = SideBarPage;

    var EXTEND = null;

    var pageHtml =
        '<div class="map-tool">'
            +'<div class="row">'
            +'          <div class="span5">     '
        +'            <div class="map-search pull-left">'
        +'                <div class="input-append"> '
        +'                  <input name="searchInput" class="searchInput pull-left" size="10" type="text" placeholder="搜索…" data-toggle="tooltip" data-placement="bottom" title="输入你要查找的卡ID或名称" autocomplete="off"> '
        +'                </div> '
        +'            </div>   '

        +'          </div>   '
        +'        </div>   '
        +'        </div>   '
        +'<div class="public-listings stretch scroll">'
        +    '<ul id="listings" class="listings"><div class="result_search lists_has_weibo"></div></ul>'
        +'</div>';

    function SideBarPage(visitorManager) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._manager = visitorManager;
    }

    SideBarPage.prototype = {
        init: function() {
            this._$SideBarDiv = $("#sidebar");
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
                if (event.which === 13 || event.which === 10) {
                    if (event.stopPropagation) {
                        event.stopPropagation();
                        event.preventDefault();
                    } else {//IE
                        event.cancelBubble = true;
                        event.returnValue = false;
                    }
                }
                var cards = self._manager.findCards(this.value);
                if(cards) {
                    self.onPageQueryResult(cards,self);
                }
            });
            this._$refresh = this._$ConentDiv.find("#refresh");

            this._$SideBarDiv.append(this._$ConentDiv);

            this._$SideBarDiv.show();
            this.adjustSideBarHeight();
        },
        //调整菜单内容的实际高度,以适应浏览器的窗口大小
        adjustSideBarHeight: function() {
            var westHeight = $("#e").height();
            var mapToolHeight = $(".map-tool").outerHeight();
            var publicListings = $(".public-listings");
            publicListings.height(westHeight - mapToolHeight);
        },
        resize: function() {
            this.adjustSideBarHeight();
        },
                
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
                }
            }
        },
        reset: function() {
            this._$Content.empty();
            this._$RecordCount.empty();
        }
    };

    if (EXTEND) {
        visitors.utils.inherits(SideBarPage, EXTEND);
    }
})();