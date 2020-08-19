const user = require("../service/user")

const fs = require('fs');
const path = require('path');

module.exports={
  registerUser: async (ctx,next)=>{
    let data = await user.registerUser(ctx.request.body)
    return ctx.response.body = data
  },
  findUser: async (ctx,next)=>{
    let data = await user.findUser(ctx.request.body)
    return ctx.response.body = data
  },
  addName: async (ctx,next)=>{
    let data = await user.addName(ctx.request.body)
    return ctx.response.body = data
  },
  uploadFile: async (ctx,next)=>{

    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    //生成文件名
    let suffix = file.name.substring(file.name.lastIndexOf('.'),file.name.length);
    let fileName = `${new Date().valueOf()}userID${ctx.request.body.id}${suffix}`;
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
  },
  getFile: async (ctx,next)=>{
    let data = await user.getFile(ctx.request.query);
    if(data.code==0){
      let filePath = path.join('./public/upload/') + data.result;
      return ctx.response.body =  fs.createReadStream(filePath);
    }else{
      return ctx.response.body = data;
    }
  },
  //获取最近二十条聊天记录
  getRecord: async (ctx,next)=>{
    let data = await user.getRecord(ctx.request.query)
    return ctx.response.body = data
  },
  //获取最近二十条聊天记录
  getRecordChat: async (ctx,next)=>{
    let data = await user.getRecordChat(ctx.request.query)
    return ctx.response.body = data
  },
  searchUser: async (ctx,next)=>{
    let data = await user.searchUser(ctx.request.query)
    return ctx.response.body = data
  },
  addContact: async (ctx,next)=>{
    let data = await user.addContact(ctx.request.body)
    return ctx.response.body = data
  },
  getMessageNum: async (ctx,next)=>{
    let data = await user.getMessageNum(ctx.request.query)
    return ctx.response.body = data
  },
  getMessage: async (ctx,next)=>{
    let data = await user.getMessage(ctx.request.query)
    return ctx.response.body = data
  },
  getContacts: async (ctx,next)=>{
    let data = await user.getContacts(ctx.request.query)
    return ctx.response.body = data
  },

}