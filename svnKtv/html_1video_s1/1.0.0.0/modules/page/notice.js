/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-9
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    function Notice(callBack) {
        this.options = {};
        this.init();
        this.noticeTemplate = '<span><strong>(${nick})说：${str}</strong>速度来围观呀！<em id="broadTime"></em></span>';
    }
    Notice.prototype.init=function(){

    }
    Notice.prototype.resetNotice = function(notice) {
        var $notice = $("#broadCastNotice");
        $notice.empty();
        $.template("stringTMPL", this.noticeTemplate );
        $notice.append( $.tmpl("stringTMPL", notice));
    }

    module.exports = Notice;
});

