// The user model
const User = require('../models/User.js');
// Api Key model
const Key = require('../models/Key.js');
// require hat module
const hat = require('hat');
// require bcrypt module
const bcrypt = require('bcrypt');
// Error helper
const ear = require('../services/ear');

module.exports.getAuthorizedUserAccount = (req, res) => {
        res.json({});
};

module.exports.registerNewAccount = (req, res) => {
    // Get expected data and disregard the rest
    const { email, username, password, confirmPassword } = req.body;
    // check to see if it's all there
    if (!email || !username || !password || !confirmPassword)
        return res.status(err.status.USER_ERR).json({ error: 'missing data' });
    // Check to verify passwords match one another
    if (password !== confirmPassword)
        return res.status(err.status.USER_ERR).json({ error: 'password does not match password check.' });
    // Create new user instance
    const user = new User({ email, username, password });
    // Save the user
    user.save((err, u) => {
        if (err)
            return res.status(ear.status.SERVER_ERR).json({ stack: err.stack, message: err.message });
        res.json(u);
    });
};

module.exports.createNewApiKey = (req, res) => {
    // token
    const token = req.user;
    // get account from token... just in case
    User.findById(token.uid, (err, user) => {
        // Mongo Error
        if (err) return res.status(err.status.SERVER_ERR).json({ error: 'server error.' });
        // No user found by id...
        if (!user) return res.status(err.status.USER_ERR).json({ error: 'identity unsure' });
        // New API Key
        const key = new Key({
            owner :user.id,
            key: hat(),
            secret: hat(256)
        });
        key.save((err, k) => {
            // Mongo Error
            if (err) return res.status(ear.status.SERVER_ERR).json({ status: false, error: 'server error.', stack: err.stack });
            // get the secret and key.  only chance before encryption.
            const output = { key: k.key, secret: k.secret };
            // encrypt secret now
            k.encryptSecret(() => {
                k.save((err, ks) => {
                    // error...
                    if (err) return res.status(ear.status.SERVER_ERR).json({ status: false, error: 'key error' });
                    // return true, not the key.
                    res.json({ status: true, key: output });
                });
            });
        });
    });
};


module.exports.getApiKeysList = (req, res) => {
    res.json({});
};


module.exports.getApiKeyById = (req, res) => {
    rs.json({});
};

module.exports.getApiKeyByName = (req, res) => {
    Key.
    find({ occupation: /host/ }).
    where('owner').equals(req.user.uid).
    then((keys) => {
        // keys
    }).
    catch((err) => {
        // catch error
    });
}
