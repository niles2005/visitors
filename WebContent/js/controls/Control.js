(function() {
    mapwork.Control = Control;
    
    var EXTEND = null;

    function retrunFalse() {
        return false;
    }
    
    function Control() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._div = document.createElement("div");
        this._div.style.position = "absolute";
//        this._div.style["-moz-user-select"] = "none";
//        this._div.style["-webkit-user-select"] = "none";
        this._controlId = null;
    }
    
    Control.prototype = {
        getControlId: function() {
            return this._controlId;
        },
        setMap: function(map) {
            this._map = map;
        },
        getMap: function() {
            return this._map;
        },
		appendToDiv: function(wrapDiv) {
			wrapDiv.appendChild(this._div);
		},
        getDiv: function() {
            return this._div;
        },
        createImage: function(appendDiv, name,url,left,top, clickListener) {
            var image = document.createElement("img");
            if(name) {
                image.name = name;
            }
            image.src = url;
            image.style.position = "absolute";
            image.style.left = left + "px";
            image.style.top = top + "px";
            image.ondragstart = retrunFalse;
            if(appendDiv) {
                appendDiv.appendChild(image);
            }
            if(clickListener) {
                var self = this;
                mapwork.utils.bindEvent(image, "mousedown", function() {
                    clickListener.apply(self,arguments);
                });
            }
            return image;
        },
        createAbsoluteSpan: function(appendDiv, name,text,left,top) {
            var span = document.createElement("span");
            if(name) {
                span.name = name;
            }
            if(text) {
                span.innerText = text;
                span.style.position = "absolute";
                span.style.left = left + "px";
                span.style.top = top + "px";
            }

            if(appendDiv) {
                appendDiv.appendChild(span);
            }
            return span;
        },
        createRelativeSpan: function(appendDiv, name,text,left,top) {
            var span = document.createElement("span");
            if(name) {
                span.name = name;
            }
            if(text) {
                span.innerText = text;
                span.style.position = "relative";
                span.style.left = left + "px";
                span.style.top = top + "px";
            }

            if(appendDiv) {
                appendDiv.appendChild(span);
            }
            return span;
        },
        createDiv: function(appendDiv, name) {
            var div = document.createElement("div");
            if(name) {
                div.name = name;
            }
            if(appendDiv) {
                appendDiv.appendChild(div);
            }
            return div;
        }
    };

	if(EXTEND) {
        mapwork.utils.inherits(Control, EXTEND);
    }    
})();