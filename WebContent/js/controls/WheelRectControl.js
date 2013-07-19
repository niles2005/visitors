(function() {
    mapwork.WheelRectControl = WheelRectControl;
    
    WheelRectControl.ID = "WheelRectControl";
    var EXTEND = mapwork.Control;
    
    function WheelRectControl() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._controlId = WheelRectControl.ID;
        this._div1 = document.createElement("div");
		this._div1.style.position = "absolute";
        this._div1.style["zIndex"] = 1003;
        this._div1.style["borderTop"] = "2px solid #f00";
        this._div1.style["borderLeft"] = "2px solid #f00";
		this._div1.style.width = "10px";
		this._div1.style.height = "10px";
		
		this._div2 = document.createElement("div");
        this._div2.style["zIndex"] = 1003;
        this._div2.style.position = "absolute";
        this._div2.style["borderBottom"] = "2px solid #f00";
        this._div2.style["borderRight"] = "2px solid #f00";
		this._div2.style.width = "10px";
		this._div2.style.height = "10px";
        
        this._div3 = document.createElement("div");
		this._div3.style.position = "absolute";
        this._div3.style["zIndex"] = 1003;
        this._div3.style["borderBottom"] = "2px solid #f00";
        this._div3.style["borderLeft"] = "2px solid #f00";
		this._div3.style.width = "10px";
		this._div3.style.height = "10px";
		
		this._div4 = document.createElement("div");
        this._div4.style["zIndex"] = 1003;
        this._div4.style.position = "absolute";
        this._div4.style["borderTop"] = "2px solid #f00";
        this._div4.style["borderRight"] = "2px solid #f00";
		this._div4.style.width = "10px";
		this._div4.style.height = "10px";
        
        this._wheelFocusTime = null;
        this._wheelFocusX = 0;
        this._wheelFocusY = 0;
        this._wheelFocusLen = 0;
        this._isZoomUp = false;
		this.disableDivs();
    }
        
    WheelRectControl.prototype = {
		appendToDiv: function(wrapDiv) {
			wrapDiv.appendChild(this._div1);
			wrapDiv.appendChild(this._div2);
			wrapDiv.appendChild(this._div3);
			wrapDiv.appendChild(this._div4);
		},
        redraw: function() {
            this._div1.style.left = (this._wheelFocusX - this._wheelFocusLen)+ "px";
            this._div1.style.top = (this._wheelFocusY - this._wheelFocusLen) + "px";
            this._div2.style.left = (this._wheelFocusX + this._wheelFocusLen) + "px";
            this._div2.style.top = (this._wheelFocusY + this._wheelFocusLen) + "px";
            this._div3.style.left = (this._wheelFocusX - this._wheelFocusLen) + "px";
            this._div3.style.top = (this._wheelFocusY + this._wheelFocusLen) + "px";
            this._div4.style.left = (this._wheelFocusX + this._wheelFocusLen) + "px";
            this._div4.style.top = (this._wheelFocusY - this._wheelFocusLen) + "px";
        },
        doWheelFocus: function(isZoomUp,x,y) {
            this._isZoomUp = isZoomUp;
            this._wheelFocusX = x;
            this._wheelFocusY = y;
            this._wheelFocusLen = 30;
            this._div1.style.display = "block";
            this._div2.style.display = "block";
            this._div3.style.display = "block";
            this._div4.style.display = "block";
            if(!this._wheelFocusTime) {
                var self = this;
                function doTheWheel() {
                    self.doWheelFocusIt();
                }
                this._wheelFocusTime = setInterval(doTheWheel,100);
            }
        },
		disableDivs: function() {
			this._div1.style.display = "none";
			this._div1.style.left =  "-1000px";
			this._div1.style.top = "-1000px";
			this._div2.style.display = "none";
			this._div2.style.left =  "-1000px";
			this._div2.style.top = "-1000px";
			this._div3.style.display = "none";
			this._div3.style.left =  "-1000px";
			this._div3.style.top = "-1000px";
			this._div4.style.display = "none";
			this._div4.style.left =  "-1000px";
			this._div4.style.top = "-1000px";
		},
        doWheelFocusIt: function() {
            if(this._isZoomUp) {
				this._wheelFocusLen -= 3;
            } else {
				this._wheelFocusLen += 3;
            }
            this.redraw();
            if(this._wheelFocusLen >= 40 || this._wheelFocusLen < 20) {
                    if(this._wheelFocusTime) {
                        clearInterval(this._wheelFocusTime);
                        this._wheelFocusTime = null;
                        this.redraw();
						this.disableDivs();
                    }
            }
                
	}
        
    }
    
    if(EXTEND){
        mapwork.utils.inherits(WheelRectControl, EXTEND);
    }
})();