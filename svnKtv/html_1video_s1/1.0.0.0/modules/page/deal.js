/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-9
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    function Deal(callBack) {
        this.options = {};
        this.callBack = callBack;
        this.type="gift";
        this.giftType="primary";
        this.money="";
        this.giftId ="";
        this.giftCmd="";
        this.shapebox = $(".gift-shapebox");
        this.sendToWhoList = $("#sendToWhoList");
        this.label = $("#labels");
        this.labelIndex={"初级":"primary","中级":"intermediate","高级":"advanced","豪华":"grand","趣味":"interest","伴舞":"dancers","守护":"guard"} ;
        this.giftData = {};
        this.labelTmpl = '<li id="${key}"><a href="#">${key}</a></li>';
        this.sendToListTmpl = '<li id="${id}Id"title=${name}><a href="#">${name}</a></li>';
        this.typeTmpl ='<li id="${ID}" class="img" cmd="${ParentId}" title="${PropsTooltip}"><object type="application/x-shockwave-flash" data="${PropsIco}" width="40" height="40"></object><p>${PropsName}</p></li>';
        this.init();
    }
    Deal.prototype.init=function(){
        var self = this;
        self.initClick();
        //self.setDealList();
        self.resetGiftReceiver();
        self.resetBalance();
    }
    //点击礼物或道具逻辑判断
    Deal.prototype.setDealList=function(){

        var $list=$("#list-"+this.type+"-primary"),length = $list.children().length;
        if(length<=0){
           // console.log("道具");
            }else{
            //礼物
            this.label.find("li").eq(0).addClass("on").siblings().removeClass("on");
                return;
            }
    }
    //对外开放接口
    Deal.prototype.userMoney=function(data){
        this.money = data.resMoney;
       $("#userMoney").text(this.money||0);
    }
    Deal.prototype.resetGiftList=function(k,v){
        var $dom;
        switch(k){
            case "10022"://礼物
                $dom = $("#list-gift-primary");
                this.setGiftList ($dom,v);
                break;
            case "10001"://道具
                $dom = $("#list-prop-primary") ;
                this.setBasicList($dom,v);
                break;
            case "10028"://游戏
                $dom = $("#list-game-primary") ;
                this.setBasicList($dom,v);
                break;
            default://礼物
                $dom = $("#list-kk-primary") ;
                this.setBasicList($dom,v);
                break;
        }
        //this.renderGiftList();
    }
    Deal.prototype.setGiftList = function($dom,v){
         var labels = [],primary= v["0"].List;
        $.each(v,function(k,v){
            var label = {};
            label["key"] =  v.CateName;
            labels.push(label);
        });
        this.setGiftLabel(labels) ;
        this.setPrimaryList($dom,primary,v);
    }
    Deal.prototype.setGiftLabel=function(data){
        if(data){
            this.template(this.label,this.labelTmpl,data);
            this.label.find("li").eq(0).addClass("on");
            this.initGiftLabels (this.label);
        }
    }
    Deal.prototype.setBasicList=function($dom,data){
        switch(this.type){
            case "gift" :
                if("primary" != this.giftType){
                    this.createUl (data);
                }else{
                    this.template($dom,this.typeTmpl,data);
                }
                break;
            default:
                this.template($dom,this.typeTmpl,data);
                break;
        }
        this.initSend();
    }
    Deal.prototype.setPrimaryList = function($dom,data,v){
        this.setBasicList($dom,data);
        this.setGiftData(v);

    }
    Deal.prototype.setGiftData = function(v){
        var self = this;
        $.each(v,function(k,v){
        var key  =v.CateName,value= v.List,index = self.labelIndex [key]  ;
            self.giftData[index]= value;
        });
    }
    Deal.prototype.initGiftLabels=function($labels){
        var self =this;
        $labels.find("li").bind("click",function(){
            var label =$(this).attr("id");
            self.giftType = self.labelIndex [label];
            $(this).addClass("on").siblings().removeClass("on");
            self.check();
        });
    }
    Deal.prototype.check=function(){
        var $exist = $("#list-gift-"+this.giftType),typeData;
        if($exist.children().length > 0 ){
            $exist.show().siblings().hide();
        }else{
            typeData = this.giftData[this.giftType];
            this.createUl (typeData);
        }
    }
    Deal.prototype.createUl=function(data){
        var self= this;
        var ul = document.createElement("ul");
        $(ul).attr("id","list-gift-"+self.giftType);
        $(ul).attr("class","clears");
        self.template($(ul),self.typeTmpl,data);
        $(ul).appendTo( $("#list-gift"));
        $(ul).siblings().hide();
        self.initSend();
    }
    Deal.prototype.initSend=function(){
        var self = this;
           $(".img").bind("click",(function(){
               $(this).addClass("currentGift").siblings().removeClass("currentGift");
               self.giftId =  $(this).attr("id") ;
               self.giftCmd = $(this).attr("cmd");
           }));
    }
    Deal.prototype.show=function(index,doms){
        doms.hide();
        var now = doms.eq(index);
        var id = now.attr("id");
        now.show();
        if("tabs-gift" === id){
           $("#list-gift-primary").show().siblings().hide();
        }
    }
    Deal.prototype.template=function($div,tmpl,data){
        var string = "template";
        $.template(string, tmpl);
        $div.html($.tmpl(string, data));
    }
    //赠送区域逻辑
    Deal.prototype.setSendTo=function(data){
        var $sendTo=$(".sendTo"),$list=$("#sendToList");
        $sendTo.val(data.name),$sendTo.attr("id",data.id);
        if($("#"+data.id+"Id").length>0){
            return;
        }else{
            $.template("STRING", this.sendToListTmpl);
            $list.append($.tmpl("STRING", data));
        }
    }
    Deal.prototype.resetGiftReceiver=function(data){
        var self = this,result;
        if(!data){
            result = {id:"31110",name:"侃大山"}
        }else{
            result = data;
        }
        $("#giftReceiver").attr("value",result.id);
        $("#giftReceiver").text(result.name);
    }
    Deal.prototype.resetBalance=function(data){
        var self = this,result;
        if(!data){
            result = "23564125"
        }else{
            result = data;
        }
        $("#balance").text(result);
    }
    Deal.prototype.dealP = function($show,$hide,$dom,flag){
        $show.find("li").click(function(){
            var title = $(this).attr("title");
            if("--请选择--" == title){
                $dom.attr("id","");
            }else if(flag){

            }else{
                var id = $(this).attr("id"), iD = id.substring(0,id.length-2);
                $dom.attr("id",iD);
            }
            $dom.val(title);
            $show.hide();
        });
    }
    Deal.prototype.initClick=function(){
        var self =this,$show =self.shapebox ,$hide = self.sendToWhoList ;
        $("#insertNum").val("1");
        $("#sendNum .shape").click(function(){
                $show .show();
                $hide .hide();
                self.dealP($show,$hide,$("#insertNum"),"flag");
        });
        $("#sendToWho").click(function(){
            $show.hide();
            $hide.show();
            self.dealP($hide,$show, $(".sendTo"));
        });
        $(".dealType li").bind("click", function () {
            var index = $(this).index();self.type=$(this).attr("name");
            $(this).addClass("on").siblings().removeClass("on");
            var divs = $("#tabDivs > div");
            self.show(index,divs);
            self.setDealList();
        });
        $("#btn_send").click(function(){
            self.shapebox .hide();self.sendToWhoList.hide();
            var id = $(".sendTo").attr("id"),num=$("#insertNum").val();
            if(!id){
                 alert("请选择所要送给的对象");
            }else if(!num){
                alert("请选择所要送礼物的个数");
            }else if(!self.giftId){
                alert("请选择所要送礼物")
            }else{
                self.sendOk({id:id,num:num,giftId:self.giftId,cmd:self.giftCmd});
            }
        });
    }
    Deal.prototype.sendOk=function(data){
        var price = parseInt($("#"+data.giftId).attr("title").replace(/\D/g, "")),totalPrice =parseInt(data.num)*price;
        if(totalPrice>parseInt(this.money)){
               alert("您的金额不足，请充值");
        }else{
            data.totalPrice =  totalPrice;
            this.callInterface(data);
        }
    }

    Deal.prototype.callInterface = function(data){
        var pkt = { cmd:"CMD_MOD" };
        pkt.msg = {
            cmd:"CMD_GIFT"
        }
        pkt.msg.msg = {
            cmd:"SEND_GIFT",
            id:data.giftId,
            num:data.num,
            des_uin:data.id,
            // des_nick:giftlogic.sendToUser.nick,
            // giftname:giftObj.PropsName,
            giftcmd:data.cmd ,
            gifttype: 1,//giftObj.giftType,
            RegionId:"1314",
            prayStr:"",
            groupName:""
        };
        testInterface.sendGift(pkt);
    }
    module.exports = Deal;
});

