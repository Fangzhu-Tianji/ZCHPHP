var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: './src/script/main.js',
		a: './src/script/a.js',
		b: './src/script/b.js',
		c: './src/script/c.js'
	},	// webpack入口
	output: {
		path: './dist',
		publicPath: 'http://cdn.com',
		filename: 'js/[name].[hash].bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'a.html',
			template: 'index.html',
			title: 'aaaa',
			chunks: ['main','a']
		}),
		new HtmlWebpackPlugin({
			filename: 'b.html',
			template: 'index.html',
			title: 'bbbb',
			chunks: ['main','b']
		}),
		new HtmlWebpackPlugin({
			filename: 'c.html',
			template: 'index.html',
			title: 'cccc',
			chunks: ['c']
		})
	]
}
