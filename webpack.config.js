var debug = process.env.NODE_ENV !== "production";

module.exports = 
{
	entry:
	{
		LoginPage: "./src/LoginPage/entry.js",
		MainPage: "./src/MainPage/entry.js",
		TjazPage: "./src/TjazPage/entry.js"
	},
	output:
	{
		path: __dirname,
		filename: "./public/javascripts/[name].bundle.js"
	},
	plugins: debug ? [] : 
	[
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
		new webpack.optimize.OccurrenceOrderPlugin()
	],
	module:
	{
		rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
	}
};