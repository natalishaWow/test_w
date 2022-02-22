const fs = require("fs");
const contentTypes = require("./contentTypes");
const messages = require("../db/messages.json");
const messageTemplate = require("./modules/messages/template");

function handleRoutes(request, response) {
	const extension = request.url.match(/\.([^\/.]*)$/)?.[1];
	const url = getUrl(request, extension);
	fs.readFile(`public${url}`, { encoding: "utf8" }, (error, data) => {
		if (error) {
			handle404(response);
		} else {
			response.setHeader("content-type", contentTypes[extension || "html"]);
			const html = getHtml(request, data);
			response.end(html);
		}
	});
}

function handle404(response) {
	fs.readFile("public/404.html", { encoding: "utf8" }, (error, data) => {
		if (error) {
			response.writeHead(302, { location: "/index.html" });
			response.end();
		} else {
			response.setHeader("content-type", contentTypes.html);
			response.statusCode = 404;
			response.end(data);
		}
	});
}

function getHtml(request, data) {
	if (["/messages", "messages.html"].includes(request.url)) {
		return data.replace(
			"%PAGE_CONTENT%",
			messages.map(messageTemplate).reverse().join("")
		);
	}
	return data;
}

function getUrl(request, extension) {
	if (request.url === "/") {
		return "/index.html";
	}
	return extension ? request.url : `${request.url}.html`;
}

module.exports = handleRoutes;
