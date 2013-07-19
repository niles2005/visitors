(function() {
    function Base() {
    }

    mapwork.utils = {
        inherits: function(subClass ,superClass) {
            var sub = subClass.prototype;
            Base.prototype = superClass.prototype;
            var sup = new Base();
            Base.prototype = null;
            for(prop in sub) {
                sup[prop] = sub[prop];
            }
            subClass.prototype = sup;
            sup.constructor = subClass;
        },
        extend: function(dest, src) {
            for(var prop in src) {
                dest[prop] = src[prop];
            }
            return dest;
        },
        removeItem : function (array, item ) {
            var k = array.length;
            if(k <= 0) {
                return;
            }
            while ( k -- ) {
                if ( array[k] === item ) {
                    array.splice(k, 1);
                    break;
                }
            }
        },
		loadJsonData: function(url,listener,param) {
			if(mapwork.ajaxtype == 0) {
				$.ajax({
					url : url, 
					data: param,
					dataType : "json",//这里的dataType就是返回回来的数据格式了html,xml,json 
					cache: false,//设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false 
					success : listener
				});
			} else {
				FlyJSONP.get({
					url: url,
					parameters: param,
					success: listener,
					error: function (errorMsg) {
						//console.log(errorMsg);
					}
				});
			}
		},
        loadXMLFile:function(url,listener,caller){
            $.ajax({
                url:url,
                dataType:"xml",
                cache:false,
                success:function() {
                    listener.apply(caller,arguments);
                }
            });
        },
        getStyleWidth: function(control) {
            var value = control.style.width;
            if(value.endsWith("px")) {
                value = value.substring(0,value.length - 2);
            }
            value = parseInt(value);
            return value;
        },
        getStyleHeight: function(control) {
            var value = control.style.height;
            if(value.endsWith("px")) {
                value = value.substring(0,value.length - 2);
            }
            value = parseInt(value);
            return value;
        },
        getStyleTop: function(control) {
            var value = control.style.top;
            if(value.endsWith("px")) {
                value = value.substring(0,value.length - 2);
            }
            value = parseInt(value);
            return value;
        },
        getStyleLeft: function(control) {
            var value = control.style.left;
            if(value.endsWith("px")) {
                value = value.substring(0,value.length - 2);
            }
            value = parseInt(value);
            return value;
        },
        bindEvent: function(elementTarget,eventType,func) {
            if (window.addEventListener) {
                elementTarget.addEventListener(eventType, func, false);
            } else if (window.attachEvent) {
                elementTarget.attachEvent("on" + eventType, func);
            }
        },
        unbindEvent: function(elementTarget,eventType,func) {
            if (window.addEventListener) {
                elementTarget.removeEventListener(eventType, func,false);
            } else if (window.attachEvent) {
                elementTarget.detachEvent("on" + eventType,func);
            }
        },
        
        getWindowWidth: function() {
            var myWidth = 0;
            if( typeof( window.innerWidth ) == 'number' ) {
                //Non-IE
                myWidth = window.innerWidth;
            //                myHeight = window.innerHeight;
            } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
                //IE 6+ in 'standards compliant mode'
                myWidth = document.documentElement.clientWidth;
            //                myHeight = document.documentElement.clientHeight;
            } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                //IE 4 compatible
                myWidth = document.body.clientWidth;
            //                myHeight = document.body.clientHeight;
            }
            return myWidth;
        },
        getWindowHeight: function() {
            var myHeight = 0;
            if( typeof( window.innerHeight) == 'number' ) {
                //Non-IE
                myHeight = window.innerHeight;
            } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
                //IE 6+ in 'standards compliant mode'
                myHeight = document.documentElement.clientHeight;
            } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                //IE 4 compatible
                myHeight = document.body.clientHeight;
            }
            return myHeight;
        },
        getPageX: function(event) {
            if(event.pageX || event.pageY) {
                return event.pageX;
            } else {
                return event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            }
        },
        getPageY: function(event) {
            if(event.pageX || event.pageY) {
                return event.pageY;
            } else {
                return event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
        },
        getMapLayerX: function(event,mapLocation) {
            if(mapwork.isIE) {
                return event.x;
            } else {
                return event.clientX - mapLocation._map._div.offsetLeft;
            }
        },
        getMapLayerY: function(event,mapLocation) {
            if(mapwork.isIE) {
                return event.y;
            } else {
                return event.clientY - mapLocation._map._div.offsetTop;
            }
        },
        getOffset: function(event) {//for firefox bug
            var target = event.target;
            if (target.offsetLeft == undefined)
            {
                target = target.parentNode;
            }
            var pageCoord = getPageCoord(target);
            var eventCoord =
            {     //计算鼠标位置（触发元素与窗口的距离）
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
        getClientSize: function(){
            if(window.innerHeight){
                    return {width:window.innerWidth, height:window.innerHeight};
            }
            else{
                    if(document.documentElement&&document.documentElement.clientHeight){
                            return {width:document.documentElement.clientWidth, height:document.documentElement.clientHeight};
                    }
                    else{
                            return {width:document.body.clientWidth, height:document.body.clientHeight};
                    }
            }
        },
        getFitZoom: function(tileEdgeLen) {
            var maxZoom = mapwork.MapLocation.LIMIT_MAX_ZOOM;
            var minZoom = mapwork.MapLocation.LIMIT_MIN_ZOOM;

            for (var i = maxZoom; i >= minZoom; i--) {
                var zoomTileLen = Math.pow(2.0, 8 + i);
                if (tileEdgeLen > zoomTileLen) {
                    return i;
                }
            }
            return minZoom;
        }
    };
    
    function getPageCoord(element) {   //计算从触发到root间所有元素的offsetLeft值之和,被getOffset方法使用。
        var coord = {x: 0,y: 0};
        while (element)
        {
            coord.x += element.offsetLeft;
            coord.y += element.offsetTop;
            element = element.offsetParent;
        }
        return coord;
    }
})();