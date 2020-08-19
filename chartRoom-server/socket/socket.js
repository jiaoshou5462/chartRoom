const socketIo = require('socket.io');
const user = require("../service/user")
const tools = require("../utils/tools")

let onlineUser = [];
let socketUser = {};

function deleteArr(arr,target){
  for(let i=0;i<arr.length;i++){
    if(target == arr[i]){
      arr.splice(i,1);
      --i;
      return arr;
    }
  }
  return arr;
}

let mySocket = (server)=>{
  let io = socketIo(server);
  // socket连接
  io.on('connection', (socket) => {
    //进入房间
    socket.on('enterRoom', (data) => {
      socketUser[data.id] = socket.id;
      onlineUser.push(data.account);
      onlineUser = Array.from(new Set(onlineUser));
      let sendObj = {
        name:data.name,
        onlineNum:onlineUser.length,
      }
      io.sockets.emit('enterRoom', sendObj);
    });
    //发送消息
    socket.on('sendMsg', async (data, callback) => {
      callback({code:0});
      let time = tools.format(new Date(),'yyyy/MM/dd hh:mm:ss')
      let sendObj = {
        id:data.id,
        content:data.content,
        time:time,
      }
      sendObj.timestamp =  new Date().valueOf();
      let sqlBack = await user.sendMsg(sendObj);//插入聊天记录
      let userInfo = await user.getUserInfo(sqlBack.result);//获取用户信息
      //合并数据 返回前台
      if(userInfo.code==0){
        let emitObj = Object.assign(sqlBack.result,userInfo.result);
        emitObj.id = emitObj.msg_id;//将id改为聊天记录id
        io.sockets.emit('sendMsg',emitObj);
      }
    });
    //发送消息-好友
    socket.on('sendMsgChat', async (data, callback) => {
      callback({code:0});
      let time = tools.format(new Date(),'yyyy/MM/dd hh:mm:ss')
      let sendObj = {
        id:data.id,
        targetId:data.targetId,
        content:data.content,
        time:time,
      }
      sendObj.timestamp =  new Date().valueOf();
      sendObj.rows = 1;
      sendObj.type = 1;
      await user.sendMsgChat(sendObj);//插入聊天记录
      let recordLast = await user.getRecordChat(sendObj);//获取用户信息-自己
      //合并数据 返回前台
      socket.emit('sendMsgChat',recordLast.result[0]);//给自己发送数据
      let socketId = socketUser[data.targetId];//获取对应socketId
      if (io.sockets.connected[socketId]) {
        io.sockets.connected[socketId].emit('sendMsgChat',recordLast.result[0]);//给对方客户端发送数据
      }
    });
  
    //发起好友申请
    socket.on('addContact', async (data, callback) => {
      let sqlBack = await user.addContact(data);//添加好友，给对方生成一条通知
      callback(sqlBack);//返回结果
      if(sqlBack.code==0){
        let msgBack = await user.getMessageNum({id:data.targetId});//查询被加好友用户的通知数量
        let socketId = socketUser[data.targetId];//获取对应socketId
        //向指定客户端发送数据
        if (io.sockets.connected[socketId]) {
          io.sockets.connected[socketId].emit('getMessageNum',msgBack);
        }
      }
    });
    //同意或拒绝
    socket.on('agreeRefuseContact', async (data, callback) => {
      let sqlBack = await user.agreeRefuseContact(data);//获取结果
      callback(sqlBack);//返回结果
      let numBack = await user.getMessageNum({id: data.user_id});//查询被加好友用户的通知数量
      if(sqlBack.result =='delete'){
        socket.emit('getMessageNum',numBack);//给自己发送数据-通知数量
      }else if(sqlBack.code==0){
        let myContacts= await user.getContacts({id: data.user_id});//查询好友列表
        let socketId = socketUser[data.add_user_id];//根据对方id 获取对应socketId
        //给自己发送数据，并向指定客户端发送数据
        socket.emit('getContacts',myContacts);//给自己发送数据
        socket.emit('getMessageNum',numBack);//给自己发送数据-通知数量
        if (io.sockets.connected[socketId]) {
          let oppositeContacts= await user.getContacts({id: data.add_user_id});//查询对方好友列表
          io.sockets.connected[socketId].emit('getContacts',oppositeContacts);//给对方客户端发送数据
        }
      }
    });
    //离开房间
    socket.on('leaveRoom', (data) => {
      onlineUser = deleteArr(onlineUser,data.account)
      let sendObj = {
        name:data.name,
        onlineNum:onlineUser.length,
      }
      io.sockets.emit('leaveRoom',sendObj);
    });
    //断开连接
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
module.exports = mySocket
