const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');

// module.exports = (user) => {
    // unsing jwt-simple
    // return jwt.encode({
    //     sub: user.id,
    //     iat: new Date().getTime(),
    // }, config.secret);

    // return jwt.sign({
    //     exp: Math.floor(Date.now() / 1000) + (60 * 60)
    // }, crypto.randomBytes(64).toString('hex'));
    // return jwt.sign({
    //     uid: user.id,
    //     sub: user.username,
    //     exp:Math.floor(Dat.now() / 1000) + (60 * 60)
    // },
    // // crypto.randomBytes(64).toString('hex'),
    // config.secret,
    // {
    //     expiresIn: 1000 * (60 * 60)
    // });
// };

module.exports.createUserToken = (user) => {
    const oneHour = Date.now() + ((60 * 60) * 1000);
    return jwt.sign({
        uid: user.id,                       // User ID.  not provided on signin but from db.
        sub: user.username,                 // User username.  not provided on signin but from db.
        req: user.requestSource || 'web',   // request source.  api, web, app, ect...
        exp: oneHour                        // timeframe before exp.
    }, config.secret);
};

module.exports.createKeyToken = (key) => {
    const oneHour = Date.now() + ((60 * 60) * 1000);
    return jwt.sign({
        uid: key.id,                        // Key ID. not provided on signin but from db.
        sub: key.key,                       // Key key.  provided from signin request.
        nam: key.name,                      // Key name.  not provided on signin but from DB.
        req: key.requestSource || 'api',    // request source.  api, web, app, ect...
        exp: oneHour                        // timeframe before exp.
    }, config.secret);
}
