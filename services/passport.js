const passport = require('passport');
const User = require('../models').User;
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const localOpts = {
    usernameField: 'email',
};

const localLogin = new LocalStrategy(localOpts, (username, password, done) => {
    // Find a user from the database
    User.findOne({ username }, (err, user) => {
        // if there was an error
        if (err) return done(err);
        // if no user was found
        if (!user) return done(null, false);
        user.checkPassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch) return done(null, false);
            return done(null, user);
        });
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        done(null, false);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = {
    requireAuth: passport.authenticate('jwt', { session: false }),
    requireSignIn: passport.authenticate('local', { session: false }),
    requireAdmin: passport.authenticate('', { session: false }),
    requireResourceOwner: passport.authenticate('', { session: false }),
    requireAdminOrResourceOwner: passport.authenticate('', { session: false }),

};
