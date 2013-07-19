(function() {
    mapwork.MeasureLabel = MeasureLabel;

    var EXTEND = mapwork.MapLabel;

    function MeasureLabel(id,label,pos,offsetPos,measureLine) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._measureLine = measureLine;
    }

    MeasureLabel.prototype = {
        setFirst: function() {
            this.setName("\u8d77\u70b9");//起点
            this._div.style.color = "#0A0";
        },
        setLast: function() {
            this.setName("\u603b\u957f:" + this.getName());//总长:
            this._div.style.color = "#f00";

            var deleteImage = document.createElement("img");
            deleteImage.style.cursor = "pointer";
            deleteImage.style.width = "10px";
            deleteImage.style.height = "10px";
            deleteImage.style["verticalAlign"] = "top";
            deleteImage.style["marginLeft"] = "3px";
            deleteImage.style["marginTop"] = "2px";
            deleteImage.src = "images/measuredelete.png";
            deleteImage.title = "\u5220\u9664\u6b64\u7ebf";//删除此线
            this._contentDiv.appendChild(deleteImage);

            var self = this;
            deleteImage.onclick = function() {
                self._measureLine.doRemove.call(self._measureLine);
            }
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(MeasureLabel, EXTEND);
    }    
})();