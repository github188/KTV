/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-9
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    function Host(callBck) {
        this.options = {};
        this.roomName="";
        this.roomId="";
        this.roomText="";
        this.videoFlag = true;
        this.collect = false;
        this.resetOrNot = true;
        this.info = $("#info");
        this.postTmpl = '<a style="padding:2 0px;" href="#" title="${name}"><img src="${role_small_icon}"  height="18" /></a>';
        this.init();
    }
    Host.prototype.init=function(){
        var self = this;
        $("#attention").click(function(){
            if(!bLoginSucess){
                alert("请您先登录");
                return;
            }
            require("../../app/src/css/message.css");
             if(self.collect){
                 testInterface.CancelCollectRoom ();
                 $("#collect_msg_p").text("取消收藏成功");
                 $("#attention").text("收藏");
                 self.collect = false;
             }else{
                 testInterface.ReqCollectRoom();
                 $("#collect_msg_p").text("收藏成功");
                 $("#attention").text("取消收藏");
                 self.collect = true;
             }
            $("#collect_Box").show();
            $("#btn_collect_dialog_close").click(function(){
                $("#collect_Box").hide();
            });
            $("#btn_collect_dialog_sure").click(function(){
                $("#collect_Box").hide();
            });
        })
    }
    Host.prototype.callBack=function(data){
        switch(data.FlagString){
            case"房间已收藏":
                $("#attention").text("取消收藏");
                this.collect = true;
                break;
            case"房间未收藏":
                $("#attention").text("收藏");
                this.collect = false;
                break;
            default:
                break;
        }
    }
    Host.prototype.isCollectOrCancel=function(key){

    }
    Host.prototype.resetRoomInfo=function(data){
       // $("#avatar_title").attr("title",data.id+"的房间");rolesImg,scoreNeeded
        var html = '<p class="us"><img src="./app/src/img/house.png " width="18" height="18" />&nbsp;&nbsp;'+ this.roomName +'('+ this.roomId +')'+'</p>';
            html += '<p style="margin-top:10px"><span style="padding:2 0px;" href="#" title="角色等级"><img src="'+ data["rolesImg"] +'"  height="18" /> </span><span style="color:white">&nbsp;&nbsp;距离下一等级需要</span><span style="color:#409ef7">'+ data["scoreNeeded"] +'</span><span style="color:white">积分</span></p>';
           this.info.html(html);
    }
    Host.prototype.resetTime=function(data){
         var start = new Date(parseInt(data.Start)),end=new Date(parseInt(data.End));
        $("#start").text(start.getHours()+":"+start.getMinutes()+":"+start.getSeconds());
        $("#end").text(end.getHours()+":"+end.getMinutes()+":"+end.getSeconds());
    }
    Host.prototype.resetInfo = function(data) {
        var template="",result=data["mainVideo"];
        if(result != null){
            $("#start").text(data["UpMicTimer"]);
            $("#avatar_img").attr("src",result["pic"]);
            this.roomName = result["nick"];this.roomId = result["uin"];
            $("#startP").show();
        }else{
            if(this.resetOrNot){
                this.roomId = data["roomid"];this.roomName = data["roomname"];
                result = {id:this.roomId,name:this.roomName};
                this.setNoActor(result);
                this.resetOrNot= false;
            }else{
               // return;
            }
        }
    }
    Host.prototype.setNoActor = function(data){
        var html='<p class="us"><img src="./app/src/img/house.png " width="18" height="18" />&nbsp;&nbsp;'+ data["name"] +'('+ data["id"] +')'+'</p>'+
                 '<p class="us"><img  src="./app/src/img/clock.png" width="14" height="15" />&nbsp;&nbsp;欢迎来到本房间，精彩节目即将开始！</p>'+
                 '<p class="us">当前无主播上麦</p>';
        this.html = html;
        this.setHtml();
    }
    Host.prototype.setHtml=function(){
        this.info.html(this.html);
        $("#startP").hide();
        $("#horseShow").hide();
        $("#avatar_img").attr("src","./app/src/img/8080.png");
    }
    Host.prototype.template = function(template,data){
    this.info .empty();
    $.template("template",template);
    this.info.html($.tmpl("template", data));
    }
    Host.prototype.isOnline = function(data){
        var key = data.op;
        switch(key){
            case "STATUS":
                    this.resetInfo(data);
                break;
            case "ADD":
                if(null != data.user){
                    //this.resetInfo(data);
                }
                break;
            case "LIST":
                console.log("LIST");
                break;
            default:
                break;
        }
    }
    Host.prototype.showDialog=function(flag){
        var text = "";
        if(flag){
            text = "成功";
        }else{
            text = "失败";
        }
        $("#info").text(text);
        $("#dialog").show();
       /* $("#dialog").dialog({
            title : '信息提示',
            modal : true,
            autoOpen : false,
            buttons :{
                "确认" : function(){
                    $(dialog).dialog().dialog("close");
                }
            },
            open : function(event, ui) {
                $(".ui-dialog-titlebar-close").hide();
            }
        });
        $("#dialog").dialog().dialog("open");*/
    }
    module.exports = Host;
});

