const http = require('http');

const requestListener = (req, res) => {
  const headers = {
    'content-Type': 'text/plain',
  };
  // only user access to the homepage and only by "GET" method
  if (req.url == '/' && req.method == 'GET') {
    res.writeHeader(200, headers);
    res.write('123');
    res.end();
  } else {
    res.writeHeader(404, headers);
    res.write('not found 404');
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(3005);
