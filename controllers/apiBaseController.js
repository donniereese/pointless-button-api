/* API Routes
 *
 *
 */

// Root API
module.exports.getRoot = (req, res) => {
    res.json({

    });
};

// API Stats
module.exports.getStats = (req, res) => {
    res.json({
        requests: null,
        events: null
    });
};
