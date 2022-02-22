const endpoints = [
	{
		url: "/api/message",
		resolver: require("./modules/messages/resolver"),
	},
];
const numHistory = []
const routes = {average, numbers }
function handleApi(request, response) {
	const endpoint = endpoints.find((e) => e.url === request.url);
	if (endpoint) {
		endpoint.resolver(request, response);
	} else {
		response.end("No such endpoint");
	}
}
function average(req, resp) {
	if (req.method != 'POST') {
	  resp.end(tellErrors(`icorrect method ${method}, it should be POST`))
	}
  
	getBody(req).then(JSON.parse)
	  .then(({ number, negative, float }) => {
		let lastNum = Math.abs(number)
		if (negative) lastNum = -lastNum
		if (!float) lastNum = Math.trunc(lastNum)
  
		const prevNum = numHistory.at(-1)?.lastNum ?? 0
		const average = (prevNum + lastNum) / 2
		const numObj = { prevNum, lastNum, average }
  
		numHistory.push(numObj)
  
		resp.end(JSON.stringify(numObj))
	  })
  }
  
  function numbers(req, resp) {
	if (req.method != 'GET') {
	  resp.end(tellErrors(`icorrect method ${method}, it should be GET`))
	}
	resp.end(JSON.stringify(numHistory))
  }
module.exports = handleApi;
