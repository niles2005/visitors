(function() {
    mapwork.RoleItem = RoleItem;

    var EXTEND = mapwork.ModuleItem;
    RoleItem.ID = "RoleItem";
    var selectRoleItem = null;
    function RoleItem(module, index) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._users = {};
        this._userCount = 0;
    }

    RoleItem.prototype = {
        setJsonData: function(json) {
            this._json = json;
            
            this.setZIndex(100 - parseInt(this._index));
            this.setIcon("images/" + this._json.name + "2.png");
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
            if(!this._moduleLabel) {
                this._moduleLabel = new mapwork.CommonItemLabel(id, icon,hoverIcon,iconOffset,this._zIndex,this);
                this._moduleLabel.setLabel(this._json.label,this._json.count);
            }
            return this._moduleLabel;
        },
        addUser: function(user) {
            this._users[user._id] = user;
            this._userCount++;
            this.updateCount();
        },
        removeUser: function(user) {
            delete this._users[user._id];
            this._userCount--;
            this.updateCount();
        },
        getUserCount: function() {
            return this._userCount;
        },
        updateCount: function() {
            if(this._moduleLabel) {
                this._moduleLabel.setLabel(this._json.label,this._userCount);
            }
        },
        doFocus: function() {
            if(selectRoleItem) {
                selectRoleItem.clearFocus();
            }
            this._moduleLabel.doFocus();
            this._sideBar.onPageQueryResult(this._users);
            selectRoleItem = this;
        },
        clearFocus: function() {
            this._moduleLabel.clearFocus();
        }
    };

    if (EXTEND) {
        mapwork.utils.inherits(RoleItem, EXTEND);
    }
})();