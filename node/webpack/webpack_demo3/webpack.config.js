var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: './src/script/main.js',
		a: './src/script/a.js'
	},	// webpack入口
	output: {
		path: './dist',
		filename: 'js/[name].[hash].bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	]
}
