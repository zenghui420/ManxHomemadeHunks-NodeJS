/**
 * Created by Edmund on 2/8/2017.
 */

var express = require("express");
var app = express();
var port = 2046;

app.get("/",function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

var io = require("socket.io").listen(app.listen(port));

io.sockets.on('connection', function (socket) {
   socket.on('request', function (data) {
      io.sockets.emit('response', {name: data.request});
   });

});

console.log("Listening on port: " + port);