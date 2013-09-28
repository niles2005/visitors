(function() {


    getScriptLocatiion = function() {
        var ret = "";
        var scripts = document["script"];
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
        "visitorsInit",
        "utils",
        "ModuleItem",
        "SideBarPage",
        "VisitorManager",
        "RoleItem",
        "CardItem",
        "VisitorPage"
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
