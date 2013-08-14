(function() {
    mapwork.RoleItem = RoleItem;

    var pageContentHtml = '<div class="roleIcon">'+
            '<div class="roleCaution"><img src="images/caution.gif" style="display: none"/></div>'+
            '<div class="roleHead">0</div>'+
            '<div class="roleBody"></div>'+
            '<div class="roleFooter"></div>' +
            '</div>';

    var EXTEND = mapwork.ModuleItem;
    RoleItem.ID = "RoleItem";
    RoleItem.selectRoleItem = null;
    function RoleItem(module, index) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._cards = {};
        this._cardCount = 0;
        this._$PageContent = $(pageContentHtml);

        this.$countTitle = this._$PageContent.find(".roleHead");
        this.$cautionTitle = this._$PageContent.find(".roleCaution>img");
        var self = this;
        this._$PageContent.click(function() {
            self.doFocus();
        });
    }

    RoleItem.prototype = {
        getPageContent: function() {
            return this._$PageContent;
        },
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
                this._moduleLabel.setWarn(this._json.warn);
                this._moduleLabel.setLabel(this._json.label,this._json.count);
            }
            return this._moduleLabel;
        },
        addCard: function(card) {
            this._cards[card._id] = card;
            this._cardCount++;
            this.updateCount();
        },
        removeCard: function(card) {
            delete this._cards[card._id];
            this._cardCount--;
            this.updateCount();
        },
        getCardCount: function() {
            return this._cardCount;
        },
        updateCount: function() {
            if(this.$countTitle) {
                this.$countTitle.html("" + this._cardCount);
                if (this._cardCount > 0) {
                    if (this._id == "O_building1" || this._id == "F_building1" || this._id == "W_building2"  || this._id == "F_building2" ) {
                        this.$cautionTitle.show();
                        this.$countTitle.addClass('warn');
                    }
                }else{
                    this.$cautionTitle.hide();
                    this.$countTitle.removeClass('warn');
                }
            }
        },
        doFocus: function() {
            if( RoleItem.selectRoleItem) {
                RoleItem.selectRoleItem.clearFocus();
            }
//            this._moduleLabel.doFocus();
            this._$PageContent.addClass('roleselected');
            this._sideBar.onPageQueryResult(this._cards);
            RoleItem.selectRoleItem = this;
            this._module._selectRole = this;
        },
        clearFocus: function() {
//            this._moduleLabel.clearFocus();
            this._$PageContent.removeClass('roleselected');
        }
    };

    if (EXTEND) {
        mapwork.utils.inherits(RoleItem, EXTEND);
    }
})();