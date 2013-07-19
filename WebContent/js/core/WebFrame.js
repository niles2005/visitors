(function() {
    mapwork.WebFrame = WebFrame;

    var EXTEND = null;

    function WebFrame() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
    }
    
    WebFrame.prototype = {
        initFrame: function() {
            this._c = document.getElementById("c");
            this._n = document.getElementById("n");
            this._w = document.getElementById("w");
            this._e = document.getElementById("e");
            this._s = document.getElementById("s");
            this._w_hsp = document.getElementById("w_hsp");
            this._e_hsp = document.getElementById("e_hsp");
            this._dd = document.getElementById("dd");

            this._w_hsp.style.display = this._w.style.display;
            this._e_hsp.style.display = this._e.style.display;

            this._w_hsp.style.left =  (this._w.offsetWidth + 2)+ "px";
            this._e_hsp.style.right = (this._e.offsetWidth)+ "px";

            var self = this;
            var resetWindow = function() {
                self.resetSize();
            }
            window.onload = resetWindow;
            window.onresize = resetWindow;

            var mouseDownListener = function(event) {
                onMouseDown.apply(self,arguments);
            };
            mapwork.utils.bindEvent(this._w_hsp, "mousedown", mouseDownListener);
            mapwork.utils.bindEvent(this._e_hsp,"mousedown", mouseDownListener);
        },
        isEnableW: function() {
          return this._w.style.display != "none";
        },
        disableW: function() {
            this._w.style.display = "none";
            this._w_hsp.style.display = "none";
            this.resetSize();
        },
        enableW: function(width) {
            if(width) {
                this._w.style.width = width + "px";
            }
            this._w.style.display = "block";
            this._w_hsp.style.left = (this._w.offsetWidth + 2) + "px";
            this._w_hsp.style.display = "block";
            this.resetSize();
        },
        isEnableE: function() {
          return this._e.style.display != "none";
        },
        disableE: function () {
            this._e.style.display = "none";
            this._e_hsp.style.display = "none";
            this.resetSize();
        },
        enableE: function (width) {
            if(width) {
                this._e.style.width = width + "px";
            }
            
            this._e.style.display = "block";
            this._e_hsp.style.right = this._e.offsetWidth + "px";
            this._e_hsp.style.display = "block";
            this.resetSize();
        },
        resetSize: function () {
            var cOffsetTop = this._c.offsetTop;
            var marginLeft = 0;
            if(this._w.style.display != "none") {
                marginLeft = this._w.offsetWidth;
                if(this._w_hsp.offsetWidth > 0) {
                    marginLeft = this._w.offsetWidth + this._w_hsp.offsetWidth + 2;
                }
            }
            this._c.style["marginLeft"] = marginLeft + "px";
            
            var marginRight = 0;
            if(this._e.style.display != "none") {
                marginRight = this._e.offsetWidth + this._e_hsp.offsetWidth + 2;
            }
            
            this._c.style["marginRight"] = marginRight + "px";
            
            var newHeight = mapwork.utils.getWindowHeight() - cOffsetTop - this._s.offsetHeight;
            this._w.style.height = newHeight + "px";
            this._e.style.height = newHeight + "px";
            this._c.style.height = newHeight + "px";
            this._w_hsp.style.height = newHeight + "px";
            this._e_hsp.style.height = newHeight + "px";
            this.onWindowResize();
        },
        onWindowResize: function() {
            
        }
    }


    function onMouseDown(event) {
        if(event.stopPropagation) {
            event.stopPropagation();
            event.preventDefault();
        } else {//IE
            event.cancelBubble = true;
            event.returnValue = false;
        }

        var webFrame = this;
        var dragDiv = webFrame._dd;
        
        var split = event.target;
        if(!split) {
            split = event.srcElement;
        }
            
        var offsetSplit = event.clientX - split.offsetLeft;
            
        dragDiv.style.left = split.offsetLeft + "px";
        dragDiv.style.top = split.offsetTop + "px";
        dragDiv.style.width = split.offsetWidth + "px";
        dragDiv.style.height = split.offsetHeight + "px";
        dragDiv.style.display = "block";
            
        document.body.style.cursor="ew-resize";

        var documentWidth = document.width;
            
        function onMouseMove(event) {
            if(event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
            } else {//IE
                event.cancelBubble = true;
                event.returnValue = false;
            }
            var xx = event.clientX - offsetSplit;
            if(xx > documentWidth) {
                xx = documentWidth;
            }
            dragDiv.style.left = xx + "px";
        }
        function onMouseUp(event) {
            var xx;
            if(event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
            } else {//IE
                event.cancelBubble = true;
                event.returnValue = false;
            }
            if(split.id == "w_hsp") {
                xx = event.clientX - offsetSplit - 2;
                webFrame.enableW(xx);
            } else if(split.id == "e_hsp") {
                xx = event.clientX - offsetSplit + 2+ split.offsetWidth;
                xx = window.innerWidth - xx;
                webFrame.enableE(xx);
            }
                
            document.body.style.cursor="default";
            mapwork.utils.unbindEvent(document, "mousemove",onMouseMove);
            mapwork.utils.unbindEvent(document, "mouseup",onMouseUp);
            dragDiv.style.display = "none";
        }
        mapwork.utils.bindEvent(document, "mousemove",onMouseMove);
        mapwork.utils.bindEvent(document, "mouseup",onMouseUp);
    }
    
    if(EXTEND) {
        mapwork.utils.inherits(WebFrame, EXTEND);
    }
})();

