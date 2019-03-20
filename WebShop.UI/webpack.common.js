const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: path.join(__dirname, 'src/index.js'),
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'js/bundle.js'
	},
	resolve: {
		alias: {
			src: path.join(__dirname, 'src')
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: __dirname,
				exclude: /(node_modules|bower_compontents)/,
				loader: 'babel-loader'
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: 'file-loader'
			},
			{
				test: /\.svg$/,
				use: [{
					loader: "babel-loader"
				}, {
					loader: "react-svg-loader",
					options: {
						jsx: true
					}
				}]
			},
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/template.html.ejs'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css',
			disable: false,
			allChunks: true
		}),
	],

};

module.exports = config;