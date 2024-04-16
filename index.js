var fs = require('fs')
var https = require('https')
var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

//... bunch of other express stuff here ...

//pass in your express app and credentials to create an https server
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(3001);

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    server: httpsServer
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

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
