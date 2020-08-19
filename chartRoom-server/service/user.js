const allSqlAction = require("../lib/mysql")

let userExport = {
  //查找用户
  findUser: async (obj) => {
    let {account} = obj;
    let sql = `SELECT account FROM user WHERE account = '${account}'`
    return allSqlAction.allSqlAction(sql).then(res => {
      if (res.length == 0) {
        return { result: '', msg: '', code: 0 }
      } else {
        return userExport.login(obj);
      }
    })
  },
  //登录
  login: async (obj) => {
    let {account, password} = obj;
    let sql = `SELECT * FROM user WHERE account = '${account}' AND password = '${password}'`
    return allSqlAction.allSqlAction(sql).then(res => {
      if (res.length == 1 && res[0].account == account &&  res[0].password == password) {
        return { result: {
          account:account,
          name:res[0].name,
          id:res[0].id,
          face:res[0].face,
        }, msg: '', code: 0 }
      } else {
        return { result: '', msg: '密码错误', code: 1 }
      }
    })
  },
  //注册新用户
  registerUser: async (obj) => {
    let {account, password} = obj;
    let sql = `INSERT INTO user (account,password) VALUES ('${account}','${password}')`
    return allSqlAction.allSqlAction(sql).then(res => {
      if (res.affectedRows == 1) {
        return { result: '', msg: '', code: 0 }
      } else {
        return { result: '', msg: '注册失败', code: 1 }
      }
    })
  },
  //修改昵称
  addName: async (obj) => {
    let {account, name} = obj;
    let find = `SELECT account FROM user WHERE name = '${name}'`
    return allSqlAction.allSqlAction(find).then(findRes=>{
      let success =  { result: {
        'account':account,
        'name':name,
      }, msg: '', code: 0 };

      if(findRes.length == 0){
        let sql = `UPDATE user SET name ='${name}' WHERE account ='${account}'`
        return allSqlAction.allSqlAction(sql).then(res => {
          if (res.affectedRows == 1) {
            return success;
          } else {
            return { result: '', msg: '修改昵称失败', code: 1 }
          }
        })
      }else{
        if(findRes[0].account == account){
          return success;
        }else{
          return { result: '', msg: '该昵称已被注册，请换一个试试', code: 1 }
        }
      }
    })
    
  },
  //发送消息
  sendMsg: async (obj) => {
    let {id, content,timestamp,time} = obj;
    let sql = `INSERT INTO record (user_id,content,time,timestamp) VALUES ('${id}','${content}','${time}','${timestamp}')`;
    return allSqlAction.allSqlAction(sql).then(res => {
      if (res.affectedRows == 1) {
        obj.msg_id = res.insertId;
        return { result: obj, msg: '', code: 0 }
      } else {
        return { result: '', msg: '发送消息失败', code: 1 }
      }
    })
  },
  //发送消息-好友
  sendMsgChat: async (obj) => {
    let {id,targetId,content,timestamp,time} = obj;
    let sql = `INSERT INTO contact_record (user_id,contact_id,content,time,timestamp,submit_id) VALUES 
    ('${id}','${targetId}','${content}','${time}','${timestamp}','${id}')`;
    return allSqlAction.allSqlAction(sql).then(res => {
      if (res.affectedRows == 2) {
        obj.msg_id = res.insertId;
        return { result: obj, msg: '', code: 0 }
      } else {
        return { result: '', msg: '发送消息失败', code: 1 }
      }
    })
  },
  //获取用户信息
  getUserInfo: async (obj) => {
    let {id} = obj;
    let sql = `SELECT * FROM user WHERE id = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
      if (res.length == 1) {
        return { result: res[0], msg: '', code: 0 }
      } else {
        return { result: '', msg: '发送消息失败', code: 1 };
      }
    })
  },
  //查询最近的rows条条聊天记录
  getRecord: async (obj) => {
    let {timestamp,rows,type} = obj;
    let less = type==1?'<=':'<';
    let sql = `SELECT * FROM (SELECT t1.*,t2.name,t2.face FROM record t1 LEFT JOIN user t2 ON t1.user_id=t2.id 
    WHERE t1.timestamp ${less} '${timestamp}' ORDER BY t1.timestamp DESC LIMIT ${rows}) a ORDER BY timestamp ASC`

    return allSqlAction.allSqlAction(sql).then(res => {
      if (res.length >= 0) {
        return { result: res, msg: '', code: 0 }
      } else {
        return { result: '', msg: '获取聊天记录失败', code: 1 };
      }
    })
  },
  //查询最近的二十条聊天记录
  getRecordChat: async (obj) => {
    let {id,targetId,timestamp,rows,type} = obj;
    let less = type==1?'<=':'<';
    let sql = `SELECT * FROM (SELECT t1.*,t2.name,t2.face FROM contact_record t1 LEFT JOIN user t2 ON t1.submit_id=t2.id 
    WHERE t1.timestamp ${less} '${timestamp}' AND (t1.user_id = '${id}' AND t1.contact_id = '${targetId}' OR 
    t1.user_id = '${targetId}' AND t1.contact_id = '${id}') 
    ORDER BY t1.timestamp DESC LIMIT ${rows}) a ORDER BY timestamp ASC`

    return allSqlAction.allSqlAction(sql).then(res => {
      if (res.length >= 0) {
        return { result: res, msg: '', code: 0 }
      } else {
        return { result: '', msg: '获取聊天记录失败', code: 1 };
      }
    })
  },
  //上传头像后，插入文件路径
  uploadFile: async (obj) => {
    let {id, face} = obj;
    let sql = `UPDATE user SET face ='${face}' WHERE id ='${id}'`;
    return allSqlAction.allSqlAction(sql).then(res => {
      if (res.affectedRows == 1) {
        return { result: face, msg: '', code: 0 }
      } else {
        return { result: '', msg: '上传失败', code: 1 }
      }
    })
  },
  //通过图片id获取图片文件流
  getFile: async (obj) => {
    let {face} = obj;
    let sql = `SELECT face FROM user WHERE face = '${face}'`;
    return allSqlAction.allSqlAction(sql).then(res => {
      if (res.length == 0) {
        return { result: '', msg: '图片获取失败', code: 1 }
      } else {
        return { result: res[0].face, msg: '', code: 0 }
      }
    })
  },
  //搜索用户
  searchUser: async (obj) => {
    let {name,id} = obj;
    let sql = `SELECT * FROM user WHERE name LIKE '%${name}%' AND id NOT IN(SELECT id FROM user WHERE id = '${id}')`
    return allSqlAction.allSqlAction(sql).then(res => {
      return { result: res, msg: '', code: 0 }
    })
  },
  //添加联系人 首先发送一条添加联系人请求，对方同意则加入chat表
  addContact: async (obj) => {
    let {id,targetId,name} = obj;//id: 发起人id，name: 发起人昵称，targetId: 对象id
    let message = `${name}请求加您为好友`;
    //查询是否已经添加过好友
    let checkContact = `SELECT id FROM contacts WHERE user_id = '${id}' and contact_id = ${targetId}`;
    return allSqlAction.allSqlAction(checkContact).then(contactRes => {
      if(contactRes.length){//已经添加过好友
        return { result: '', msg: '你们已经是好友关系了', code: 1 }
      }else{
        //未添加好友
        let checkSql = `SELECT id FROM message WHERE add_user_id = '${id}' and user_id = ${targetId}`;
        return allSqlAction.allSqlAction(checkSql).then(check => {
          if(check.length==1){
            return { result: '', msg: '您已向该用户发起过请求了，请耐心等待', code: 1 }
          }else{
            let sql = `INSERT INTO message (user_id,message,add_user_id,type) VALUES ('${targetId}','${message}','${id}',1)`;
            return allSqlAction.allSqlAction(sql).then(res => {
              if(res.affectedRows==1){
                return { result: '', msg: '', code: 0 }
              }else{
                return { result: '', msg: '添加联系人失败', code: 1 }
              }
            })
          }
        })
      }
    })
  },
  getMessageNum: async (obj) => {
    let {id} = obj;
    let sql = `SELECT id FROM message WHERE user_id = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
      return { result: res.length, msg: '', code: 0 }
    })
  },
  getMessage: async (obj) => {
    let {id} = obj;
    let sql = `SELECT t1.*,t2.name,t2.face FROM message t1 LEFT JOIN user t2 ON t1.add_user_id=t2.id
    WHERE t1.user_id = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
      return { result: res, msg: '', code: 0 }
    })
  },
  //同意或拒绝加好友申请
  agreeRefuseContact: async (obj) => {
    let {user_id,add_user_id,type} = obj;
    if(type==1){//同意
      let checkSql = `SELECT id FROM contacts WHERE user_id = '${user_id}' and contact_id = '${add_user_id}'`;
      return allSqlAction.allSqlAction(checkSql).then(async check => {
        if(check.length){//已经添加过联系人了
          await userExport.deleteMessage(obj)
          return { result: 'delete', msg: '你们已经是好友了', code: 1 }
        }else{
          let sql = `INSERT INTO contacts (user_id,contact_id) VALUES ('${user_id}','${add_user_id}'),('${add_user_id}','${user_id}')`
          return allSqlAction.allSqlAction(sql).then(async res => {
            if(res.affectedRows==2){
              await userExport.deleteMessage(obj)
              return { result: '', msg: '', code: 0 }
            }else{
              return { result: '', msg: '添加好友失败', code: 1 }
            }
          })
        }
      })
    }else if(type==2){//拒绝 删除通知
      return userExport.deleteMessage(obj)
    }
  },
  //获取所有联系人信息
  getContacts: async (obj) => {
    let {id} = obj;
    let sql = `SELECT t1.*,t2.name,t2.face FROM contacts t1 LEFT JOIN user t2 ON t1.contact_id=t2.id
      WHERE t1.user_id = '${id}'`;
      
    return allSqlAction.allSqlAction(sql).then(res => {
      return { result: res, msg: '', code: 0 }
    })
  },
  //删除通知
  deleteMessage: async (obj) => {
    let {id} = obj;
    let sql = `DELETE FROM message WHERE id = '${id}'`;
    return allSqlAction.allSqlAction(sql).then(res => {
      return { result: 'delete', msg: '', code: 0 }
    })
  },
}
module.exports = userExport;
