/***************************************************************
 * Initialize Database Connection
 * - Create an instance of MongoStorage if database connection parameters are provided
 * - Otherwise, throw an error indicating missing connection parameters
 ***************************************************************/

/***************************************************************
 * CRUD Operations
 * - Define functions for performing CRUD operations
 * - Each function checks if the storage instance exists before calling its respective method
 * - Return null if storage instance does not exist (database connection not established)
 ***************************************************************/
const MongoStorage = require('../data/MongoStorage');

let storage = null;
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
    storage = new MongoStorage('Users');
} else {
    throw new Error('Database connection parameters not provided');
}

const find = () => (storage ? storage.find() : null);
const create = (Alert) => (storage ? storage.create(Alert) : null);

module.exports = {
    find, create
};