function setupAuth(User, app) {
    var passport = require('passport');
    var BaiduStrategy = require('passport-baidu').Strategy;

    // High level serialize/de-serialize configuration for passport
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.
        findOne({ _id: id }).
        exec(done);
    });

    // baidu specific
    passport.use(new BaiduStrategy({
            clientID: 'cgPBQ4OYZUpuDRGilPSvbnUU',
            clientSecret: 'HiV5ewiUNTWhFnRCWWGxqzMy50wxb5mC',
            callbackURL: 'http://localhost:3000/auth/baidu/callback'
        },
        function(accessToken, refreshToken, profile, done) {
            if (!profile.username || !profile.username.length) {
                return done('No username associated with this account!');
            }

            // console.log(profile);
            User.findOneAndUpdate({ 'data.oauth': profile.id }, {
                    $set: {
                        'profile.username': profile.username,
                        'profile.picture': profile.photos[0].value,
                        'profile.gender': profile.gender,
                        'profile.id': profile.id
                    }
                }, { 'new': true, upsert: true, runValidators: false },
                function(error, user) {
                    done(error, user);
                });

            // User.findOrCreate({ 'data.oauth': profile.id }, function(err, user) {
            //     return done(err, user);
            // });
        }));

    // Express middlewares
    app.use(require('express-session')({
        secret: 'this is a secret'
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // Express routes for auth
    app.get('/auth/baidu', passport.authenticate('baidu'), function(req, res) {});
    // app.get('/auth/baidu',
    //     passport.authenticate('baidu', { scope: ['nickname'] }));

    app.get('/auth/baidu/callback',
        passport.authenticate('baidu', { failureRedirect: '/fail' }),
        function(req, res) {
            res.send('Welcome, ' + req.user.profile.username + req.user.profile);
        });
}

module.exports = setupAuth;