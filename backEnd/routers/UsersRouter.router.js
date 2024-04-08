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