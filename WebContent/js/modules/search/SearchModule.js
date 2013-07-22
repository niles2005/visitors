(function() {
    mapwork.SearchModule = SearchModule;

    var EXTEND = mapwork.Module;

    function SearchModule(setting) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._searchType = "all";
        this._roles = {};
        this._users = {};
    }

    SearchModule.prototype = {
        initRoles: function() {
            this.init();
            var roles = {"rows":{"a_b1":{"count":0,"id":"a_b1","label":"VIP","locate":"outside","name":"admin","pos":{"lat":312717660,"lon":1218251390}},"a_b2":{"count":0,"id":"a_b2","label":"VIP","locate":"outside","name":"admin","pos":{"lat":312717660,"lon":1218310620}},"a_f":{"count":0,"id":"a_f","label":"VIP","locate":"outside","name":"admin","pos":{"lat":312678600,"lon":1218309970}},"a_o":{"count":0,"id":"a_o","label":"VIP","locate":"outside","name":"admin","pos":{"lat":312655300,"lon":1218324350}},"g_b1":{"count":0,"id":"g_b1","label":"保安","locate":"factory","name":"guard","pos":{"lat":312717660,"lon":1218241390}},"g_b2":{"count":0,"id":"g_b2","label":"保安","locate":"factory","name":"guard","pos":{"lat":312717660,"lon":1218300620}},"g_f":{"count":0,"id":"g_f","label":"保安","locate":"factory","name":"guard","pos":{"lat":312678600,"lon":1218299970}},"g_o":{"count":0,"id":"g_o","label":"保安","locate":"factory","name":"guard","pos":{"lat":312655300,"lon":1218314350}},"s_b1":{"count":0,"id":"s_b1","label":"职员","locate":"building2","name":"staff","pos":{"lat":312717660,"lon":1218231390}},"s_b2":{"count":0,"id":"s_b2","label":"职员","locate":"building2","name":"staff","pos":{"lat":312717660,"lon":1218290620}},"s_f":{"count":0,"id":"s_f","label":"职员","locate":"building2","name":"staff","pos":{"lat":312678600,"lon":1218289970}},"s_o":{"count":0,"id":"s_o","label":"职员","locate":"building2","name":"staff","pos":{"lat":312655300,"lon":1218304350}},"w_b1":{"count":0,"id":"w_b1","label":"工人","locate":"building1","name":"worker","pos":{"lat":312717660,"lon":1218221390}},"w_b2":{"count":0,"id":"w_b2","label":"工人","locate":"building1","name":"worker","pos":{"lat":312717660,"lon":1218280620}},"w_f":{"count":0,"id":"w_f","label":"工人","locate":"building1","name":"worker","pos":{"lat":312678600,"lon":1218279970}},"w_o":{"count":0,"id":"w_o","label":"工人","locate":"building1","name":"worker","pos":{"lat":312655300,"lon":1218294350}}}};
            var listLayer = this._map.getLayer("moduleListLayer");
            if (!listLayer) {
                listLayer = new mapwork.MapIconLayer("moduleListLayer");
                this._map.addLayer(listLayer);
            } else {
                listLayer.empty();
            }
            if (roles.rows) {
                for (var i in roles.rows) {
                    var row = roles.rows[i];
                    //封装moduleItem
                    var roleItem = this.buildRoleItem(row);
                    roleItem.setMap(this._map);
                    listLayer.addElement(roleItem.getMapIcon());
                }
            }
            listLayer.initLayer();
            this.doUserQuery();
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
        doUserQuery: function() {
            var url = "work?action=listusers";
            var self = this;

            mapwork.utils.loadJsonData(url, function(data) {
                if (!data) {
                    return;
                }
                self.onUserQueryResult(data);
            });
        },
                
        doPageQuery: function(pageIndex, pageSize, name) {
            if (name) {
                this._searchName = name;
            }
            this._sideBar.reset();
            //清空大图标
            this.doRemoveIconList();
            //清空tip层
            this.doHideTip();

            var p = pageIndex ? (pageIndex - 1) : 0;
            var url = "work?action=listusers";
            var self = this;

            mapwork.utils.loadJsonData(url, function(data) {
                if (!data) {
                    return;
                }
                self.onUserQueryResult(data);
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
        onUserQueryResult: function(jsonResult) {
            if (!jsonResult) {
                return;
            }
            if (jsonResult.rows) {
                for (var i in jsonResult.rows) {
                    var row = jsonResult.rows[i];
                    var userItem = this.buildUserItem(row, i);
                    this._users[userItem._id] = userItem;
                }
            }
            this.doEventQuery();
        },
        buildUserItem: function(json, index) {
            var userItem = new mapwork.UserItem(this, index,this._roles);
            userItem.setJsonData(json);
            userItem.setSidebar(this._sideBar);

            userItem._id = json.id;
            userItem._name = json.name;
            userItem.setIcon("images/" + json.role + "2.png");
            userItem.setDescribe("");
            userItem.setZIndex(100 - parseInt(index));
            userItem.setOffsetPos([11, 31]);
            userItem.setMap(this._map);
            return userItem;
        },
        doEventQuery: function() {
//            this._sideBar.reset();
            //清空大图标
//            this.doRemoveIconList();
            //清空tip层
//            this.doHideTip();
            var json = [{"user":"g2","locate":"b1","time":124234235},{"user":"g3","locate":"b1","time":124234235},{"user":"g5","locate":"b1","time":124234235}];
            console.dir(json);
            this.onEventQueryResult(json);
//            var url = "work?action=listusers";
//            var self = this;
//
//            mapwork.utils.loadJsonData(url, function(data) {
//                if (!data) {
//                    return;
//                }
//                self.onEventQueryResult(data);
//            });
        },
        onEventQueryResult: function(jsonResult) {
            if (!jsonResult) {
                return;
            }
            for (var i in jsonResult) {
                var event = jsonResult[i];
                var user = this._users[event.user];
                if(user) {
                    var strRole = user._json.role;
                    var roleId = strRole.substring(0,1) + "_" + event.locate;
                    console.log(roleId)
                    var role = this._roles[roleId];
                    if(role) {
                        user.setRole(role);
                    }
                }
            }
        },                
                
    }

    if (EXTEND) {
        mapwork.utils.inherits(SearchModule, EXTEND);
    }
})();