const passport = require('passport');
const User = require('../models').User;
const Key = require('../models').APIKey;
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

/* Options Confurations
 *
 *
 */
// User Signin options
const userSigninOptions = {
    usernameField: 'email',
};

//  JWT Authorization options
const authOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('token'),
    secretOrKey: config.secret,
};

// API key:secret signin Options
const apiSigninOptions = {
    usernameField: 'key',
    passwordField: 'secret'
}


/* Strategy Creation
 *
 *
 */
//
const requireAdminOrResourceOwnerStrategy = new JwtStrategy(authOptions, (payload, done) => {
    console.log('requireAdminOrResourceOwner::::');
    console.log(payload);


    return done(null, { banana: 'no banana' }, { message: 'Not implemented' });
});

//
const requireAdminStrategy = new JwtStrategy(authOptions, (payload, done) => {
    console.log('requireAdmin::::');
    console.log(payload);
    return done(null, false, { message: 'Not implemented' });
});

//
const requireResourceOwnerStrategy = new JwtStrategy(authOptions, (payload, done) => {
    console.log('requireResourceOwnerStrategy::::');
    console.log(payload);
    return done(null, false, { message: 'Not implemented' });
});

//
const requireAuthStrategy = new JwtStrategy(authOptions, (payload, done) => {
    // Authenticate a token from a api key:secret login
    console.log('requireAuthStrategy::::');
    // find the key listed in the payload
    Key.findById(payload.uid, (err, key) => {
        // if error
        if (err) return done(err);
        // if no error but no key found
        if (!key) return done(null, false);
        // key found
        // key match?
        if (key.key !== payload.sub) return done(null, false);
        // name check
        if (key.name !== payload.nam) return done(null, false);
        // expiration check
        if (Date.now() >= payload.exp) {
            return done(null, false);
        }
        return done(null, payload);
    });
});

// bearer token from email:password signin
const requireUserAuthStrategy = new JwtStrategy(authOptions, (payload, done) => {
    // Authenticate a token from a user:password login
    console.log('requireUserAuthStrategy::::');
    // console.log('Payload: ', payload);
    User.findById(payload.uid, (err, user) => {
        // if error
        if (err) return done(err);
        // if no Error but no user
        if (!user) return done(null, false);
        // user found
        // if username doesn't match
        if (user.username !== payload.sub) return done(null, false);
        // expiration check
        if (Date.now() >= payload.exp) {
            return done(null, false);
        }
        return done(null, payload);
    });


    // return done(null, payload);
});

//
const requireUserSigninStrategy = new LocalStrategy(userSigninOptions, (email, password, done) => {
    // Find the user
    User.findOne({ email }, (err, user) => {
        // if error
        if (err) return done(err);
        // if no user
        if (!user) return done(null, false);
        user.checkPassword(password, (err, isMatch) => {
            // error returned from checkPassword
            if (err) return done(err);
            // matched false
            if (!isMatch) return done(null, false);
            // everything is good
            return done(null, user);
        });
    });
});

const requireApiSigninStrategy = new LocalStrategy(apiSigninOptions, (username, password, done) => {
    console.log('requireApiSigninStrategy::::');
    const key = username;
    const secret = password;
    console.log(key, secret);
    Key.findOne({ key }, (err, k) => {
        console.log(err, k);
        // error catch
        if (err) return done(err);
        // if no key found
        if (!k) return done(null, false);
        // check the secret supplied against stored
        k.checkSecret(secret, (err, isMatch) => {
            // error returned from checkSecret
            if (err) return done(err);
            // match returned false
            if (!isMatch) {
                console.log('isMatch', isMatch);
                return done(null, false);
            }
            // everything seems good
            return done(null, k);
        });
    });
});


/* Have Passport use middleware
 *
 *
 */
passport.use('requireAdminOrResourceOwner', requireAdminOrResourceOwnerStrategy);
passport.use('requireAdmin', requireAdminStrategy);
passport.use('requireResourceOwner', requireResourceOwnerStrategy);
passport.use('requireAuth', requireAuthStrategy);
passport.use('requireUserAuth', requireUserAuthStrategy);
passport.use('requireUserSignin', requireUserSigninStrategy);
passport.use('requireApiSignin', requireApiSigninStrategy);                         // Unsure if necessary


/* Authentication Middleware
 *
 *
 */
// Require Admin or Resource Owner to be signed in (level 2 and above)
const requireAdminOrResourceOwner = passport.authenticate('requireAdminOrResourceOwner', { session: false });

// Require Admin to be signed in (level 3)
const requireAdmin = passport.authenticate('requireAdmin', { session: false });

// Require Resource Owner to be signed in (level 2)
const requireResourceOwner = passport.authenticate('requireResourceOwner', { session: false });

// Authentication Middleware
const requireAuth = passport.authenticate('requireAuth', { session: false });

// Authentication Middleware
const requireUserSignin = passport.authenticate('requireUserSignin', { session: false });

// Authentication Middleware
const requireUserAuth = passport.authenticate('requireUserAuth', { session: false });

// Authentication Middleware
const requireApiSignin = passport.authenticate('requireApiSignin', { session: false });


// Export Authentication Middleware
module.exports = {
    requireAdminOrResourceOwner,
    requireAdmin,
    requireResourceOwner,
    requireAuth,
    requireUserAuth,
    requireUserSignin,
    requireApiSignin
}




// authenticate using local strategies, depending on whether the route is the user or company interface
// app.post('/user/login',
//     passport.authenticate(
//         'user', { successRedirect: '/user/home', failureRedirect: '/user/login' }
//     )
// );
//
// app.post('/company/login',
//     passport.authenticate(
//         'company', { successRedirect: '/company/home', failureRedirect: '/company/login' }
//     )
// );
