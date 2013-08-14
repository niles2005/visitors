var visitors = window.visitors = {};

visitors.ajaxtype = 0; //0:default,use jquery ajax,   1: use jsonP
visitors.actions = {};

visitors.isIE = (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0);
visitors.IEVersion = 0;
if(visitors.isIE) {
    if(navigator.appName == "Microsoft Internet Explorer") {
        if(navigator.appVersion.match(/7./i)=="7.") {
            visitors.IEVersion = 7;
        } else if(navigator.appVersion.match(/8./i)=="8.") {
            visitors.IEVersion = 8;
        } else if(navigator.appVersion.match(/9./i)=="9.") {
            visitors.IEVersion = 9;
        } else {
            visitors.IEVersion = 6;
        }
    }
}
visitors.isIELess9 = (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0);
visitors.isFirefox = navigator.userAgent.indexOf('Firefox') >= 0;
visitors.isOpera = navigator.userAgent.indexOf('Opera') >= 0 ;

visitors.supportSVG = document.createElementNS != null;

if(!visitors.supportSVG) {//VML
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
