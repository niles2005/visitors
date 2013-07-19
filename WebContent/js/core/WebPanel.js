(function() {
    mapwork.WebPanel = WebPanel;

    var EXTEND = null;

    function WebPanel() {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
    }
    
    WebPanel.prototype = {
        initFrame: function() {
            var self = this;
            var resetWindow = function() {
                self.resetSize();
            }
            window.onload = resetWindow;
            window.onresize = resetWindow;
        },
        resetSize: function () {
            this.onWindowResize();
        },
        onWindowResize: function() {
            
        }
    }
    
    if(EXTEND) {
        mapwork.utils.inherits(WebPanel, EXTEND);
    }
})();

