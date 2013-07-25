(function() {
    mapwork.CommonItemLabel = CommonItemLabel;

    var EXTEND = mapwork.MapIcon;

    var labelHtml = '<div style="text-align: center;width:80px;height:30px;">' +
            '<div class="roleCount" style="color:#000;font-size:11px;font-weight:bold;">0</div>' +
            '<img> ' +
            '<div class="iconLabel" style="font-size:14px;color:#000;"></div>' +
            '</div>';
    function CommonItemLabel(id, defaultIcon, hoverIcon, imageOffset, zIndex, moduleItem) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._moduleItem = moduleItem;
        this.init();
    }

    CommonItemLabel.prototype = {
        init: function() {
            this._htmlObj = document.createElement("div");
            this._htmlObj.style.position = "absolute";

            this._$Element = $(this._htmlObj);
            this._$Element.append(labelHtml);
            this._$IconNameDiv = this._$Element.find(".iconLabel");
            this._$RoleCountDiv = this._$Element.find(".roleCount");
            this._$Image = this._$Element.find("img");
            this._image = this._$Image.get(0);

            this.setIcon(this._defaultIcon);
            if (this._zIndex) {
                this._htmlObj.style["z-index"] = this._zIndex;
            }
        },
        setIcon: function(icon) {
            if (typeof icon === 'string') {
                this._image.src = icon;
            } else if (icon instanceof mapwork.SpriteImage) {
                icon.wrapImage(this._image);
            }
        },
        setWarn: function(warn) {
            if(warn) {
                this._$RoleCountDiv.css("color","red");
            }
        },
        setLabel: function(name,count) {
            this._$IconNameDiv.html(name);
            this._$RoleCountDiv.html(count);
        },
        setHoverImage: function() {
//            this.setIcon(this._hoverIcon);
            if (this._zIndex != undefined) {
                this._htmlObj.style["z-index"] = 101;
            }
            this._$IconNameDiv.css("fontWeight", "bold");
        },
        setDefaultImage: function() {
//            this.setIcon(this._defaultIcon);
            if (this._zIndex != undefined) {
                this._htmlObj.style["z-index"] = this._zIndex;
            }
            this._$IconNameDiv.css("fontWeight", "normal");
        },
        updateMapZoom: function(zoom) {
            
//            this.setHoverIcon("images/" + this._moduleItem._json.authority + "1.png");

//            if(zoom <= 16) {
//                this.setIcon("images/" + this._moduleItem._json.name + "1.png");
////                this._$IconNameDiv.hide();
//            } else {
//                this.setIcon("images/" + this._moduleItem._json.name + "2.png");
////                this._$IconNameDiv.show();
//            }
        },
        doFocus: function() {
            this._$Image.addClass("imageSelect");
        },
        clearFocus: function() {
            this._$Image.removeClass("imageSelect");
//            this._image.style["background"] = "";
        }
    };

    if (EXTEND) {
        mapwork.utils.inherits(CommonItemLabel, EXTEND);
    }
})();