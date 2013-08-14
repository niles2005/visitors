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
        this.buildPage();
        this.onPageLoad();
    }

    VisitorPage.prototype = {
        buildPage: function() {
            var jRoleTable = $(".roleTable");
        },
        buildFrame: function() {
            this._searchModule = new mapwork.SearchModule();
            this._msg = new mapwork.WSMessage(this._searchModule);
        },
        onWindowResize: function() {
            var headHeight = document.getElementById('n').clientHeight;
            var cnHeight = document.getElementById('cn').clientHeight;
            var csHeight = document.getElementById('cs').clientHeight;
            var cc = document.getElementById('cc');

            var consoleWrapper = document.getElementById("consoleWrapper");
            consoleWrapper.style.width = (cc.clientWidth + 2) + "px";
            var panelarrow2 = document.getElementById("panelarrow2");
            panelarrow2.style.left = (cc.clientWidth - 80) / 2 + "px";

            var mainHeight = mapwork.utils.getClientSize().height - headHeight - cnHeight - csHeight;
            cc.style.height = mainHeight + 'px';
            if ( this._map) {
                this._map.resetSize();
            }
            if (mapwork.resizeListener) {
                mapwork.resizeListener();
            }
            //每个业务的resize事件
            this.sideBarResize();
        },
        //每个业务的sideBar的resize事件
        sideBarResize: function() {
            var sideBar = this._searchModule._sideBar;
            sideBar.resize();
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
            if (mapwork.mapStyle === mapwork.mapStyle1) {
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
        onPageLoad: function() {
            this._searchModule.doInit();
            this._msg.initialize();
        }
    };

    if (EXTEND) {
        mapwork.utils.inherits(VisitorPage, EXTEND);
    }
})();