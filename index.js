var Metalsmith = require("metalsmith");
var collections = require("metalsmith-collections");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var permalinks = require("metalsmith-permalinks");
var handlebars = require("handlebars");
var moment = require("moment");
var fs = require("fs");

const URL = "http://www.gamedevtreasure.com";

// Helper: formatDate
handlebars.registerHelper("formatDate", function (date) {
	var mom = moment(date);
	return mom.format("MMM D, Y");
});

// Helper: link
handlebars.registerHelper("link", function (path) {
	return URL + "/" + path;
});

// Partial: header
var headerContents = fs.readFileSync("layouts/header.html", "utf8");
handlebars.registerPartial("header", headerContents)

// Partial: footer
var footerContents = fs.readFileSync("layouts/footer.html", "utf8");
handlebars.registerPartial("footer", footerContents)

Metalsmith(__dirname)
	.metadata({
		siteName: "Game Dev Treasure",
		description: "The best articles and videos about game development, curated by obsessive indie game developer Matt Hackett.",
		url: URL,
		date: new Date()
	})
	.source("./src")
	.destination("./build")
	.clean(false)
	.use(collections({
		posts: {
			pattern: "post/*.md",
			sortBy: "date",
			reverse: true
		}
	}))
	.use(markdown())
	.use(permalinks())
	.use(layouts({
		engine: "handlebars"
	}))
	.build(function(err, files) {
		if (err) { throw err; }
	});
