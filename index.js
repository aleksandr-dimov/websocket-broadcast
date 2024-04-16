var http = require('http')

var express = require('express');
var app = express();

//... bunch of other express stuff here ...

var httpServer = http.createServer(app);
httpServer.listen(10000);

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    server: httpServer
});

wss.on('connection', function connection(ws) {
    wss.clients.forEach((client) => {
        client.send(client.clients)
    });
    ws.on('message', function incoming(data, isBinary) {
        const message = isBinary ? data : data.toString();
        wss.clients.forEach((client) => {
            client.send(message)
        });
    });
});
