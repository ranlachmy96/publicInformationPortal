const {
    find, findById, create, update, deleteById,
} = require('../repositories/Organizations.repository');
const { PropertyNotFound, EntityNotFound } = require('../errors/404.errors');
const { PropertyExists, BodyNotSent } = require('../errors/400.errors');


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
        const result = await findById(req.params.id);
        if (result.length === 0) {
            throw new PropertyNotFound(`specific Organizations data with id of ${req.params.id}`);
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
        Organization._id = await generateId();
        const result = await create(Organization);
        res.status(200).json(result || 'Organization added successfully');
    } catch (error) {
        next(error);
    }
};


exports.updateOrganization = async (req, res, next) => {
    try {
        if (JSON.stringify(req.body) === '{}') {
            throw new EntityNotFound('updated Organization data');
        }
        if (!req.params.id) {
            throw new PropertyNotFound('ID');
        }
        const existingCase = await findById(req.params.id);
        if (existingCase.length === 0) {
            throw new PropertyNotFound(`Organization with id ${req.params.id}`);
        }

        const { body: Organization, params: { id } } = req;
        const result = await update(id, Organization);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteOrganization = async (req, res, next) => {
    try {
        const existingOrganization = await findById(req.params.id);
        if (existingOrganization.length === 0) {
            throw new PropertyNotFound(`Organization with id ${req.params.id}`);
        }
        //add a check if doesnt exists
        const { params: { id } } = req;
        const result = await deleteById(id);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};