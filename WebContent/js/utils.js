(function() {
    function Base() {
    }

    visitors.utils = {
        inherits: function(subClass, superClass) {
            var sub = subClass.prototype;
            Base.prototype = superClass.prototype;
            var sup = new Base();
            Base.prototype = null;
            for (prop in sub) {
                sup[prop] = sub[prop];
            }
            subClass.prototype = sup;
            sup.constructor = subClass;
        },
        extend: function(dest, src) {
            for (var prop in src) {
                dest[prop] = src[prop];
            }
            return dest;
        },
        removeItem: function(array, item) {
            var k = array.length;
            if (k <= 0) {
                return;
            }
            while (k--) {
                if (array[k] === item) {
                    array.splice(k, 1);
                    break;
                }
            }
        },
        loadJsonData: function(url, listener, param) {
            if (visitors.ajaxtype == 0) {
                $.ajax({
                    url: url,
                    data: param,
                    dataType: "json", //这里的dataType就是返回回来的数据格式了html,xml,json
                    cache: false, //设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false 
                    success: listener
                });
            } else {
                FlyJSONP.get({
                    url: url,
                    parameters: param,
                    success: listener,
                    error: function(errorMsg) {
                        //console.log(errorMsg);
                    }
                });
            }
        },
        loadXMLFile: function(url, listener, caller) {
            $.ajax({
                url: url,
                dataType: "xml",
                cache: false,
                success: function() {
                    listener.apply(caller, arguments);
                }
            });
        },
        getStyleWidth: function(control) {
            var value = control.style.width;
            if (value.endsWith("px")) {
                value = value.substring(0, value.length - 2);
            }
            value = parseInt(value);
            return value;
        },
        getStyleHeight: function(control) {
            var value = control.style.height;
            if (value.endsWith("px")) {
                value = value.substring(0, value.length - 2);
            }
            value = parseInt(value);
            return value;
        },
        getStyleTop: function(control) {
            var value = control.style.top;
            if (value.endsWith("px")) {
                value = value.substring(0, value.length - 2);
            }
            value = parseInt(value);
            return value;
        },
        getStyleLeft: function(control) {
            var value = control.style.left;
            if (value.endsWith("px")) {
                value = value.substring(0, value.length - 2);
            }
            value = parseInt(value);
            return value;
        },
        bindEvent: function(elementTarget, eventType, func) {
            if (window.addEventListener) {
                elementTarget.addEventListener(eventType, func, false);
            } else if (window.attachEvent) {
                elementTarget.attachEvent("on" + eventType, func);
            }
        },
        unbindEvent: function(elementTarget, eventType, func) {
            if (window.addEventListener) {
                elementTarget.removeEventListener(eventType, func, false);
            } else if (window.attachEvent) {
                elementTarget.detachEvent("on" + eventType, func);
            }
        },
        getWindowWidth: function() {
            var myWidth = 0;
            if (typeof(window.innerWidth) == 'number') {
                //Non-IE
                myWidth = window.innerWidth;
                //                myHeight = window.innerHeight;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                //IE 6+ in 'standards compliant mode'
                myWidth = document.documentElement.clientWidth;
                //                myHeight = document.documentElement.clientHeight;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                //IE 4 compatible
                myWidth = document.body.clientWidth;
                //                myHeight = document.body.clientHeight;
            }
            return myWidth;
        },
        getWindowHeight: function() {
            var myHeight = 0;
            if (typeof(window.innerHeight) == 'number') {
                //Non-IE
                myHeight = window.innerHeight;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                //IE 6+ in 'standards compliant mode'
                myHeight = document.documentElement.clientHeight;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                //IE 4 compatible
                myHeight = document.body.clientHeight;
            }
            return myHeight;
        },
        getOffset: function(event) {//for firefox bug
            var target = event.target;
            if (target.offsetLeft == undefined)
            {
                target = target.parentNode;
            }
            var pageCoord = getPageCoord(target);
            var eventCoord =
                    {//计算鼠标位置（触发元素与窗口的距离）
                        x: window.pageXOffset + event.clientX,
                        y: window.pageYOffset + event.clientY
                    };
            var offset =
                    {
                        offsetX: eventCoord.x - pageCoord.x,
                        offsetY: eventCoord.y - pageCoord.y
                    };
            return offset;
        },
        getClientSize: function() {
            if (window.innerHeight) {
                return {width: window.innerWidth, height: window.innerHeight};
            }
            else {
                if (document.documentElement && document.documentElement.clientHeight) {
                    return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
                }
                else {
                    return {width: document.body.clientWidth, height: document.body.clientHeight};
                }
            }
        },
        formatDate: function(now, form) {
            var baseYears = 1900;
            if(visitors.isIE &&  visitors.IEVersion < 9){
                baseYears =  0;
            }
            var year = now.getYear() + baseYears;
            var month = now.getMonth() + 1;
            if(month < 10) {
                month = "0" + month;
            }
            var day = now.getDate();
            if(day < 10) {
                day = "0" + day;
            }
            var hour = now.getHours();
            if(hour < 10) {
                hour = "0" + hour;
            }
            var minute = now.getMinutes();
            if(minute < 10) {
                minute = "0" + minute;
            }
            var second = now.getSeconds();
            if(second < 10) {
                second = "0" + second;
            }
            if(year == 1970){
                return "";
            }
            if (form === 'day') {
                return year + "-" + month + "-" + day;
            } else if (form === 'time') {
                return hour + ":" + minute + ":" + second;
            } else {
                return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            }
        },
	date8ToDate10: function(strDate,split) {//20130731 -> 2013-07-31
            if(strDate.length === 8) {
                if(!split) {
                    split = "-";
                }
                return strDate.substring(0,4) + split + strDate.substring(4,6) + split + strDate.substring(6);
            } else if(strDate.length === 10) {
                    return strDate;
            }
            return null;
	},
	date10ToDate8: function(strDate) {  //2013-07-31  -> 20130731
		if(strDate.length === 10) {
			return strDate.substring(0,4) + strDate.substring(5,7) + strDate.substring(8);
		} else if(strDate.length === 8) {
			return strDate;
		}
		return null;
	}
    };

    function getPageCoord(element) {   //计算从触发到root间所有元素的offsetLeft值之和,被getOffset方法使用。
        var coord = {x: 0, y: 0};
        while (element)
        {
            coord.x += element.offsetLeft;
            coord.y += element.offsetTop;
            element = element.offsetParent;
        }
        return coord;
    }
})();