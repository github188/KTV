/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-9
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */
var player1;
define(function(require, exports, module){
    function Flash(callBack) {
        this.upOrDown=true;
        this.height="";
        this.width="";
        this.main="";
        this.myId="";
        this.svrInfo=[];
        this._rtmpAddr="";
        this._rtmpLive="live";
        this._rtmpPort="";
        this._rtmpArea = "杭州";
        this.initCollectFlag = true;
        this.init();
    }
    Flash.prototype.init=function(){
        this.initFlash();
        this.setParam();
        this.initClick();
    }
    Flash.prototype.setParam=function(){
        this. _camIndexArray = [];
        this._micIndexArray = [];
        this._audioCodecList = document.getElementById("audioCodecList");
        this._videoCodecList = document.getElementById("videoCodecList");
        this._micList = document.getElementById("micList");
        this._camList = document.getElementById("camList");
        this._isUseCam = document.getElementById("isUseCam");
        this._isUseMic = document.getElementById("isUseMic");
        this._isHD = document.getElementById("isHD");
        this._isUDP = document.getElementById("isUDP");
        this._schedulingPing = document.getElementById("schedulingPing");
        this._limitCheckPing = document.getElementById("limitCheckPing");
        this._checkPingTimer = document.getElementById("checkPingTimer");
        this._userID = document.getElementById("userID");
        this._session = document.getElementById("session");
        this._audioKBitrate = document.getElementById("audioKBitrate");
        this._audioSamplerate = document.getElementById("audioSamplerate");
        this._videoFPS = document.getElementById("videoFPS");
        this._videoKeyFrameInterval = document.getElementById("videoKeyFrameInterval");
        this._videoKBitrate = document.getElementById("videoKBitrate");
        this._videoQuality = document.getElementById("videoQuality");
        this._volume = document.getElementById("volume");
        this._isMute = document.getElementById("isMute");
        this._clientVersion = document.getElementById("clientVersion");
        this._flashVersion = document.getElementById("flashVersion");
        this._lowestSupportHQVersion = document.getElementById("lowestSupportHQVersion");
        this._HQVersion = document.getElementById("HQVersion");
        this._serverVersion = document.getElementById("serverVersion");
        this._currentServer = document.getElementById("currentServer");
        this._changeServerList = document.getElementById("changeServerList");
        this._bufferTime = document.getElementById("bufferTime");
        this._speedupRange = document.getElementById("speedupRange");
        this._speedupTime = document.getElementById("speedupTime");
        this._speedupSpeed = document.getElementById("speedupSpeed");
        this._avgPing = document.getElementById("avgPing");
        this._audioChannelCount = document.getElementById("audioChannelCount");
        this._audioBitPerSample = document.getElementById("audioBitPerSample");
        this._displayWidth = document.getElementById("displayWidth");
        this._displayHeight = document.getElementById("displayHeight");
        this._isReceiveAudio = document.getElementById("isReceiveAudio");
        this._isReceiveVideo = document.getElementById("isReceiveVideo");
    }
    Flash.prototype.resetMyId=function(id){
        this.myId = id;
    }
    Flash.prototype.initParam=function(data){
        this.main = data["main"];//主视频
        this.svrInfo = data["svrInfo"];
        this.setAddAndPort(this.svrInfo);
    }
    Flash.prototype.setAddAndPort=function(data){
        var self = this;
          $(data).each(function(i){
              var key = data[i]["name"],value=data[i]["addr"],port=data[i]["port"];
              switch(key){
                  case "roomServer":
                      self._rtmpAddr = value;
                      self._rtmpPort = port;
                      break;
                  case "_assistServerPort":
                      break;
                  default:
                      break;
              }
          });
    }
    Flash.prototype.initFlash=function(){
        var self= this;
        //var width = $("#playerNow").css("width")||330,height = $("#playerNow").css("height")||240;
        player1 = new Video( "myPlayer",	//名称必须与 DIV id 一致，否则无法显示视频
            (450),
            (330),
            function(type, info){
                switch(type){
                    case RTMP_MEDIA_INFO:

                        switch(info){
                            case "Svr.Version.Success":
                                self._serverVersion.value = player1.getServerVersion();
                                break;
                            case "NetConnection.Connect.Success":
                            case "ChangeInfo.NetConnection.Connect.Success":
                            case "new connect":
                                this._currentServer.value = player1.getCurrentServer();
                                for (var i=self._changeServerList.options.length-1; i>=0; i--){
                                    self._changeServerList.options.remove(i);
                                }
                                var serverList = player1.getChangeSvrList();
                                var serverListArray = serverList.split(',');
                                for (index in serverListArray){
                                    var item = new Option(serverListArray[index], serverListArray[index]);
                                    self._changeServerList.options.add(item);
                                }
                                break;
                            default:
                                console.log(info);
                                break;
                        }
                        break;
                    case RTMP_MEDIA_ERROR:
                        break;
                    case MEDIA_DEVICE_INFO:
                        switch(info)
                        {
                            case "AVHardwareDisable":
                                alert("flash player 全局设置了禁用硬件设置，修改方法：\nC:\WINDOWS\system32\Macromed\Flash\mms.cfg\n文件，修改为 AVHardwareDisable=0");;
                                break;
                            //需要添加其他摄像头麦克风禁用的消息
                            default:
                                break;
                        }
                        break;
                    case RTMP_MEDIA_READY://swf加载完成消息
                        player1.onSwfReady();
                        self.onSwfReady();
                        break;
                    case RTMP_MEDIA_NETSTREAM_INFO:
                        var _streamInfo = document.getElementById("streamInfo");
                        _streamInfo.value = info;
                        break;
                    default:
                        break;
                }
                if (type != RTMP_MEDIA_NETSTREAM_INFO){
                    var date = new Date();
                    var now = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"."+date.getMilliseconds();

                }
            },
            null);
    }
    Flash.prototype.onSwfReady=function(){
        if (player1){
            // audioCodecList
            for (var i=this._audioCodecList.options.length-1; i>=0; i--){
                this._audioCodecList.options.remove(i);
            }
            var audioCodecSet = player1.getAudioCodecSet();
            var audioCodecArray = audioCodecSet.split(',');
            for (audioCodec in audioCodecArray){
                var item = new Option(audioCodecArray[audioCodec], audioCodecArray[audioCodec]);
                this._audioCodecList.options.add(item);
            }
            // videoCodecList
            for (var i=this._videoCodecList.options.length-1; i>=0; i--){
                this. _videoCodecList.options.remove(i);
            }
            var videoCodecSet = player1.getVideoCodecSet();
            var videoCodecArray = videoCodecSet.split(',');
            for (videoCodec in videoCodecArray){
                var item = new Option(videoCodecArray[videoCodec], videoCodecArray[videoCodec]);
                this._videoCodecList.options.add(item);
            }
            // micList
            for (var i=this._micList.options.length-1; i>=0; i--){
                this._micList.options.remove(i);
            }
            var micListArray = player1.getMicList();
            footer.setMicList(micListArray);
            for (var index in micListArray){
                var item = new Option(micListArray[index], micListArray[index]);
                this._micList.options.add(item);
                this._micIndexArray.push(index);
            }
            // camList
            for (var i=this._camList.options.length-1; i>=0; i--){
                this._camList.options.remove(i);
            }
            var camListArray = player1.getCamList();
            footer.setCamList(camListArray);
            for (var index in camListArray){
                var item = new Option(camListArray[index], camListArray[index]);
                this._camList.options.add(item);
                this._camIndexArray.push(index);
            }
            //vvMediaVersion | clientVersion
            this._clientVersion.value = player1.getClientVersion();
            //HQVersion
            this._lowestSupportHQVersion.value = player1.getLowestSupportHQVersion();
            this._HQVersion.value = player1.getHQVersion();
        }
    }
    Flash.prototype.initFlashFail=function(){
        var html = "<p>"+
            "To view this page ensure that Adobe Flash Player version"+
            "11.0.0 or greater is installed."+
        "</p>";
        var pageHost = ((document.location.protocol == "https:") ? "https://" : "http://");
             document.write("<a href='http://www.adobe.com/go/getflashplayer'><img src='"
            + pageHost + "www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>" );
    }
    Flash.prototype.initConnect=function(){
        var self = this,urls = self._rtmpAddr.split(";"),string="",lastString="";
        $(urls).each(function(i){
            string+=urls[i]+":"+self._rtmpPort+",";
            if(urls.length-1 == i){
                lastString = string.substring(0,string.length-1);
            }
        });
        if (player1)
            player1.initConnect(lastString,this._rtmpLive,this.main,this._rtmpArea,0,0,0,self.myId,false,testInterface.session ,false);
        this._flashVersion.value = player1.getFlashVersion();
    }
    Flash.prototype.closeConnect=function(){
        if (player1)
            player1.closeConnect();
    }
    Flash.prototype.startPublish=function(){
        if (player1) {
            var micID = -1;
            for(var i=0; i<this._micIndexArray.length; i++)
            {
                if(i == this._micList.selectedIndex)
                {
                    micID = this._micIndexArray[i]
                    break;
                }
            }
            var camID = -1;
            for(var i=0; i<this._camIndexArray.length; i++)
            {
                if(i == this._camList.selectedIndex)
                {
                    camID = this._camIndexArray[i]
                    break;
                }
            }

            player1.startPublish(450,
                330,
                micID,
                camID,
                this._audioCodecList.options[this._audioCodecList.selectedIndex].value,
                this._videoCodecList.options[this._videoCodecList.selectedIndex].value,
                this._audioKBitrate.value,
                this._audioSamplerate.value,
                this. _videoFPS.value,
                this._videoKeyFrameInterval.value,
                this._videoKBitrate.value,
                this._videoQuality.value,
                this._volume.value,
                this._isUseCam.checked,
                this._isUseMic.checked,
                 isHD,
                 isHD,
                this._isMute.checked);
        }else{
            alert(1);
        }
    }
    Flash.prototype.closeConnect=function(){
        if (player1)
            player1.closeConnect();
    }
    Flash.prototype.startPlay=function(){
        if (player1)
            player1.startPlay( this._bufferTime.value,
                this._speedupRange.value,
                this._speedupTime.value,
                this._speedupSpeed.value,
                this._volume.value,
                this._isMute.checked);
    }
    Flash.prototype.pause=function(){
        if (player1)
            player1.pause();
    }
    Flash.prototype.stop=function(){
        if (player1)
            player1.stop();
    }
    Flash.prototype.initClick=function(){
        var self = this;
        $("#btn_play").click(function(){
                //$("#deviceBox").draggable();
            if(self.upOrDown){
                if(self.initCollectFlag ){
                    self.initConnect();
                    self.initCollectFlag  = false;
                }
                $("#camList option[value='" + cam +"']").attr("selected",true);
                $("#micList option[value='" + mic +"']").attr("selected",true);
                if(isHD){
                    $(':radio[name="useGao"]').attr("checked",0);
                }
                $("#deviceBox").show();
            }else{
                $("#btn_play").text("上麦");
                host.setHtml();
                self.upOrDown = true;
                testInterface.callFlashPlay({cmd:"MAINVIDEO", op:"DOWN", desuin:self.myId});
                self.stop();
            }
        });
        $("#btn_next").click(function(){
            self.upOrDown = false;
            self.startPublish();
            testInterface.callFlashPlay({cmd:"MAINVIDEO", op:"UP", desuin:self.myId});
            $("#btn_play").text("下麦");
            $("#deviceBox").hide();

        });
        $("#btn_close_deviceBox").click(function(){
            $("#deviceBox").hide();
        });
    }
    Flash.prototype.reSetMainVideo=function(data){
        var key = data.op;
        switch(key){
            case "STATUS":
                this.resetInfo(data);
                break;
            case "ADD":
                console.log("ADD");
                break;
            case "LIST":
                console.log("LIST");
                break;
            default:
                break;
        }
    }
    Flash.prototype.resetInfo=function(data){
        var template="",result=data["mainVideo"];
        if(result != null){
            this.initCollectFlag = true;
            this.initConnect();
            this.startPublish();
        }else{
            this.stop();
            $("#btn_play").text("上麦");
            this.upOrDown = true;
        }
    }
    module.exports = Flash;
});

