/*
 * app.js
 * Application configuration and entry point
 */
express = require('express');
app = express();

routes = require('./routes/index.js');

require('./config.js');
require('./urls.js');

// listen
app.listen(app.get('port'));
console.log('Application started on port', app.get('port'));
