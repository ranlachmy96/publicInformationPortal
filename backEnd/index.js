const cors = require('cors');
const express = require('express');
const {logger, loggerDev} = require('./loggers/logger');
const { Server } = require("socket.io");
const http= require("http");
const cookieParser = require('cookie-parser');
require('dotenv').config();
// const { errorHandler } = require('./middlewares/errorHandler');
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

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

module.exports = app;
