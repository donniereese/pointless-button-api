const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pointless-button-api';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURII, { useMongoClient: true });

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true. unique: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String },
    switches: [],
    maxSwitches { type: Number, default: 20 },
    active: { type: Boolean, default: false },
    createdTimestamp: { type: Date, default: Date.now() },
    updatedTimestamp: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('User', UserSchema);