const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pointlessButton', config.mbdOptions);

const SwitchSchema = new mongoose.model({
   owner: { type: Schema.Types.ObjectId, required: true },
   name: { type: String, default: '' },
   desription: ,
   tags: [{ type: String }],
   public: Boolean,
   publicToFriend Boolean,
   disabled: Boolean,
   state: ,
   valueStore: ,
   conditionals: ,
   createdTimestamp: { type: Date, default: Date.now() },
   updatedTimestamp: { type: Date, default: Date.now() }

});

module.exports = mongoose.model('Switch', SwitchSchema);
