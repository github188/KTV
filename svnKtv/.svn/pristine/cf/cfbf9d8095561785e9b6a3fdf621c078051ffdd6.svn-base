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
        this.collect = false;
        this.info = $("#info");
        this.onLineTmpl = '<p class="us"><img src="./app/src/img/house.png " width="26" height="18" />&nbsp;&nbsp;${name}(${id})</p>'+
            '<p class="us"><img src="${levelSrc}" width="26" height="18" />&nbsp;&nbsp;距下一级还差<em>${integral}</em>积分</p>'+
            '<p class="us"><img src="${richSrc}" width="35" height="18" />&nbsp;&nbsp;距下一级还差<em>${rich}</em>积分</p>';

        this.outLineTmpl = '<p class="us"><img src="/app/src/img/house.png " width="26" height="18" />&nbsp;&nbsp;${name}(${id})</p>'+
                             '<p class="us"><img src="" width="35" height="18" />&nbsp;&nbsp;欢迎来到本房间，精彩节目即将开始</p>'+
                             '<p class="us">当前无主播上麦~</p>';
        this.init();
    }
    Host.prototype.init=function(){
        var self = this;
        $("#attention").click(function(){
             if(this.collect){

             }else{

             }
        })
        $("#stow").click(function(){

        })
    }
    Host.prototype.isCollect=function(data){
        if("已经收藏过该房间" === data.FlagString){
            $("#attention").text("已收藏");
            this.collect = true;
        }else{
            $("#attention").text("收藏");
            this.collect = false;
        }
    }
    Host.prototype.resetRoomInfo=function(data){
        $("#avatar_title").attr("title",data.id+"的房间");
        $("#avatar_img").attr("src",data.bgUrl);
        this.roomId=data.id;this.roomName = data.name;
    }
    Host.prototype.resetTime=function(data){
        var start = new Date(parseInt(data.Start)),end=new Date(parseInt(data.End));
        $("#start").text(start.getHours()+":"+start.getMinutes()+":"+start.getSeconds());
        $("#end").text(end.getHours()+":"+end.getMinutes()+":"+end.getSeconds());
    }
    Host.prototype.resetInfo = function(data) {
        var template="",result;
        if(data){
            $(".us").show();
            result = data;
            template=this.onLineTmpl;
        }else{
            $(".us").hide();
            result = {id:this.roomId ,name:this.roomName};
            template=this.outLineTmpl;
        }
        this.template (template,result);
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
                if(null == data.mainVideo){
                    this.resetInfo();
                }
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
        $("#dialog").dialog({
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
        $("#dialog").dialog().dialog("open");
    }
    module.exports = Host;
});

