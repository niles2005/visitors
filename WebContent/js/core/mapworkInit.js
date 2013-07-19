var mapwork = window.mapwork = {};

mapwork.ajaxtype = 0; //0:default,use jquery ajax,   1: use jsonP
mapwork.actions = {};

mapwork.isIE = (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0);
mapwork.IEVersion = 0;
if(mapwork.isIE) {
    if(navigator.appName == "Microsoft Internet Explorer") {
        if(navigator.appVersion.match(/7./i)=="7.") {
            mapwork.IEVersion = 7;
        } else if(navigator.appVersion.match(/8./i)=="8.") {
            mapwork.IEVersion = 8;
        } else if(navigator.appVersion.match(/9./i)=="9.") {
            mapwork.IEVersion = 9;
        } else {
            mapwork.IEVersion = 6;
        }
    }
}
mapwork.isIELess9 = (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0);
mapwork.isFirefox = navigator.userAgent.indexOf('Firefox') >= 0;
mapwork.isOpera = navigator.userAgent.indexOf('Opera') >= 0 ;

mapwork.supportSVG = document.createElementNS != null;

if(!mapwork.supportSVG) {//VML
        document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
        var style = document.createStyleSheet();
        var VMLel = ['line','stroke','path','polyline','fill','oval','shape'];
        for (var i=0,l=VMLel.length;i<l;i++) {
                style.addRule('v\\:'+VMLel[i], "behavior: url(#default#VML);");
                style.addRule('v\\:'+VMLel[i], "antialias: true;");
        }
}


String.prototype.endsWith = function(str) {
    if(str == null || str == "" || this.length < str.length) {
        return false;	
    }
    return (this.substring(this.length - str.length) == str);
}

String.prototype.startsWith = function(str) {
    if(str==null || str=="" || this.length < str.length) {
        return false;
    }		
    return (this.substring(0,str.length) == str);
}

//Array Remove - By John Resig (MIT Licensed)   
Array.remove = function(array, from, to) {   
    var rest = array.slice((to || from) + 1 || array.length);   
    array.length = from < 0 ? array.length + from : from;   
    return array.push.apply(array, rest);   
};


function printMap(printpage)
{
	window.print(); 
return false;
}

function setCookie(name,value,expireDays){
	var exp  = new Date();  
	if(expireDays) {
		exp.setTime(exp.getTime() + expireDays*24*60*60*1000);
	} else {
		exp.setTime(exp.getTime() + 30*24*60*60*1000);//缺省30天
	}
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	 if(arr != null) return unescape(arr[2]); return null;
}
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}			
