const state = {
  userObj:{
    name: '',//昵称
    account:'',//账号
  }
}
// getters
const getters = {}
// mutations
const mutations = {
	setUser(state, data) {
		state.userObj = data;
	},
}
// actions
const actions = {
	
}
export default {
	state,
	getters,
	actions,
	mutations
}