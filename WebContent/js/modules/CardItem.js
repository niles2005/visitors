(function() {
    mapwork.CardItem = CardItem;

    var EXTEND = mapwork.ModuleItem;
    CardItem.ID = "CardItem";
    
    var sidebarContentHtml = '<div  class="listing"> '
                    + ' <div class="main viewed on">'
                    + '<div class="row">'
                    + '<div class="info span4">'
                    + '<div class="first_photo_imagebox thumbnail lazy"> <img id="cardImage"></img></div>'
                    + '<div id="cardName" class="title ellipsis" style="Color:blue;"></div>'
                    + '<div id="cardInfo" class="title ellipsis multiline"></div>'
                    + '</div>'
                    + '<ul class="meta-three-block">'
                    + '<li id="cardLocate" class="locate"></li>'
                    + '<li id="cardTime"  class="time"></li>'
                    + '</ul>'
                    + '</div>'
                    + '<div class="row list_footer">'
                    + '<div class="span list-footer-left">'
                    + '<span id="cardRole" class="follower-count"></span>'
                    + '</div>'
                    + '<div class="" style="right:0;position:absolute;">'
                    + '<div class="expand">'
                    + '<a  class="yuantie btn btn-link btn-block" href="#">查看详细记录</a>'
                    + '</div>'
                    + '</div>'
                    + '</div> '

                    + '</div>'

                    + ' <div class="popuplist-main hide">'
//                    + '<h5>cardId: ' + this._json.id + '</h5>'
                    + '<div class="modal-header">  '
                    + '    <div class="row">    '
                    + '        </div>                '
                    + '    </div>                      '
                    + '     <div class="popuplist-main-body modal-body">   '
                    + '        <div class="popuplist-descr">           '
                    + '<span style="margin-left:15px;">行踪详情</span>'
                    + '            <div class="cardDetail row infobox descrbox chu_descr ellipsis multiline">'
                    + '</div>'
                    + '        </div>'
                    + '</div>'
                    + '</div> '
                    + '</div>';

    CardItem.setting = {
        ID: CardItem.ID,
        pageUrl: null,
        listUrl: null,
        detailUrl: null,
        newModuleItem: function(module, index) {
            return new CardItem(module, index);
        }
    };

    function CardItem(module, index, roles) {

        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._roles = roles;
        this._$SidebarContent = $(sidebarContentHtml);
    }


    CardItem.prototype = {
        getType: function() {
            return this._json.role;
        },
        getLocation: function() {
            return this._json.lastLocate;
        },
        setJsonData: function(json) {
            this._json = json;

            this.setZIndex(100 - parseInt(this._index));
            this.setOffsetPos([11, 31]);
        },
        getTipTitle: function() {
            return this._json.name;
        },
        getTipContent: function() {
            return "<p>" + this._json.name + "</p>";
        },
        isNeedItemQuery: function() {
            return false;
        },
        createMapIcon: function() {
            var id = this._id;
            var icon = this._icon;
            var hoverIcon = null;//this._hoverIcon;
            var iconOffset = this._offsetPos;
            var moduleLabel = new mapwork.CommonItemLabel(id, icon, hoverIcon, iconOffset, this._zIndex, this);
            moduleLabel.setLabel(this._json.label, this._json.count);
            return moduleLabel;
        },
        setRole: function(role) {
            if (this._role) {
                if (this._role !== role) {
                    this._role.removeCard(this);
                    this._role = role;
                    this._role.addCard(this);
                }
            } else {
                this._role = role;
                this._role.addCard(this);
            }
        },
        getRole: function() {
            return this._role;
        },
        formatDate: function(now, form) {
            var year = now.getYear() - 100 + 2000;
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            if (form === 'day') {
                return year + "-" + month + "-" + date;
            } else if (form === 'time') {
                return hour + ":" + minute + ":" + second;
            } else {
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
            }
        },
        afterExpandDetail: function() {
            var $cardDetail = this._$Content.find(".cardDetail");
            var url = "work?action=loadtodayevents&cardid=" + this._id;
            var self = this;

            mapwork.utils.loadJsonData(url, function(data) {
                if (!data) {
                    return;
                }
                var htmlContent = '<table class="table">'
                        + '<tbody><tr><th>Index</th><th>日期</th><th>时间</th><th>方位</th>';
                for (var i = 0; i < data.length; i++) {
                    htmlContent = htmlContent
                            + '<tr><td>'
                            + (i + 1)
                            + '</td>'
                            + '<td>'
                            + self.formatDate(new Date(data[i]['time']), 'day')
                            + '</td>'
                            + '<td>'
                            + self.formatDate(new Date(data[i]['time']), 'time')
                            + '</td>'
                            + '<td>'
                            + '<span class="metadata">'
                            + data[i]['deviceLocate']
                            + '</span></td></tr>';
                }
                htmlContent = htmlContent + '</tbody></table>';
                $cardDetail.html(htmlContent);
//                self.onEventQueryResult(data);
            });
        },
        getName: function() {
            return this._json.name;
        },
        getId: function() {
            return this._json.id;
        },
        getInfo: function() {
            if(this._json.info) {
                return this._json.info;
            }
            return "";
        },
        setLastEvent: function(eventJson) {
            //when change data,change background color
            if(eventJson.lastLocate !== this._json.lastLocate) {
                this._$SidebarContent.find("#cardLocate").css("background","blue");
            }
            this._$SidebarContent.find("#cardTime").css("background","blue");

            this._json.lastLocate = eventJson.lastLocate;
            this._json.lastTime = eventJson.lastTime;
            
            this._$SidebarContent.find("#cardLocate").html(this._json.lastLocate);
            this._$SidebarContent.find("#cardTime").html(this.formatDate(new Date(this._json.lastTime), 'time'));
            var self = this;
            setTimeout(function() {
                self._$SidebarContent.find("#cardLocate").css("background","#efefef");
                self._$SidebarContent.find("#cardTime").css("background","#efefef");
            },1500);
        },
        getSidebarContent: function() {
            this._$SidebarContent.find("#cardImage").attr("src",this.getIcon());
            this._$SidebarContent.find("#cardName").html(this._json.name);
            this._$SidebarContent.find("#cardInfo").html(this._json.info);
            this._$SidebarContent.find("#cardInfo").attr("title",this._json.info);
            this._$SidebarContent.find("#cardLocate").html(this._json.lastLocate);
            this._$SidebarContent.find("#cardTime").html(this.formatDate(new Date(this._json.lastTime), 'time'));
            this._$SidebarContent.find("#cardRole").html(this._json.role);
            
            return this._$SidebarContent;
        }

    };

    if (EXTEND) {
        mapwork.utils.inherits(CardItem, EXTEND);
    }
})();