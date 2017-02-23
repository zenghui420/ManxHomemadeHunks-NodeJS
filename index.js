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

var ClassX = require(__dirname + "/models/ClassA");

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

        mongoose.createConnection(dbConfig.url);
        var ClassX = require("./models/" + data.request);
        var class_query = ClassX.findOne({}, function (err, result) {
            if (err) {
                console.log("There is an error: "+ err);
                return handleError(err);
            }
            if (!result) {
                console.log("No result!");
            }
            console.log("Hello " + result.teacher);
            io.sockets.to(id).emit("response", result);
        });

    });

});

// fs.readFile('./data/ClassAData.json', 'utf8', function (err, data) {
//     if (err) throw err; // we'll not consider error handling for now
//     var obj = JSON.parse(data);
//
//     for (var i=0; i<obj.length; i++) {
//         var newClassA = new ClassX();
//         newClassA.time.start = obj[i].time.start;
//         newClassA.time.end = obj[i].time.end;
//         newClassA.weekDay = obj[i].weekDay;
//         newClassA.teacher = obj[i].teacher;
//
//         // console.log(newClassA.teacher);
//         newClassA.save(function(err) {
//             if (err) {
//                 console.log('Error in Saving item: ' + err);
//                 throw err;
//             }
//         });
//     }
// });
//
ClassX.findOne({}, function (err, result) {
    if (err) {
        console.log("There is an error: "+ err);
        return handleError(err);
    }
    if (!result) {
        console.log("No result!");
    }
    console.log("hello");
    console.log(result.teacher);
});
// mongoose.connection.db.collection('ClassA', function (err, results) {
//     if (err) {
//         console.log("There is an error: " + err);
//         return handleError(err);
//     }
//     if (!results) {
//         console.log("No result!");
//     }
//
//     results.find().each(function (result) {
//        console.log(result.teacher)
//     });
// });

console.log("Listening on port: " + port);