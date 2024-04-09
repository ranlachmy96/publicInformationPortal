const {
    find, create
} = require('../repositories/Users.repository');
const { PropertyNotFound, EntityNotFound } = require('../errors/404.errors');
const { PropertyExists, BodyNotSent, InvalidData } = require('../errors/400.errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Permit } = require('permitio');

const generateId = async () => {
    try {
        const Users = await find();
        if (Users.length === 0) {
            return 1;
        }
        let maxId = 0;
        Users.forEach((User) => {
            // eslint-disable-next-line no-underscore-dangle
            if (User._id > maxId) {
                // eslint-disable-next-line no-underscore-dangle
                maxId = User._id;
            }
        });
        return maxId + 1;
    } catch (error) {
        console.error('Error generating ID:', error);

        throw error;
    }
};

exports.LogIn = async (req, res, next) => {
    try {
        if (!req.body.user_name || !req.body.password) {
            throw new BodyNotSent();
        }
        const result = await find();
        if (result.length === 0) {
            throw new EntityNotFound('Users data');
        }
        console.log('resulat: ', result)

        const user = result.find((user) => user.user_name === req.body.user_name);
        if (!user) {
            throw new PropertyNotFound('User');
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            throw new PropertyNotFound('User');
        }

        const token = jwt.sign({ user_name: user.user_name, admin: user.admin }, process.env.JWT_KEY, { expiresIn: '30m' });
        const tokenized_user = { user, token };
        res.body = tokenized_user;
        // res.cookie('token', token, { httpOnly: true });
        res.status(200).json(tokenized_user);
    } catch (error) {
        next(error);
    }
};

exports.SignUp = async (req, res, next) => {
    try {

        if (!req.body.user_name || !req.body.password || req.body.admin === undefined) {
            console.log("error here");
            throw new BodyNotSent();
        }
        const result = await find();
        if (result.length === 0) {
            throw new EntityNotFound('Users data');
        }
        const user = result.find((user) => user.user_name === req.body.user_name);
        if (user) {
            throw new PropertyExists('User');
        }
        const hashed_password = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashed_password;
        const newUser = {
            _id: await generateId(),
            user_name: req.body.user_name,
            password: req.body.password,
            admin: req.body.admin
        };
        const permit = new Permit(process.env.PERMITIO_KEY);
        const permit_user = {
            key: newUser._id,
            email: "",
            first_name: newUser.user_name,
            last_name: "",
            attributes: {}
        };
        console.log('permit_user: ', permit_user);
        await permit.create(permit_user);
        await create(newUser);
        res.status(200).json(newUser);
    } catch (error) {
        next(error);
    }
};

exports.CheckJwtAuth = async (req, res, next) => {
    try {
        // const token = req.cookies.token;
        const token = req.body.token;
        if (!token) {
            throw new PropertyNotFound('Token');
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        res.status(200).json(decoded);
    } catch (error) {
        res.clearCookie('token');
        next(error);
    }
};