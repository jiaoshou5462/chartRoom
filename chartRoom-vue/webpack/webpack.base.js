const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
 

module.exports = {
	//入口文件 入口在每个单独的beta prod中配置
	// entry: [],
	module: {
		//各类解析器
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['env', 'stage-0']
					}
				}
			},
			{
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options:{
              plugins:[
                require("autoprefixer")("> 1%","last 100 versions","not ie <= 8"),
                // require("postcss-pxtorem")({rootValue: 100,propList: ['*']})
              ]
            }
          },
          'less-loader',
        ],
      },
			{
				test: /\.(png|svg|jpg|gif|jpeg|eot|svg|ttf|woff|woff2)$/,
				use: [
					'file-loader'
				]
			},
		]
	},
	resolve: {
		//设置import根路径位置，避免每次导入都要输入N个../
		alias: {
			views: path.resolve(__dirname, '../views'),
			components: path.resolve(__dirname, '../src/components'),
			css: path.resolve(__dirname, '../assets/css'),
			js: path.resolve(__dirname, '../assets/js'),
			images: path.resolve(__dirname, '../assets/images'),
			src: path.resolve(__dirname, '../src'),
			'vue$':'vue/dist/vue.esm.js',
		},
		extensions: ['.js', '.vue', '.json']
	},
	plugins: [
		//接收脚本传进来的参数并注册为全局变量，用来判断接口使用哪个baseUrl
		new webpack.DefinePlugin({
			'process.env': {
				http_env: JSON.stringify(process.env.http_env)
			}
		}),
		// 解决vender后面的hash每次都改变
		new webpack.HashedModuleIdsPlugin(),
		//vue-loader需要该插件
		new VueLoaderPlugin(),
		//编译后生成html并引入js和css
		new CopyWebpackPlugin([ // 复制插件
			{ 
				from: path.join(__dirname,'../assets/js/fastclick.js'),
				to:  path.join(__dirname,'../h5') 
			}
		])
	],
};