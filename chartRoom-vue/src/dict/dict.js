export default {
	dynamicType(value){//动态-类型
		return {
			1 : "通知",
			2 : "新闻"
		}[value] || value
	},
	dynamicStatus(value){//动态-状态
		return {
			1 : "草稿",
			2 : "已发布"
		}[value] || value
	},
	groupStatus(value){//群组-状态
		return {
			1 : "生效",
			2 : "停用"
		}[value] || value
	},
	processStatus(value){//待办理流程-状态
		return {
			1 : "征询中",
			2 : "审核中",
			3 : "转审中",
			4 : "已同意",
			5 : "已拒绝",
			6 : "已撤回",
		}[value] || value
  },
  payStatus(value){//付款状态
		return {
			9 : "放款中",
			10 : "放款成功",
			11 : "放款失败",
		}[value] || value
  },
}