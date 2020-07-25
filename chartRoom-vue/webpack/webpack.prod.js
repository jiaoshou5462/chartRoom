const path = require('path');
const merge = require('webpack-merge');
const common = require('./base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
	//生产环境
	mode: 'production',
	output: {
		filename: 'js/[name].[contenthash].js',
		path: path.resolve(__dirname, '../h5'),
		publicPath: "/h5/"
	},
	plugins: [
		//每次打包前删除上次打包得文件夹
		new CleanWebpackPlugin(['h5'], {
			root: path.resolve(__dirname, '../'),
			// dry: false // 启用删除文件
		}),
	],
});