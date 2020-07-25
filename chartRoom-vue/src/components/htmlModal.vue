<template>
	<div>
		<el-dialog
			:title="title" 
			:visible="show"
			:width="width"
			:append-to-body="true" 
			:close-on-click-modal="coverClose"
			:fullscreen="fullscreen"
			@close="handle">
			<!-- 模板插槽 -->
			<slot></slot>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dialogVisible:'',
		}
	},
	watch:{

	},
	props:{
		show:{
			type: Boolean,
			default: true,
		},
		coverClose:{//点击遮罩层关闭弹出
			type: Boolean,
			default: false,
		},
		width:{
			type: String,
			default: "500px",
		},
		title:{
			type: String,
			default:'提示',
		},
		fullscreen:{
			type: Boolean,
			default: false,
		},
	},
	methods: {
		handle(type){
			this.$emit('emit',false);
		},
	},
}
</script>
<style lang="less">
	.footer-btn{
		text-align: center;
	}
</style>

