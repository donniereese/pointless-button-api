const mongoose - require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pointless-button-api';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useMongoClient: true });

const SwitchSchema = new mongoose.Schema({
   owner: { type: mongoose.Schema.Types.ObjectId, required: true },
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