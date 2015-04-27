/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-9
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    function Footer(){
        this.dialog;
        this.inputFlag=true;
        this.isHD="";
        this.mic="";
        this.cam="";
        this.init();
    }
    Footer.prototype.init = function(){
        var self = this;
         $(".footNow","#footer").click(function(){
             var id = $(this).attr("id");
             self.requireCss(id);
             self.initDialog(id) ;
         });
        $("#btn_ca_sure").click(function(){
            self.isHD = $("#isHDOrNot").is(":checked");
            self.mic = $("#micListAll option:selected").text();;
            self.cam = $("#camListAll option:selected").text();
            $("#foot_set_dialog").hide();
        });
        $("#btn_ca_cancel").click(function(){
            $("#foot_set_dialog").hide();
        });
        $("#btn_te_sure").click(function(){
            $("#foot_set_dialog").hide();
        });
        $("#btn_te_cancel").click(function(){
            $("#foot_set_dialog").hide();
        });
        $("#textArea").keyup(function(){
           var value = $("#textArea").val(),length=value.length;
            if(length>50){
                $("#textArea").val(value.substring(0,50));
            }else{
                $("#nowLength").text(length);
                $("#nextLength").text(50-length);
            }
        });
    }
    Footer.prototype.requireCss = function(id){
        switch(id){
            case "foot_manage":
                require("../../app/src/css/foot_manage.css");
                break;
            case "foot_set":
                require("../../app/src/css/foot_set.css");
                this.initSetClick ();
                break;
            case "foot_broadcast":
                require("../../app/src/css/foot_broadcast.css");
                this.initBroadCastClick ();
                break;
            default:
                require("../../app/src/css/foot_invite.css");
                require("../util/share.js");
                break;
        }
    }
    Footer.prototype.initBroadCastClick = function(){
        var self = this, pkt = {},type;
        $("#btn_publish").one("click",function(){
            type = $("input[name='broadType']:checked").val();
            if("horn" == type){
                pkt.cmd = "CMD_SEND_HORN";
            }else{
                pkt.cmd = "CMD_SEND_BROADCAST";
            }
            var str = $("#textArea").val();
            pkt.str = str;
            testInterface.sendBroadcast(pkt);
            self.dialog.hide();
        });
    }
    Footer.prototype.isManager = function(type){
        this.myType = type;
        if("0" != this.myType){
            $("#foot_manage").attr("style","display:block")
        }else{
            $("#foot_manage").attr("style","display:none")
        }
    }
    Footer.prototype.initSetClick = function(){
        var self = this;
        $(".setType").click(function(){
            $(this).addClass("current").siblings().removeClass("current");
             var name = $(this).attr("name");
            $("#"+name).show().siblings().hide();
        });
    }

    Footer.prototype.setMicList = function(data){
        var $dom = $("#micListAll");
        this.createOption ($dom,data);

    }
    Footer.prototype.setCamList = function(data){
        var $dom = $("#camListAll");
        this.createOption ($dom,data);
    }
    Footer.prototype.createOption = function($dom,data){
        $.each(data,function(k,v){
            var option = document.createElement("option");
            $(option).attr("value",k);
            $(option).text(v);
            $(option).appendTo($dom);
        });
    }
    Footer.prototype.initDialog = function(id){
        var $dialog =$("#"+id+"_dialog");
        this.dialog = $dialog;
        $dialog.show();
        $("#textArea").val("");
        $("#nowLength").text(0);
        $("#nextLength").text(50);
       $dialog.draggable();
        $(".close","#"+id+"_dialog").click(function(){
            $dialog.hide();
        });
    }
       module.exports  = Footer;
});

