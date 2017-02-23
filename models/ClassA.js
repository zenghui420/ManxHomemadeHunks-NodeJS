/**
 * Created by Edmund on 2/23/2017.
 */
var mongoose = require('mongoose');
var classSchema = require("./class");

module.exports = mongoose.model('ClassA', classSchema);
