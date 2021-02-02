const http = require('http'); // require is node.js import syntax

const server = http.createServer((req, res) => {
  res.end("This is my first response");
});

server.listen(process.env.PORT || 3000); // lisining port:3000
