const allSqlAction = require("../lib/mysql")
const tools = require("../utils/tools")

//查找用户
async function findUser(account, password) {
  let sql = `select * from user where account = '${account}'`
  return allSqlAction.allSqlAction(sql).then(res => {
    if (res.length == 0) {
      return { result: '', msg: '', code: 0 }
    } else {
      return login(account, password);
    }
  })
}
//登录
async function login(account, password) {
  let sql = `select * from user where account = '${account}' and password = '${password}'`
  return allSqlAction.allSqlAction(sql).then(res => {
    if (res.length == 1 && res[0].account == account &&  res[0].password == password) {
      return { result: {
        account:account,
        name:res[0].name,
      }, msg: '', code: 0 }
    } else {
      return { result: '', msg: '密码错误', code: 1 }
    }
  })
}
//注册新用户
async function registerUser(account, password) {
  let sql = `insert into user (account,password) values ('${account}','${password}')`
  return allSqlAction.allSqlAction(sql).then(res => {
    if (res.affectedRows == 1) {
      return { result: '', msg: '', code: 0 }
    } else {
      return { result: '', msg: '注册失败', code: 1 }
    }
  })
}
//修改昵称
async function addName(account, name) {
  let find = `select * from user where name = '${name}'`
  return allSqlAction.allSqlAction(find).then(res=>{
    if(res.length == 0){
      let sql = `update user set name ='${name}' where account ='${account}'`
      return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
          return { result: {
            'account':account,
            'name':name,
          }, msg: '', code: 0 }
        } else {
          return { result: '', msg: '修改昵称失败', code: 1 }
        }
      })
    }else{
      return { result: '', msg: '该昵称已被注册，请换一个试试', code: 1 }
    }
  })
  
}
//发送消息
async function sendMsg(account, content, name) {
  let time = tools.format(new Date(),'yyyy-MM-dd hh:mm:ss');
  let timestamp = Date.parse(new Date());
  let sql = `insert into record (msg_account,content,time,timestamp,name) values ('${account}','${content}','${time}','${timestamp}','${name}')`;
  return allSqlAction.allSqlAction(sql).then(res => {
    if (res.affectedRows == 1) {
      return { result: {
        'account':account,
        'name':name,
      }, msg: '', code: 0 }
    } else {
      return { result: '', msg: '发送消息失败', code: 1 }
    }
  })
}
module.exports = {
  findUser,
  registerUser,
  addName,
  sendMsg,
}