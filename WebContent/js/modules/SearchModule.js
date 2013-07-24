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
    }
    
    SearchModule.prototype = {
        initRoles: function() {
            this.init();
            var roles = {"group":{"a_building1":{"count":0,"id":"a_building1","label":"VIP","locate":"building1","name":"admin","pos":{"lat":312721330,"lon":1218254820},"warn":false},"a_building2":{"count":0,"id":"a_building2","label":"VIP","locate":"building2","name":"admin","pos":{"lat":312721330,"lon":1218311250},"warn":false},"a_factory":{"count":0,"id":"a_factory","label":"VIP","locate":"factory","name":"admin","pos":{"lat":312688130,"lon":1218286360},"warn":false},"a_outside":{"count":0,"id":"a_outside","label":"VIP","locate":"outside","name":"admin","pos":{"lat":312671990,"lon":1218342360},"warn":false},"g_building1":{"count":0,"id":"g_building1","label":"保安","locate":"building1","name":"guard","pos":{"lat":312721330,"lon":1218244820},"warn":true},"g_building2":{"count":0,"id":"g_building2","label":"保安","locate":"building2","name":"guard","pos":{"lat":312721330,"lon":1218301250},"warn":true},"g_factory":{"count":0,"id":"g_factory","label":"保安","locate":"factory","name":"guard","pos":{"lat":312688130,"lon":1218276360},"warn":false},"g_outside":{"count":0,"id":"g_outside","label":"保安","locate":"outside","name":"guard","pos":{"lat":312671990,"lon":1218332360},"warn":false},"s_building1":{"count":0,"id":"s_building1","label":"职员","locate":"building1","name":"staff","pos":{"lat":312721330,"lon":1218234820},"warn":true},"s_building2":{"count":0,"id":"s_building2","label":"职员","locate":"building2","name":"staff","pos":{"lat":312721330,"lon":1218291250},"warn":false},"s_factory":{"count":0,"id":"s_factory","label":"职员","locate":"factory","name":"staff","pos":{"lat":312688130,"lon":1218266360},"warn":false},"s_outside":{"count":0,"id":"s_outside","label":"职员","locate":"outside","name":"staff","pos":{"lat":312671990,"lon":1218322360},"warn":false},"w_building1":{"count":0,"id":"w_building1","label":"工人","locate":"building1","name":"worker","pos":{"lat":312721330,"lon":1218224820},"warn":false},"w_building2":{"count":0,"id":"w_building2","label":"工人","locate":"building2","name":"worker","pos":{"lat":312721330,"lon":1218281250},"warn":true},"w_factory":{"count":0,"id":"w_factory","label":"工人","locate":"factory","name":"worker","pos":{"lat":312688130,"lon":1218256360},"warn":false},"w_outside":{"count":0,"id":"w_outside","label":"工人","locate":"outside","name":"worker","pos":{"lat":312671990,"lon":1218312360},"warn":false}}};
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
//            this.updateCards(jsonResult);
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
            if (json && json.group) {
                for (var i in json.group) {
                    var row = json.group[i];
                    
                    var cardItem = this._cards[row.id];
                    if(!cardItem) {
                        cardItem = this.buildCardItem(row, i);
                        this._cards[cardItem._id] = cardItem;
                    }
                    if(cardItem) {
//                        console.dir(cardItem._json)
                        var strRole = cardItem._json.role;
                        if(strRole) {
                            var roleId = strRole.substring(0,1) + "_" + row.lastLocate;
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