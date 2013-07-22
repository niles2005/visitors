(function() {
    mapwork.SearchModule = SearchModule;

    var EXTEND = mapwork.Module;

    function SearchModule(setting) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._searchType = "all";
//        this._mapRectManager = new mapwork.MapRectManager();
    }

    SearchModule.prototype = {
        initRoles: function() {
            var roles = {"rows":{"Ab1":{"count":0,"id":"Ab1","label":"VIP","name":"admin","pos":{"lat":312717660,"lon":1218251390}},"Ab2":{"count":0,"id":"Ab2","label":"VIP","name":"admin","pos":{"lat":312717660,"lon":1218310620}},"Af":{"count":0,"id":"Af","label":"VIP","name":"admin","pos":{"lat":312678600,"lon":1218309970}},"Ao":{"count":0,"id":"Ao","label":"VIP","name":"admin","pos":{"lat":312655300,"lon":1218324350}},"Gb1":{"count":0,"id":"Gb1","label":"保安","name":"guard","pos":{"lat":312717660,"lon":1218241390}},"Gb2":{"count":0,"id":"Gb2","label":"保安","name":"guard","pos":{"lat":312717660,"lon":1218300620}},"Gf":{"count":0,"id":"Gf","label":"保安","name":"guard","pos":{"lat":312678600,"lon":1218299970}},"Go":{"count":0,"id":"Go","label":"保安","name":"guard","pos":{"lat":312655300,"lon":1218314350}},"Sb1":{"count":0,"id":"Sb1","label":"职员","name":"staff","pos":{"lat":312717660,"lon":1218231390}},"Sb2":{"count":0,"id":"Sb2","label":"职员","name":"staff","pos":{"lat":312717660,"lon":1218290620}},"Sf":{"count":0,"id":"Sf","label":"职员","name":"staff","pos":{"lat":312678600,"lon":1218289970}},"So":{"count":0,"id":"So","label":"职员","name":"staff","pos":{"lat":312655300,"lon":1218304350}},"Wb1":{"count":0,"id":"Wb1","label":"工人","name":"worker","pos":{"lat":312717660,"lon":1218221390}},"Wb2":{"count":0,"id":"Wb2","label":"工人","name":"worker","pos":{"lat":312717660,"lon":1218280620}},"Wf":{"count":0,"id":"Wf","label":"工人","name":"worker","pos":{"lat":312678600,"lon":1218279970}},"Wo":{"count":0,"id":"Wo","label":"工人","name":"worker","pos":{"lat":312655300,"lon":1218294350}}}};
            this.onPageQueryResult(roles);
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
        doPageQuery: function(pageIndex, pageSize, name) {
            if (name) {
                this._searchName = name;
            }
            this._sideBar.reset();
            //清空大图标
            this.doRemoveIconList();
            //清空tip层
            this.doHideTip();

//    		var url =  mapwork.configs["searchLayer_url"] + "?b1=" + b1 + "&b2=" + b2 + "&b3=" + b3 + "&b4=" + b4 + "&n=" + name + "&p=0&t=b";
            var p = pageIndex ? (pageIndex - 1) : 0;
            var param = this.getSearchParam(p);
            var url = "work?action=listroles";//mapwork.configs["searchLayer_url"];// + "?b1=" + b1 + "&b2=" + b2 + "&b3=" + b3 + "&b4=" + b4 + "&n=" + this._searchName + "&g=" + p + "&t=" + this._searchType;
            var self = this;

            mapwork.utils.loadJsonData(url, function(data) {
                
                if (!data) {
                    return;
                }
                //fit window bounds 
                self._isPageFitBounds = self._searchType == 'all';

//                if (data.total > 0) {
                    self.onPageQueryResult(data);
//                } else {
//                    //					alert("当前范围内搜索不到此信息");
//                }
            }, param);
        },
        getSearchParam: function(pageIndex) {
            var param = {};
            param["name"] = this._searchName;
            param["type"] = this._searchType;
            param["page"] = pageIndex;
            if (this._searchType == 'all') {

            } else if (this._searchType == 'bounds') {
                var ltGlobalPos = this._map._mapLocation.getWindowLeftTopGlobalPos();
                var rbGlobalPos = this._map._mapLocation.getWindowRightBottomGlobalPos();
                var ltEpos = ltGlobalPos.convert2EarthPos();
                var rbEpos = rbGlobalPos.convert2EarthPos();

                var b1 = ltEpos.getILat();
                var b2 = ltEpos.getILon();
                var b3 = rbEpos.getILat();
                var b4 = rbEpos.getILon();

                param["blat1"] = b1;
                param["blon1"] = b2;
                param["blat2"] = b3;
                param["blon2"] = b4;
            } else if (this._searchType == 'range') {
                var centerEPos = this._searchEPos;
                if (!centerEPos) {
                    centerEPos = this._map._mapLocation.getMapCenterEarthPos();
                }
                param["rlat"] = centerEPos.getILat();
                param["rlon"] = centerEPos.getILon();
                param["rlen"] = this._searchRadius;
            }
            return param;
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
            console.dir(json.pos)
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
        }
    }

    if (EXTEND) {
        mapwork.utils.inherits(SearchModule, EXTEND);
    }
})();