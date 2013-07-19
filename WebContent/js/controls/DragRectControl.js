(function() {
    mapwork.DragRectControl = DragRectControl;
    
    DragRectControl.ID = "DragRectControl";
    var EXTEND = mapwork.Control;
    
    DragRectControl.doDragRect = false;
    
    var utils = mapwork.utils;
    function DragRectControl() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._controlId = DragRectControl.ID;
        this._div.style["zIndex"] = 9800;
        this._div.style.position = "absolute";
        this._div.style.border = "1px solid #E88C2B";
        this._div.style["backgroundColor"] = "rgba(232, 140, 43, 0.5)";
        this._div.style.left =  "-1000px";
        this._div.style.top = "-1000px";
        this._div.style.width = "0px";
        this._div.style.height = "0px";
    }
        
    DragRectControl.prototype = {
        startDrag: function(event) {
            var self = this;
            if(mapwork.isIE) {
                this._pageX= event.x;
                this._pageY= event.y;
            } else {
                var mapLocation = this._map.getMapLocation();
                this._pageX= event.clientX - mapLocation._map._div.offsetLeft;
                this._pageY= event.clientY - mapLocation._map._div.offsetTop;
            }
                
            this._div.style.display = "block";
            this._div.style.left =  this._pageX + "px";
            this._div.style.top = this._pageY + "px";
            this._div.style.width = "0px";
            this._div.style.height = "0px";
            
            function draggingFunc(event) {
                    self.draggingDiv.call(self,event);
            }
            function droppedFunc(event) {
                    self.droppedDiv.call(self,event);
            }
            //used for unbind function
            this.draggingFunc = draggingFunc;
            this.droppedFunc = droppedFunc;
                
            utils.bindEvent(document,'mousemove',draggingFunc);
            utils.bindEvent(document,'mouseup',droppedFunc);
        },
        draggingFunc: function(event) {
            this.draggingDiv.call(this,event);
        },
        draggingDiv: function(event) {
            if(event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
            } else {//IE
                event.cancelBubble = true;
                event.returnValue = false;
            }
            var tx,ty;
            if(mapwork.isIE) {
                tx = event.x;
                ty = event.y;
            } else {
                var mapLocation = this._map.getMapLocation();
                tx= event.clientX - mapLocation._map._div.offsetLeft;
                ty= event.clientY - mapLocation._map._div.offsetTop;
            }
            this._div.style.left = Math.min(this._pageX,tx) + "px";
            this._div.style.top = Math.min(this._pageY,ty) + "px";
            this._div.style.width = Math.abs(tx-this._pageX) + "px";
            this._div.style.height = Math.abs(ty-this._pageY) + "px";
        },
        droppedDiv: function(event) {
            if(event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
            } else {//IE
                event.cancelBubble = true;
                event.returnValue = false;
            }
            utils.unbindEvent(document,'mousemove',this.draggingFunc);
            utils.unbindEvent(document,'mouseup',this.droppedFunc);
            var tx,ty;
            if(mapwork.isIE) {
                tx = event.x;
                ty = event.y;
            } else {
                var mapLocation = this._map.getMapLocation();
                tx= event.clientX - mapLocation._map._div.offsetLeft;
                ty= event.clientY - mapLocation._map._div.offsetTop;
            }
            this._div.style.display = "none";
            this._div.style.left =  "-1000px";
            this._div.style.top = "-1000px";
            this._div.style.width = "0px";
            this._div.style.height = "0px";
            this.zoomToRect(this._pageX,this._pageY,tx,ty);
            DragRectControl.doDragRect = false;
            this._map.fireEvent(mapwork.MapEvent.DRAGSTATUS_CHANGE, this._map);
        },
        zoomToRect: function(x0,y0,x1,y1) {
            if(Math.abs(x1 - x0) == 0 || Math.abs(y1 - y0) == 0) {//only at one point

            } else {
                var x0Pos = Math.min(x0,x1);
                var y0Pos = Math.min(y0,y1);
                var x1Pos = Math.max(x0,x1);
                var y1Pos = Math.max(y0,y1);
                
                var mapLocation = this._map.getMapLocation();
                var startGPos = mapLocation.getGlobalPosFromMapPos(x0Pos,y0Pos);
                var endGPos = mapLocation.getGlobalPosFromMapPos(x1Pos,y1Pos);
                var bounds = new mapwork.Bounds();
                bounds.expandToIncludePoint(startGPos.getPosX(),startGPos.getPosY());
                bounds.expandToIncludePoint(endGPos.getPosX(),endGPos.getPosY());
                this._map.fitBounds(bounds);
            }
            
        }
    }
    
    if(EXTEND){
        mapwork.utils.inherits(DragRectControl, EXTEND);
    }
})();