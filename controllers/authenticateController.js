// token creators
const { createUserToken, createKeyToken } = require('../services/token.js');
// Error helper
const ear = require('../services/ear');

/* API authenticate Routes
 *
 *
 */

module.exports.apiKey = (req, res) => {
    // get the usable data
    const data = req.user;
    // construct the token
    const token = createKeyToken({
        id: data.id,
        key: data.key,
        name: data.name
    });
    res.json({ status: true, token });
};

module.exports.userAccountLogin = (req, res) => {
    // so a user was authenticated by passport...
    // TODO: gather bits for the token....
    const u = { id, username } = req.user;
    // TODO: Call thing to make token...
    // TODO: return error if token maker fails...
    // TODO: return token if successful.
    // TODO: get if request is from web or app... look for source.
    const token = createUserToken(u);
    res.json({ status: true, token });
};
