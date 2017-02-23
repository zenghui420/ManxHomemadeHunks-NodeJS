/**
 * Created by Edmund on 2/8/2017.
 */

var express = require("express");
var fs = require('fs');

var app = express();
var port = 2046;

var mongoose = require("mongoose");
var dbConfig = require('./db');
mongoose.connect(dbConfig.url);

app.set('views', __dirname + '/views');
app.set('view engine', "pug");
app.engine("pug", require("pug").__express);
app.get("/", function (req, res) {
    res.render("index");
});

app.get("/",function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

var io = require("socket.io").listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    var id = socket.id;
    socket.on('request', function (data) {

        // mongoose.createConnection(dbConfig.url);
        var ClassX = require("./models/" + data.request);
        var class_query = ClassX.find({}, function (err, result) {
            if (err) {
                console.log("There is an error: "+ err);
                return handleError(err);
            }
            if (!result) {
                console.log("No result!");
            } else {
                // console.log("Hello " + result[0].teacher);
                io.sockets.to(id).emit("response", result);
            }
            // mongoose.connection.close();
        });

    });

});

console.log("Listening on port: " + port);