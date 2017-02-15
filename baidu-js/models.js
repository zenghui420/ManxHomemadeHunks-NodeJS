var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
    mongoose.connect('mongodb://localhost:27017/test');

    var User =
        mongoose.model('User', require('./user'), 'users');

    var models = {
        User: User
    };

    // To ensure DRY-ness, register factories in a loop
    _.each(models, function(value, key) {
        wagner.factory(key, function() {
            return value;
        });
    });

    return models;
};