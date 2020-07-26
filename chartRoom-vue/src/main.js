import 'url-search-params-polyfill';//引入URLSearchParams兼容插件
import 'css/index.css';//引入全站的CSS
import 'element-ui/lib/theme-chalk/index.css';//引入element的CSS
import 'css/reset.css';//reset.css

import Vue from 'vue';//引入Vue
import axios from 'axios'//引入axios
import VueAxios from 'vue-axios'//引入vue-axios
import wechatTitle from 'vue-wechat-title'//引入设置title插件
import dict from 'src/dict/dict.js';//引入字典
import selectList from 'src/dict/selectList.js';//引入下拉列表
import http from 'src/http/http.js';//引入全站JS
import api from 'src/api/api.js';//引入api
import router from 'src/router/router.js';//引入路由
import store from 'src/store/index.js';//引入vuex
import app from 'src/layouts/app.vue';//引入入口组建
import element from 'element-ui';//按需引入element-ui



window.api = api;//挂载API到window
window.http = http;//挂载全站JS到window
Vue.prototype.window = window;//window挂载到Vue变量
Vue.prototype.selectList = selectList;//下拉列表挂载到Vue变量
Vue.use(element);
Vue.use(wechatTitle);
Vue.use(VueAxios, axios);//全局安装axios

//vue-socket.io 全局引用
import VueSocketIO from 'vue-socket.io'
import socketIoClient from 'socket.io-client'
Vue.use(new VueSocketIO({
    debug: true,
    // connection: `//${window.location.host}`,
    connection: socketIoClient('http://192.168.2.102:3000'),
    vuex: {
        store,
        actionPrefix: 'SOCKET_', //为vuex设置的两个前缀
        mutationPrefix: 'SOCKET_'
    },
}))

//注册全局组件
let dictAndFilter = dict;//合并字典和过滤器
//全局注册字典和过滤器
for (let name in dictAndFilter) {
  Vue.filter(name, dictAndFilter[name])
};
//挂载入口组件并将路由和vuex添加到原型链
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app),
});


// 添加响应拦截器-login跳转
axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response.status === 401) {
		
	} else {
		return Promise.reject(error);
	}
});
