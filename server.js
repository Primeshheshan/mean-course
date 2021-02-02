const http = require('http'); // require is node.js import syntax
const app = require('./backend/app'); // import app

const port = process.env.PORT || 3000;

app.set('port', port);
const server = http.createServer(app);

server.listen(port); // lisining port:3000
