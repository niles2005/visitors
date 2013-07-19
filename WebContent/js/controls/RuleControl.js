(function() {
    mapwork.RuleControl = RuleControl;
    RuleControl.ID = "RuleControl";

    var EXTEND = mapwork.Control;

    function RuleControl() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._controlId = RuleControl.ID;
        this._div.style["zIndex"] = 9800;
    }
	
    RuleControl.prototype = {
    	
    	init: function(){
    		//显示控件
    		this.show();
    		
    	},
        setMap: function(map) {
            this._map = map;
//            $(this._div).addClass("rangeSearch");
//            $(this._div).append(
//            	"<div class = 'toolsContainer'>" +
//        			"<div class = 'title'>" +
//            			"<input type='text' id='rangeSearchName' maxlength='90'/>" +
//            			"<input type='image' id='search' src='images/map/btn_search.gif'>" +
//        			"</div>" + 
//        			"<div class = 'content'>" +
//        				"<div class = 'aroundRule'>" +
//        					"<div class = 'ruleBg'></div>" +
//        					"<div class = 'ruleBar'></div>" +
//        					"<div class = 'ruleCursor'></div>" +
//        				"</div>" +
//        				"<div class = 'scale'>" +
//        					"<span style='left: 0%'><ins style='margin-left: -4px; '>0</ins></span>" + 
//        					"<span style='left: 10%'></span>" + 
//        					"<span style='left: 20%'><ins style='margin-left: -10.5px; '>1km</ins></span>" + 
//        					"<span style='left: 30%'></span>" + 
//        					"<span style='left: 40%'><ins style='margin-left: -10.5px; '>2km</ins></span>" + 
//        					"<span style='left: 50%'></span>" +
//        					"<span style='left: 60%'><ins style='margin-left: -10.5px; '>3km</ins></span>" +
//        					"<span style='left: 70%'></span>" +
//        					"<span style='left: 80%'><ins style='margin-left: -10.5px; '>4km</ins></span>" +
//        					"<span style='left: 90%'></span>" +
//        					"<span style='left: 100%'><ins style='margin-left: -10.5px; '>5km</ins></span>" +
//        				"</div>" +
//        			"</div>" +
//        		"</div>"
//            );
        },
        
        show: function(){
        	$(this._div).show();
        },
        
        hide: function(){
        	$(this._div).hide();
        }
    };
	
	if(EXTEND) {
        mapwork.utils.inherits(RuleControl, EXTEND);
    }    
})();