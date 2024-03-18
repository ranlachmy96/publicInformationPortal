
const MongoStorage = require('../data/MongoStorage');

let storage = null;
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
    storage = new MongoStorage('Organizations');
} else {
    throw new Error('Database connection parameters not provided');
}

const find = () => (storage ? storage.find() : null);
const findById = (id) => (storage ? storage.findById(id) : null);
const create = (Organization) => (storage ? storage.create(Organization) : null);
const update = (id, Organization) => (storage ? storage.update(id, Organization) : null);
const deleteById = (id) => (storage ? storage.delete(id) : null);

module.exports = {
    find, findById, create, update, deleteById,
};