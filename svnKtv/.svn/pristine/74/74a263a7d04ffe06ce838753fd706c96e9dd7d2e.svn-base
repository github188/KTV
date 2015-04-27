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
        this.init();
    }
    Footer.prototype.init = function(){
        var self = this;
         $(".foot","#footer").click(function(){
             var id = $(this).attr("id");
             self.requireCss(id);
             /*if(){

             }else{

             }*/
             self.initDialog(id) ;
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
    Footer.prototype.initSetClick = function(){
        var self = this;
        $(".setType").click(function(){
            $(this).addClass("current").siblings().removeClass("current");

        });
    }
    Footer.prototype.initDialog = function(id){
        var $dialog =$("#"+id+"_dialog");
        this.dialog = $dialog;
        $dialog.show();
        $("#textArea").val("");
        $dialog.draggable();
        $(".close","#"+id+"_dialog").click(function(){
            $dialog.hide();
        });
    }
       module.exports  = Footer;
});

