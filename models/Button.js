const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb_uri, { useMongoClient: true });

const ButtonSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, default: '' },
    desription: { type: String, default: '' },
    type: { type: String, required: true, default: 'button' },
    tags: [{ type: String }],
    public: { type: Boolean, default: false },
    publicToFriends: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    defaultEvent: { type: String, default: 0 },
    events: [],
    state: {},
    valueStore: [],
    conditionals: {},
    createdTimestamp: { type: Date, default: Date.now() },
    updatedTimestamp: { type: Date, default: Date.now() }
});

ButtonSchema.pre('save', function(next) {
    this.type = 'button';
    this.events.push({
        name: 'pressed',
        type: 'addto',
        value: 'presses',
        ammount: 1,
        uri: 'none'
    });
    this.defaultEvent = 0;
    next();
});

ButtonSchema.methods.trigger = function (event = 'default') {
    return new Promise((resolve, reject) => {
        // event doesn't exist
        if (!this.events[event]) reject({ status: false, error: 'nonexistent event' });

        switch (this.events[event].type) {
            case 'addto': {

                break;
            }
            case 'subtractfrom': {

                break;
            }
            case 'call': {

                break;
            }
            case 'request': {

                break;
            }
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
};

module.exports = mongoose.model('Input', ButtonSchema);

/* Explainer...
 * possible events: [pressed]
 *
 * event actions:
 *  - addto             -- add ammount to variable in store
 *  - subtractfrom      -- subtract ammount from variable in store
 *  - call              -- call function
 *  - request           -- make request to api
 *
 *
 *
 */
