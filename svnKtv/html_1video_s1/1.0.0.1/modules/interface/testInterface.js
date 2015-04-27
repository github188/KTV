var chat = new serverMsgManager();
function testInterface() {
    this.view = new roomView ();
}
testInterface.prototype.Login = function(url, uin, session, roomid, roompsd, groupid) {
	ad_core.flash_Login(url, uin, session, roomid, roompsd, groupid,"std");
}
testInterface.prototype.myManagerDeal=function(pkt){
    ad_core.flash_Send(pkt);
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
	chat.ReqLogout(this.OnLogoutReqCallBack, {self:this,type:"ReqLogout"});
}
testInterface.prototype.ReqGetCollectRoom = function() {	// 是否已经收藏房间
	chat.GetCollectRoom(this.GetCollectRoomCallBack, {self:this,type:"GetCollectRoom"});
}
testInterface.prototype.CancelCollectRoom = function() {
    chat.CancelCollectRoom(this.CancelCollectRoomCallBack ,{self:this,type:"CancelCollectRoom"});
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
testInterface.prototype.sendGift = function(data) {
    chat.SendToServer (data);
}
testInterface.prototype.getCars = function(data) {
    chat.SendToServer(data);
}
testInterface.prototype.sendColorBar = function(data) {
    chat.SendToServer (data);
}
testInterface.prototype.talkTo = function(data) {
    chat.SendToServer (data);
}
testInterface.prototype.sendStamp = function(data) {
    chat.SendToServer (data);
}
testInterface.prototype.sendBroadcast = function(pkt) {
    chat.SendToServer(pkt);
}
testInterface.prototype.sendDice = function(pkt) {
    chat.SendToServer(pkt);
}
testInterface.prototype.callFlashPlay = function(pkt) {
    chat.SendToServer(pkt);
}
testInterface.prototype.changeNewNick = function(data) {
    chat.SendToServer (data);
}
testInterface.prototype.chatSet = function(data) {
    chat.SendToServer (data);
}
testInterface.prototype.ReqCollectRoom = function() {
    chat.ReqCollectRoom(this.ReqCollectRoomCallBack,{self:this,type:"ReqCollectRoom"});
}
testInterface.prototype.changeNick = function(nick) {
    chat.changeNick(this.ReqChangeNickCallBack,this,nick);
}
testInterface.prototype.OnLoginReqCallBack = function(data) {
    var obj = JSON.parse(data);
    this.view.OnLoginReqCallBack (obj);
}
testInterface.prototype.ReqChangeNickCallBack = function(data) {
    var obj = JSON.parse(data);
    this.view.callNick(obj);
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
testInterface.prototype.OnStampListReqCallBack = function(data) {
    var obj = JSON.parse(data);
    this.view.chatFacesOrSeal(obj);
}
testInterface.prototype.GetCollectRoomCallBack = function(data) {
    var obj = JSON.parse(data);
    this.self.view.callHost (obj);
}
testInterface.prototype.CancelCollectRoomCallBack = function(data) {
    var obj = JSON.parse(data);
    this.self.view.callHost (obj);
}
testInterface.prototype.ReqCollectRoomCallBack = function(data) {
    var obj = JSON.parse(data);
    this.self.view.callHost(obj);
}
testInterface.prototype.OnColorBarReqCallBack = function(data) {
    var obj = JSON.parse(data);
    this.view.chatFacesOrSeal(obj);
}
testInterface.prototype.callOther =function(type){
    footer.isManager(type);
    chatRoom.isManager(type);
    header.isManager(type);
}
testInterface.prototype.OnLogoutReqCallBack = function(data) {
console.log(data);
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

