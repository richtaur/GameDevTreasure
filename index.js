var Metalsmith = require("metalsmith");
var collections = require("metalsmith-collections");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var permalinks = require("metalsmith-permalinks");

Metalsmith(__dirname)
	.metadata({
		title: "Best of Game Dev",
		description: "The best articles and videos about game development, curated by obsessive indie game developer Matt Hackett.",
		generator: "Metalsmith",
		url: "http://www.metalsmith.io/"
	})
	.source("./src")
	.destination("./build")
	.clean(false)
	.use(collections({
		posts: "post/*.md"
	}))
	.use(markdown())
	.use(permalinks())
	.use(layouts({
		engine: "handlebars"
	}))
	.build(function(err, files) {
		if (err) { throw err; }
	});
