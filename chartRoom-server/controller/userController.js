const user = require("../service/user")

const fs = require('fs');
const path = require('path');

async function registerUser(ctx,next){
  let {account,password} = ctx.request.body
  let data = await user.registerUser(account,password)
  return ctx.response.body = data
}
async function findUser(ctx,next){
  let {account,password} = ctx.request.body
  let data = await user.findUser(account,password)
  return ctx.response.body = data
}
async function addName(ctx,next){
  let {account,name} = ctx.request.body
  let data = await user.addName(account,name)
  return ctx.response.body = data
}
async function sendMsg(obj){
  let data = await user.sendMsg(obj)
  return ctx.response.body = data
}
async function uploadFile(ctx,next){

  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  //生成文件名
  let suffix = file.name.substring(file.name.lastIndexOf('.'),file.name.length);
  let fileName = `${(new Date()).valueOf()}userID${ctx.request.body.id}${suffix}`;
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  
  let filePath = path.join('./public/upload/') + fileName;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  let obj = {id:ctx.request.body.id,face:fileName};
  let data = await user.uploadFile(obj)
  return ctx.response.body = data
}
async function getFile(ctx,next){
  let data = await user.getFile(ctx.request.query);
  if(data.code==0){
    let filePath = path.join('./public/upload/') + data.result;
    return ctx.response.body =  fs.createReadStream(filePath);
  }else{
    return ctx.response.body = data;
  }
}

module.exports={
 registerUser,
 findUser,
 addName,
 sendMsg,
 uploadFile,
 getFile,
}