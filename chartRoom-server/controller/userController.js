const user = require("../service/user")

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
  let {account,content,name} = obj;
  let data = await user.sendMsg(account,content,name)
  return ctx.response.body = data
}
module.exports={
 registerUser,
 findUser,
 addName,
 sendMsg,
}