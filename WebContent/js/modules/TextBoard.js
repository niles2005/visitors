(function() {
    mapwork.TextBoard = TextBoard;

    var EXTEND = mapwork.ModuleItem;
	TextBoard.ID = "TextBoard";
	
	TextBoard.setting = {
		ID : TextBoard.ID,
        pageUrl : "queryTextBoard",
        listUrl : "queryAllTextBoard",
		detailUrl : "queryTextBoardById",
		
		newModuleItem: function(module,index) {
			return new TextBoard(module, index);
		}
	}

	//可变信息板
    function TextBoard(module, index) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
    }

    TextBoard.prototype = {
        setJsonData: function(json){
            var ePos;
            this._json = json;
            this._id = json.xxbId;
            if(this._index == undefined){//小图
            	this._name = this._json.name;
                this.setIcon("images/block_roadevent.png");
                this.setHoverIcon("images/block_roadeventH.png");
                this.setOffsetPos([9,9]);
            }else{//大图
                this._name = this._json.name;
                this.setZIndex(100 - parseInt(this._index));
                this.setIcon("images/r0" + this._index + ".png");
                this.setHoverIcon("images/b0" + this._index + ".png");
                this.setDescribe("");
                this.setOffsetPos([11,31]);
            }
			if(json.posX && json.posY) {
				var x = parseInt(json.posX);
				var y = parseInt(json.posY);
				ePos = mapwork.SHPosMapping.convertShPosToEarthPos(x,y);
				this.setEarthPos(ePos);
			}
        },
        getTipTitle: function(){
    		return this._json.name;
    	},
        getTipContent: function() {
        	var board = "a_board.gif";
        	if(this._json.xxbType == "A板"){
        		board = "a_board.gif";
        	}
        	if(this._json.xxbType == "C板"){
        		board = "c_board.gif";
        	}
        	if(this._json.xxbType == "F板"){
        		board = "f_board.gif";
        	}
        	var testDis = this._json.fstrTextDis;
        	var textArray = "";
        	if(testDis){
        		textArray = testDis.split(":");
        	}
        	this._i = 0;
        	var $Text = null;
        	var self = this;
        	function changeText(){
        		if(!$Text) {
        			$Text = $("#fstrText");
        		}
        		if($Text && textArray[self._i]){
        			$Text.html(textArray[self._i]);
        		}
        		self._i ++;
        		if(self._i >= textArray.length){
        			self._i = 0;
        		}
        	}
        	if(mapwork.TextBoardInterval) {
                 clearInterval(mapwork.TextBoardInterval);
                 mapwork.TextBoardInterval = null;
        	}
            mapwork.TextBoardInterval = setInterval(changeText, 1000);
            return "<p style='text-align:center'>" + "<img src='http://114.80.221.26/resources/images/gis/" + board + "' />"  + "<p>"
            	+ "<p style='text-align:center;position:relative;top:-70px'><b><font size='4' id='fstrText' color='green'>" + textArray[0] + "</font></b><p>"
            	+ "<p style='text-align:center'>" + this._json.fdtTimeDis + "<p>";
        },
    	getDetailParam: function(){
    		var queryParam={};
            queryParam["textBoard.xxbId"]=this._json.xxbId;
            return queryParam;
    	}
    }

    if(EXTEND) {
        mapwork.utils.inherits(TextBoard, EXTEND);
    }    
})();