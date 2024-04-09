/***************************************************************
 * Logger Configuration
 * - Configure morgan middleware to log HTTP requests in combined format
 * - Write logs to the created log stream
 ***************************************************************/

/***************************************************************
 * Development Logger Configuration
 * - Configure morgan middleware to log HTTP requests in dev format
 * - No stream specified, logs will be output to console
 ***************************************************************/

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const logger = morgan('combined', { stream: logStream });
const loggerDev = morgan('dev');

module.exports = { logger, loggerDev };