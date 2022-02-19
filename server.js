const http = require('http');

const requestListener = (req, res) => {
  res.writeHeader(200, { 'content-Type': 'text/plain' });
  res.write('Hello');
  res.end();
};

const server = http.createServer(requestListener);
server.listen(3005);
