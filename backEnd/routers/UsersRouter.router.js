const { Router } = require('express');
const {
    LogIn,
    SignUp,
} = require('../controllers/Users.controller');

const UsersRouter = new Router();
UsersRouter.post('/LogIn', LogIn);
UsersRouter.post('/SignUp', SignUp);

module.exports = { UsersRouter };