const chartRoom = {
	dev:'/chartRoom',
	sit: `//${window.location.host}/chartRoom`,
	prod: `//${window.location.host}/chartRoom`
}[process.env.http_env];



//前台接口调用时
export default {
  //前台接口
  findUser: `${chartRoom}/user/findUser`,//注册/登录
  register: `${chartRoom}/user/register`,//注册/登录
  addName: `${chartRoom}/user/addName`,//注册/登录
} 