(function() {
    mapwork.MenuControl = MenuControl;
    MenuControl.ID = "MenuControl";

    var EXTEND = mapwork.Control;

    function MenuControl() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._controlId = MenuControl.ID;
        
        this._div.className = "menuControl";
        this._div.style["zIndex"] = 9999;
        this._div.style.position = "absolute";
        this._div.style.display = "none";
    }

    MenuControl.prototype = {
        buildMenuDiv: function() {
            if(!this._isBuildMenu) {
                this._menu.buildMenuDiv(this._div);
                this._isBuildMenu = true;
            }
        },
        setMap: function(map) {
            this._map = map;
            this._menu = map.getMenu();
            
            var self = this;
            function menuFunc(event) {
                self.showMenu(event);
                return false;
            }
            if(mapwork.isIE) {
                this._map._div.oncontextmenu = function() {
                    event.returnValue=false;
                    event.cancelBubble=true;
                    menuFunc(event);
                };
            } else {
                this._map._div.oncontextmenu = menuFunc;
            }
            this._map._div.onclick = function(){
                self.hideMenu();
            };
        },
        showMenu: function(event) {
            if(this._map.getMode() !== 0) {
                return;
            }
            var pageX,pageY;
            if(mapwork.isIE) {
                pageX= event.x;
                pageY= event.y;
            } else {
                var mapLocation = this._map.getMapLocation();
                pageX= event.clientX - mapLocation._map._div.offsetLeft;
                pageY= event.clientY - mapLocation._map._div.offsetTop;
            }
            if(this._menu.getMenuGroupCount() > 0) {
                this.buildMenuDiv();
                this._menu.setMousePos(pageX,pageY);
                this._div.style.top = pageY + "px";
                this._div.style.left = pageX + "px";

                this._div.style.display = "block";
            }
        },
        hideMenu: function() {
            this._div.style.display = "none";
        }
    };

    if(EXTEND) {
        mapwork.utils.inherits(MenuControl, EXTEND);
    }    
})();