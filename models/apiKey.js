const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pointless-button-api';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useMongoClient: true });

const apiKeySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId },
    key: { type: String, unique: true, require: true },
    secret: { type: String, required: true },
    hostList: [{ name: String, host: { type: String, required: true } }],
    blackList: [{ name: String, host: { type: String, required: true } }]
});

module.exports = mongoose.model('apiKey', apiKeySchema);