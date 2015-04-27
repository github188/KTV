/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-9
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    function Chat(callBack) {
        this.options = {};
        this.callBack = callBack;
        this.type="all-icon";
        this.faceData = null;
        this.sealData = null;
        this.faceType = "defaultFace";
        this.sealType = "designationFace";
        this.className="face";
        this.chatReceiver = $("#chatReceiver");
        this.chatPost = $("#chat_post");
        this.reciver = {id:"0",name:"所有人"};
        this.publicTmpl = '<span><a style="text-decoration:underline"  href="${href}">${chatSender}【${chatSenderId}】 </a> 对  <a style="text-decoration:underline"  href="${href}">${chatReceiver}【${chatReceiverId}】 </a>说&nbsp;&nbsp;&nbsp;&nbsp;</span>';
        this.privateTmpl = '<span> 【你】 对  <a style="text-decoration:underline"  href="${href}">${chatReceiver}【${chatReceiverId}】 </a>说:&nbsp;&nbsp;&nbsp;&nbsp;</span>';
        this.sysTmpl = '<span><a style="text-decoration:none">${text}</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>';
        this.faceTmpl = '<td class="imgCode"><img src="${key}" width="25" height="25"/><object style="display:none" type="application/x-shockwave-flash" data="${key}" width="25" height="25"></object></td>';
        this.sealTmpl = '<td class="imgCode" id="${StampID}" title="${StampName},${StampMoney}/"><img src="${StampIco}"/></td>';
        this.giftListTmpl = '<td>${giftName}</td><td>${giftNumber}</td><td>${sender}</td>';
        this.songListTmpl = '<td style="display:none">${id}</td><td>${number}</td><td>${songName}</td><td>${singer}</td><td><a href="#" class="blue">编辑</a> <a href="#">删除</a></td>';
        this.faceLabelTmpl =  '<li id="${key}"><a href="#">${key}</a></li>';
        this.hornTemplate = '<span><strong>(${nick})说：${str}</strong>速度来围观呀！<em id="hornTime"></em></span>';
        this.chatToListTmpl = '<li class="chatWith" id="${id}Cd" title=${name}><a href="#">${name}</a></li>';
        this.faceKeys ={"默认":"defaultFace","兔斯基":"tuSiJiFace","悠嘻猴":"monkeyFace","炮炮兵":"paoPaoFace"};
        this.sealKeys ={"称号":"designationFace","称赞":"complimentFace","整蛊":"brainsFace","角色":"characterFace","贵族":"nobleFace","鉴定":"identifyFace"};
        this.initFlag = false;
        this.init();
    }
    Chat.prototype.init=function(){
        this.initChatBtn();
        this.initClick ();
        this.chatOrGift();
    }
    Chat.prototype.initClick=function(){
        var self =this;
        $("li","#chat_type").bind("click", function () {
            var index = $(this).index();self.type=$(this).attr("id");
            $(this).addClass("on").siblings().removeClass("on");
            var divs = $("#chatTabs > div");
            self.show(index,divs);
            self.chatOrGift();
        });
       $("#chatTo").click(function(){
           $(".chatToList").show();
           self.chatWith();
       });

        $("#song-icon").click(function(){
            require("../../app/src/css/song.css");
            self.dialogOpen ("song");
            self.setSong();
        });
        $("#garage-icon").click(function(){
            require("../../app/src/css/garage.css");
            self.dialogOpen ("garage");
            //self.setGarage();
        });
    }
    Chat.prototype.chatWith = function(){
        var self = this;
        $(".chatWith").on("click",function(){
            var id,iD,title = $(this).attr("title");
            if("所有人" == title){
                id = "0";
            }else{
                iD = $(this).attr("id"),
                id = iD.substring(0,iD.length-2);
            }
            self.chatReceiver .val(title);
            self.chatReceiver .attr("code",id);
            $(".chatToList").hide();
        });
    }
    //点歌系统对外接口
    Chat.prototype.setSong=function(data){
       var self = this,result;
        if(!data){
            result = [{id:"13006",number:1,songName:"伤心城市",singer:"冷漠"},{id:"13007",number:2,songName:"我最爱的女人",singer:"冷漠"}]
        }
        $.each(result,function(i){
            self.createTr(result[i],self.songListTmpl ,$("#songList"));
        })
        self.picking ();
    }
    Chat.prototype.picking  = function(){
            $("tr","#songList").click(function(){
               // var index
            });
    }
    Chat.prototype.chatOrGift = function(){
        var self = this;
        switch(self.type){
            case "all-icon":
                if(!self.initFlag ){
                    self.initFaceBtn();
                    self.initFlag = true;
                }
                break;
            default:
               self.resetGiftList();
                break;
        }
    }

//以下是聊天内容区域的业务逻辑方法
    Chat.prototype.initChatBtn=function(){
        var self = this;
        $(".chat-btn").click(function(){
            self.chatType  = "private";
            var chatReceiver = self.chatReceiver .val();
            var chatReceiverId = self.chatReceiver.attr("code");
            var text = self.chatPost.val();
            self.resetChat ({chatReceiver:chatReceiver,chatReceiverId:chatReceiverId,text:text},"private");
            self.chatPost .val("");
        });
    }
    Chat.prototype.resetReceiver = function(data){
        this.reciver = data;
        this.chatReceiver .val(data.name);
        this.chatReceiver .attr("code",data.id);
        this.resetChatToList(data);
    }
    Chat.prototype.resetChatToList = function(data){
        if($("#"+data.id+"Cd").length>0){
            return;
        }else{
            var string = "template";
            $.template(string, this.chatToListTmpl);
            $("#chatToList").append($.tmpl(string, data));
        }
    }
    Chat.prototype.resetChat = function(data,flag){
        var self=this,stringTMPL="",headString="",$info,result;
        switch(flag){
            case "public":
                result = data[0];
                $info  = $("#public");
                stringTMPL=self.publicTmpl ;
                self.resetChatTemplate(stringTMPL,headString,result,$info);
                break;
            case "private":
                result = data;
                $info  = $("#private");
                stringTMPL = self.privateTmpl;
                self.resetChatTemplate(stringTMPL,headString,result,$info);
                break;
            case "horn":
                result=data;
                headString = "<span style='color:#008000'>[喇]</span>";
                $info = $("#private");
                stringTMPL = self.hornTemplate;
                $(result).each(function(i){
                    self.resetChatTemplate(stringTMPL,headString,result[i],$info);
                });
                break;
            default:
                result = data;
                $info  = $("#private");
                stringTMPL = self.sysTmpl;
                self.resetChatTemplate(stringTMPL,headString,result,$info);
                break;
        }
    }
    Chat.prototype.resetChatTemplate = function(stringTMPL,headString,result,$info){
        var div = document.createElement("div");
        $.template("stringTMPL", stringTMPL);
        var html = $.tmpl("stringTMPL", result);
        $(div).append(headString);
        $(div).append(html);
        $(div).append(result.text);
        $info.append($(div));
    }
//用户选择的点击操作，如彩条，扣章，选择聊天表情等
    Chat.prototype.initFaceBtn=function(){
        var self = this;
        $("#img_btn").find("button").click(function(){
            require("../../app/src/css/face.css");
            self.className = $(this).attr("class");
            self.elect (self.className );
        });
    }
    Chat.prototype.elect=function(className){
        var self = this;
        switch(className){
            case "face":
               self.face();
                break;
            case "colorbar" :
                self.colorBar();
                break;
            case "seal" :
                self.seal();
                break;
            case "wheat" :
                self.wheat();
                break;
            case "dice" :
                self.dice();
                break;
            case "lockscreen" :
                self.lockScreen();
                break;
            case "usermenu" :
                self.userMenu();
                break;
            default:
                self.votes();
                break;
        }
    }

//以下是彩条前端逻辑方法
    Chat.prototype.colorBar=function(){
        testInterface.ReqColorBar();
    }
//以下是骰子前端逻辑方法
    Chat.prototype.dice=function(){
    }
//以下是印章前端逻辑方法
    Chat.prototype.seal=function(){
        var self = this;
        self.dialogOpen ("seal");
        self.setPanel("seal");
    }
    Chat.prototype.setSeal=function(){
    }
//以下是锁屏前端逻辑方法
    Chat.prototype.lockScreen=function(){
    }
//以下是用户操作菜单前端逻辑方法
    Chat.prototype.userMenu=function(){
    }
//以下是密麦前端逻辑方法
    Chat.prototype.wheat=function(){
    }
//以下是人气票前端逻辑方法
    Chat.prototype.votes=function(){
    }
//以下是聊天表情弹出窗的业务方法
    Chat.prototype.face=function(){
        var self = this;
        self.dialogOpen ("face");
        self.setPanel("face");
    }
    Chat.prototype.setPanel=function(type){
        var self = this,nowType;
        switch(type){
            case "face" :
                nowType =self.faceType;
                break;
            case "seal" :
                nowType =self.faceType;
                break;
            default:

                break;
        }
        self.resetPanel(nowType);
        self.initLabel(type);
    }
    Chat.prototype.initLabel=function(type){
        var self = this,id="#"+type+"_dialog",labelType;
        if("face" === type){
            labelType="#faceType";
        }else{
            labelType="#sealType";
        }
        $(labelType,id).find("li").click(function(){
            $(this).addClass("current").siblings().removeClass ("current");
            switch(labelType){
                case "#faceType":
                    self.faceType = self.faceKeys[$(this).attr("id")];
                    if("more" === self.faceType){
                        self.moreFaces();
                    }else{
                        self.resetPanel(self.faceType);
                    }
                    break;
                default:
                    self.sealType = self.sealKeys[$(this).attr("id")];
                    self.resetPanel(self.sealType );
                    break;
            }
        });
    }
    Chat.prototype.resetPanel=function(type){
        var self = this,$body = $("#"+type),data,string="";
            if($body.find("tr").length > 0){
                $body.parent().show().siblings().hide();
            }else{
                if("face" === this.className){
                   data = this.faceData[type];
                    string = "face";
                }else{
                   data = this.sealData[type];
                    string = "seal";
                }
                this.setDefault(data,string);
            }
    }
    //对外接口
    Chat.prototype.roomViewCallChatRoom = function(data){
        var data,string,defaultData;
        switch(data.FlagString){
            case "获取表情成功":
                    this.setData(data.phiz,"face");
                    this.setDefault(this.faceData[this.faceType],"face");
                    this.setLabels(data.phiz,"face");
                break;
            case "获取印章列表成功":
                this.setData(data.Result,"seal");
                this.setDefault(this.sealData[this.sealType],"seal");
                this.setLabels(data.Result,"seal");
                break;
            case "获取彩条成功":
                this.setColorBar(data.Result);
                break;
            default:
                break
        }
    }
    Chat.prototype.setColorBar=function(data){
        var i = Math.round(Math.random()*(data.length-1))+ 1,body = data[i].body;
        var string="";
        $.each(body,function(i){
            string+='<span style="color:'+body[i]["color"]+'">'+body[i]["text"]+'</span>';
        });
        this.resetChat({chatReceiver:this.reciver.name,chatReceiverId:this.reciver.id,text:string},"private");

    };
    Chat.prototype.setLabels=function(data,flag){
        var $dom,key;
        if("face" === flag){
            key = "name";
            $dom = $("#faceType");
        }else{
            key = "TypeName";
            $dom = $("#sealType");
        }
        var labels =this.setBasicLabels(data,key);
        this.template ($dom,this.faceLabelTmpl,labels);
        $dom.append('<li id="more" data=""+flag><a href="#">更多</a><i class="arrow"></i></li>');
        $dom.find("li").eq(0).addClass("current").sublings().removeClass("current");
    }
    Chat.prototype.setBasicLabels=function(data,key){
        var labels = [];
        $(data).each(function(i){
            var label = {};
            label["key"] =  data[i][key];
            labels.push(label);
        });
        return labels;
    }
    //设置“默认”表情
    Chat.prototype.setDefault = function(defaultData,flag){
        var pre,id,data;
        if("face" === flag){
            pre = 10;
            id = "#"+this.faceType;
            data = defaultData.images;
            this.resetTitle(defaultData.tooltip,id);
        }else{
            pre = 7;
            id = "#"+this.sealType;
            data = defaultData;
        }
        var dataResult = this.resetData(data,pre);
        this.resetTable(dataResult,id,flag);
    }
    Chat.prototype.setData=function(data,flag){

       var keys,key={};
        if("face" === flag){
            keys = this.faceKeys;
        }else{
            keys = this.sealKeys;
        }
        this.setFaceSealData (data,keys,flag);
    }
    Chat.prototype.setFaceSealData=function(data,keys,flag){
        var dataNew={},key;
        if("face" === flag){
            $(data).each(function(i){
                key = keys[data[i].name];
                var faces = {};
                faces["images"] = data[i].images;
                faces["tooltip"] = data[i].tooltip;
                dataNew[key] = faces;
            });
            this.faceData  = dataNew;
        }else{
            $(data).each(function(i){
                key = keys[data[i]["TypeName"]];
                dataNew[key] =  data[i].List;
            });
            this.sealData  = dataNew;
        }
    }
    //设置表情title属性
    Chat.prototype.resetTitle = function(data,id){
           var img = $(".imgCode",id);
        $(img).each(function(i){
            $(this).attr("title",data[i]);
        });
    }
    //根据表情集确定每行显示个数并渲染数据
    Chat.prototype.resetTable=function(data,id,flag){
        var self = this,$table = $(id);
        if("face" === flag){
            $(data).each(function(k,v){
                self.createTr(v,self.faceTmpl,$table);
            });
        }else{
            $.each(data,function(i){
                self.createTr(data[i],self.sealTmpl,$table);
            });

        }
        $table.parent().show().siblings().hide();

    }
    Chat.prototype.moreFaces=function(){

    }
    //发送礼物或道具未触发跑到的处理事件
    Chat.prototype.setMod = function(data){
        var key = data.cmd;
        switch(key){
            case "CMD_GIFT":
                if("SEND_GIFT" === data.msg.cmd){
                    this.updateChat(data.msg);
                }
                break;
            default:
                break;
        }
    }
    Chat.prototype.updateChat=function(data){
        var giftCmd = data["giftcmd"];
        var objectImage = $("[cmd="+ giftCmd +"]","#deal").find("object").attr("data");
        var html = "<span style='color:#0093f0'>[礼]</span>",time="&nbsp;&nbsp;<span>"+ data["tim"] +"</span>&nbsp;&nbsp;",senderIcons = data["src_icons"],acceptIcons =data["des_icons"] ,sender = data["src_nick"],acceptor =data["des_nick"] ,senderImg="",acceptImg="";
        $(senderIcons).each(function(i){
            senderImg += "<img src="+ senderIcons[i] +"/>";
        });
        $(acceptIcons).each(function(i){
            acceptImg += "<img src="+ acceptIcons[i] +"/>";
        });
        html+=time+
              senderImg+
              "&nbsp;&nbsp;<span style='color:#669933'>"+
               sender+
               "</span>&nbsp;&nbsp;"+
               "("+data["src_uin"]+")&nbsp;&nbsp;<span color='blue'>送给</span>&nbsp;&nbsp;"
                  +acceptImg+
                 "&nbsp;&nbsp;<span style='color:#669933'>"+acceptor+"</span>&nbsp;&nbsp;"+
                 "("+data["des_uin"]+")"+
                 "<object type='application/x-shockwave-flash' data='"+objectImage+"' width='40' height='40'></object>"+data["num"]+"个";

        var div = document.createElement("div"),div1 = document.createElement("div");
        $(div).html(html);
        $(div1).html(html);
        $("#private").append( $(div));
        $("#giftBodyOnly").append( $(div1));
    }
//以下是点击礼物标签时事件
    Chat.prototype.resetGiftList=function(data){

    }

//以下是工具类通用方法，以后可提取为公用方法
    Chat.prototype.show=function(index,doms){
        doms.hide();
        doms.eq(index).show();
    }
    Chat.prototype.dialogOpen=function(type){
        var $dialog =$("#"+type+"_dialog");
        $dialog.dialog({
            autoOpen:false,
            modal : true,
            position:"top",
            open : function(event, ui) {
                $(".ui-dialog-titlebar-close").hide();
            }
        });
        $dialog.dialog().dialog("open");
        $dialog.draggable();
        $(".close","#"+type+"_dialog").click(function(){
            $dialog.dialog().dialog("close");
        });
    }
    Chat.prototype.createTr=function(data,tmpl,dom){
        var tr = document.createElement("tr");
        $.template("stringTMPL",tmpl);
        $(tr).html($.tmpl("stringTMPL", data));
        $(tr).appendTo(dom);
    }
    Chat.prototype.template=function($div,tmpl,data){
        var string = "template";
        $.template(string, tmpl);
        $div.html($.tmpl(string, data));
    }
    //设置每行显示多少个表情
    Chat.prototype.resetData=function(dataFaces,pre){
        var dataNew=[],length = dataFaces.length,dataNow=[];
        if(7==pre){
            dataNow = dataFaces;
        }else{
            $(dataFaces).each(function(i){
                var data = {};
                data["key"] = dataFaces[i];
                dataNow.push(data);
            });
        }
        var dataNowLength = Math.floor(length/pre)+1;
        for(var i=0;i<dataNowLength ;i++){
            var data = dataNow.slice(i*pre,pre*i+pre);
            dataNew.push(data);
        }
        return dataNew;
    }
    Chat.prototype.clear=function(){

    }
    module.exports = Chat;
});
