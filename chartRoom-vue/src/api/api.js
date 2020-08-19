const chartRoom = {
	dev:'/chartRoom',
	sit: `//${window.location.host}/chartRoom`,
	prod: `//${window.location.host}/chartRoom`
}[process.env.http_env];



//前台接口调用时
export default {
  //前台接口
  findUser: `${chartRoom}/user/findUser`,//查找用户是否存在
  register: `${chartRoom}/user/register`,//注册/登录
  addName: `${chartRoom}/user/addName`,//修改昵称
  uploadfile: `${chartRoom}/user/uploadfile`,//上传文件
  getFile: `${chartRoom}/user/getFile`,//获取图片
  getRecord: `${chartRoom}/user/getRecord`,//获取聊天记录
  getRecordChat: `${chartRoom}/user/getRecordChat`,//获取聊天记录-好友
  searchUser: `${chartRoom}/user/searchUser`,//通过昵称模糊查询用户
  getMessage: `${chartRoom}/user/getMessage`,//获取通知
  getMessageNum: `${chartRoom}/user/getMessageNum`,//获取通知数量
  getContacts: `${chartRoom}/user/getContacts`,//获取联系人
} 