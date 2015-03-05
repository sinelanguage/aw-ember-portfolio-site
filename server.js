/* Simple static file server built in Node.js: By Adam Winick: www.adamwinick.com */

var http = require('http');
var url = require('url');
var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(3000);

console.log("Server has started and listening on port: 3000");