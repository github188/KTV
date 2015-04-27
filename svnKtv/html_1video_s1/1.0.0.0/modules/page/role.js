/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-9
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    function Role(callBack) {
        this.options= {};
        this.roleType="user";
        this.callBack = callBack;
        this.ADD = false;
        //this.tabTmpl = '<li class=""><a href="#" class="roleType" id="${text}"><em>${text}</em><span>${number}</span></a></li>';
        this.listTmpl ='<li class="fix" id="${uin}" name="${nick}">'+
                            '<img src="${pic}" width="40" height="40" alt="${nick}"  title="${nick}"/>'+
                            '<p><a href="#">${nick}</a></p>'+
                            '<p id="post${uin}">'+
                           '</p>'+
                          '</li>';
        this.postTmpl = '<a href="#" title="${name}"><img src="${role_small_icon}"  height="18" /></a>'
        this.init();
        this.initLiClick();
    }
    Role.prototype.init=function(){
        var self = this;
        $("#roleTab").find("li").click(function(){
            $(this).addClass("on").siblings().removeClass("on");
            self.roleType= $(this).attr("id");
            var $type = $("#"+self.roleType+"List"), $li = $type.find("li");
            if($li.length<0){
                //self.callBack(self.roleType);
            }
            $type.show().siblings().hide();
        });
    }
    Role.prototype.resetUserList=function(data){
        var roles,add = data.op;
        switch(add){
            case "ADD":
                if(this.ADD){
                    this.length+=1;
                    roles = data.user;
                    this.userIn(roles);
                }
                break;
            case "MOD":
                //roles = data.user;
                break;
            case "DEL":
                roles = data.uin;
                this.userOut(roles);
                break;
            default:
                roles = data.list;
                this.renderList(roles);
                this.ADD =true;
                break;
        }
        if(!!roles){
            //this.renderList(roles);
        }
    }
    Role.prototype.renderList= function(roles){
        this.length = roles.length;
        var type=this.roleType;
        $("#"+type+"Num").text(this.length);
        var $list =$("#"+type+"List");
        this.template ($list,this.listTmpl,roles);
        this.renderPost(roles);
        this.initLiClick();
    }
    Role.prototype.renderPost=function(data){
        var self=this,roleInfo;
        $(data).each(function(i){
            roleInfo = data[i].roles_info;
            var $list =$("#post"+data[i].uin);
            self.template ($list,self.postTmpl,roleInfo);
        });
    }
    Role.prototype.renderAdd=function(data){
        var self=this,roleInfo;
            roleInfo = data.roles_info;
        var $list =$("#post"+data.uin);
            this.template ($list,this.postTmpl,roleInfo);
    }
    Role.prototype.initLiClick=function(){
        var self = this;
        $("#rolePanel").find("ul li").on("click",function(){
            $(this).addClass("currentRole").siblings().removeClass("currentRole");
            testInterface.callRoomView({key:"dealAndChat",value:{id: $(this).attr("id"),name:$(this).attr("name")}});
        });
    }
    Role.prototype.template=function($list,tmpl,data){
        $.template("string",tmpl);
        $list.html($.tmpl("string", data));
    }
    Role.prototype.userOut=function(id){
        var self =this,currentList = self.options.data;
        $("#"+id,"#userList").remove();
    }
    Role.prototype.userIn=function(data){
       var $userList=$("#userList");
        $("#"+this.roleType+"Num").text(this.length);
        $.template("userIn", this.listTmpl);
        var html = $.tmpl("userIn", data);
        $userList.append(html);
        this.renderAdd(data);
        //this.initLiClick();
    }
    module.exports = Role;
});

