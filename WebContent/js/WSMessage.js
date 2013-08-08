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
        this.timer = null;
    }

    WSMessage.prototype = {

        initialize:function(){
            if (window.location.protocol == 'http:') {
                this.connect('ws://' + window.location.host + '/ws');
            } else {
                this.connect('wss://' + window.location.host + '/ws');
            }
        },

        connect:function(host){
           var self = this;
           if ('WebSocket' in window) {
               this.socket = new WebSocket(host);
           } else if ('MozWebSocket' in window) {
//               console.dir(this.socket)
               this.socket = new MozWebSocket(host);
           } else {
//               console.log('Error: WebSocket is not supported by this browser.');
               return;
           }



           this.socket.onopen = function () {
               console.log('Info: WebSocket connection opened.');

//               if (self.module._map._currentModule) {
//                   self.module._map._currentModule.clean();
//               }
//               var searchModule = self.visitorPage._map.getModule(mapwork.Search.ID);


               self.module = self.visitorPage._map.getModule(mapwork.Search.ID);
               $('#connectSign').text('网络已连接');
               $('#connectSign').removeClass('label-disconnetct ');
//               $('#connectSign').addClass('qiuorchu label label-chuzu');
//               self.module.init();
//               self.module.setSearchType('all');
           };

           this.socket.onclose = function () {
               console.log("reconnect when old socket closed... " );
               setTimeout(function() {
                   self.initialize();
               },5000);
           };

            this.socket.onerror = function () {
                console.log("reconnect when old socket error... " );
                setTimeout(function() {
                    self.initialize();
                },5000);
            };

           this.socket.onmessage = function (message) {

               var json = JSON.parse(message.data);
               console.log(json);
               self.module.updateDatas(json);
               if(self.timer)  {
                   clearTimeout(self.timer);
               }

               self.timer = setTimeout(function (){
                   if(self.socket){
                       console.log('client side close socket interval')
                       self.socket.close();
                       $('#connectSign').text('网络已断开,系统正在重连...');
                       $('#connectSign').addClass('label-disconnetct');
                   }
               },8000);
           };
       }
    }
})();