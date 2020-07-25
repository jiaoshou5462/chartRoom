<template>
  <div id="app" v-loading="loading">
    <router-view/>
  </div>
</template>
<script>
export default {
	data() {
		return {
		}
  },
	computed: {
		loading:function(){
			return this.$store.state.loading.loading;
    },
    message:function(){
			return this.$store.state.loading.message;
		},
	},
} 
</script>
