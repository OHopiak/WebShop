const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const DefinePlugin = require('webpack').DefinePlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		publicPath: '/static/'
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
		}),
		new CompressionPlugin({
			test: /\.(js|css|jpe?g|png|gif|svg)/
		})
	],
});

