const merge = require('webpack-merge');
const common = require('./base.js');
const path = require('path');

module.exports = merge(common, {
	//开发环境
	mode: 'development',
	output: {
		filename: 'js/[name].[hash].js',
		path: path.resolve(__dirname, '../h5'),
		publicPath: "/h5/"
	},
	//把编译后的代码映射回编译前，方便在F12时调试
	devtool: '#eval-source-map',
	devServer: {
		//使history模式路由转向index而不报404
		historyApiFallback:  {
			index: '/h5/'
		},
		host: "0.0.0.0",
		useLocalIp: true,
		publicPath: "/h5/",
		openPage: 'h5/home',
		// inline: false,
		//设置代理
		proxy: {
			"/platform": {
				// target: "https://beta.geexfinance.com/geex-platform-web",
				// target: "https://alpha.geexfinance.com/geex-platform-web",
				target: "https://192.168.112.91:8089/geex-platform-web",
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					'^/platform': ''
				}
			},
			"/officeAutomation": {
				// target: "https://beta.geexfinance.com/oa-wf-api",
				// target: "http://eoa.geexfinance.com/oa-wf-web",
				target: "http://192.168.112.91:8089",
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					'^/officeAutomation': ''
				},
			},
		}
	},
});