const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	//生产环境
	entry: ['babel-polyfill', path.resolve(__dirname, '../src/main.js')],
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../index.html'),
			favicon: path.resolve(__dirname, '../assets/images/icon/favicon.ico'),
		}),
	]
});

  