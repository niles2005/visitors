(function() {
    mapwork.SearchModule = SearchModule;
    SearchModule.ID = "SearchModule";

    var EXTEND = mapwork.Module;

    function SearchModule() {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._moduleId = SearchModule.ID;
        this._searchType = "all";
        this._roles = {};
        this._cards = {};
        this._selectRole = null;
        this._$consoleWindow = $("#consoleWindow");
    }
    
    SearchModule.prototype = {
        doInit: function() {
            this.init();
            var locations = ["building1","building2","factory","outside"];
            var roles = [{abb:'W',name:'Worker',css:'worker',icon:'images/Worker1.png'},{abb:'O',name:'Officer',css:'worker',icon:'images/Officer1.png'},{abb:'S',name:'Security',css:'worker',icon:'images/Security1.png'},{abb:'V',name:'VIP',css:'worker',icon:'images/VIP1.png'}];
            var jRoleTable = $(".roleTable");
            for(var row in locations){
                var location = locations[row];
                var jTr = $('<tr id='+location+'></tr>');
                jRoleTable.append(jTr) ;

                jTr.append($('<td class="positionName">'+location+'</td>'));
                for(var col in roles){
                    var role = roles[col];
                    var jTd =  $('<td/>');
//                    var jIconDiv = $('<div class="roleIcon '+role.css+'"></div>');
//                    jIconDiv.append($('<div class="roleHead">0</div>'));
//                    jIconDiv.append($('<div class="roleBody"><img class="roleImg" src="'+role.icon+'"></div>'));
//                    jIconDiv.append($('<div class="roleFooter">'+role.name+'</div>'));

                    var roleItem = new mapwork.RoleItem(this);
                    var jIconDiv = roleItem.getPageContent();
                    jIconDiv.find('.roleBody').append($('<img class="roleImg" src="'+role.icon+'">'));
                    jIconDiv.find('.roleFooter').text(role.name);
                    jTd.append(jIconDiv);
                    jTr.append(jTd);
                    roleItem.setSidebar(this._sideBar);
                    roleItem._id = role.abb + '_' + location;
                    roleItem._name = role.name;
                    this._roles[roleItem._id] = roleItem;
                }
            }

        },
        doInit0: function() {
            this.init();
            var roles = {"group":{"O_building1":{"count":0,"id":"O_building1","label":"Officer","locate":"building1","name":"Officer","pos":{"lat":312727030,"lon":1218229820},"warn":true},"O_building2":{"count":0,"id":"O_building2","label":"Officer","locate":"building2","name":"Officer","pos":{"lat":312727030,"lon":1218285250},"warn":false},"O_factory":{"count":0,"id":"O_factory","label":"Officer","locate":"factory","name":"Officer","pos":{"lat":312697630,"lon":1218285250},"warn":false},"O_outside":{"count":0,"id":"O_outside","label":"Officer","locate":"outside","name":"Officer","pos":{"lat":312683510,"lon":1218318360},"warn":false},"S_building1":{"count":0,"id":"S_building1","label":"Security","locate":"building1","name":"Security","pos":{"lat":312727030,"lon":1218241820},"warn":true},"S_building2":{"count":0,"id":"S_building2","label":"Security","locate":"building2","name":"Security","pos":{"lat":312727030,"lon":1218297250},"warn":true},"S_factory":{"count":0,"id":"S_factory","label":"Security","locate":"factory","name":"Security","pos":{"lat":312697630,"lon":1218297250},"warn":false},"S_outside":{"count":0,"id":"S_outside","label":"Security","locate":"outside","name":"Security","pos":{"lat":312683510,"lon":1218330360},"warn":false},"V_building1":{"count":0,"id":"V_building1","label":"VIP","locate":"building1","name":"VIP","pos":{"lat":312727030,"lon":1218253820},"warn":false},"V_building2":{"count":0,"id":"V_building2","label":"VIP","locate":"building2","name":"VIP","pos":{"lat":312727030,"lon":1218309250},"warn":false},"V_factory":{"count":0,"id":"V_factory","label":"VIP","locate":"factory","name":"VIP","pos":{"lat":312697630,"lon":1218309250},"warn":false},"V_outside":{"count":0,"id":"V_outside","label":"VIP","locate":"outside","name":"VIP","pos":{"lat":312683510,"lon":1218342360},"warn":false},"W_building1":{"count":0,"id":"W_building1","label":"Worker","locate":"building1","name":"Worker","pos":{"lat":312727030,"lon":1218217820},"warn":false},"W_building2":{"count":0,"id":"W_building2","label":"Worker","locate":"building2","name":"Worker","pos":{"lat":312727030,"lon":1218273250},"warn":true},"W_factory":{"count":0,"id":"W_factory","label":"Worker","locate":"factory","name":"Worker","pos":{"lat":312697630,"lon":1218273250},"warn":false},"W_outside":{"count":0,"id":"W_outside","label":"Worker","locate":"outside","name":"Worker","pos":{"lat":312683510,"lon":1218306360},"warn":false}}};

            var listLayer = this._map.getLayer("moduleListLayer");
            if (!listLayer) {
                listLayer = new mapwork.MapIconLayer("moduleListLayer");
                this._map.addLayer(listLayer);
            } else {
                listLayer.empty();
            }
            if (roles.group) {
                for (var i in roles.group) {
                    var row = roles.group[i];
                    //封装moduleItem
                    var roleItem = this.buildRoleItem(row);
                    roleItem.setMap(this._map);
                    listLayer.addElement(roleItem.getMapIcon());
                }
            }
            listLayer.initLayer();
        },

        buildRoleItem: function(json, index) {
            var roleItem = new mapwork.RoleItem(this, index);
            roleItem.setJsonData(json);
            roleItem.setSidebar(this._sideBar);
            roleItem.setIcon("images/" + json.name + "1.png");
            roleItem._id = json.id;
            roleItem._name = json.name;
            roleItem.setZIndex(100 - parseInt(index));
            roleItem.setOffsetPos([11, 31]);
            if (json.pos) {
                var ePos = new mapwork.EarthPos(json.pos.lat, json.pos.lon, true);
                roleItem.setEarthPos(ePos);
            }
            roleItem.setMap(this._map);
            this._roles[roleItem._id] = roleItem;
            return roleItem;
        },
        initDataQuery: function() {
            var url = "work?action=initdatas";
            var self = this;
            
            function loadResult(data) {
                if (!data) {
                    return;
                }
//                console.dir(data);
                if(data.today) {
                    mapwork.today = data.today;
                }
                if(data.cards) {
                    self.updateCardInfo(data.cards);
                }
                if(data.register) {
                    self.updateRegisterInfo(data.register);
                }
            }
            
            $.ajax({
                url: url,
                dataType: "json", //这里的dataType就是返回回来的数据格式了html,xml,json 
                cache: false, //设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false 
                success: loadResult
            });
        },
        updateRegisterInfo: function(data) {
            if(data) {
                if(data.cardReg) {
                    $('#cardReg').text(data.cardReg);
                }
                if(data.cardUnreg) {
                    $('#cardUnreg').text(data.cardUnreg);
                }
                if(data.cardDeactive) {
                    $('#cardDeactive').text(data.cardDeactive);
                }
                if(data.deviceReg) {
                    $('#deviceReg').text(data.deviceReg);
                }
                if(data.deviceUnreg) {
                    $('#deviceUnreg').text(data.deviceUnreg);
                }
                if(data.deviceDeactive) {
                    $('#deviceDeactive').text(data.deviceDeactive);
                }
            }
        },
        updateCardInfo: function(cards) {
            if (cards) {
                for (var i in cards) {
                    var row = cards[i];
                    var cardItem = this.buildCardItem(row, i);
                    
                    if(cardItem) {
                        this._cards[cardItem._id] = cardItem;
                        var strRole = cardItem._json.role;
                        if(strRole) {
                            var roleId = strRole.substring(0,1) + "_" + cardItem._json.lastLocate;
                            var role = this._roles[roleId];
                            if(role) {
                                cardItem.setRole(role);
                            }
                        }
                    }
                }
            }
        },
                
        findCards: function(name) {
            if(this._selectRole) {
                this._selectRole.clearFocus();
                this._selectRole = null;
            }
            var c,card;
            var arr = [];
            name = $.trim(name);
            if(name.length !== 0) {
                for(c in this._cards) {
                    card = this._cards[c];
                    if(card.getId().indexOf(name) !== -1) {
                        arr.push(card);
                    } else if(card.getName().indexOf(name) !== -1) {
                        arr.push(card);
                    }
                }
            }
            return arr;
        },

        buildModuleItem: function(json, index) {
            var moduleId = json.type;
            var module = this._map.getModule(moduleId);
            var moduleItem = module._setting.newModuleItem(module, index);
            moduleItem.setJsonData(json);
            moduleItem.setSidebar(this._sideBar);

            moduleItem._id = json.id;
            moduleItem._name = json.name;
            moduleItem.setDescribe("");
            moduleItem.setZIndex(100 - parseInt(index));
            moduleItem.setOffsetPos([11, 31]);
            if (json.pos) {
                var ePos = new mapwork.EarthPos(json.pos.lat, json.pos.lon, true);
                moduleItem.setEarthPos(ePos);
            }
            moduleItem.setMap(this._map);
//            this._mapRectManager.addModuleItem(moduleItem);
            return moduleItem;
        },
        clean: function() {
            this._sideBar.clean();
            //清空大图标
            this.doRemoveIconList();
            //清空tip层
            this.doHideTip();
            //清空小图标
            var listLayer = this._map.getLayer("moduleListLayer");
            if (listLayer) {
                listLayer.empty();
            }
            if (this._searchHandler) {
                this._searchHandler.doClose();
                this._searchHandler.closePin();
            }
        },
        updateDatas: function(json) {
            if (json) {
//                console.log(json);
                if(json.today) {
                    mapwork.today = json.today;
                    var today = mapwork.utils.date8ToDate10(mapwork.today,'-');

                    for (var i in this._cards) {
                        var card = this._cards[i];
                        if(card) {
                            card.changeToday(today);
                        }
                    }                    
                }
                if(json.register) {
                    this.updateRegisterInfo(json.register);
                }

                var cards = json.cards;
                if(cards) {
                    console.log('accept cards')
                    for (var i in cards) {
                        var card = cards[i];
                        var cardItem = this._cards[card.id];
                        if(!cardItem) {
                            cardItem = this.buildCardItem(card, i);
                            if (cardItem) {
                                this._cards[cardItem._id] = cardItem;
                            }
                        }
                        if(cardItem) {
                            var strRole = cardItem._json.role;
                                if(strRole) {
                                    cardItem.setLastEvent(card);
                                    var roleId = strRole.substring(0,1) + "_" + card.lastLocate;
                                    var role = this._roles[roleId];
                                    if(role) {
                                        cardItem.setRole(role);
                                    }
                            }
                        }
                    }
                }
                var events = json.events;
                if(events) {
                    var self = this;
                    var $liWrap = $(".console-log");
                    for(var e in events) {
                        var eve = events[e];
                        var date = new Date(eve.time);
                        var ss = "<li class='eventli'>" + eve.seqId + "  " + mapwork.utils.formatDate(date, 'day') + " " + mapwork.utils.formatDate(date, 'time') + " " + eve.cardId;
                        var cardItem = this._cards[eve.cardId];
                        if(cardItem) {
                            ss += "[" + cardItem.getName() + "]";
                        }
                        ss += "  " + eve.deviceId + "[" + eve.deviceLocate + "]</li>";
                        var $LI = $(ss);
                        $LI.get(0).currentEvent = eve;
                        $LI.click(function(event) {
                           self.selectLI(this);
                        });
                        $liWrap.append($LI);
                    }
                    var children = $liWrap.children();
                    var limitNum = 50;
                    if(children.length > limitNum) {
                        for(var i=children.length - limitNum - 1;i>=0;i--) {
                            $(children.get(i)).remove();
                        }
                    }
                    $('.console-wrapper').scrollTop($('.console-wrapper')[0].scrollHeight);
                }
            }
        },
        selectLI: function(li) {
            if(this._$selectLI) {
                this._$selectLI.removeClass("selectedLI");
            }
            this._$selectLI = $(li);
            this._$selectLI.addClass("selectedLI");
            
            if(li.currentEvent) {
                var cardItem = this._cards[li.currentEvent.cardId];
                if(cardItem) {
                    var arr = [];
                    arr.push(cardItem);
                    this._sideBar.onPageQueryResult(arr,this);
                }
            }
        },
        
        buildCardItem: function(json, index) {
            var cardItem = null;
            if (json.actived) {
                var cardItem = new mapwork.CardItem(this, index, this._roles);
                cardItem.setJsonData(json);
                cardItem.setSidebar(this._sideBar);

                cardItem._id = json.id;
                cardItem._name = json.name;
                cardItem.setIcon("images/" + json.role + "2.png");
                cardItem.setDescribe("");
                cardItem.setZIndex(100 - parseInt(index));
                cardItem.setOffsetPos([11, 31]);
                cardItem.setMap(this._map);
            }
            return cardItem;
        }
    };

    if (EXTEND) {
        mapwork.utils.inherits(SearchModule, EXTEND);
    }
})();