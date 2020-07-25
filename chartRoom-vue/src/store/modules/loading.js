const state = {
  loading: false,//是否显示加载遮罩层
  message:'',
}
// getters
const getters = {}
// mutations
const mutations = {
	setLoading(state, data) {
    if(typeof data == 'string'){
      state.loading = true;
      state.message = data;
    }else{
      state.loading = data;
      state.message = '加载中...';
    }
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