const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const fs = require('fs');

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

		// Remove JS files after embedding
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
	const srcPath = path.resolve(__dirname, 'src');
	const buildPath = path.resolve(__dirname, 'build');
	const imagesPath = path.join(srcPath, 'images');
	const hasImages = fs.existsSync(imagesPath) && fs.readdirSync(imagesPath).length > 0;

	return {
		mode: isProd ? 'production' : 'development',
		devtool: isProd ? false : 'inline-source-map',
		entry: path.join(srcPath, 'js/main.js'),
		output: {
			filename: 'bundle.js', // Will be removed after inlining
			path: buildPath,
			clean: true,
		},
		optimization: {
			minimize: isProd,
			minimizer: isProd ? [new TerserPlugin()] : [],
		},
		performance: {
			maxAssetSize: 512000,
			maxEntrypointSize: 512000,
			hints: false,
		},
		devServer: {
			static: {
				directory: buildPath,
			},
			port: 3399,
			hot: true,
			open: true,
			watchFiles: ['src/**/*.html'],
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
						'postcss-loader',
						{
							loader: 'sass-loader'
						},
					],
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf)$/,
					type: 'asset/resource',
					generator: {
					  filename: 'fonts/[name][ext]'
					}
				},
				{
					test: /\.(png|jpe?g|gif|svg|webp)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'images/[name][ext]',
					},
				},
				{
					test: /\.html$/,
					use: ['html-loader']
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				filename: 'index.html',
				minify: isProd,
			  }),
			  ...(isProd
				? []
				: [
					new HtmlWebpackPlugin({
					  template: './src/icons.html',
					  filename: 'icons.html',
					}),
				  ]),
			new MiniCssExtractPlugin({ filename: 'styles.css' }),
			...(isProd ? [
				new HtmlInlineCSSWebpackPlugin(),
				new InlineJavaScriptPlugin(),
			] : []),
			...(hasImages
				? [
						new CopyWebpackPlugin({
							patterns: [
								{ from: path.join(srcPath, 'images'), to: path.join(buildPath, 'images'), force: true },
								{ from: path.join(srcPath, 'fonts'), to: path.join(buildPath, 'fonts'), force: true },
							],
						}),
				  ]
				: []),
		],
		resolve: {
			extensions: ['.js', '.jsx', '.scss'],
		},
	};
};
