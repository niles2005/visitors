(function() {
    mapwork.BaseSideBar = BaseSideBar;

    var EXTEND = null;

    function BaseSideBar(module) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this._module = module;
    }

    BaseSideBar.prototype = {
        init: function() {
        },
        
        //文档窗口改变大小时触发
        //由每个业务的来实现
        resize: function(){
        },
        
        //由各个业务类实现此方法
        //被module的onPageQueryResult调用
        onPageQueryResult: function(jsonResult, objectArray) {
        	
        },
        
        //由各个业务类实现此方法
        //被module的onListQueryResult调用
        onListQueryResult: function(jsonResult, objectArray) {
        	
        },
		
        //点击返回时做的清空操作
        clean: function(){
        },
		
        reset: function(){
        
        }
    }

    if(EXTEND) {
        mapwork.utils.inherits(BaseSideBar, EXTEND);
    }    
})();