var path = require('path');

module.exports = {
	/* Use entry to tell webpack where to look to create bundle */
	entry: "./app/assets/scripts/app.js",
	output: {
		/* Resolve for absolute path */
		path: path.resolve(__dirname, "./app/temp/scripts"),
		filename: "app-compiled.js"
	}
}