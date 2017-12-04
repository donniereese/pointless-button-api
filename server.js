// express server
const express = require('express');
// get session information
const session = require('express-session');
// body parser to standardize body data on session
const bodyParser = require('body-parser');
// mongoose connection to mongodb
const mongoose = require('mongoose');
// bcrypt crypto
const bcrypt = require('bcrypt');
// cors - cross-origin stuff
cors = require('cors');
// config
const config = require('./config');
// Server port;
const serverPort = config.port;

console.log(config);

// API Route handler
const apiRoutes = require('./routes/api.js');

// session object
const sess = {
  secret: config.secret,
  cookie: {}
}

// Initiate express
server = express();
// Set production settings
if (server.get('env') === 'production') {
  // trust first proxy
  server.set('trust proxy', 1)
  // serve secure cookies
  sess.cookie.secure = true
}
// Use session
server.use(session(sess));
// use body parser and process as json for standardization of input
server.use(bodyParser.json());
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// specify cors settings TODO: cors settings needed
server.use(cors());

server.get('/', (req, res) => {
    res.json({
        system: {
            status: 'UP'
        },
        services: {
            website: {
                status: 'DOWN',
                message: 'Unavailable. Restore TBD'
            },
            api: {
                status: 'UP-PARTIAL',
                message: 'Minimal access available.'
            }
        }
    });
});

// API Rnfpoiny
server.use('/api', apiRoutes);

// Go live
server.listen(serverPort, () => { console.log(`Server live on port ${serverPort}.`); });
