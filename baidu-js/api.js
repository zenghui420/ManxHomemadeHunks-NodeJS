var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
    var api = express.Router();

    api.use(bodyparser.json());

    api.get('/logout', function(req, res) {
        if (!req.user) {
            return res.status(status.UNAUTHORIZED).json({ error: 'Not logged in' });
        }
        req.logout();
        res.redirect('/api/v1/');
    });

    api.get('/me', function(req, res) {
        if (!req.user) {
            return res.
            status(status.UNAUTHORIZED).
            json({ error: 'Not logged in' });
        }
        return res.json({ user: req.user });
        // req.user.populate({ path: 'data.cart.product', model: 'Product' }, handleOne.bind(null, 'user', res));
    });

    api.get('/', function(req, res) {
        res.send('Manx Corporation Tester Running...\nSign in please...');
    })

    return api;
};

function handleOne(property, res, error, result) {
    if (error) {
        return res.
        status(status.INTERNAL_SERVER_ERROR).
        json({ error: error.toString() });
    }
    if (!result) {
        return res.
        status(status.NOT_FOUND).
        json({ error: 'Not found' });
    }

    var json = {};
    json[property] = result;
    res.json(json);
}