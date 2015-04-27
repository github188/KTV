/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-9
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    function Guard(callBck) {
        this.options = {};
        this.data={};
        this.listTmpl = ' <li class="off-line fix" id="${id}">'+
                                '<a href="#" target="_blank" title="${label},${price}金币">'+
                                    ' <span class="type"><i class="shsmall-icon"></i></span>'+
                                    '<span class="avatar"><img src="${src}" alt="" width="25" height="25"></span>'+
                                    '<span class="name">${label}</span>'+
                                '</a>'+
                            '</li>';
    }
    Guard.prototype.init=function(){

    }
    Guard.prototype.resetGuardList = function(data) {
       // var length = data.obj.guardInfoList.length;
        this.data = data.obj.guardInfoList;
        this.initOnline();
        this.setGuardList();
    }
    Guard.prototype.setGuardList =function(){
        var $guardList = $("#guardList");
        $guardList.empty();
        $.template("listTmpl", this.listTmpl);
        $guardList.html($.tmpl("listTmpl", this.data));
    }
    Guard.prototype.initOnline =function(){
        var self = this,online=0;
        var length = self.data.length;
        $.each(self.data,function(i){
            if("1" === self.data[i].expire){
                online++;
            }
        })
        $("#online").text(online);
        $("#all").text(length);
    }
        module.exports = Guard;
});

