const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
	entry: "./client/index.js",
	devServer: {
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true,
		stats: "minimal",
		proxy: { "/api/*": "http://localhost:8080" }
	},
	devtool: "eval-source-map",
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: { presets: ["@babel/react"] }
			},
			{ test: /\.css$/i, use: ["style-loader", "css-loader"] },
			{
				test: /\.s[ac]ss$/i,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{
						loader: "postcss-loader",
						options: { postcssOptions: { plugins: ["autoprefixer", "precss"] } }
					},
					{ loader: "sass-loader" }
				]
			},
			{ test: /\.(png|svg|jpe?g|gif)$/, loader: ["file-loader"] }
		]
	},
	output: { filename: "bundle.js", path: path.join(__dirname, outputDirectory) },

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./static/template/index.html",
			favicon: "./static/template/favicon.ico",
			title: "React-Express-Template"
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
