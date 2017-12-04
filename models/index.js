const userModel = require('./User.js');
const apiKeyModel = require('./Key.js');
const buttonModel = require('./Button.js');
const switchModel = require('./Switch.js');

module.exports = {
    User: userModel,
    APIKey: apiKeyModel,
    Switch: switchModel,
    Button: buttonModel
}
