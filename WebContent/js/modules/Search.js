(function() {

    mapwork.Search = Search;

    var EXTEND = mapwork.ModuleItem;
    Search.ID = "Search";

    Search.setting = {
        ID: Search.ID,
        pageUrl: null,
        listUrl: null,
        detailUrl: null,
        newModuleItem: function(module, index) {
            return new Search(module, index);
        }
    }

    function Search(module, index) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
    }

    Search.prototype = {
    }

    if (EXTEND) {
        mapwork.utils.inherits(Search, EXTEND);
    }
})();