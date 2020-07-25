import Vue from 'vue';
import store from 'src/store/index.js';//引入vuex
import { MessageBox } from 'element-ui';

let requestNum = 0;
let completeNum = 0;

export default {
	get: ({url, params, options, loading=true}) => {
		return new Promise((resolve, reject) => {
			requestNum++;
			if(loading) store.commit('setLoading', true);
			Vue.axios.get(url, {
				params: {
					...params
				},
				...options,
				headers: {}
			})
				.then((res) => {
					if (++completeNum == requestNum) {
						store.commit('setLoading', false);
					}
					if(res.data.code!==0){
            MessageBox.alert(res.data.msg);
            reject();
          }else{
            resolve(res.data);
          }
				})
				.catch((err) => {
					if (++completeNum == requestNum) {
						store.commit('setLoading', false);
					}
					reject(err);
				})
		})
	},
	post: ({url, params, options, loading=true}) => {
		var postParams = new URLSearchParams()
		for (var key in params) {
			postParams.append(key, params[key])
		}
		return new Promise((resolve, reject) => {
			requestNum++;
			if(loading) store.commit('setLoading', true);
			Vue.axios.post(url, postParams, {
				...options,
				headers: {}
			}).then((res) => {
				if (++completeNum == requestNum) {
					store.commit('setLoading', false);
        }
        if(res.data.code!==0){
          MessageBox.alert(res.data.msg);
          reject();
        }else{
          resolve(res.data);
        }
			})
			.catch((err) => {
				if (++completeNum == requestNum) {
					store.commit('setLoading', false);
				}
				reject(err);
			})
		})
	},
	postJSON: ({url, params, options, loading=true,}) => {
		let postParams = JSON.stringify(params);
		return new Promise((resolve, reject) => {
			requestNum++;
			if(loading) store.commit('setLoading', true);
			Vue.axios.post(url, postParams, {
				...options,
				headers: {
					'content-type': 'application/json;charset=UTF-8',
				},
			}).then((res) => {
				if (++completeNum == requestNum) {
					store.commit('setLoading', false);
				}
				resolve(res.data);
			})
			.catch((err) => {
				if (++completeNum == requestNum) {
					store.commit('setLoading', false);
				}
				reject(err);
			})
		})
  },
}