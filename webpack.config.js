const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { watchFile } = require('fs');

class InlineJavaScriptPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap('InlineJavaScriptPlugin', (compilation) => {
			HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
				'InlineJavaScriptPlugin',
				(data, cb) => {
					const scriptTagRegex = /<script.*?src="(.*?)"><\/script>/g;
					data.html = data.html.replace(scriptTagRegex, (match, src) => {
						if (compilation.assets[src]) {
							const inlineScript = `<script>${compilation.assets[src].source()}</script>`;
							delete compilation.assets[src]; // Remove external JS file from Webpack output
							return inlineScript;
						}
						return '';
					});
					cb(null, data);
				}
			);
		});

		// Hook into the `emit` phase to remove JS files after index.html is generated
		compiler.hooks.emit.tapAsync('InlineJavaScriptPlugin', (compilation, cb) => {
			Object.keys(compilation.assets).forEach((asset) => {
				if (asset.endsWith('.js')) {
					delete compilation.assets[asset]; // Remove all .js files
				}
			});
			cb();
		});
	}
}

module.exports = (env) => {
	const isProd = env.mode === 'production';

	return {
		mode: isProd ? 'production' : 'development',
		entry: './src/js/main.js',
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'bundle.js', // This file will be deleted after inlining
			clean: true,
		},
		devServer: {
			static: path.resolve(__dirname, 'build'),
			port: 8080,
			hot: true,
			open: true,
			watchFiles: ['src/**/*.html']
		},
		optimization: {
			minimize: isProd,
			minimizer: isProd ? [new TerserPlugin()] : [],
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.scss$/,
					use: [
						isProd ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass'),
							},
						},
					],
				},
				{
					test: /\.html$/,
					use: ['html-loader'],
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				minify: isProd,
			}),
			new MiniCssExtractPlugin({ filename: 'styles.css' }),
			...(isProd ? [new HtmlInlineCSSWebpackPlugin(), new InlineJavaScriptPlugin()] : []),
		],
	};
};
