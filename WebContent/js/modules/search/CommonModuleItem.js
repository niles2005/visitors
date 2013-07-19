(function() {
    mapwork.CommonModuleItem = CommonModuleItem;

    var EXTEND = mapwork.ModuleItem;
    CommonModuleItem.ID = "CommonModuleItem";

    CommonModuleItem.setting = {
        ID: CommonModuleItem.ID,
        pageUrl: null,
        listUrl: null,
        detailUrl: null,
        newModuleItem: function(module, index) {
            return new CommonModuleItem(module, index);
        }
    }

    function CommonModuleItem(module, index) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
    }

    CommonModuleItem.prototype = {
        setJsonData: function(json) {
            var ePos;
            this._json = json;

            this.setZIndex(100 - parseInt(this._index));
            this.setIcon("images/" + this._json.authority + ".png");
            this.setHoverIcon("images/" + this._json.authority + ".png");
            this.setOffsetPos([11, 31]);
        },
        getTipTitle: function() {
            return this._json.name;
        },
        getTipContent: function() {
            return "<p>" + this._json.name + "</p>";
        },
        isNeedItemQuery: function() {
            return false;
        }
    }

    if (EXTEND) {
        mapwork.utils.inherits(CommonModuleItem, EXTEND);
    }
})();