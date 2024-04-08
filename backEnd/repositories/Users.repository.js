
const MongoStorage = require('../data/MongoStorage');

let storage = null;
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
    storage = new MongoStorage('Users');
} else {
    throw new Error('Database connection parameters not provided');
}

const find = () => (storage ? storage.find() : null);
// const findById = (id) => (storage ? storage.findById(id) : null);
const create = (Alert) => (storage ? storage.create(Alert) : null);
// const update = (id, Alert) => (storage ? storage.update(id, Alert) : null);
// const deleteById = (id) => (storage ? storage.delete(id) : null);

module.exports = {
    find, create
};