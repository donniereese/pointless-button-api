const mongoose = require('mongoose');
const randomWord = require('random-word');
const config = require('../config');
const random = require('../services/random.js');
const Key = require('./Key.js');
const bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb_uri, config.mdbOptions);

const apiKeySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId },
    key: { type: String, unique: true, require: true },
    secret: { type: String, required: true },
    name: { type: String },
    description: { type: String },
    hostList: [{ name: String, host: { type: String, required: true } }],
    blackList: [{ name: String, host: { type: String, required: true } }]
});

apiKeySchema.pre('save', function(next) {
    console.log('presave...');
    if (!this.name) {
        const word = randomWord();
        const numbers = random.array(0, 99999999, 8, 20, 'number');
        const keyNames = numbers.map(num => `${word}-${num}`);
        mongoose.model('apiKey', apiKeySchema).
        find({ name: { $in: keyNames } }).
        then(keys => keyNames.filter(k => !keys.includes(k))).
        then((freeNames) => {
            if (freeNames.length === 0) throw new Error('names pool failed.');
            const pick = random.number(0, freeNames.length);
            this.name = freeNames[pick];
            next();
        }).
        catch((err) => {
            console.log(err);
        });
    }
    next();
});

apiKeySchema.methods.encryptSecret = function(cb) {
    bcrypt.genSalt(14, (err, salt) => {
        bcrypt.hash(this.secret, salt, (err, encrypted) => {
            if (err) throw err;
            this.secret = encrypted;
            cb();
        });
    });
};

apiKeySchema.methods.checkSecret = function(potentialSecret, cb) {
    bcrypt.compare(potentialSecret, this.secret, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('apiKey', apiKeySchema);

/**** Notes ***********
 * pre:save
 * If a name is not provided, it should create a name based on rules and verify it doesn't exist.
 * 1. need to generate a random word.
 * 2. generate an array of random numbers of a certain length.
 * 3. map the array so that all indeces have a standard word-number pair.
 * 4. search the keys for any matching.
 * 5. remove matching results from generated pairs.
 * 6. if none left, try again. LOG THIS ISSUE
 * 7. pick one that's left at random.
 * 8. generate key.
 */
