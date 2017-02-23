/**
 * Created by Edmund on 2/22/2017.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    time: {
        start: String,
        end: String
    },
    weekDay: Number,
    teacher: String,
    student: String
});
//
// module.exports.Class_A = mongoose.model('ClassA', class_Schema);
//
// module.exports.Class_B = mongoose.model('ClassB', class_Schema);