/**
 * Created by Edmund on 2/22/2017.
 */

var ClassA = require('./models/ClassA');
var mongoose = require('mongoose');
var dbConfig = require('./db');
var fs = require('fs');

mongoose.connect(dbConfig.url, {
    server: {
        socketOptions: {
            socketTimeoutMS: 0,
            connecTimeoutMS: 0
        }
    }
});

fs.readFile('./data/ClassAData.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
    // console.log(obj[0].teacher);

    for (var i=0; i<obj.length; i++) {
        var newClassA = new ClassA();
        newClassA.time.start = obj[i].time.start;
        newClassA.time.end = obj[i].time.end;
        newClassA.weekDay = obj[i].weekDay;
        newClassA.teacher = obj[i].teacher;

        // console.log(newClassA.teacher);
        newClassA.save(function(err) {
            if (err) {
                console.log('Error in Saving item: ' + err);
                throw err;
            }
        });
    }
});

// ClassA.findOne({}, function (err, result) {
//     if (err) {
//         console.log("There is an error: "+ err);
//         return handleError(err);
//     }
//     if (!result) {
//         console.log("No result!");
//     } else {
//         console.log(result.teacher);
//     }
// });