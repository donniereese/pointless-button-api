const mongoConfig = require('./db');

module.exports = {
    secret: process.env.sessionSecret || 'test server secret',
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/pointless-button-api-test',
    port: process.env.PORT || 3000,
    mdbOptions: mongoConfig.connectConfig,
}
