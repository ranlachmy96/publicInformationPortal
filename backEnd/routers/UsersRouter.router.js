/***************************************************************
 * Define Users Router
 * - Create a new instance of Router for managing user routes
 ***************************************************************/

/***************************************************************
 * Define Route Handlers
 * - Define route handlers for user authentication operations
 * - Assign controller functions to handle requests to different routes
 ***************************************************************/
const { Router } = require('express');
const {
    LogIn,
    SignUp,
    CheckJwtAuth,
} = require('../controllers/Users.controller');
 
const UsersRouter = new Router();
UsersRouter.post('/LogIn', LogIn);
UsersRouter.post('/SignUp', SignUp);
UsersRouter.post('/CheckJwtAuth', CheckJwtAuth);

module.exports = { UsersRouter };