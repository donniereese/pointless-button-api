// Get schema from mongoose
const Schema = require('mongoose').Schema;
// make sure we have real promises, just in case
mongoose.Promise = global.Promise;

// Default Input Schema Structure
const baseInputStructure = {
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, default: '' },
    desription: { type: String, default: '' },
    type: { type: String, required: true },
    tags: [{ type: String }],
    public: Boolean,
    publicToFriends: Boolean,
    disabled: Boolean,
    state: {},
    valueStore: [],
    conditionals: {},
    createdTimestamp: { type: Date, default: Date.now() },
    updatedTimestamp: { type: Date, default: Date.now() }
}

//Export Button Schema
module.exports.Button = new mongoose.Schema({
   owner: { type: mongoose.Schema.Types.ObjectId, required: true },
   name: { type: String, default: '' },
   desription: { type: String, default: '' },
   type: {},
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
