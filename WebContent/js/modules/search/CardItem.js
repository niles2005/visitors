(function() {
    mapwork.CardItem = CardItem;

    var EXTEND = mapwork.ModuleItem;
    CardItem.ID = "CardItem";

    CardItem.setting = {
        ID: CardItem.ID,
        pageUrl: null,
        listUrl: null,
        detailUrl: null,
        newModuleItem: function(module, index) {
            return new CardItem(module, index);
        }
    };

    function CardItem(module, index,roles) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._roles = roles;
    }

    CardItem.prototype = {
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
                this._role.removeCard(this);
            }
            this._role = role;
            this._role.addCard(this);
        },
        getRole: function() {
            return this._role;
        },
        afterExpandDetail: function() {
            var $cardDetail = this._$Content.find(".cardDetail");
            var url = "work?action=loadevents&cardId=aa";
            var self = this;

            mapwork.utils.loadJsonData(url, function(data) {
                if (!data) {
                    return;
                }
                $cardDetail.html(JSON.stringify(data));
//                self.onEventQueryResult(data);
            });            
        }
    };

    if (EXTEND) {
        mapwork.utils.inherits(CardItem, EXTEND);
    }
})();