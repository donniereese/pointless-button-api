// ear error management
const ear = require('../services/ear');
// Switch model
const { Switch } = require('../models');
/* API switches Routes
 *
 *
 */

module.exports.getSwitches = (req, res) => {
    const { user } = req;
    if (!user) res.status(ear.status.USER_ERR).json({ status: false, error: 'session error' });

    Switch.find({ owner: user.uid }).
    then((switches) => {
        res.json(switches);
    }).
    catch((err) => {
        console.log(err);
        res.status(ear.status.SERVER_ERR).json({ status: false, error: 'server error' })
    });
};

module.exports.getPublicSwitches = (req, res) => {
    res.json([]);
};
