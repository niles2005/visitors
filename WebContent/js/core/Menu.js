(function() {
    mapwork.Menu = Menu;

    var EXTEND = null;

    function Menu(map) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
		this._map = map;
        this._menuGroupArray = [];

        var zoom = new mapwork.MenuGroup("zoom",20);
        zoom.addMenuItem("放大",function() {
			map.getMapLocation().offsetZoom(1); 
		});
        zoom.addMenuItem("缩小",function() {
			map.getMapLocation().offsetZoom(-1); 
		});
        this.addMenuGroup(zoom);
    }

    Menu.prototype = {
        setMousePos: function(posX,posY) {
            this._mousePos = {"posX": + posX,"posY": + posY};
        },
        getMousePos: function() {
            return this._mousePos;
        },
        getMenuGroupCount: function() {
            return this._menuGroupArray.length;
        },
        addMenuGroup: function(menuGroup) {
            if(menuGroup instanceof mapwork.MenuGroup) {
                this._menuGroupArray.push(menuGroup);
            }
        },
        buildMenuDiv: function(wrapDiv) {
            var k,j,li,item,group;
            this.sortMenu();
            for(k in this._menuGroupArray) {
                if(k > 0) {//add ----------------
                    li = document.createElement("LI");
                    wrapDiv.appendChild(li);
                    li.className = "menuLiLine";
                }
                group = this._menuGroupArray[k];
                var menuArray = group.getMenuArray();
                if(menuArray.length > 0) {
                    for(j in menuArray) {
                        item = menuArray[j];
                        li = document.createElement("LI");
                        li.innerHTML = item["name"];
                        wrapDiv.appendChild(li);
                        li.className = "menuLiNormal";
                        li.onclick = item["listener"];
                        li.onmouseover = function(){
                            this.className = "menuLiMouseOver";
                        }
                        li.onmouseout = function(){
                            this.className = "menuLiNormal";
                        }
                    }
                }
            }
        },
        sortMenu: function() {
            this._menuGroupArray = this._menuGroupArray.sort(function(a,b) {
                    return a.compareTo(b);
                }
            );
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(Menu, EXTEND);
    }    
})();