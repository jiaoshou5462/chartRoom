let socketIo = require('socket.io');
let controller = require("../controller/userController")
let onlineUser = [];

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
    socket.on('enterRoom', (data) => {
      onlineUser.push(data.account);
      onlineUser = Array.from(new Set(onlineUser));
      let sendObj = {
        name:data.name,
        onlineNum:onlineUser.length,
      }
      socket.emit('enterRoom',sendObj);
      socket.broadcast.emit('enterRoom', sendObj);
    });
    socket.on('sendMsg', (data, callback) => {
      callback({code:0});
      let sendObj = {
        name:data.name,
        content:data.content,
        time:data.time,
      }
      socket.emit('sendMsg',sendObj);
      socket.broadcast.emit('sendMsg',sendObj);
    });
    socket.on('leaveRoom', (data) => {
      onlineUser = deleteArr(onlineUser,data.account)
      let sendObj = {
        name:data.name,
        onlineNum:onlineUser.length,
      }
      socket.emit('leaveRoom',sendObj);
      socket.broadcast.emit('leaveRoom',sendObj);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
module.exports = mySocket
