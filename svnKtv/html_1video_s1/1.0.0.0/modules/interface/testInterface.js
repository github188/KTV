var chat = new serverMsgManager();
function testInterface() {
    this.view = new roomView ();
}

testInterface.prototype.Login = function(url, uin, session, roomid, roompsd, groupid) {
	ad_core.flash_Login(url, uin, session, roomid, roompsd, groupid,"std");
}

testInterface.prototype.ReqLogin = function(uin, psd) {
	var password = hex_md5(psd);
    testInterface.selfUin = uin;
    testInterface.session = password;
    chat.ReqLogin(this.OnLoginReqCallBack, this);
}

testInterface.prototype.ReqGiftList = function() {
	chat.ReqGiftList(this.OnGiftListReqCallBack, this);
}

testInterface.prototype.ReqStampList = function() {
	chat.ReqStampList(this.OnStampListReqCallBack, this);
}

testInterface.prototype.ReqEmotionList = function() {
	chat.ReqEmotionList(this.chatFacesCallBack, this);
}

testInterface.prototype.ReqLogout =function() {
	chat.ReqLogout(this.OnLogoutReqCallBack, this);
}

testInterface.prototype.ReqGetCollectRoom = function() {	// 是否已经收藏房间
	chat.GetCollectRoom(this.OnGetCollectRoomReqCallBack, this);
}

testInterface.prototype.ReqCollectRoom = function() {
	chat.ReqCollectRoom(this.OnCollectRoomReqCallBack, this);
}

testInterface.prototype.ReqColorBar = function() {
	chat.ReqColorBar(this.OnColorBarReqCallBack, this);
}

testInterface.prototype.getUserMessage = function() {
	chat.getUserMessage(this.OngetUserMessageCallBack, this);
}

testInterface.prototype.OnLoginReqCallBack = function(data) {
	var obj = JSON.parse(data);
    this.view.OnLoginReqCallBack (obj);
}
testInterface.prototype.chatFacesCallBack = function(data) {
    var obj = JSON.parse(data);
    this.view.chatFacesOrSeal (obj);
}
testInterface.prototype.OnGiftListReqCallBack = function(data) {
    var obj = JSON.parse(data);
    this.view.initGiftList (obj);
}
testInterface.prototype.callRoomView = function(data) {
    this.view.callBack (data);
}
testInterface.prototype.sendGift = function(data) {
    chat.SendToServer (data);
}

testInterface.prototype.OnStampListReqCallBack = function(data) {
    var obj = JSON.parse(data);
    this.view.chatFacesOrSeal(obj);
}
testInterface.prototype.sendBroadcast = function(pkt) {
    chat.SendToServer(pkt);
}
testInterface.prototype.ReqCollectRoom = function() {
    chat.ReqCollectRoom(this.ReqCollectRoomCallBack, this);
}
testInterface.prototype.ReqCollectRoomCallBack = function(data) {
    var obj = JSON.parse(data);
    this.view.callHost(obj);
}
testInterface.prototype.OnColorBarReqCallBack = function(data) {
    var obj = JSON.parse(data);
    this.view.chatFacesOrSeal(obj);
}
testInterface.prototype.OnLogoutReqCallBack = function(data) {
	var logTextArea = document.getElementById("chat_Req");
	if(logTextArea)
		logTextArea.value = "登出返回:" + data + "\n" + logTextArea.value;
}

testInterface.prototype.OnGetCollectRoomReqCallBack = function(data) {
	var logTextArea = document.getElementById("chat_Req");
	if(logTextArea)
		logTextArea.value = "是否收藏房间返回:" + data + "\n" + logTextArea.value;
}

testInterface.prototype.OnCollectRoomReqCallBack = function(data) {
	var logTextArea = document.getElementById("chat_Req");
	if(logTextArea)
		logTextArea.value = "收藏房间返回:" + data + "\n" + logTextArea.value;
}


testInterface.prototype.OngetUserMessageCallBack = function(data) {
	var logTextArea = document.getElementById("chat_Req");
	if(logTextArea)
		logTextArea.value = "获取用户个人信息返回:" + data + "\n" + logTextArea.value;
}

