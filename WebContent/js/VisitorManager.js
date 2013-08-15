(function() {
    visitors.VisitorManager = VisitorManager;

    var EXTEND = null;

    function VisitorManager() {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._roles = {};
        this._cards = {};
        this._selectRole = null;
        this._$consoleWindow = $("#consoleWindow");
    }
    
    VisitorManager.prototype = {
        init: function() {
            this._sideBar = new visitors.SideBarPage(this);
            this._sideBar.init();
        },
                
        doInit: function() {
            this.init();
            var locations = [{name:"building1",top:"170px",left:"215px"},{name:"building2",top:"170px",left:"475px"},{name:"factory",top:"326px",left:"350px"},{name:"outside",top:"403px",left:"631px"}];
            var roles = [{abb:'W',name:'Worker',css:'worker',icon:'images/Worker1.png'},{abb:'O',name:'Officer',css:'worker',icon:'images/Officer1.png'},{abb:'F',name:'Facility',css:'worker',icon:'images/Facility1.png'},{abb:'V',name:'VIP',css:'worker',icon:'images/VIP1.png'}];
            var jMainStageDiv = $(".viewcontainer");
            for(var row in locations){
                var jPosition = $('<div id='+locations[row].name+' style="position:absolute;z-index:50;white-space:nowrap;top:'+locations[row].top+';left:'+locations[row].left+';"><ul class="roleRow"></ul></div>');
                var jUl =  jPosition.find('.roleRow');
                jMainStageDiv.append(jPosition);
                for(var col in roles){
                    var role = roles[col];
                    var jLi =  $('<li/>');

                    var roleItem = new visitors.RoleItem(this);
                    var jIconDiv = roleItem.getPageContent();
                    jIconDiv.find('.roleBody').append($('<img class="roleImg" src="'+role.icon+'" title="'+role.name+'">'));
                    jIconDiv.find('.roleFooter').text(role.name);
                    jLi.append(jIconDiv);
                    jUl.append(jLi);
                    roleItem.setSidebar(this._sideBar);
                    roleItem._id = role.abb + '_' + locations[row].name;
                    roleItem._name = role.name;
                    this._roles[roleItem._id] = roleItem;
                }
            }

        },

        buildRoleItem: function(json, index) {
            var roleItem = new visitors.RoleItem(this, index);
            roleItem.setJsonData(json);
            roleItem.setSidebar(this._sideBar);
            roleItem.setIcon("images/" + json.name + "1.png");
            roleItem._id = json.id;
            roleItem._name = json.name;
            roleItem.setZIndex(100 - parseInt(index));
            roleItem.setOffsetPos([11, 31]);
            if (json.pos) {
                var ePos = new visitors.EarthPos(json.pos.lat, json.pos.lon, true);
                roleItem.setEarthPos(ePos);
            }
            this._roles[roleItem._id] = roleItem;
            return roleItem;
        },
        initDataQuery: function() {
            var url = "work?action=initdatas";
            var self = this;
//            console.log(url);
            function loadResult(data) {
                if (!data) {
                    return;
                }
                
//                console.dir(data);
                if(data.today) {
                    visitors.today = data.today;
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
        resetRoles: function() {
            for(var k in this._roles) {
                var role = this._roles[k];
                role.reset();
            }
        },
        updateCardInfo: function(cards) {
            if (cards) {
                this.resetRoles();
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

        updateDatas: function(json) {
            if (json) {
//                console.log(json);
                if(json.today) {
                    visitors.today = json.today;
                    var today = visitors.utils.date8ToDate10(visitors.today,'-');

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
                        var ss = "<li class='eventli'>" + eve.seqId + "  " + visitors.utils.formatDate(date, 'day') + " " + visitors.utils.formatDate(date, 'time') + " " + eve.cardId;
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
                var cardItem = new visitors.CardItem(this, index, this._roles);
                cardItem.setJsonData(json);
                cardItem.setSidebar(this._sideBar);

                cardItem._id = json.id;
                cardItem._name = json.name;
                cardItem.setIcon("images/" + json.role + "2.png");
                cardItem.setZIndex(100 - parseInt(index));
                cardItem.setOffsetPos([11, 31]);
            }
            return cardItem;
        }
    };

    if (EXTEND) {
        visitors.utils.inherits(VisitorManager, EXTEND);
    }
})();