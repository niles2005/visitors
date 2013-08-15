/**
 * Created with IntelliJ IDEA.
 * User: Dell
 * Date: 13-7-21
 * Time: 上午9:59
 * To change this template use File | Settings | File Templates.
 */
(function(){
    visitors.WSMessage = WSMessage;
    var EXTEND = null;

    function  WSMessage(visitorManager){
        this.socket = null;
        this.manager = visitorManager;
    }
    WSMessage.prototype = {
//        doCheck: function() {
//            console.log('check' + (index++ ));
//            if(this.socket){
//                console.log('client side close socket interval');
//                this.socket.close();
//                $('#connectSign').text('网络已断开,系统正在重连...');
//                $('#connectSign').addClass('label-disconnetct');
//            }
//            
//        },
        initialize:function(){
            console.log(new Date().getTime() / 1000);
            if (window.location.protocol == 'http:') {
                this.connect('ws://' + window.location.host + '/ws');
            } else {
                this.connect('wss://' + window.location.host + '/ws');
            }
        },

        connect:function(host){
            var self = this;
            var socket = null;
           if ('WebSocket' in window) {
               socket = new WebSocket(host);
           } else if ('MozWebSocket' in window) {
               socket = new MozWebSocket(host);
           } else {
               return;
           }

           if(socket) {
                socket.onopen = function () {
                    console.log('Info: WebSocket connection opened.');
                    $('#connectSign').text('网络已连接');
                    $('#connectSign').removeClass('label-disconnetct');
                    self.manager.initDataQuery();
                };
                socket.onclose = function () {
                    console.log("reconnect when old socket closed... " );
                     $('#connectSign').text('网络已断开,系统正在重连...');
                     $('#connectSign').addClass('label-disconnetct');

                     setTimeout(function() {
                         self.initialize();
                     },10000);

                };

                 socket.onerror = function () {
                 };

                socket.onmessage = function (message) {
                    var json = JSON.parse(message.data);
                    self.manager.updateDatas(json);
                };
           }


       }
    };
})();