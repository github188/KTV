/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-9
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){

    function Sofa(options) {
        //this.callBack=callBack;
        this.options = {};
        //this.imgTmpl =  '<li  id="${id}"  class="site" style="width:79px; height:79px ;background-image: url(app/sofa.png)"  title="${title}"><a>${text}</a></li>';
        this.imgTmpl = '<div id="${id}" class="site" title="${title}"><a>${text}</a></div>'
        this.init();
    }
    Sofa.prototype.init=function(){
        var self = this;
            //self.setSofa(self.options.data);



    }
    Sofa.prototype.resetSofa=function(result){
        var self = this, $sofa = $("#sofas");
        var data = result.data;
        var length = data.length;
        if(length<5){
            var newLength = 5-length;
            for(var i= 0;i<newLength;i++){
               data.push({id:i,title:"当前有0个沙发",text:""});
            }
            self.template($sofa,this.imgTmpl,data);
            self.clickSofa ();
        }
    }
    Sofa.prototype.clickSofa=function(){
        var self = this;
        $("#sofas").find("div").click(function(){
            $("#seatNumber").val("");
            self.showDialog();
            self.ISOK ($(this).parent().attr("id"),parseInt($(this).attr("title").replace(/\D/g, "")));
        });
    }
    Sofa.prototype.showDialog=function(){
        var self=this;
        var dialog =  $("#dialog").dialog({
            title : '信息提示',
            autoOpen : false,
            open : function(event, ui) {
                $(".ui-dialog-titlebar-close").hide();
            }
        });
        dialog.dialog("open");
    }
    Sofa.prototype.ISOK=function(id,num){
        $("#seat").bind("click",function(){
            var number = $("#seatNumber").val();
            if(parseInt(number)>num){
                //回调
                //self.callBack(number);
                $("#dialog").dialog().dialog("close");
            }else{
                alert("所抢沙发数必须大于当前沙发数");
                return;
            }
        });
    }
    Sofa.prototype.template=function($div,tmpl,data){
        var string = "template";
        $.template(string, tmpl);
        $div.html($.tmpl(string, data));
    }
    module.exports = Sofa;
});

