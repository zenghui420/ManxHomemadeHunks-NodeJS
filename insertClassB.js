/**
 * Created by Edmund on 2/22/2017.
 */
var ClassB = require('./models/ClassB');
var mongoose = require('mongoose');
var dbConfig = require('./db');
var fs = require('fs');

mongoose.connect(dbConfig.url);

fs.readFile('./data/ClassBData.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
    // console.log(obj[0].teacher);

    for (var i=0; i<obj.length; i++) {
        var newClassB = new ClassB();
        newClassB.time.start = obj[i].time.start;
        newClassB.time.end = obj[i].time.end;
        newClassB.weekDay = obj[i].weekDay;
        newClassB.teacher = obj[i].teacher;

        // console.log(newClassA.teacher);
        newClassB.save(function(err) {
            if (err) {
                console.log('Error in Saving item: ' + err);
                throw err;
            }
        });
    }
});

// ClassB.findOne({}, function (err, result) {
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