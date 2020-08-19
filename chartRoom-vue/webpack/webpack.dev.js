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
			"/chartRoom": {
				target: "http://192.168.8.89:3000",
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					'^/chartRoom': ''
				}
      },
    },
    
	},
});