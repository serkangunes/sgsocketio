var express = require("express");
var dateFormat = require("dateformat");
var app = express.createServer();
var io = require("socket.io").listen(app);

app.configure(function(){
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res)
{
    res.sendfile("index.html");
});

app.listen(80);

var clients = [];

io.configure(function ()
{
    io.set("log level", 1);
});

io.sockets.on("connection", function(socket) {
    clients.push(socket);

    socket.on('disconnect', function () {
        clients.splice (clients.indexOf(socket), 1);
    });
});


dateFormat.masks.time  = "HH:MM:ss";

setInterval(function(){

    var currentTime = new Date();

    for(var i = 0; i < clients.length; i++)
    {
        var socket = clients[i];
        if(socket) {
            socket.emit("clock", dateFormat(currentTime, "time"));
        }
    }
}, 1000);