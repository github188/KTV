var ad_core,ad_video;
var bLoginSucess = false;
var mainVideoUin = null;
var manage1VideoUin = null;
var manage2VideoUin = null;
var testInterface = new testInterface();
var groupId = 20229998;
var roomId = 5880309;
var loginUrl = "ws://192.168.1.58:8365/client";
/*$(function(){
    roomId = parent.roomId;
    groupId = parent.groupId;
});*/
//房间视图层伪类对象
function roomView() {
      //this.session="03F6DA3E4F7716B2F3BE2142A691D800";;
     // this.selfUin= "20226538";;
}
roomView.prototype.callBack=function(data){
    switch(data.key){
        case "dealAndChat" :
            deal.setSendTo(data.value);
            chatRoom.resetReceiver(data.value);
            break;
        default:
            break;
    }
}
/**
 * 表情/印章数据
 * @param data
 */
roomView.prototype.chatFacesOrSeal=function(data){
    if("100" == data.Flag){
        chatRoom.roomViewCallChatRoom(data);
    }else{
        alert("网络连接错误");
    }
}
/**
 *
 * @param data
 */
roomView.prototype.callHost=function(data){
    console.log(data);
    host.isCollect(data);
}

/**
 * 礼物列表
 * @param data
 */
roomView.prototype.initGiftList=function(data){
    var self =this;
    if("100" == data.Flag){
        var giftList = data.Result;
        $.each(giftList ,function(k,v){
            deal.resetGiftList(k,v);
        });
    }
}
/**
 *
 * 登录模块
 * @param data 用户数据
 * @constructor
 */
roomView.prototype.OnLoginReqCallBack=function(data){
    if(data && data.Flag == 100) {
        this.selfUin = data.Uin;
        this.session = data.Token;
        header.resetBase ({Nick:data.Nick});
        header.closeDialog();
        testInterface.Login(loginUrl, this.selfUin, this.session, roomId,"", groupId);
    } else {
        alert("你输入的密码或账号错误");
        return;
    }
}
/**
 * view层数据渲染接口
 * @param data
 */
roomView.prototype.render=function(data){
    var key = data.cmd;
    switch(key){
        case "CMD_GATE_NAME" :
            break;
        case "SEND_ROOMINFO" :
            host.resetRoomInfo (data);
            break;
        case "SEND_SVRADDRINFO" :
            break;
        case "USERLIST" :
            role.resetUserList (data);
            break;
        case "MAINVIDEO" :
            host.isOnline(data);
            break;
        case "SMALLVIDEO" :
            console.log(data);
            break;
        case "CMD_DICE" :
            break;
        case "CMD_KMONEY" :
            deal.userMoney(data);
            break;
        case "CMD_MOD" :
            chatRoom.setMod(data.msg);
            break;
        case "CMD_ROOM_RANK_LIST" :
            rank.resetRankList(data);
            break;
        case "CMD_POPULAR" :
            break;
        case "CMD_ROOMINFO" :
            guard.resetGuardList(data);
            break;
        case "HORN" :
            chatRoom.resetChat(data.data,"horn");
            break;
        case "BROADCAST" :
            notice .resetNotice(data.data);
            break;
        case "SELF_SYSMSG" :
            chatRoom .resetChat(data.arr);
            break;
        case "SELF_SYSMSG_BroadCast" :
            showInfo .resetInfo(data.arr);
            break;
        default:
            break;
    }
}
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
    alert("js_OnLoginFail,消息称: "+data);
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
    //是否已经收藏房间
    testInterface.ReqCollectRoom();
    ad_core.flash_InitCore();
}