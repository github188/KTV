/**
 * Created with JetBrains WebStorm.
 * User:Why
 * Date: 14-1-14
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    function Header() {
        this.options = {};
        this.turnToId="";
        this.uin="";
        this.status="";
        this.password="";
        this.myId="";
        this.ping ="";
        this.myType="";
        this.callHost=false;
        this.diceSure = false;
        this.diceBtnSureFlag = "";
        this.postTmpl = '<a style="padding:0 2px;" href="#" title="${name}"><img src="${role_small_icon}"height="18"/></a>'
        this.init();
    }
    Header.prototype.init=function(){
        this.initNav();
        this.hover();
        this.userInfo();
        this.controlChange();
        this.initSaZi();
        this.initSetChat();
        this.initChangeNickBox();
    }
    Header.prototype.resetBase=function(data){
        this.myId = data.uin||data.Uin;
        this.ping = data.Ip||"172.168.1.245";
        if(this.myId == ""){
            this.status="0";
        }else{
            this.status="1";
        }
        if(this.callHost){

        }else{
            host.resetInfo(data);
            this.callHost = true;
        }

        flashPlayer.resetMyId(this.myId);
        var self = this;
        self.initStatus ();
        this.myNick = data.Nick;
        $("#userName").text(data.Nick);
    }
    Header.prototype.isManager=function(type){
        this.myType = type;
    }
    Header.prototype.resetMyInfoDiv=function(data){
        var roles = data["roles_info"],name=data["nick"],id=data["uin"],lNum=data["lNum"]||"无",pic=data["pic"],gender=data["gender"],genderText="";
        if("0" == gender){
            genderText = "女";
        }else{
            genderText = "男";
        }
        var basic =  '<p class="blue" id="myNick">'+ name +'</p>'+
            '<p>用户码：'+ id +'</p>'+
            '<p>靓号：'+ lNum +'</p>'+
            '<p>性别：'+ genderText +'</p>'+
            '<p>生日：保密</p>';
        $("#myInfoDiv").empty();
        $("#myInfoDiv").append(basic);
        $("#myPic").attr("src",pic);
        var html = "";
        $(roles).each(function(i){
            var role = roles[i];
            html+= '<a style="padding:0 2px;" href="#" title="'+ role["name"] +'"><img src="'+ role["role_small_icon"] +'"height="18"/></a>';
        });

        $("#myLevel").empty();
        $("#myLevel").html(html);
    }
    Header.prototype.resetImg = function(img) {
        var $img = $("#img",".logo");
        $img.attr("src",img);
    }
    Header.prototype.resetPing = function(data) {
    }
    Header.prototype.initStatus=function(){
        $("#ping").attr("title",this.ping);
        switch(this.status){
            case "0":
                $("#changeUser").show().hide();
                $("#logout").show().hide();
                $("#login").hide().show();
                $("#register").hide().show();
                break;
            default:
                $("#changeUser").hide().show();
                $("#logout").hide().show();
                $("#login").show().hide();
                $("#register").show().hide();
                break;
        }
    }
    Header.prototype.initNav=function(){

        var self =this;
         $(".itemW","#mm").click(function(){
            self.turnToId= $(this).attr("id");
             //self.showOrHideSub("m",false);
             self.dealStatus (self.turnToId);
        });
        $(".status").click(function(){
            var status= $(this).attr("id");
            self.dealStatus (status);
        });
    }
    Header.prototype.dealStatus=function(status){
       switch(status){
           case "login":
           case "changeUser":
               this.showLogin();
               break;
           case "logout":
               testInterface.ReqLogout();
               break;
           case "chatSet":
               require("../../app/src/css/chatSet.css");
               $("#chatSetBox").show();
               //$("#chatSetBox").draggable();
               break;
           case "saZiSet":
           require("../../app/src/css/dice.css");
           $("#saZiSetBox").show();
          // $("#saZiSetBox").draggable();
           break;
           case "changeN":
               require("../../app/src/css/changeNick.css");
               $("#changeNickBox").show();
              // $("#changeNickBox").draggable();
               break;
           default:
                //注册
               break;
       }
    }
    Header.prototype.initSaZi=function(){
        var self = this;
        $("#openControl","#saZiSetBox").on("click",function(){
            self.diceSure = true;
            this.diceBtnSureFlag  = $("#openControl").attr("checked");
            if(typeof(self.diceBtnSureFlag) == "undefined"|| self.diceBtnSureFlag==false){
                $("#openControl").attr("checked",true);
                self.diceBtnSureFlag = true;
                $(".controlW","#saZiSetBox").attr("disabled",false);
            }else{
                $(".controlW","#saZiSetBox").attr("disabled",true);
                $("#openControl").attr("checked",false);
                self.diceBtnSureFlag = false;
            }
        });
        $(".dealSaZi").click(function(){
             var id = $(this).attr("id");
            switch(id){
                case "btn_saZi_close":
                case "btn_saZi_cancel":
                    break;
               default:
                   self.diceBtnSure();
                    break;
            }
            $("#saZiSetBox").hide();
        });
    }

    Header.prototype.initChangeNickBox=function(){
        var self = this;
        $(".dealChangeNick").click(function(){
            var id = $(this).attr("id");
            switch(id){
                case "btn_changeNick_close":
                    break;
                default:
                    self.changeNickBtnSure();
                    break;
            }
            $("#changeNickBox").hide();
        });
    }
    Header.prototype.initSetChat=function(){
        var self = this;
        $(".dealSetChat").click(function(){
            var id = $(this).attr("id");
            switch(id){
                case "btn_setChat_close":
                case "btn_setChat_cancel":
                    break;
                default:
                    self.chatBtnSure();
                    break;
            }
            $("#chatSetBox").hide();
        });
    }
    Header.prototype.chatBtnSure=function(){
        var pkt = {};
        pkt.guestPublic = $("#guestPublic").is(":checked") == true?1:0;
        pkt.guestPrivate = $("#guestPublic").is(":checked") == true?1:0;
        pkt.userPublic= pkt.guestPublic;
        pkt.userPrivate=pkt.guestPrivate;
        pkt.cmd ="CMD_SEND_CHATPERMIT";
        pkt.chatTimeSet=$("#chatTimeSet").is(":checked") == true?1:0;
        pkt.chatTime=$("#chatTime").val();
        console.log(pkt);
        testInterface.chatSet(pkt);
    }
    Header.prototype.changeNickBtnSure=function(){
       var newNick = $("#changeNick").val();
        var pkt={};
        if(""==newNick){
            alert("请先输入昵称");
        }else if(this.myNick == newNick){
            alert("您的昵称没有变化");
        }else{
            this.myNick =newNick;
            testInterface.changeNick(newNick);
        }
    }
    Header.prototype.roomViewCallHeader=function(){
        var newNick = $("#changeNick").val();
        var pkt={};
            pkt.cmd="CMD_MODNICK";
            pkt.nick=newNick;
        testInterface.changeNewNick(pkt);
    }
    Header.prototype.callChangeNick=function(nick){
        $("#userName").text(nick);
        $("#myNick").text(nick);
    }
    Header.prototype.diceBtnSure=function(){
        var pkt = {},msg = this.diceMsg;
        msg.masteruin = this.myId ;
        pkt.cmd = "CMD_DICE";
        if(this.diceSure){
            if(this.diceBtnSureFlag){
                msg.type = $("input:radio:checked","#saZiSetBox").attr("value");
            }else{
                msg.type = "0";
            }
            msg.num = $("#diceNum","#saZiSetBox").val();
            msg.tim =  $("#diceTim").attr("value");

        }else{
            pkt.msg = msg;
        }
        pkt.op="ROLL";
        testInterface.callRoomView ({key:"diceSet",value:pkt});
    }
    Header.prototype.setDice=function(data){
        this.diceMsg  = data.msg;
        var type = this.diceMsg.type;
        $("input:radio[value="+ this.diceMsg.status +"]","#saZiSetBox").attr('checked','true');
        $("#diceNum","#saZiSetBox").attr("value",this.diceMsg.num);
        $("#diceTim").attr("value",this.diceMsg.tim);
        switch(type){
            case "2":
                $("#openControl").attr("checked","checked");
                $(".control"+type).attr("checked","checked");
                $(".controlW"+type).attr("disabled",false);
                $(".controlW1").attr("disabled",true);
                break;
            case "1":
                $("#openControl").attr("checked","checked");
                $(".control"+type).attr("checked","checked");
                $(".controlW"+type).attr("disabled",false);
                $(".controlW2").attr("disabled",true);
                break;
            default://不启用规则
                $(".controlW","#saZiSetBox").attr("disabled",true);
                $("#openControl").removeAttr("checked");
                break;
        }
    }
    Header.prototype.controlChange=function(){
        $("input:radio[name='rule']","#saZiSetBox").change(function() {
            var value = $(this).attr("value");
            $(".controlW"+value).attr("disabled",false);
            switch(value){
                case "1"://规则1
                    $(".controlW2").attr("disabled",true);
                    break;
                default://规则2
                    $(".controlW1").attr("disabled",true);
                    break;
            }
        })
    }
    Header.prototype.showLogin=function(){
        var self = this;
        require("../../app/src/css/login.css");
        $("#logon").show();
        self.login();
    }
    Header.prototype.login = function(){
        var self =this;
        $(".close").click(function(){
            $("#logon").hide();
        });
        $("#btn_log").one("click",function(){
            self.uin = $("#login_username").val();
            self.password =$("#login_passWd").val();
            if(!self.uin||!self.password){
                alert("帐号或密码不能为空");
                return;
            }else{
                self.closeDialog();
                this.myId="";
                this.myType ="0";
                testInterface.ReqLogin(self.uin ,self.password);
            }
        });
    }
    Header.prototype.closeDialog=function(){
        $("#logon").hide();
    }
    Header.prototype.hover = function() {		 
        var self = this,id="";
		var item = $(".navItem","#header");
        $('.navItem').mouseover(function(){										
            id = $(this).attr("id");
            self.showOrHideSub(id,true);
        }).mouseleave(function() {
            self.showOrHideSub(id,false)
        });
    }
    Header.prototype.userInfo = function() {

       /* $('#myName').mouseover(function(){
            $("#myInfo").show();
        });*/
    }

    Header.prototype.showOrHideSub = function(id,flag){
        var $subNav;
        switch(id){
            case "m":
                $subNav =$("#mm");
                if("1" == this.myType){
                    $(".xxYy").show();
                }else{
                    $(".xxYy").hide();
                }

                break;
            case "myName":
                $subNav =$("#myInfo");
                break;
            default:
                return;
        }
        if(flag){
            $subNav.show();
        }else{
            $subNav.hide();
        }
    }
    module.exports = Header;
});

