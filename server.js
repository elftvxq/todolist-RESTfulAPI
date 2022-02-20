const http = require('http');
const { v4: uuidv4 } = require('uuid');

const todos = [];

const requestListener = (req, res) => {
  const headers = {
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS, DELETE',
    'Content-Type': 'application/json',
  };

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  // only user access to the homepage and only by "GET" method
  if (req.url == '/todos' && req.method == 'GET') {
    res.writeHeader(200, headers);
    // request can only recognize string, turn object into string for parsing
    res.write(
      JSON.stringify({
        status: 'success',
        data: todos,
      })
    );
    res.end();
  } else if (req.url == '/todos' && req.method == 'POST') {
    // req on end: make sure to get the request data
    req.on('end', () => {
      const { title } = JSON.parse(body);
      // get data and make send body
      const todo = {
        title: title,
        id: uuidv4(),
      };

      todos.push(todo);
      res.writeHeader(200, headers);
      res.write(
        JSON.stringify({
          status: 'success',
          data: todos,
        })
      );
      res.end();
    });
  } else if (req.method == 'OPTIONS') {
    res.writeHeader(200, headers);
    res.end();
  } else {
    res.writeHeader(404, headers);
    res.write(
      JSON.stringify({
        status: 'false',
        message: '無此網站路由',
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(3005);
