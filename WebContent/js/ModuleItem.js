(function() {

    visitors.ModuleItem = ModuleItem;


    var EXTEND = null;
    ModuleItem.selectItem = null;
    
    function ModuleItem(manager, index) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._manager = manager;
    }

    ModuleItem.prototype = {
        setSidebar: function(sideBar) {
            this._sideBar = sideBar;
            var self = this;
            if (this._sideBar._$refresh) {
                this._sideBar._$refresh.click(function (event) {
                    if (visitors.RoleItem.selectRoleItem === self) {
                        self.doFocus();
                        self._sideBar._$Content.find('.popuplist-main').slideUp();
                    }
                });
            }
        },
        setZIndex: function(zIndex) {
            this._zIndex = zIndex;
        },
        getZIndex: function() {
            return this._zIndex;
        },
        setId: function(id) {
            this._id = id;
        },
        getId: function() {
            return this._id;
        },
        setName: function(name) {
            this._name = name;
        },
        getName: function() {
            return this._name;
        },
        setIcon: function(icon) {
            this._icon = icon;
        },
        getIcon: function() {
            return this._icon;
        },
        setOffsetPos: function(offsetPos) {
            this._offsetPos = offsetPos;
        },
        getOffsetPos: function() {
            return this._offsetPos;
        },
        setJsonData: function(json) {
            this._json = json;
        },
        getJsonData: function() {
            return this._json;
        },
        //将每个moduleItem的HTML信息刷到sideBar中.
        getSidebarElement: function() {
            this._$Content = $(this.getSidebarContent());
            this._$ContentImage = this._$Content.find("img");

            var self = this;
            this._$Content.click(
                    function() {
//                        event.preventDefault();
//                        event.stopPropagation();
//                        console.dir(self._$Content);
//                        self.doFocus();
//                        var $trackDiv = $(self._$Content).find('>.popuplist-main');
//                        $trackDiv.toggle("slow");
                    }
            );

            this._$Content.find('.expand').click(
                function(event) {
                        if(event.stopPropagation) {
                             event.stopPropagation();
                             event.preventDefault();
                         } else {//IE
                             event.cancelBubble = true;
                             event.returnValue = false;
                         }
                        var $trackDiv = $(self._$Content).find('>.popuplist-main');
                        $trackDiv.toggle("slow");
                        $('.popuplist-main').each(function(){
                            if(this !== $trackDiv[0]) {
                                $(this).slideUp();
                            }
                        });

                        self.afterExpandDetail();
                }
            );
            return this._$Content.get(0);
        },
        afterExpandDetail: function() {
            var $cardDetail = this._$Content.find(".cardDetail");
        },
        doRemove: function() {
            this._mapIcon.doRemove();
        },
        //每一个moduleItem的HTML信息
        getSidebarContent: function() {
            return "";
        },

        doFocus: function() {
            if (this._index === undefined) {
            } else {
                var selectedObject = ModuleItem.selectItem;
                if (selectedObject && selectedObject !== this) {
                    if (selectedObject._$Content) {
                        selectedObject._$Content.removeClass("clicked");
                    }
                }
                ModuleItem.selectItem = this;
                if (this._$Content) {
                    this._$Content.addClass("clicked");
                }
                if(this._$Content){
                	this._$Content.scrollintoview();
                }
            }
        }
    };

    if (EXTEND) {
        visitors.utils.inherits(ModuleItem, EXTEND);
    }
})();