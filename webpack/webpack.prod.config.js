var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: __dirname + '/app/main.js',
	output: {
		path: __dirname + '/build',
		filename: "[name]-[hash].js"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader?modules"})},
			{ test: /\.json$/, loader: "json-loader" },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
		]
	},
	plugins: [
		new webpack.BannerPlugin('菜鸟 教程 webpack教程'),
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.tmpl.html'
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin("[name]-[hash].css")
	],
	devServer: {
		contentBase: './build',
		historyApiFallback: true,
		inline: true,
		hot: true
	}
}