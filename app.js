const express = require('express');
const app = express();
const path = require('path');
var debug = require('debug')('dockermon:server');
var http = require('http');
const dotenv = require('dotenv').config();

const angularPath = 'dist';

app.use(express.static(path.join(__dirname, angularPath)));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, angularPath, 'index.html'));
});

var port = normalizePort(process.env.PORT || '3800');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('node app running on http://localhost:' + port);
/**
 * Normalize a port into a number, string, or false.
 */

module.exports = app;

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
