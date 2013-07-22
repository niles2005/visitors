/**
 * Created with IntelliJ IDEA.
 * User: Dell
 * Date: 13-7-21
 * Time: 上午9:59
 * To change this template use File | Settings | File Templates.
 */
(function(){
    mapwork.WSMessage = WSMessage;
    var EXTEND = null;

    function  WSMessage(page){
        this.socket = null;
        this.module = null;
        this.visitorPage = page;

    }

    WSMessage.prototype = {

        initialize:function(){
            if (window.location.protocol == 'http:') {
                this.connect('ws://' + window.location.host + '/websocket/message');
            } else {
                this.connect('wss://' + window.location.host + '/websocket/message');
            }
        },

        connect:function(host){
           var self = this;
           if ('WebSocket' in window) {
               this.socket = new WebSocket(host);
           } else if ('MozWebSocket' in window) {
               this.socket = new MozWebSocket(host);
           } else {
               console.log('Error: WebSocket is not supported by this browser.');
               return;
           }

           this.socket.onopen = function () {
               console.log('Info: WebSocket connection opened.');
               self.module = self.visitorPage._map.getModule(mapwork.Search.ID);
               self.module.init();
           };

           this.socket.onclose = function () {
               console.log('Info: WebSocket closed.');
           };

           this.socket.onmessage = function (message) {
               self.module.onPageQueryResult(JSON.parse(message.data));
           };
       }
    }
})();