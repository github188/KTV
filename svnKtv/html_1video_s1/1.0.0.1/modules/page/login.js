/**
 * Created with JetBrains WebStorm.
 * User:Why
 * Date: 14-1-14
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    function Login(callBack) {
        this.callBack=callBack;
        this.init();
    }
    Login.prototype.init=function(){
        var self = this;
        $("#btn-log").click(function(){
            self.setParam ();
        })
    }
    Login.prototype.setParam=function(){
        var userName = $(".username").val();
        var passWd = $(".passwd").val();
    }
    module.exports = Login;
});

