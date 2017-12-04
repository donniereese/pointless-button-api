// ear error and status handling helper
const ear = require('../services/ear');
// Button Model
const { Button } = require('../models');
/* API buttons Routes
 *
 *
 */

module.exports.filter = (req, res) => {
    const { user } = req;
    if (!user) res.status(ear.status.USER_ERR).json({ status: false, error: 'authorization error' });
};

 module.exports.getButtons = (req, res) => {
    const { user } = req;
    if (!user) res.status(ear.status.USER_ERR).json({ status: false, error: 'authorization error' });

    Button.find({ owner: user.uid }).
    then((buttons) => {
        res.json({ status: true, buttons });
    }).
    catch((err) => {
        res.status(ear.status.SERVER_ERR).json({ status: false, error: 'server error' });
    });
};

module.exports.getPublicButtons = (req, res) => {
    res.json({});
};

module.exports.getButtonById = (req, res) => {
    res.json({});
};

module.exports.getButtonByOwnerId = (req, res) => {
    res.json({});
};

module.exports.createButton = (req, res) => {
    const { user } = req;
    if (!user) return res.status(ear.status.USER_ERR).json({ status: false, error: 'authorization error' });

    const buttonData = req.body;
    if (!buttonData) res.status(ear.status.USER_ERR).json({ status: false, error: 'supplied data missing' });

    buttonData.owner = user.uid;

    const button = new Button(buttonData);
    button.save().
    then((b) => {
        if (!b.id) return res.status(ear.status.USER_ERR).json({ status: false, error: 'malformed button data' });

        res.json({ status: true, button: b });
    }).
    catch((err) => {
        res.status(ear.status.SERVER_ERR).json({ status: false, error: 'server error', message: err.message, stack: err.stack });
    });
};

module.exports.removeButtonById = (req, res) => {
    const { buttonId } = req.params;
    const { user } = req;

    Button.remove({ id: buttonId, owner: user.uid }).
    then((button) => {
        if (!button) return res.status(ear.status.USER_ERR).json({ status: false, error: 'no button found for user' });

        res.json({ status: true, removed: button });
    }).
    catch((err) => {
        res.status(ear.status.SERVER_ERR).json({ status: false, error: 'button access error' });
    });
};

module.exports.triggerButtonById = (req, res) => {
    const { buttonId } = req.params;

    Button.findById(buttonId).
    then((button) => {
        // error on no button returned
        if (!button.id) return res.status(ear.status.USER_ERR).json({ status: false, error: 'button does not exist' });
        // get button default action
        const defaultEvent = button.defaultEvent;
        // deos event exist?
        if (!defaultEvent) return res.json({ status: false, error: 'button did not have a default event.' });
        // get values from event
        const { type, value, ammount, uri } = button.events[defaultEvent];
        // error if no event values
        if (!value || !ammount || !uri) return res.json({ status: false, error: 'event error' });
        // trigger default event based on type
        switch (type) {
            case 'addto': {
                button.valueStore[value] += ammount;
                break;
            }
            case 'subtractfrom': {
                button.valueStore[value] -= ammount;
                break;
            }
            case 'call': {
                // todo
                break;
            }
            case 'request': {
                // todo
                break;
            }
            default: {
                button.valueStore[clicked] += 1;
            }
        }

        button.save().then((b) => {
            if (!b) return res.status(ear.status.USER_ERR).json({ status: false, error: 'error with user input' });

            res.json({ status: true, message: 'button clicked!' });
        }).catch((err) => {
            res.status(ear.status.SERVER_ERR).json({ status: false, error: 'error with saving button event' });
        });
    }).
    catch((err) => {
        res.status(ear.status.SERVER_ERR).json({ status: false, error: 'server error', message: err.message, stack: err.stack });
    });
};
