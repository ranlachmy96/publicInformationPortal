/***************************************************************
 * Import Dependencies
 * - Importing repository functions for CRUD operations on organizations
 * - Importing custom error classes for 404 errors
 * - Importing custom error classes for 400 errors
 ***************************************************************/

/***************************************************************
 * Generate ID
 * - Function to generate a unique ID for organizations
 ***************************************************************/

/***************************************************************
 * Get All Organizations
 * - Function to get all organizations
 ***************************************************************/

/***************************************************************
 * Get Organization by ID
 * - Function to get a specific organization by ID
 ***************************************************************/

/***************************************************************
 * Create Organization
 * - Function to create a new organization
 ***************************************************************/

/***************************************************************
 * Update Organization
 * - Function to update an existing organization
 ***************************************************************/

/***************************************************************
 * Delete Organization
 * - Function to delete an organization by ID
 ***************************************************************/

const {
    find, findById, create, update, deleteById,
} = require('../repositories/Organizations.repository');
const { PropertyNotFound, EntityNotFound } = require('../errors/404.errors');
const { PropertyExists, BodyNotSent, InvalidData} = require('../errors/400.errors');

const generateId = async () => {
    try {
        const Organizations = await find();
        if (Organizations.length === 0) {
            return 1;
        }
        let maxId = 0;
        Organizations.forEach((Organization) => {
            // eslint-disable-next-line no-underscore-dangle
            if (Organization._id > maxId) {
                // eslint-disable-next-line no-underscore-dangle
                maxId = Organization._id;
            }
        });
        return maxId + 1;
    } catch (error) {
        console.error('Error generating ID:', error);
        throw error;
    }
};

exports.getAllOrganizations = async (req, res, next) => {
    try {
        const result = await find();
        if (result.length === 0) {
            throw new EntityNotFound('Organizations data');
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getOrganization = async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            throw new InvalidData();
        }
        const result = await findById(req.params.id);
        if (!result || Object.keys(result).length === 0) {
            throw new PropertyNotFound(`specific Instruction data with id of ${req.params.id}`);
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.createOrganization = async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.description || !req.body.url || !req.body.org_id || !req.body.phone) {
            throw new BodyNotSent();
        }
        const { body: Organization } = req;
        // eslint-disable-next-line no-underscore-dangle
        if (!Organization._id) {
            Organization._id = await generateId();
        }
        const result = await create(Organization);
        res.status(200).json(result || 'Organization added successfully');
    } catch (error) {
        next(error);
    }
};


exports.updateOrganization = async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            throw new InvalidData();
        }
        if (JSON.stringify(req.body) === '{}') {
            throw new EntityNotFound('updated Organization data');
        }
        if (!req.params.id) {
            throw new PropertyNotFound('ID');
        }
        const { body: Organization, params: { id } } = req;
        const result = await update(id, Organization);
        if (!result || result.matchedCount === 0 ) {
            throw new PropertyNotFound('ID');
        }
        if(result.modifiedCount === 0){
            throw new BodyNotSent('Organization');
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteOrganization = async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            throw new InvalidData();
        }
        //add a check if doesnt exists
        const { params: { id } } = req;
        const result = await deleteById(id);
        if (!result || result.deletedCount === 0) {
            throw new PropertyNotFound('ID');
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};
