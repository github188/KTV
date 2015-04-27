var parentData=null;
var session;
var groupId;
var roomId;
var loginUrl;
var uin;
var messenger = new Messenger("home");
messenger.addTarget(window.parent,'parent');

messenger.listen(function (data) {
    parentData = $.parseJSON(data);
    roomId = parentData.roomid;
    groupId = parentData.GroupId;
    uin =parentData.uin;
    session =parentData.sessionkey;
    loginUrl = parentData.url;

});
messenger.targets["parent"].send("1");