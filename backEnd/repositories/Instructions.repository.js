
const MongoStorage = require('../data/MongoStorage');

let storage = null;
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
    storage = new MongoStorage('Instructions');
} else {
    throw new Error('Database connection parameters not provided');
}

const find = () => (storage ? storage.find() : null);
const findById = (id) => (storage ? storage.findById(id) : null);
const create = (Instruction) => (storage ? storage.create(Instruction) : null);
const update = (id, Instruction) => (storage ? storage.update(id, Instruction) : null);
const deleteById = (id) => (storage ? storage.delete(id) : null);

module.exports = {
    find, findById, create, update, deleteById,
};