function serverMsgManager () {
	this.callbackObject = {};
	this.httpCallBackObject = {};
}

serverMsgManager.prototype.OnServerMessage = function(data) {
	if(this.callbackObject[data.cmd] != null) {
		var arr = this.callbackObject[data.cmd];
		for(var i = 0; i < arr.length; ++i) {
			var cb = arr[i].cb;
			var arg = arr[i].arg;
			cb.apply(arg, [data]);
		}
	}
}

serverMsgManager.prototype.SendToServer = function(pkt) {
	if(ad_core) {
		ad_core.flash_Send(pkt);
	} else {
		alert("ad_core is null");
	}
	
}

serverMsgManager.prototype.addMsgCallBack = function(str, cb, arg) {
	if(cb== null) {
		return;
	}

	if(this.callbackObject[str] == null) {
		this.callbackObject[str] = new Array();
	}

	this.callbackObject[str].push({cb:cb, arg:arg});
}

serverMsgManager.prototype.OnHttpRequestCallBack = function(data, id) {
	if(this.httpCallBackObject[id] != null) {
		var cb = this.httpCallBackObject[id].cb;
		var arg = this.httpCallBackObject[id].arg;
		cb.apply(arg, [data]);
	}
}


serverMsgManager.prototype.ReqGiftList =function(callback, arg) {
	this._reqAJX(10001,10027,10074,105,"client GetGift",{Tag:"PropsList",ImgType:"swf"},this.m_url,callback,"",null, "ReqGiftList", callback, arg);
}

serverMsgManager.prototype.ReqLogin = function(callback, arg) {
 	this._reqAJX(10004,10013,10090,101,"登陆",{"Tag":"UserLogin",Remember:false},this.m_url,callback,"",null,"ReqLogin", callback, arg);
}

serverMsgManager.prototype.ReqStampList = function(callback, arg) {
	this._reqAJX(10001,10027,10074,103,"client GetStamp",{Tag:"StampList"},this.m_url,callback,"",null,"ReqStampList",callback, arg);
}

serverMsgManager.prototype.ReqEmotionList = function(callback, arg) {
	this._reqAJX(10001,10027,10074,102,"client GetEmotimon",{Tag:"GetPhiz"},this.m_url,callback,"",null,"ReqEmotionList",callback, arg);
}

serverMsgManager.prototype.ReqLogout = function(callback, arg) {
	this._reqAJX(10004,10013,10090,102,"client EditNick",{Tag:"UserLogOut"},this.m_url,callback,"",null,"ReqLogout",callback, arg);
}

serverMsgManager.prototype.GetCollectRoom = function(callback, arg) {	// 是否已经收藏房间
	this._reqAJX(10001,10027,10074,102,"client GetEmotimon",{Tag:"GetNewPhiz"},this.m_url,callback,"",null,"GetCollectRoom", callback, arg);
}

serverMsgManager.prototype.ReqCollectRoom = function(callback, arg) {
	this._reqAJX(10004,10019,10574,102,"client collectionRoom",{Tag:"CollectRoom"},this.m_url,callback,"",null,"ReqCollectRoom", callback, arg);
}

serverMsgManager.prototype.ReqColorBar = function(callback, arg) {
	this._reqAJX(10001,10027,10074,104,"client GetClorBar",{Tag:"GetCaitiaoList"},this.m_url,callback,"",null, "ReqColorBar", callback, arg);
}

serverMsgManager.prototype.getUserMessage = function(callback, arg) {
	this._reqAJX(10001,10027,10072,104,"client SetUserInfo",{Tag:"GetUserInfo"},this.m_url,callback,"",null, "getUserMessage", callback, arg);
}


serverMsgManager.prototype._reqAJX = function(BigCaseId, CaseId, ParentId, ChildId, des, extparam, serUrl, callBack, type, targUin, callBackId, callback, arg) {
	
	if(!targUin){
		targUin = testInterface.selfUin;
	}

	var pkt = {
		param: {
			BigCaseId:BigCaseId,
			CaseId:CaseId,
			ParentId:ParentId,
			ChildId:ChildId,
			Uin:testInterface.selfUin,
			SessionKey:testInterface.session,
			GroupId:groupId,
			ChannelId:roomid,
			TargetUin:targUin,
			Client:"FLASH Client",
			DoingWeight:"1",
			MoneyWeight:"1",
			Desc:des
		},
		extparam:extparam
	};
	
	if(this.m_url == null) {
		this.m_url = getHost() + "/data/index.php";
	}
    console.log(pkt);
	this._httpRequest(pkt, callBackId, callback, arg);
}

serverMsgManager.prototype._httpRequest = function(data, id, callback, arg) {
	if(callback == null || ad_core == null) {
		return;
	}


	this.httpCallBackObject[id] = {cb:callback, arg:arg};

	ad_core.flash_HttpRequest(this.m_url, data, id);
}

//host "/data/index.php"