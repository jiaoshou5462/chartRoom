import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index';

let content = {
	template: `
		<div>
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"/>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"/>
		</div>
		`
}
Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: '/h5',
	routes: [
		{
			path: '/login',
			name: 'login',
			component: () => import('views/login/login'),
		},
		{
			path: '/home',
			name: 'home',
			component: () => import('views/home/home'),
		},
	]
})
router.beforeEach((to, from, next) => {
  //设置用户信息，页面刷新触发
  let userObj = localStorage.getItem('userObj');
  if(userObj){
    userObj = JSON.parse(userObj);
    store.commit('setUser', userObj);
  } 
	next();
})
export default router;
