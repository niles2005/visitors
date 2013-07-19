(function() {
    mapwork.MenuGroup = MenuGroup;

    var EXTEND = null;

    function MenuGroup(groupName,groupIndex) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._groupName = groupName;
        this._groupIndex = groupIndex;
        
        this._menuArray = [];
    }

    MenuGroup.prototype = {
        addMenuItem: function(menuName,menuListener) {
            this._menuArray.push({"name": menuName,"listener" : menuListener});
        },
        getMenuItemCount: function() {
            return this._menuArray.length;
        },
        getMenuArray: function() {
            return this._menuArray;
        },
        compareTo: function(menuGroup) {
            return this._groupIndex - menuGroup._groupIndex;
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(MenuGroup, EXTEND);
    }    
})();