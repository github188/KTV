/**
 * Created with JetBrains WebStorm.
 * Author: Why
 * Date: 14-1-9
 * Time: ����2:13
 * To change this template use File | Settings | File Templates.
 */
    //alert(3)
var header,sofa,role,rank,host,deal,guard,chatRoom,notice,showInfo,footer,controlFlash,flashPlayer;
define(function(require,exports,module){
    var $sofa = {data:[{id:"a",title:"当前有2个沙发",text:"上官小云"},{id:"b",title:"当前有8个沙发",text:"多情段公子"}]};
    require("../../app/src/css/userInfo.css");
    //室主房间信息???
    var Host = require ("page/host");
    host = new Host ();
    //player
    var FlashPlayer =  require("page/flash");
    flashPlayer = new FlashPlayer();
    //导航栏
    var Header = require ("page/header");
    header = new Header ();
    header.resetBase (parentData);
    header.resetImg("../../app/src/img/logo.jpg");
    //角色列表
    var Role = require ("page/role");
    role = new Role (parentData);
    //role.setMyId(parentData.uin||parentData.Uin);

    //swf动画控制器控制器
    var ControlFlash =  require("util/controlFlash");
    controlFlash = new ControlFlash();
    //聊天室???
    var ChatRoom = require ("page/chat");
    chatRoom = new ChatRoom();
    //chatRoom.resetChat($Chats,"public");
    //房间公告??
    var Notice = require ("page/notice");
    notice = new Notice ();
    //notice.resetNotice();
    //沙发
    var Sofa = require ("page/sofa");
    sofa = new Sofa();
    sofa.resetSofa($sofa);
    //排行???
    var Rank = require ("page/rank");
    rank = new Rank ();
    //rank.resetRankList($rank);
    //送礼、道具?????
    var Deal = require ("page/deal");
    deal = new Deal ();


    //系统广播???
    var ShowInfo = require ("page/showInfo");
    showInfo = new ShowInfo ();
    //showInfo.resetInfo($SystemNotice);
    //守护???
    var Guard = require ("page/guard");
    guard = new Guard ();
    //底部用户操作导航
    var Footer = require("page/footer");
    footer = new Footer();
});
/**
 * 服务器响应数据
 * @param data
 * @constructor
 */
function js_OnServerData(data){
    // chat.OnServerMessage(data);
    if(data.cmd != "CMD_ECHO") {
        if(data.cmd == "CMD_REQUESTUPMIC") {
            chat.SendToServer({cmd:"CMD_REQUESTUPMIC", bRequest:true, type:data.type, uin:data.uin, desuin:data.desuin, num:data.num});
        } else if(data.cmd == "MAINVIDEO" && "STATUS" == data.op) {
            if(data.mainVideo != null && data.mainVideo.uin != null) {
                mainVideoUin = data.mainVideo.uin;
            } else {
                mainVideoUin = null;
            }
        } else if(data.cmd == "SMALLVIDEO") {
            if(data.mic1 == null) {
                manage1VideoUin = null;
            } else {
                manage1VideoUin = data.mic1.uin;
            }

            if(data.mic2 == null) {
                manage2VideoUin = null;
            } else {
                manage2VideoUin = null;
            }
        }
        JSON.stringify(data,function(key,value){
            testInterface.view.render(value);

        })
    }
}
/**
 * 沙发模块
 * @constructor
 */
function OnSofa() {
    if(mainVideoUin == null) {
        alert("视频上没有人");
        return;
    }

    var num = document.getElementById("sofaNum").value;
    if(num == "" || num <= 0) {
        alert("抢沙发数量不对");
        return;
    }

    // var sofaid = document.getElementById("sofaID").value;
    // if(sofaid == "" || sofaid <= 0) {
    //     alert("抢沙发ID不对");
    //     return;
    // }

    var sofaindex = document.getElementById("sofaIndex").value;
    if(sofaindex == "" || sofaindex <= 0) {
        alert("沙发index不对");
        return;
    }

    var pkt = {
        cmd:"CMD_MOD"
    }
    pkt.msg = {
        cmd:"CMD_GIFT"
    }
    pkt.msg.msg = {
        cmd:"CMD_SOFA",
        msg:{
            id:"10475", // sofaid,
            num:num,
            des_uin:mainVideoUin,
            giftname:"抢沙发", //m_sofaObj.gifname,
            giftcmd:"10475",
            gifttype:1,
            RegionId:"1314",
            prayStr:"",
            groupName:"",
            index:sofaindex}
    }
    chat.SendToServer(pkt);
}
function js_OnLoginSuccess(data,brelogin){
    bLoginSucess = true;
    testInterface.selfUin = data.uin;
    var logTextArea = document.getElementById("chat_server");
    if(logTextArea)
        logTextArea.value = "登录成功:" + JSON.stringify(data) + "\n" + logTextArea.value;
}

function js_OnLogout(reason){
    bLoginSucess = false;
    var data = JSON.stringify(reason);
    alert("您的帐号在另一地址登陆！");
}

function js_OnLoginFail(data){
    // chat.LoginFail(data);
    bLoginSucess = false;
    console.log(data);
    var logTextArea = document.getElementById("chat_server");
    if(logTextArea)
        logTextArea.value = "登录失败:" + JSON.stringify(data) + "\n" + logTextArea.value;
}

function js_OnLogold(str){
    // chat.LogOld(str);
    bLoginSucess = false;
    var logTextArea = document.getElementById("chat_server");
    if(logTextArea)
        logTextArea.value = "被挤出房间:" + JSON.stringify(data) + "\n" + logTextArea.value;
}


function js_HttpBack(data, id) {
    chat.OnHttpRequestCallBack(data, id);
}

function OnLogoutClick() {
    if(bLoginSucess) {
        // testInterface.ReqLogout();
    } else {
        alert("请先登录");
    }
}

function OnReqGiftList() {
    if(bLoginSucess) {
        testInterface.ReqGiftList();
    } else {
        alert("请先登录");
    }
}

function OnReqStampList() {
    if(bLoginSucess) {
        testInterface.ReqStampList();
    } else {
        alert("请先登录");
    }
}

function OnReqEmotionList() {
    if(bLoginSucess) {
        testInterface.ReqEmotionList();
    } else {
        alert("请先登录");
    }
}

function OnReqGetCollectRoom() {
    if(bLoginSucess) {
        testInterface.ReqGetCollectRoom();
    } else {
        alert("请先登录");
    }
}

function OnReqCollectRoom() {
    if(bLoginSucess) {
        testInterface.ReqCollectRoom();
    } else {
        alert("请先登录");
    }
}

function OnReqColorBar() {
    if(bLoginSucess) {
        testInterface.ReqColorBar();
    } else {
        alert("请先登录");
    }
}

function OngetUserMessage() {
    if(bLoginSucess) {
        testInterface.getUserMessage();
    } else {
        alert("请先登录");
    }
}

function OnUpMic() {
    if(bLoginSucess) {
        var index = document.getElementById("videoIndex").value;
        if(index == "") {
            alert("填写视频index");
            return;
        }

        var uin = document.getElementById("videouser").value;
        if(uin == "") {
            alert("填写用户id");
            return;
        }

        if(0 == index) {
            chat.SendToServer({cmd:"MAINVIDEO", op:"UP", desuin:uin});
        } else if(1 == index || 2 == index) {
            chat.SendToServer({cmd:"SMALLVIDEO", op:"UP", index:index, desuin:uin});
        }
    } else {
        alert("请先登录");
    }
}

function OnDownMic() {
    if(bLoginSucess) {
        var index = document.getElementById("videoIndexdown").value;
        if(index == "") {
            alert("填写视频index");
            return;
        }

        var uin = document.getElementById("videouserdown").value;
        if(uin == "") {
            alert("填写用户id");
            return;
        }

        alert(mainVideoUin + "    " + manage1VideoUin + "    " + manage2VideoUin);
        if(0 == index) {
            if(mainVideoUin != null) {
                chat.SendToServer({cmd:"MAINVIDEO", op:"DOWN", desuin:mainVideoUin});
            }
        } else if(1 == index) {
            chat.SendToServer({cmd:"SMALLVIDEO", op:"DOWN", index:index, desuin:manage1VideoUin});
        } else if(2 == index) {
            chat.SendToServer({cmd:"SMALLVIDEO", op:"DOWN", index:index, desuin:manage2VideoUin});
        }
    } else {
        alert("请先登录");
    }
}

function sendto() {
    var uin = document.getElementById("talkto").value;
    if(uin == "") {
        alert("填写用户id");
        return;
    }

    var talktext = document.getElementById("talkText").value;
    if(talktext == "") {
        alert("没有聊天内容");
        return;
    }

    chat.SendToServer({cmd:"CHAT_TEXT", des_uin:uin, text:talktext, bSecret:false});
}

function OnSendGift() {
    var uin = document.getElementById("giftTo").value;
    if(uin == "") {
        alert("填写用户id");
        return;
    }

    var num = document.getElementById("giftNum").value;
    if(num == "") {
        alert("填写礼物数量");
        return;
    }

    var giftcmd = document.getElementById("giftCmd").value;
    if(giftcmd == "") {
        alert("填写礼物cmd");
        return;
    }

    var pkt = { cmd:"CMD_MOD" };
    pkt.msg = {
        cmd:"CMD_GIFT"
    }


    pkt.msg.msg = {
        cmd:"SEND_GIFT",
        // id:giftObj.ID,
        num:num,
        des_uin:uin,
        // des_nick:giftlogic.sendToUser.nick,
        // giftname:giftObj.PropsName,
        giftcmd:giftcmd,
        gifttype: 1,//giftObj.giftType,
        RegionId:"1314",
        prayStr:"",
        groupName:""
    };
    chat.SendToServer(pkt);
}



function OnGuard() {
    var num = document.getElementById("guardNum").value;
    if(num == "" || num <= 0) {
        alert("守护数量不对");
        return;
    }

    var uin = document.getElementById("VideoID").value;
    if(uin == "" || uin <= 0) {
        alert("守护对象不对");
        return;
    }

    var guardid = document.getElementById("guardID").value;
    if(guardid == "") {
        alert("守护id不对");
        return;
    }

    chat.SendToServer({cmd:"CMD_BUYGUARD", num:num, uin:uin, id:guardid});
}
function onload() {
    ad_core = swfobject.getObjectById("ad_core");
    if(!ad_core){
        alert("err");
        return;
    }
    //请求礼物列表
    testInterface.ReqGiftList();
    //表情列表
    testInterface.ReqEmotionList();
    //获取印章
    testInterface.ReqStampList();

    ad_core.flash_InitCore();
}