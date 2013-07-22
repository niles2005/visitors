(function() {
    mapwork.UserItem = UserItem;

    var EXTEND = mapwork.ModuleItem;
    UserItem.ID = "UserItem";

    UserItem.setting = {
        ID: UserItem.ID,
        pageUrl: null,
        listUrl: null,
        detailUrl: null,
        newModuleItem: function(module, index) {
            return new UserItem(module, index);
        }
    };

    function UserItem(module, index,roles) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._roles = roles;
    }

    UserItem.prototype = {
        setJsonData: function(json) {
            this._json = json;

            this.setZIndex(100 - parseInt(this._index));
//            this.setIcon("images/" + this._json.authority + "2.png");
//            this.setHoverIcon("images/" + this._json.authority + "1.png");
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
        },
        createMapIcon: function() {
            var id = this._id;
            var icon = this._icon;
            var hoverIcon = null;//this._hoverIcon;
            var iconOffset = this._offsetPos;
            var moduleLabel = new mapwork.CommonItemLabel(id, icon,hoverIcon,iconOffset,this._zIndex,this);
            moduleLabel.setLabel(this._json.label,this._json.count);
            return moduleLabel;
        },
        setRole: function(role) {
            if(this._role && this._role !== role) {
                this._role.removeUser(this);
            }
            this._role = role;
            this._role.addUser(this);
        },
        getRole: function() {
            return this._role;
        }
    };

    if (EXTEND) {
        mapwork.utils.inherits(UserItem, EXTEND);
    }
})();