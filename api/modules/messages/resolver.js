const path = require("path");
const process = require("process");
const { writeFile } = require("fs").promises;

const messagesPath = path.resolve(process.cwd(), "db/messages.json");
let messages = require(messagesPath);

const updateMessages = async (messages) => {
  console.log('WRITE FILE', messages)
	return writeFile(messagesPath, JSON.stringify(messages));
}

const addMessage = (message) => {
	const datetime = JSON.parse(JSON.stringify(new Date()));
	messages.push({ id: new Date().getTime(), ...message, datetime });
	return updateMessages(messages);
};

const deleteMessage = ({ id }) => {
	const i = messages.findIndex((msg) => msg.id == id);
	if (i >= 0) messages.splice(i, 1);
	return updateMessages(messages);
};

const getBody = (request, callback) => {
	let body = [];
	request
		.on("data", (chunk) => {
			body.push(chunk);
		})
		.on("end", () => {
			body = JSON.parse(Buffer.concat(body).toString());
			callback(body);
		});
};

module.exports = function (request, response) {
	switch (request.method) {
		case "POST":
			getBody(request, (body) => {
				addMessage(body).then(() => {
					response.end();
				});
			});
		case "DELETE":
			getBody(request, (body) => {
				deleteMessage(body).then(() => {
					response.end();
				});
			});
		default:
			response.end("Unrecognized request");
	}
};
