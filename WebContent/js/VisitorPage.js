(function() {
    visitors.VisitorPage = VisitorPage;

    var EXTEND = null;

    function VisitorPage() {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this.initFrame();
        this.buildFrame();
    }

    VisitorPage.prototype = {
        initFrame: function() {
            this._c = document.getElementById("c");
            this._n = document.getElementById("n");
            this._cn = document.getElementById("cn");
            this._cs = document.getElementById("cs");
            this._cc = document.getElementById("cc");
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
            };
            window.onload = resetWindow;
            window.onresize = resetWindow;
        },
        resetSize: function () {
            var cOffsetTop = this._c.offsetTop;
            var marginLeft = 0;
            if(this._w.style.display !== "none") {
                marginLeft = this._w.offsetWidth;
                if(this._w_hsp.offsetWidth > 0) {
                    marginLeft = this._w.offsetWidth + this._w_hsp.offsetWidth + 2;
                }
            }
            this._c.style["marginLeft"] = marginLeft + "px";
            
            var marginRight = 0;
            if(this._e.style.display !== "none") {
                marginRight = this._e.offsetWidth + this._e_hsp.offsetWidth + 2;
            }
            
            this._c.style["marginRight"] = marginRight + "px";
            
            var newHeight = visitors.utils.getWindowHeight() - cOffsetTop - this._s.offsetHeight;
            this._w.style.height = newHeight + "px";
            this._e.style.height = newHeight + "px";
            this._c.style.height = newHeight + "px";
            this._w_hsp.style.height = newHeight + "px";
            this._e_hsp.style.height = newHeight + "px";

            var headHeight = this._n.clientHeight;
            var cnHeight = this._cn.clientHeight;
            var csHeight = this._cs.clientHeight;

            var consoleWrapper = document.getElementById("consoleWrapper");
            consoleWrapper.style.width = (this._cc.clientWidth + 2) + "px";
            var panelarrow2 = document.getElementById("panelarrow2");
            panelarrow2.style.left = (this._cc.clientWidth - 80) / 2 + "px";

            var mainHeight = visitors.utils.getClientSize().height - headHeight - cnHeight - csHeight;
            this._cc.style.height = mainHeight + 'px';

            this.sideBarResize();
        },
        sideBarResize: function() {
            if(this._visitorManager) {
                var sideBar = this._visitorManager._sideBar;
                sideBar.resize();
            }
        },
        buildFrame: function() {
            this._visitorManager = new visitors.VisitorManager();
            this._visitorManager.doInit();
            this._msg = new visitors.WSMessage(this._visitorManager);
            this._msg.initialize();

            if(getCookie("msgConsole")=="show"){
                $('#consoleWrapper').width($(document.body).width() - 381);
                $('#consoleWrapper').css({bottom:'0px'});
                $('#panelarrow2').css({bottom:'120px'});
                $('#arrowImg').removeClass('arrow_img_show');
            }else{
                $('#consoleWrapper').width($(document.body).width() - 381);
                $('#consoleWrapper').css({bottom:'-120px'});
                $('#panelarrow2').css({bottom:'0px'});
                $('#arrowImg').addClass('arrow_img_show');
            }
            $('#panelarrow2').click(this.toggleConsole);
        },

        toggleConsole :function() {
            console.log('dfd');
            if ($('#consoleWrapper').css('bottom')=='0px') {
                $('#consoleWrapper').width($(document.body).width() - 381);
                $('#consoleWrapper').animate({bottom:'-120px'});
                $('#panelarrow2').animate({bottom:'0px'});
                $('#arrowImg').addClass('arrow_img_show');
                setCookie("msgConsole","hide");
            }else{
                $('#consoleWrapper').width($(document.body).width() - 381);
                $('#consoleWrapper').animate({bottom:'0px'});
                $('#panelarrow2').animate({bottom:'120px'});
                $('#arrowImg').removeClass('arrow_img_show');
                setCookie("msgConsole","show");
            }
        }
    };

    if (EXTEND) {
        visitors.utils.inherits(VisitorPage, EXTEND);
    }
})();