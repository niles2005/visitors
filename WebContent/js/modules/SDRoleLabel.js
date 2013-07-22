(function() {
    mapwork.SDRoleLabel = SDRoleLabel;

    var EXTEND = mapwork.MapIcon;

    var labelHtml = '<div style="padding:0;margin:0;border:0;overflow:hidden;width:0px;height:0px;cursor:pointer;">' +
            '<div class="iconname" style="position: absolute;left:-30px;top:40px;font-size:14px;color:#000;"></div>' +
            '<img  style="right:-10px; top:-10px; position:absolute;"> ' +
            '</div>';
    function SDRoleLabel(id, defaultIcon, hoverIcon, imageOffset, zIndex, moduleItem) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._moduleItem = moduleItem;
        this.init();
    }

    SDRoleLabel.prototype = {
        init: function() {
            this._htmlObj = document.createElement("div");
            this._htmlObj.style.position = "absolute";

            this._$Element = $(this._htmlObj);
            this._$Element.append(labelHtml);
            this._$IconNameDiv = this._$Element.find(".iconname");
            this._$Image = this._$Element.find("img");
            this._image = this._$Image.get(0);

            this.setIcon(this._defaultIcon);
            if (this._zIndex) {
                this._htmlObj.style["zIndex"] = this._zIndex;
            }
        },
        setIcon: function(icon) {
            if (typeof icon === 'string') {
                this._image.src = icon;
            } else if (icon instanceof mapwork.SpriteImage) {
                icon.wrapImage(this._image);
            }
        },
        setLabel: function(name) {
            this._$IconNameDiv.html(name);
        },
        setHoverImage: function() {
//            this.setIcon(this._hoverIcon);
            if (this._zIndex != undefined) {
                this._htmlObj.style["zIndex"] = 101;
            }
            this._$IconNameDiv.css("fontWeight", "bold");
        },
        setDefaultImage: function() {
//            this.setIcon(this._defaultIcon);
            if (this._zIndex != undefined) {
                this._htmlObj.style["zIndex"] = this._zIndex;
            }
            this._$IconNameDiv.css("fontWeight", "normal");
        },
        updateMapZoom: function(zoom) {
            
//            this.setHoverIcon("images/" + this._moduleItem._json.authority + "1.png");

            if(zoom <= 16) {
                this.setIcon("images/" + this._moduleItem._json.authority + "1.png");
                this._$IconNameDiv.hide();
            } else {
                this.setIcon("images/" + this._moduleItem._json.authority + "2.png");
                this._$IconNameDiv.show();
            }
        },
        doFocus: function() {
            this._$Image.addClass("imageSelect");
        },
        clearFocus: function() {
            console.log("ssssss")
            this._$Image.removeClass("imageSelect");
//            this._image.style["background"] = "";
        }
                
    }

    if (EXTEND) {
        mapwork.utils.inherits(SDRoleLabel, EXTEND);
    }
})();