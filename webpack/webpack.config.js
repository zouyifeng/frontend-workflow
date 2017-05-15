var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + '/app/main.js',
	output: {
		path:__dirname + '/build',
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader?modules" },
			{ test: /\.json$/, loader: "json-loader" },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	},
	plugins: [
		new webpack.BannerPlugin('菜鸟 教程 webpack教程'),
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.tmpl.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: './build',
		historyApiFallback: true,
		inline: true,
		hot: true
	}
}