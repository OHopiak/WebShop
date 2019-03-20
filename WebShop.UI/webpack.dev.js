const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
// const DefinePlugin = require('webpack').DefinePlugin;
const LiveReloadPlugin = require('webpack-livereload-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		publicPath: '/'
	},
	devServer: {
		contentBase: './build',
		hot: true,
		historyApiFallback: true,
		// host: '0.0.0.0',
		/*
				proxy: {
					'/api/!**': {
						target: 'http://localhost:8000',
						pathRewrite: {'^/api': ''},
						secure: false,
						changeOrigin: true,
					},
					'/static': {
						target: 'http://localhost:8000',
					}
				}
		*/
	},
	plugins: [
		new LiveReloadPlugin({
			appendScriptTag: true
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
});

