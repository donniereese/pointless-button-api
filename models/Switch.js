const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb_uri, config.mdbOptions);

const SwitchSchema = new mongoose.Schema({
   owner: { type: mongoose.Schema.Types.ObjectId, required: true },
   name: { type: String, default: '' },
   desription: { type: String, default: '' },
   type: { type: String, required: true, default: 'and' },
   tags: [{ type: String }],
   public: Boolean,
   publicToFriends: Boolean,
   disabled: Boolean,
   state: {},
   valueStore: [],
   conditionals: {},
   createdTimestamp: { type: Date, default: Date.now() },
   updatedTimestamp: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Switch', SwitchSchema);
