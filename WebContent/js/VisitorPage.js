(function() {
    mapwork.VisitorPage = VisitorPage;

    var EXTEND = mapwork.WebFrame;

    function VisitorPage(mapWrapDiv) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._mapWrapDiv = mapWrapDiv;
        this.initFrame();
        this.buildFrame();
        this.onPageLoad();
    }

    VisitorPage.prototype = {
        createMap: function() {
            this._map = new mapwork.Map(this._mapWrapDiv, {
//                lat: 32.049818,
//                lon: 118.895858,
//                zoom: 12
            });


//            this._map.addHandler(new mapwork.KeyHandler());
//            this._map.addHandler(new mapwork.DragHandler());
//            this._map.addHandler(new mapwork.WheelHandler());
//            this._map.addControl(new mapwork.SimpleZoomControl());

            this._map.addModule(new mapwork.SearchModule(mapwork.Search.setting));
            this._map.addModule(new mapwork.Module(mapwork.CommonModuleItem.setting));
            this._map.addModule(new mapwork.Module(mapwork.CommonModuleItem.setting));
    
//            this._map.addModule(new mapwork.SDRoleModule(mapwork.SDRoleItem.setting));
        },
        buildFrame: function() {
            this.createMap();
        },
        onWindowResize: function() {
            var headHeight = document.getElementById('n').clientHeight;
            var cnHeight = document.getElementById('cn').clientHeight;
            var cc = document.getElementById('cc');
            var mainHeight = mapwork.utils.getClientSize().height - headHeight - cnHeight;
            cc.style.height = mainHeight + 'px';
            this._map.resetSize();

            if (mapwork.resizeListener) {
                mapwork.resizeListener();
            }
            //每个业务的resize事件
            this.sideBarResize();
        },
        //每个业务的sideBar的resize事件
        sideBarResize: function() {
            if (this._map._currentModule) {
                var sideBar = this._map._currentModule._sideBar;
                sideBar.resize();
            }

        },
        //测距
        doMeasure: function() {
            var measureHandler = this._map.getHandler(mapwork.MeasureHandler.ID);
            if (measureHandler) {
                measureHandler.beginMeasure();
            }
        },
        doVectorTest: function() {
            var vectorLayer = this._map.getLayer(mapwork.MapVectorLayer.ID);
            if (vectorLayer) {
                vectorLayer.doTest();
            }
        },
        moveToDefaultPos: function() {
            var lat = mapwork.configs.defaultLat;
            var lon = mapwork.configs.defaultLon;
//			var zoom = mapwork.configs.defaultZoom;

            var ePos = new mapwork.EarthPos(lat, lon);
            this._map.movedToMapCenter(ePos);
        },
        changeMapStyle: function() {
            if (mapwork.mapStyle == mapwork.mapStyle1) {
                mapwork.mapStyle = mapwork.mapStyle2;
            } else {
                mapwork.mapStyle = mapwork.mapStyle1;
            }
            setCookie("mapStyle", mapwork.mapStyle, 999999);
            var tileLayer = this._map.getLayer(mapwork.TileLayer.ID);
            if (tileLayer) {
                tileLayer.changeUrl();
            }
        },
        toggleMapTraffic: function() {
            var trafficControl = this._map.getControl(mapwork.TrafficControl.ID);
            if (trafficControl) {
                return trafficControl.toggleTraffic();
            }
            return false;
        },
        //搜索
        doSearch: function(name, isBoundsSearch) {

            if (this._map._currentModule) {
                this._map._currentModule.clean();
            }
            var searchModule = this._map.getModule(mapwork.Search.ID);
            if (isBoundsSearch) {
                searchModule.setSearchType('bounds');
            } else {
                searchModule.setSearchType('all');
            }
            searchModule.init();
            searchModule.doPageQuery(null, null, name);
            this._map._currentModule = searchModule;
        },
        onPageLoad: function() {
            var module = this._map.getModule(mapwork.SDRoleModule.ID);
            if(module) {
                console.log("sss")
            }
        }
    };

    if (EXTEND) {
        mapwork.utils.inherits(VisitorPage, EXTEND);
    }
})();