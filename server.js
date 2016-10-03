var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var path = require('path');
app.use(express.static(path.join(__dirname)));

/*CORS*/
app.all('*', function(req, res, next) {
        var allowedOrigins = ['http://127.0.0.1:8090', ];
        var origin = req.headers.origin;
        if (allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });
/*API call*/
app.get('/emit', function(req, res, next) {
	/*Emit the message you want to send.*/
    io.emit("testing",{
    	name : "Saras"
    });
    res.sendStatus(200);
});
/*Initialize the server*/
server.listen(8090, function() {
    console.log("Express server listening on port " + 8090);
});