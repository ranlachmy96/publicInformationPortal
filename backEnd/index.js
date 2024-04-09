/***************************************************************
 * Import Dependencies
 * - Importing cors for handling Cross-Origin Resource Sharing
 * - Importing express for creating the web server
 * - Importing logger and loggerDev for request logging
 * - Importing cookie-parser for parsing cookies
 * - Importing errorHandler middleware for handling errors
 * - Importing routers for different endpoints
 * - Importing dotenv for loading environment variables
 ***************************************************************/

/***************************************************************
 * Configure Express App
 * - Create an instance of the express application
 * - Set the port to listen on, defaulting to 3000 if not provided
 * - Use cors middleware to enable Cross-Origin Resource Sharing
 * - Use cookie-parser middleware to parse cookies
 * - Use express.json and express.urlencoded middleware for parsing request bodies
 * - Use logger and loggerDev middleware for request logging
 * - Use the defined routers for different endpoints
 * - Use errorHandler middleware for handling errors
 * - Start the server and listen on the specified port
 ***************************************************************/
const cors = require('cors');
const express = require('express');
const {logger, loggerDev} = require('./loggers/logger');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { errorHandler } = require('./middlewares/errorHandler');
const { InstructionsRouter } = require('./routers/InstructionsRouter.router');
const { OrganizationsRouter } = require('./routers/OrganizationsRouter.router');
const { AlertsRouter } = require('./routers/AlertsRouter.router');
const { UsersRouter } = require('./routers/UsersRouter.router');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true 
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(loggerDev);

app.use('/instructions', InstructionsRouter);
app.use('/organizations', OrganizationsRouter);
app.use('/alerts', AlertsRouter);
app.use('/users', UsersRouter);
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

module.exports = app;
