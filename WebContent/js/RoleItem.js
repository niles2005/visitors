(function() {
    visitors.RoleItem = RoleItem;

    var pageContentHtml = '<div class="roleIcon">'+
            '<div class="roleCaution"><img src="images/caution.gif" style="display: none"/></div>'+
            '<div class="roleHead">0</div>'+
            '<div class="roleBody"></div>'+
            '<div class="roleFooter"></div>' +
            '</div>';

    var EXTEND = visitors.ModuleItem;
    RoleItem.selectRoleItem = null;
    function RoleItem(manager, index) {
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
            
            this.setIcon("images/" + this._json.name + "2.png");
            this.setOffsetPos([11, 31]);
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
            this._$PageContent.addClass('roleselected');
            this._sideBar.onPageQueryResult(this._cards);
            RoleItem.selectRoleItem = this;
            this._manager._selectRole = this;
        },
        clearFocus: function() {
            this._$PageContent.removeClass('roleselected');
        },
        reset: function() {
            this._cards = {};
            this._cardCount = 0;
            this.updateCount();
        }
    };

    if (EXTEND) {
        visitors.utils.inherits(RoleItem, EXTEND);
    }
})();