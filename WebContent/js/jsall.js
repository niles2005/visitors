(function() {


    getScriptLocatiion = function() {
        var ret = "";
        var scripts = document["script"];
//    console.dir(scripts);
        var SCRIPT_NAME = "jsall.js";
        for (var k in scripts) {
            var src = scripts[k]["src"];
            if (src) {
                if (src.substring(src.length - SCRIPT_NAME.length) === SCRIPT_NAME) {
                    ret = src.substring(0, src.length - SCRIPT_NAME.length);
                    break;
                }
            }
        }
        return ret;
    }

    var modules = [
        "mapworkInit",
//        "utils/configs",
//        "utils/Bounds",
        "utils",
//        "utils/gisUtils",
//        "utils/EarthPos",
//        "utils/GlobalPos",
//        "utils/SpriteImage",
//        "utils/MapRulerBuilder",
//        "utils/MapRect",
//        "utils/MapRectManager",
//        "layers/Layer",
//        "core/eventBase",
        "WebFrame",
//        "core/WebPanel",
//        "core/TileImageCache",
//        "core/TileStore",
//        "core/ImageTile",
//        "core/MapEvent",
//        "core/MapLocation",
//        "core/LayerContainer",
//        "handlers/Handler",
//        "handlers/MeasureHandler",
//        "handlers/KeyHandler",
//        "handlers/DragHandler",
//        "handlers/WheelHandler",
//        "handlers/ClickLocationHandler",
//        "handlers/RangeSearchHandler",
//        "controls/Control",
//        "controls/MenuControl",
//        "controls/SimpleZoomControl",
//        "controls/DetailZoomControl",
//        "controls/CenterCrossControl",
//        "controls/TrafficControl",
//        "controls/MapScaleControl",
//        "controls/MapPosInfoControl",
//        "controls/WheelRectControl",
//        "controls/DragRectControl",
//        "controls/OverviewControl",
//        "controls/MapChannelInfoControl",
//        "controls/RuleControl",
//        "controls/MapBlockControl",
//        "elements/MapElement",
//        "elements/MapLabel",
//        "elements/MapIcon",
//        "elements/MapDraggableIcon",
//        "elements/MapShadowRect",
//        "elements/MapIconLabel",
//        "elements/MapTip",
//        "elements/MapPath",
//        "elements/MapCircle",
//        "elements/MapSearchCircle",
//        "elements/MeasureLabel",
//        "elements/MeasureLine",
//        "layers/TileLayer",
//        "layers/TrafficTileLayer",
//        "layers/MapElementLayer",
//        "layers/MapVectorLayer",
//        "layers/MapShadowLayer",
//        "layers/MapIconLayer",
//        "layers/MapLabelLayer",
//        "layers/MapPopLayer",
//        "layers/MapTipLayer",
//        "core/Map",
//        "core/MenuGroup",
//        "core/Menu",
        "ModuleItem",
        "BaseSideBar",
        "SideBarPage",
        "Module",
        "SearchModule",
        "RoleItem",
        "CardItem",
        "CommonItemLabel",
        "VisitorPage",
        "WSMessage"
    ];
    var scriptLocation = getScriptLocatiion();
    if (modules.length > 0) {
        var scriptItems = [modules.length];
        for (var i = 0, num = modules.length; i < num; i++) {
            scriptItems[i] = "<script src=\"js/" + scriptLocation + modules[i] + ".js\"" + "></script>";
        }
        document.write(scriptItems.join("\n"));
    }
})();
