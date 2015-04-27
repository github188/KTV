/**
 * Created with JetBrains WebStorm.
 * Author: Why
 * Date: 14-1-9
 * Time: ����2:13
 * To change this template use File | Settings | File Templates.
 */
var header,sofa,role,rank,host,deal,guard,chatRoom,notice,showInfo,footer;


define(function(require,exports,module){
    var $user ={Nick:"~上官云",img:"",id:"(880258)",status:"0"};
    var $sofa = {data:[{id:"a",title:"当前有2个沙发",text:"上官小云"},{id:"b",title:"当前有8个沙发",text:"多情段公子"}]};

    //导航栏
    var Header = require ("page/header");
     header = new Header ();
     header.resetBase($user);
     header.resetImg("../../app/src/img/logo.jpg");
    //聊天室���
    var ChatRoom = require ("page/chat");
    chatRoom = new ChatRoom();
    //chatRoom.resetChat($Chats,"public");
    //房间公告��
    var Notice = require ("page/notice");
    notice = new Notice ();
    //notice.resetNotice();
    //沙发
    var Sofa = require ("page/sofa");
    sofa = new Sofa();
    sofa.resetSofa($sofa);
    //排行���
    var Rank = require ("page/rank");
    rank = new Rank ();
    //rank.resetRankList($rank);
    //送礼、道具�����
    var Deal = require ("page/deal");
    deal = new Deal ();
    //角色列表
    var Role = require ("page/role");
    role = new Role ();
    //室主房间信息���
    var Host = require ("page/host");
    host = new Host ();
    //系统广播���
    var ShowInfo = require ("page/showInfo");
    showInfo = new ShowInfo ();
    //showInfo.resetInfo($SystemNotice);
    //守护���
    var Guard = require ("page/guard");
    guard = new Guard ();
    //guard.resetGuardList($Guarders);
    //底部用户操作导航
    var Footer = require("page/footer");
    footer = new Footer();
});