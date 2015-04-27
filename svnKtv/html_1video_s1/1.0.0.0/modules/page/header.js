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
        this.init();
        this.uin="";
        this.password="";
    }
    Header.prototype.init=function(){
        var self = this;
        self.initNav();
		self.hover();
    }
    Header.prototype.resetBase=function(data){
        var self = this;
        self.initStatus (data.status);
        $("#userName").text(data.Nick);
        $("#userId").text(data.id);
    }
    Header.prototype.resetImg = function(img) {
        var $img = $("#img",".logo");
        $img.attr("src",img);
    }
    Header.prototype.resetPing = function(data) {
    }
    Header.prototype.initStatus=function(status){
        switch(status){
            case "0":
                $("#changeUser").hide().siblings().show();
                break;
            default:
                $("#changeUser").show().siblings().hide();
                break;
        }
    }
    Header.prototype.initNav=function(){
        var self =this;
         $("subnavItem").click(function(){
            self.turnToId= $(this).attr("id");
        });
        $(".status").click(function(){
            var status= $(this).attr("id");
            self.dealStatus (status);
        });
    }
    Header.prototype.dealStatus=function(status){
        var self = this;
       switch(status){
           case "login":
           case "changeUser":
               self.showLogin();
               break;
           default:
                //注册
               break;
       }
    }
    Header.prototype.showLogin=function(){
        require("../../app/src/css/login.css");
        var self = this;
        $("#logon").dialog({
            modal : true,
            open : function(event, ui) {
                $(".ui-dialog-titlebar-close").hide();
            }
        });
        $("#logon").draggable ();
        $("#logon").dialog().dialog("open");
        self.login();
    }
    Header.prototype.login = function(){
        var self =this;
        $(".close").click(function(){
            $("#logon").dialog().dialog("close");
        });
        $(".btn").click(function(){
            var type = $(this).attr("id");
            switch(type){
                case "btn_log":
                    self.uin = $("#login_username").val();
                    self.password =$("#login_passWd").val();
                    if(!self.uin||!self.password){
                        alert("帐号或密码不能为空");
                        return;
                    }else{
                        testInterface.ReqLogin(self.uin ,self.password);
                    }
                    break;
                default:
                        testInterface.ReqLogin(self.uin ,self.password);
                    break;

            }
        });
    }
    Header.prototype.closeDialog=function(){
        $("#logon").dialog().dialog("close");
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
    Header.prototype.showOrHideSub = function(id,flag){
        var $subNav;
        switch(id){
            case "m":
                $subNav =$("#mm");
                break;
            case "n":
                $subNav =$("#nn");
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

