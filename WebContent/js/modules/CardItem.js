(function() {
    mapwork.CardItem = CardItem;

    var EXTEND = mapwork.ModuleItem;
    CardItem.ID = "CardItem";

    CardItem.setting = {
        ID: CardItem.ID,
        pageUrl: null,
        listUrl: null,
        detailUrl: null,
        newModuleItem: function(module, index) {
            return new CardItem(module, index);
        }
    };

    function CardItem(module, index,roles) {

        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._roles = roles;
    }


    CardItem.prototype = {
        getType:function(){
             return this._json.role;
        },   
        getLocation:function(){
            return this._json.lastLocate;
        },
        setJsonData: function(json) {
            this._json = json;

            this.setZIndex(100 - parseInt(this._index));
//            this.setIcon("images/" + this._json.authority + "2.png");
//            this.setHoverIcon("images/" + this._json.authority + "1.png");
            this.setOffsetPos([11, 31]);
        },
        getTipTitle: function() {
            return this._json.name;
        },
        getTipContent: function() {
            return "<p>" + this._json.name + "</p>";
        },
        isNeedItemQuery: function() {
            return false;
        },
        createMapIcon: function() {
            var id = this._id;
            var icon = this._icon;
            var hoverIcon = null;//this._hoverIcon;
            var iconOffset = this._offsetPos;
            var moduleLabel = new mapwork.CommonItemLabel(id, icon,hoverIcon,iconOffset,this._zIndex,this);
            moduleLabel.setLabel(this._json.label,this._json.count);
            return moduleLabel;
        },
        setRole: function(role) {
            if(this._role) {
                if(this._role !== role) {
                    this._role.removeCard(this);
                    this._role = role;
                    this._role.addCard(this);
                }
            } else {
                this._role = role;
                this._role.addCard(this);
            }
        },
        getRole: function() {
            return this._role;
        },
        formatDate: function(now,form) {
            var year = now.getYear()-100+2000;
            var month = now.getMonth()+1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            if(form === 'day'){
                return year+"-"+month+"-"+date ;
            }else if(form === 'time'){
                return hour+":"+minute+":"+second ;
            }else{
                return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second ;
            }
         } ,

    afterExpandDetail: function() {
            var $cardDetail = this._$Content.find(".cardDetail");
            var url = "work?action=loadevents&cardId=aa";
            var self = this;

            mapwork.utils.loadJsonData(url, function(data) {
                if (!data) {
                    return;
                }
               var htmlContent = '<table class="table">'
                   +'<tbody><tr><th>Index</th><th>日期</th><th>时间</th><th>方位</th>';
               for(var i=0 ; i < data.length ;i++){
                    htmlContent = htmlContent
                                  +'<tr><td>'
                                  + (i+1)
                                  +'</td>'
                                  +'<td>'
                                  + self.formatDate(new Date(data[i]['time']),'day')
                                  +'</td>'
                                +'<td>'
                                + self.formatDate(new Date(data[i]['time']),'time')
                                +'</td>'
                                  +'<td>'
                                  +'<span class="metadata">'
                                  + data[i]['deviceLocate']
                                  +'</span></td></tr>';
               }
                htmlContent = htmlContent + '</tbody></table>';
                $cardDetail.html(htmlContent);
//                self.onEventQueryResult(data);
            });            
        },
        getSidebarContent: function() {
            return '<div  class="listing"> '
                +' <div class="main viewed on">'
                +'<div class="row">'
                +'<div class="info span4">'
                +'<div class="first_photo_imagebox thumbnail lazy"> <img src=' + this.getIcon() + '></img></div>'
                +'<div class="title ellipsis multiline" >' + this._json.name + '</div>'
                +'</div>'
                +'<ul class="meta-three-block">'
                +'<li class="timeago">' + this._json.lastLocate + '</li>'
                +'<li class="timeago">' + this.formatDate(new Date(this._json.lastTime) ,'time')+ '</li>'
                +'</ul>'
                +'</div>'

                +'<div class="row list_footer">'
                +'<div class="span list-footer-left">'
                +'  <span class="follower-count">'+this._json.role+'</span>'
                +'</div>'
                +'<div class="span3 list-footer-right">'
//                +'<span class="qiuorchu label label-chuzu">出</span>'
//                +'<span class="qiuorchu label label-ru">入</span>'
                +'<div class="expand">'
                +'<a  class="yuantie btn btn-link btn-block" href="#">查看详细记录</a>'
//                +'<span class="expand">查看详细记录</span>'
                +'</div>'
                +'</div>'
                +'</div> '

                +'</div>'

                +' <div class="popuplist-main hide">'
                +'<div class="modal-header">  '
                +'    <div class="row">    '

//                +'   <span  class=" "> '
//                +' <div class="input-append date" id="datepicker" data-date-format="dd-mm-yyyy"> '
//                +'<input class="span2" size="12" type="text" value >  '
//                +'    <span class="add-on"><i class="icon-th"></i></span>    '
//                +' </div> '
//                +'</span>'

//                +'       <span class="verification"><a href="#" >行踪记录 <i class="icon-ok icon-large"></i></a></span>'
                +'        </div>                '
                +'    </div>                      '
                +'     <div class="popuplist-main-body modal-body">   '
                +'        <div class="popuplist-descr">           '
                +'<h5>行踪详情</h5>'
                +'            <div class="cardDetail row infobox descrbox chu_descr ellipsis multiline">'
//                '<h5>关于房子</h5>' +
//                '<p>房子具体位置在<span class="metadata">中国北京市北京西城区黄寺大街双旗杆东里</span>。户型两居。要出租的房间是<span class="metadata">整套</span>。出租的屋子面积<span class="metadata">60</span>。</p>' +
//                '<h5>租金和租期</h5>' +
//                '<p>租金每月<span class="metadata">5000</span>。可入住时间是<span class="metadata">2013/07/19</span>。租期一年。</p>' +
//                '<h5>关于室友和设施</h5>' +
//                '<p><span class="metadata">男女不限</span>。</p>' +
//                '<h5>联系方式</h5>' +
//                '<p><span class="metadata">beshop@139.com</span></p>' +
//                '<h5>其他补充</h5>' +
//                '<p><span class="metadata">中介勿扰，希望租户是附近上学的一家三口，价格可以再商量</span></p>'
                +'</div>'
                +'        </div>'
                +'</div>'
                +'</div> '

                +'</div>'
        }
                
    };

    if (EXTEND) {
        mapwork.utils.inherits(CardItem, EXTEND);
    }
})();