const {
    find, create
} = require('../repositories/Users.repository');
const { PropertyNotFound, EntityNotFound } = require('../errors/404.errors');
const { PropertyExists, BodyNotSent, InvalidData } = require('../errors/400.errors');


const generateId = async () => {
    try {
        const Users = await find();
        if (Users.length === 0) {
            return 1;
        }
        let maxId = 0;
        Users.forEach((Organization) => {
            // eslint-disable-next-line no-underscore-dangle
            if (Users._id > maxId) {
                // eslint-disable-next-line no-underscore-dangle
                maxId = Users._id;
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
        if (!req.body.username || !req.body.password) {
            throw new BodyNotSent();
        }
        const result = await find();
        if (result.length === 0) {
            throw new EntityNotFound('Users data');
        }
        const user = result.find((user) => user.username === req.body.username && user.password === req.body.password);
        if (!user) {
            throw new PropertyNotFound('User');
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.SignUp = async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            throw new BodyNotSent();
        }
        const result = await find();
        if (result.length === 0) {
            throw new EntityNotFound('Users data');
        }
        const user = result.find((user) => user.username === req.body.username);
        if (user) {
            throw new PropertyExists('User');
        }
        const newUser = {
            _id: await generateId(),
            username: req.body.username,
            password: req.body.password,
        };
        await create(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};
