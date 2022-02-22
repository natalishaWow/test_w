const http = require("http");
const handleApi = require("./handleApi");
const handleRoutes = require("./handleRoutes");

const host = "localhost";
const port = 8000;

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`server started at ${host}:${port}`);
})

function requestListener(request, response) {
  if (request.url.startsWith('/api/')) {
    handleApi(request, response)
  } else {
    handleRoutes(request, response)
  }
}