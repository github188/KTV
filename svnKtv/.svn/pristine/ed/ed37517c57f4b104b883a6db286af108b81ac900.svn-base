function testInterface() {
	this.chat = new serverMsgManager();
}

testInterface.prototype.Login = function(url, uin, session, roomid, roompsd, groupid) {
	ad_core.flash_Login(url, uin, session, roomid, roompsd, groupid);
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
	chat.ReqEmotionList(this.OnEmotionListReqCallBack, this);
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
	if(obj && obj.Flag == 100) {
		this.selfUin = obj.Uin;
		this.session = obj.Token;

		ad_core.flash_Login(loginUrl, this.selfUin, this.session, roomid,"", groupId);
	} else {
		alert("你输入的密码或账号错误");
		return;
	}

	var logTextArea = document.getElementById("chat_Req");
	if(logTextArea)
		logTextArea.value = "获取session返回:" + data + "\n" + logTextArea.value;
}

testInterface.prototype.OnGiftListReqCallBack = function(data) {
	var logTextArea = document.getElementById("chat_Req");
	if(logTextArea)
		logTextArea.value = "获取礼物列表返回:" + data + "\n" + logTextArea.value;
}

testInterface.prototype.OnStampListReqCallBack = function(data) {
	var logTextArea = document.getElementById("chat_Req");
	if(logTextArea)
		logTextArea.value = "获取印章列表返回:" + data + "\n" + logTextArea.value;
}

testInterface.prototype.OnEmotionListReqCallBack = function(data) {
	var logTextArea = document.getElementById("chat_Req");
	if(logTextArea)
		logTextArea.value = "获取表情列表返回:" + data + "\n" + logTextArea.value;
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

testInterface.prototype.OnColorBarReqCallBack = function(data) {
	var logTextArea = document.getElementById("chat_Req");
	if(logTextArea)
		logTextArea.value = "获取彩条列表返回:" + data + "\n" + logTextArea.value;
}

testInterface.prototype.OngetUserMessageCallBack = function(data) {
	var logTextArea = document.getElementById("chat_Req");
	if(logTextArea)
		logTextArea.value = "获取用户个人信息返回:" + data + "\n" + logTextArea.value;
}
