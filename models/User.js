const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config');
const hat = require('hat');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb_uri, { useMongoClient: true });

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rollingSalt: { type: String, required: true, default: 'banana' },
    avatar: { type: String },
    switches: [],
    maxSwitches: { type: Number, default: 20 },
    active: { type: Boolean, default: false },
    createdTimestamp: { type: Date, default: Date.now() },
    updatedTimestamp: { type: Date, default: Date.now() }
});

UserSchema.pre('save', function(next) {
    // generate the salt
    bcrypt.genSalt(16, (err, salt) => {
        if (err) return next(err);
        // hash password
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
        });
    });

    bcrypt.genSalt(12, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(hat(64), salt, (err, rolled) => {
            console.log(rolled);
            if (err) return next(err);
            this.rollingSalt = rolled;
            next();
        });
    });
});

UserSchema.methods.rollSalt = function(next) {
    bcrypt.genSalt(12, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(hat(64), salt, (err, rolled) => {
            if (err) return next(err);
            this.rollingSalt = rolled;
        });
    });
};

UserSchema.methods.checkPassword = function(potentialPassword, cb) {
    bcrypt.compare(potentialPassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.resaltPassword = function() {

};

module.exports = mongoose.model('User', UserSchema);
