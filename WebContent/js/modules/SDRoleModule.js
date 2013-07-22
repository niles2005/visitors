(function() {
    mapwork.SDRoleModule = SDRoleModule;

    var EXTEND = mapwork.Module;
    mapwork.SDRoles = {};
    
    function SDRoleModule(setting) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._searchType = "all";
    }

    SDRoleModule.prototype = {
        initRoles: function() {
            var mapPopLayer = this._map.getLayer(mapwork.MapPopLayer.ID);
            var roleItem = new mapwork.SDRoleItem(this);
            roleItem.setMap(this._map);
            
            var json = {"age":45,"authority":"worker","createTime":1374469855062,"gender":"mail","id":"w7","info":"Test role for worker","locate":"building1","name":"worker7","pos":{"lat":312437560,"lon":1218342470},"type":"road"};
            roleItem.setJsonData(json);
            roleItem.setSidebar(this._sideBar);

            roleItem._id = json.id;
            roleItem._name = json.name;
            roleItem.setDescribe("");
            
            if (json.pos) {
                var ePos = new mapwork.EarthPos(json.pos.lat, json.pos.lon, true);
                roleItem.setEarthPos(ePos);
            }
//            var ePos = roleItem.getEarthPos();
//            if (ePos) {
//                var gPos = ePos.convert2GlobalPos();
//                if (gPos) {
//                    bounds.expandToIncludePoint(gPos.posX, gPos.posY);
//                }
//            }

            var mapIcon = roleItem.getMapIcon();
            mapPopLayer.addElement(mapIcon);
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
            var url = "work?action=list";//mapwork.configs["searchLayer_url"];// + "?b1=" + b1 + "&b2=" + b2 + "&b3=" + b3 + "&b4=" + b4 + "&n=" + this._searchName + "&g=" + p + "&t=" + this._searchType;
            var self = this;

            mapwork.utils.loadJsonData(url, function(data) {
                
//                console.dir(data);
//                var ss = '{"rows":{"admin0":{"age":42,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a0","info":"Test role for admin","name":"admin0","pos":{"lat":312602560,"lon":1218350470},"type":"road"},"admin12":{"age":44,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a12","info":"Test role for admin","name":"admin12","pos":{"lat":312575060,"lon":1218358470},"type":"road"},"admin18":{"age":46,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a18","info":"Test role for admin","name":"admin18","pos":{"lat":312575060,"lon":1218358470},"type":"road"},"admin2":{"age":23,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a2","info":"Test role for admin","name":"admin2","pos":{"lat":312587560,"lon":1218334470},"type":"road"},"admin21":{"age":44,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a21","info":"Test role for admin","name":"admin21","pos":{"lat":312582560,"lon":1218350470},"type":"road"},"admin29":{"age":45,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a29","info":"Test role for admin","name":"admin29","pos":{"lat":312562560,"lon":1218350470},"type":"road"},"admin34":{"age":36,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a34","info":"Test role for admin","name":"admin34","pos":{"lat":312557560,"lon":1218334470},"type":"road"},"admin38":{"age":40,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a38","info":"Test role for admin","name":"admin38","pos":{"lat":312605060,"lon":1218358470},"type":"road"},"admin39":{"age":23,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a39","info":"Test role for admin","name":"admin39","pos":{"lat":312585060,"lon":1218358470},"type":"road"},"admin40":{"age":39,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a40","info":"Test role for admin","name":"admin40","pos":{"lat":312575060,"lon":1218358470},"type":"road"},"admin42":{"age":34,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a42","info":"Test role for admin","name":"admin42","pos":{"lat":312560060,"lon":1218342470},"type":"road"},"admin44":{"age":34,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a44","info":"Test role for admin","name":"admin44","pos":{"lat":312580060,"lon":1218342470},"type":"road"},"admin45":{"age":26,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a45","info":"Test role for admin","name":"admin45","pos":{"lat":312595060,"lon":1218358470},"type":"road"},"admin48":{"age":39,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a48","info":"Test role for admin","name":"admin48","pos":{"lat":312572560,"lon":1218350470},"type":"road"},"admin5":{"age":24,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a5","info":"Test role for admin","name":"admin5","pos":{"lat":312587560,"lon":1218334470},"type":"road"},"admin7":{"age":32,"authority":"admin","createTime":1374163653671,"gender":"femail","id":"a7","info":"Test role for admin","name":"admin7","pos":{"lat":312587560,"lon":1218366470},"type":"road"},"guard1":{"age":32,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g1","info":"Test role for guard","name":"guard1","pos":{"lat":312565060,"lon":1218350470},"type":"road"},"guard10":{"age":38,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g10","info":"Test role for guard","name":"guard10","pos":{"lat":312575060,"lon":1218350470},"type":"road"},"guard13":{"age":29,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g13","info":"Test role for guard","name":"guard13","pos":{"lat":312602560,"lon":1218342470},"type":"road"},"guard23":{"age":27,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g23","info":"Test role for guard","name":"guard23","pos":{"lat":312560060,"lon":1218334470},"type":"road"},"guard25":{"age":32,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g25","info":"Test role for guard","name":"guard25","pos":{"lat":312600060,"lon":1218366470},"type":"road"},"guard26":{"age":27,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g26","info":"Test role for guard","name":"guard26","pos":{"lat":312597560,"lon":1218358470},"type":"road"},"guard28":{"age":35,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g28","info":"Test role for guard","name":"guard28","pos":{"lat":312570060,"lon":1218366470},"type":"road"},"guard3":{"age":31,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g3","info":"Test role for guard","name":"guard3","pos":{"lat":312592560,"lon":1218342470},"type":"road"},"guard36":{"age":36,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g36","info":"Test role for guard","name":"guard36","pos":{"lat":312560060,"lon":1218366470},"type":"road"},"guard41":{"age":31,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g41","info":"Test role for guard","name":"guard41","pos":{"lat":312585060,"lon":1218350470},"type":"road"},"guard8":{"age":24,"authority":"guard","createTime":1374163653671,"gender":"mail","id":"g8","info":"Test role for guard","name":"guard8","pos":{"lat":312570060,"lon":1218366470},"type":"road"},"staff11":{"age":42,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s11","info":"Test role for staff","name":"staff11","pos":{"lat":312572560,"lon":1218334470},"type":"road"},"staff15":{"age":42,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s15","info":"Test role for staff","name":"staff15","pos":{"lat":312562560,"lon":1218334470},"type":"road"},"staff20":{"age":21,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s20","info":"Test role for staff","name":"staff20","pos":{"lat":312575060,"lon":1218342470},"type":"road"},"staff22":{"age":30,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s22","info":"Test role for staff","name":"staff22","pos":{"lat":312587560,"lon":1218350470},"type":"road"},"staff30":{"age":37,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s30","info":"Test role for staff","name":"staff30","pos":{"lat":312565060,"lon":1218342470},"type":"road"},"staff31":{"age":31,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s31","info":"Test role for staff","name":"staff31","pos":{"lat":312572560,"lon":1218334470},"type":"road"},"staff33":{"age":34,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s33","info":"Test role for staff","name":"staff33","pos":{"lat":312592560,"lon":1218366470},"type":"road"},"staff37":{"age":30,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s37","info":"Test role for staff","name":"staff37","pos":{"lat":312597560,"lon":1218350470},"type":"road"},"staff43":{"age":35,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s43","info":"Test role for staff","name":"staff43","pos":{"lat":312565060,"lon":1218342470},"type":"road"},"staff46":{"age":27,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s46","info":"Test role for staff","name":"staff46","pos":{"lat":312572560,"lon":1218334470},"type":"road"},"staff47":{"age":33,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s47","info":"Test role for staff","name":"staff47","pos":{"lat":312572560,"lon":1218334470},"type":"road"},"staff9":{"age":34,"authority":"staff","createTime":1374163653671,"gender":"femail","id":"s9","info":"Test role for staff","name":"staff9","pos":{"lat":312580060,"lon":1218358470},"type":"road"},"worker14":{"age":43,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w14","info":"Test role for worker","name":"worker14","pos":{"lat":312565060,"lon":1218366470},"type":"road"},"worker16":{"age":35,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w16","info":"Test role for worker","name":"worker16","pos":{"lat":312565060,"lon":1218366470},"type":"road"},"worker17":{"age":39,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w17","info":"Test role for worker","name":"worker17","pos":{"lat":312585060,"lon":1218334470},"type":"road"},"worker19":{"age":40,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w19","info":"Test role for worker","name":"worker19","pos":{"lat":312560060,"lon":1218350470},"type":"road"},"worker24":{"age":20,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w24","info":"Test role for worker","name":"worker24","pos":{"lat":312595060,"lon":1218366470},"type":"road"},"worker27":{"age":40,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w27","info":"Test role for worker","name":"worker27","pos":{"lat":312592560,"lon":1218358470},"type":"road"},"worker32":{"age":22,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w32","info":"Test role for worker","name":"worker32","pos":{"lat":312587560,"lon":1218342470},"type":"road"},"worker35":{"age":37,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w35","info":"Test role for worker","name":"worker35","pos":{"lat":312557560,"lon":1218342470},"type":"road"},"worker4":{"age":31,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w4","info":"Test role for worker","name":"worker4","pos":{"lat":312565060,"lon":1218334470},"type":"road"},"worker49":{"age":48,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w49","info":"Test role for worker","name":"worker49","pos":{"lat":312567560,"lon":1218342470},"type":"road"},"worker6":{"age":28,"authority":"worker","createTime":1374163653671,"gender":"mail","id":"w6","info":"Test role for worker","name":"worker6","pos":{"lat":312585060,"lon":1218334470},"type":"road"}}}';
//                var s1 = '{"rows":[{"_id":{"$oid":"507f6769b6554dad264d1997"},"pid":"RP8413","name":"艾溪路","type":"road","tag":"道路","pos":{"lat":312587060,"lon":1218334470},"poiindex":8413},{"_id":{"$oid":"507f676fb6554dad264d3c6b"},"pid":"RP17329","name":"浦东西路","type":"road","tag":"道路","pos":{"lat":312587090,"lon":1218323490},"poiindex":17329}],"total":13013,"pageSize":10,"page":1,"totalPages":1302} ';
//                data = JSON.parse(ss);
                // console.log(JSON.stringify(data));
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
            var tag = json.tag;
            if (tag) {
                var pos = tag.indexOf("|");
                var typeName = "";
                if (pos > 0) {
                    typeName = tag.substring(0, pos);
                } else {
                    typeName = tag;
                }
                var describe = "<p>类别: " + typeName + "</p>";
                if (json.length != undefined) {
                    describe += "<p>距离: 离中心点" + json.length + "米</p>";
                }
                if (json.describeHtml) {
                    describe += json.describeHtml;
                }
                moduleItem.setDescribe(describe);
            }
            moduleItem.setDescribe(json.info);
            moduleItem.setZIndex(100 - parseInt(index));
            moduleItem.setOffsetPos([11, 31]);
            if (json.pos) {
                var ePos = new mapwork.EarthPos(json.pos.lat, json.pos.lon, true);
                moduleItem.setEarthPos(ePos);
            }
            moduleItem.setMap(this._map);
            this._mapRectManager.addModuleItem(moduleItem);
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
        mapwork.utils.inherits(SDRoleModule, EXTEND);
    }
})();