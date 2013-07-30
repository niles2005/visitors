(function() {
    mapwork.SearchModule = SearchModule;

    var EXTEND = mapwork.Module;

    function SearchModule(setting) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._searchType = "all";
        this._roles = {};
        this._cards = {};
        this._selectRole = null;
    }
    
    SearchModule.prototype = {
        initRoles: function() {
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
            this.doCardQuery();
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
//            this._mapRectManager.addModuleItem(moduleItem);
            return roleItem;
        },
        //searchType: a: all   b: bounds   r:range
        setSearchType: function(searchType) {
            this._searchType = searchType;
        },
        setSearchCenterEPos: function(searchEPos) {
            this._searchEPos = searchEPos;
        },
        setSearchRadius: function(searchRadius) {
            this._searchRadius = searchRadius;
        },
        doCardQuery: function() {
            var url = "work?action=listcards";
            var self = this;

            mapwork.utils.loadJsonData(url, function(data) {
                if (!data) {
                    return;
                }
                self.onCardQueryResult(data);
            });
        },
        findCards: function(name) {
            if(this._selectRole) {
                this._selectRole.clearFocus();
                this._selectRole = null;
            }
            var r,role,c,cards,card;
            var arr = [];
            name = $.trim(name);
            if(name.length !== 0) {
                for(r in this._roles) {
                    role = this._roles[r];
                    cards = role._cards;
                    for(c in cards) {
                        card = cards[c];
                        if(card.getId().indexOf(name) !== -1) {
                            arr.push(card);
                        } else if(card.getName().indexOf(name) !== -1) {
                            arr.push(card);
                        }
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
        setSearchHandler: function(searchHandler) {
            this._searchHandler = searchHandler;
        },
        onCardQueryResult: function(jsonResult) {
            if (jsonResult && jsonResult.group) {
                for (var i in jsonResult.group) {
                    var row = jsonResult.group[i];
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
            this.doEventQuery();
        },
        updateCards: function(json) {
            if (json) {
                for (var i in json) {
                    var card = json[i];
                    
                    var cardItem = this._cards[card.id];
                    if(!cardItem) {
                        cardItem = this.buildCardItem(card, i);
                        this._cards[cardItem._id] = cardItem;
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
        },
        buildCardItem: function(json, index) {
            var cardItem = new mapwork.CardItem(this, index,this._roles);
            cardItem.setJsonData(json);
            cardItem.setSidebar(this._sideBar);

            cardItem._id = json.id;
            cardItem._name = json.name;
            cardItem.setIcon("images/" + json.role + "2.png");
            cardItem.setDescribe("");
            cardItem.setZIndex(100 - parseInt(index));
            cardItem.setOffsetPos([11, 31]);
            cardItem.setMap(this._map);
            return cardItem;
        },
        doEventQuery: function() {
//            var json = [{"user":"g2","locate":"b1","time":124234235},{"user":"g3","locate":"b1","time":124234235},{"user":"g5","locate":"b1","time":124234235}];
//            console.dir(json);
//            this.onEventQueryResult(json);
            
            var url = "work?action=loadevents";
            var self = this;

            mapwork.utils.loadJsonData(url, function(data) {
                if (!data) {
                    return;
                }
                self.onEventQueryResult(data);
            });
        },
        onEventQueryResult: function(jsonResult) {
            if (!jsonResult) {
                return;
            }
            for (var i in jsonResult) {
                var event = jsonResult[i];
                var card = this._cards[event.cardId];
                if(card) {
                    var strRole = card._json.role;
                    var roleId = strRole.substring(0,1) + "_" + event.deviceLocate;
                    var role = this._roles[roleId];
                    if(role) {
                        card.setRole(role);
                    }
                }
            }
        },                
//        buildCardByEvent: function(event) {
//             var cardId = event.cardId;
//             var cardName = event.cardName;
//             var cardRole = event.cardRole;
//             if(!cardId || !cardRole) {
//                 return null;
//             }
//             if(!cardName) {
//                 cardName = cardId;
//             }
//             var cardJson = {"id":cardId,"name":cardName,"role":cardRole,"createTime":-1};
//             return this.buildCardItem(cardJson,-1);
//        }        
    };

    if (EXTEND) {
        mapwork.utils.inherits(SearchModule, EXTEND);
    }
})();