(function() {
    mapwork.Module = Module;

    var EXTEND = null;

    function Module(setting) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._setting = setting;
        this._isPageFitBounds = true;
    }

    Module.prototype = {
        init: function() {
            this._sideBar = this.buildSideBar();
            this._sideBar.init();
        },
        getModuleId: function() {
            return this._setting.ID;
        },
        setMap: function(map) {
            this._map = map;
        },
        buildSideBar: function() {
            if (this._setting.newSidebar) {
                return this._setting.newSidebar(this);
            }
            //default is sidebarPage
            return new mapwork.SideBarPage(this);
        },
        buildModuleItem: function(json, index) {
            var moduleItem = this._setting.newModuleItem(this, index);
            moduleItem.setJsonData(json);
            moduleItem.setSidebar(this._sideBar);
            return moduleItem;
        },
        doPageQueryTest: function() {
            this._sideBar.reset();
            if (this._objectArray) {
                for (var i in this._objectArray) {
                    this._objectArray[i].doRemove();
                }
            }
            this._map.hideTip();

            var queryContent = this.getTestPageResult();
            this.onPageQueryResult(queryContent);
        },
        doListQueryTest: function() {
            var queryContent = this.getTestListResult();
            this.onListQueryResult(queryContent);
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
            //setting中的clean
            if (this._setting.clean) {
                this._setting.clean(this);
            }
        },
        workAllPageItem: function(callback) {
            if (this._pageQueryResult && this._pageQueryResult.rows) {
                for (var i in this._pageQueryResult.rows) {
                    var item = this._pageQueryResult.rows[i];
                    if (item._moduleItem) {
                        callback.call(item._moduleItem, item._moduleItem);
                    }
                }
            }
        },
        workAllListItem: function(callback) {
            if (this._listQueryResult && this._listQueryResult.rows) {
                for (var i in this._listQueryResult.rows) {
                    var item = this._listQueryResult.rows[i];
                    if (item._moduleItem) {
                        callback.call(item._moduleItem, item._moduleItem);
                    }
                }
            }
        },
        doRemoveIconList: function() {
            //清空大图标
            if (this._pageQueryResult && this._pageQueryResult.rows) {
                for (var i in this._pageQueryResult.rows) {
                    var item = this._pageQueryResult.rows[i];
                    if (item._moduleItem) {
                        item._moduleItem.doRemove();
                    }
                }
            }
        },
        doHideTip: function() {
            this._map.hideTip();
        },
        doPageQuery: function(pageIndex, pageSize) {
            this._sideBar.reset();
            //清空大图标
//        	this.doRemoveIconList();
            this.workAllPageItem(function(moduleItem) {
                moduleItem.doRemove();
            })
            //清空tip层
            this.doHideTip();

            var queryParam = {};
            queryParam["pagination.pageIndex"] = pageIndex;
            queryParam["pagination.pageSize"] = pageSize;

            var url = this._setting.pageUrl;

            this._ajaxFlag = (new Date()).getTime();
            var self = this;
            if (url && url.length > 0) {
                $.ajax({
                    url: url,
                    data: queryParam,
//                  async: false,
                    dataType: "json", //这里的dataType就是返回回来的数据格式了html,xml,json 
                    cache: false, //设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false 
                    success: function(flag) {//此处解决异步调用多次返回结果匹配问题，采用function的内部变量做比较
                        return function(data) {
                            if (flag === self._ajaxFlag) {
                                self.onPageQueryResult(data);
                            }
                        }
                    }(self._ajaxFlag)
                });
            }
        },
        doListQuery: function() {
            var url = this._setting.listUrl;
            var self = this;
            function onResult(data) {
                self.onListQueryResult(data);

            }
            if (url && url.length > 0) {
                $.ajax({
                    url: url,
                    dataType: "json", //这里的dataType就是返回回来的数据格式了html,xml,json 
                    cache: false, //设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false 
                    success: onResult
                });
            }
        },
        onPageQueryResult: function(jsonResult) {
            var mapPopLayer = this._map.getLayer(mapwork.MapPopLayer.ID);
            this._pageQueryResult = jsonResult;
            if (!jsonResult) {
                return;
            }
            var bounds = new mapwork.Bounds();
            if (!jsonResult.m_detail && jsonResult.rows) {
                for (var i in jsonResult.rows) {
                    var row = jsonResult.rows[i];
                    //封装moduleItem
                    var moduleItem = this.buildModuleItem(row, i);
                    moduleItem.setMap(this._map);
                    row._moduleItem = moduleItem;

                    var ePos = moduleItem.getEarthPos();
                    if (ePos) {
                        var gPos = ePos.convert2GlobalPos();
                        if (gPos) {
                            bounds.expandToIncludePoint(gPos.posX, gPos.posY);
                        }
                    }

                    var mapIcon = moduleItem.getMapIcon();
                    mapPopLayer.addElement(mapIcon);
                }
            }

            //填充边栏
//            this._sideBar.onPageQueryResult(jsonResult);

            mapPopLayer.initLayer();
//            if (this._isPageFitBounds) {
//                this._map.fitBounds(bounds);
//            }
        },
        onListQueryResult: function(jsonResult) {
            var listLayer = this._map.getLayer("moduleListLayer");
            if (!listLayer) {
                listLayer = new mapwork.MapIconLayer("moduleListLayer");
                this._map.addLayer(listLayer);
            } else {
                listLayer.empty();
            }
            this._listQueryResult = jsonResult;
            if (!jsonResult) {
                return;
            }
            if (!jsonResult.m_detail && jsonResult.rows) {
                for (var i in jsonResult.rows) {
                    var row = jsonResult.rows[i];
                    //封装moduleItem
                    var moduleItem = this.buildModuleItem(row);
                    moduleItem.setMap(this._map);
                    row._moduleItem = moduleItem;

                    listLayer.addElement(moduleItem.getMapIcon());
                }
            }
            //填充边栏
            this._sideBar.onListQueryResult(jsonResult);

            listLayer.initLayer();
        },
        getTestPageResult: function() {
            return null;
        },
        getTestListResult: function() {
            return null;
        }

    }

    if (EXTEND) {
        mapwork.utils.inherits(Module, EXTEND);
    }
})();