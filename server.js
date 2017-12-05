const app = require('./app.js');
const http = require('http');

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(app.get('port'), () => console.log(`API running on localhost:${app.get('port')}`));