(function() {
    mapwork.newjavascript = newjavascript;

    var EXTEND = null;

    function newjavascript() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
    }

    newjavascript.prototype = {
        
    };

    if(EXTEND) {
        mapwork.utils.inherits(newjavascript, EXTEND);
    }    
})();