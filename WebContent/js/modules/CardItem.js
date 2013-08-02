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
            + '<a  class="yuantie btn btn-link btn-success" href="#">查看详细记录</a>'
            + '</div>'
            + '</div>'
            + '</div> '

            + '</div>'

            + ' <div class="popuplist-main hide">'
//                    + '<span style="margin-left:15px;">CardID:</span>'
            + '<div class="modal-header">  '
            + '    <div class="row">    '

            + '<div  class="calendar"> '
            + ' <div  id="dp3" class="input-append date"> '
            + '<input class="span2" size="10" type="text" readonly /> '
            + '    <span class="add-on"><i class="icon-th"></i></span>    '
            + ' </div> '
            + '</div>'

            + '        </div>                '
            + '    </div>                      '
            + '     <div class="popuplist-main-body modal-body">   '
            + '        <div class="popuplist-descr">           '
            + '<span style="margin-left:15px;">行踪详情</span>'
            + '<span id="detailRefresh" style="margin-left:30px;" class="btn btn-info btn-small"><i>刷新</i></span>'
            + '            <div class="cardDetail row infobox descrbox chu_descr ellipsis multiline">'
            + '</div>'
            + '        </div>'
            + '</div>'
            + '</div> '
            + '</div>';

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
        loadCardEvents: function(date) {
            var $cardDetail = this._$Content.find(".cardDetail");
            $cardDetail.empty();
            var url = "work?action=loadevents&cardid=" + this._id + "&date=" + date + "&t=" + new Date().getTime();
            if (date) {
                url += "&date=" + date;
            }
            var self = this;
            mapwork.utils.loadJsonData(url, function(data) {
                if (!data) {
                    return;
                }
                var htmlContent = '<table class="table">'
                        + '<tbody><tr><th>Index</th><th>日期</th><th>时间</th><th>方位</th>';
                for (var i = data.length - 1; i >= 0; i--) {
                    htmlContent = htmlContent
                            + '<tr><td>'
                            + (i + 1)
                            + '</td>'
                            + '<td>'
                            + mapwork.utils.formatDate(new Date(data[i]['time']), 'day')
                            + '</td>'
                            + '<td>'
                            + mapwork.utils.formatDate(new Date(data[i]['time']), 'time')
                            + '</td>'
                            + '<td>'
                            + '<span class="metadata"'
                            + ' title="' + data[i]['deviceId'] + '">'
                            + data[i]['deviceLocate']
                            + '</span></td></tr>';
                }
                htmlContent = htmlContent + '</tbody></table>';
                $cardDetail.html(htmlContent);
            });
        },
        afterExpandDetail: function() {
            this.loadCardEvents(mapwork.today);
        },
        getName: function() {
            return this._json.name;
        },
        getId: function() {
            return this._json.id;
        },
        getInfo: function() {
            if (this._json.info) {
                return this._json.info;
            }
            return "";
        },
        setLastEvent: function(eventJson) {
            //when change data,change background color
            if (eventJson.lastLocate !== this._json.lastLocate) {
                this._$SidebarContent.find("#cardLocate").css("background", "blue");
            }
            this._$SidebarContent.find("#cardTime").css("background", "blue");

            this._json.lastLocate = eventJson.lastLocate;
            this._json.lastTime = eventJson.lastTime;
            this._json.lastDeviceId = eventJson.lastDeviceId;

            this._$SidebarContent.find("#cardLocate").html(this._json.lastLocate);
            this._$SidebarContent.find("#cardTime").html(mapwork.utils.formatDate(new Date(this._json.lastTime), 'time'));
            var self = this;
            setTimeout(function() {
                self._$SidebarContent.find("#cardLocate").css("background", "#efefef");
                self._$SidebarContent.find("#cardTime").css("background", "#efefef");
            }, 1500);
        },
        reset: function() {
            this._$detailPage.hide();
        },
        getSidebarContent: function() {
            this._$detailPage = this._$SidebarContent.find(".popuplist-main");
            this._$SidebarContent.find("#cardImage").attr("src", this.getIcon()).attr("title", "ID:" + this._json.id);
            this._$SidebarContent.find("#cardName").html(this._json.name).attr("title", "ID:" + this._json.id);
            if (this._json.info) {
                this._$SidebarContent.find("#cardInfo").html(this._json.info).attr("title", this._json.info);
            }
            this._$SidebarContent.find("#cardLocate").html(this._json.lastLocate).attr('title', this._json.lastDeviceId);
            this._$SidebarContent.find("#cardTime").html(mapwork.utils.formatDate(new Date(this._json.lastTime), 'time'))
                    .attr('title', mapwork.utils.formatDate(new Date(this._json.lastTime), 'day'));
            this._$SidebarContent.find("#cardRole").html(this._json.role);

            var self = this;
            var today = mapwork.utils.formatDate(new Date(), "day");
            this._refreshButton = this._$SidebarContent.find("#detailRefresh");
            this._refreshButton.click(function() {
                var queryToday = mapwork.utils.date10ToDate8(today);
                self.loadCardEvents(queryToday);
            });

            var jQdatepicker = this._$SidebarContent.find('#dp3');
            jQdatepicker.datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                todayBtn: 'linked',
                todayHighlight: true,
                language: "zh-CN"
            });
            jQdatepicker.datepicker('update', today);
            jQdatepicker.on('changeDate', function(ev) {
                self.changeDate(ev.date);
            });
            return this._$SidebarContent;
        },
        changeDate: function(date) {
            if (date) {
                var strDate = 1900 + date.getYear();
                if (date.getMonth() < 10) {
                    strDate += "0";
                }
                strDate += (date.getMonth() + 1);
                if (date.getDate() < 10) {
                    strDate += "0";
                }
                strDate += date.getDate();
                if (strDate === mapwork.today) {
                    this._refreshButton.show();
                } else {
                    this._refreshButton.hide();
                }
//                console.dir(strDate);
                this.loadCardEvents(strDate);
            }
        }

    };

    if (EXTEND) {
        mapwork.utils.inherits(CardItem, EXTEND);
    }
})();