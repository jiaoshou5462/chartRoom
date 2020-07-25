import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import loading from './modules/loading'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    loading,
  }
})