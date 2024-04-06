const {
    find, findById, create, update, deleteById,
} = require('../repositories/Alerts.repository');
const { PropertyNotFound, EntityNotFound } = require('../errors/404.errors');
const { InvalidData, BodyNotSent } = require('../errors/400.errors');


const generateId = async () => {
    try {
        const Alerts = await find();
        if (Alerts.length === 0) {
            return 1;
        }
        let maxId = 0;
        Alerts.forEach((Alert) => {
            // eslint-disable-next-line no-underscore-dangle
            if (Alert._id > maxId) {
                // eslint-disable-next-line no-underscore-dangle
                maxId = Alert._id;
            }
        });
        return maxId + 1;
    } catch (error) {
        console.error('Error generating ID:', error);
        throw error;
    }
};


exports.getAllAlerts = async (req, res, next) => {
    try {
        const result = await find();
        if (result.length === 0) {
            throw new EntityNotFound('Alerts data');
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getAlert = async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            throw new InvalidData();
        }
        const result = await findById(req.params.id);
        if (!result || Object.keys(result).length === 0) {
            throw new PropertyNotFound(`Specific Alert data with id of ${req.params.id}`);
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.createAlert = async (req, res, next) => {
    try {
        if (!req.body.description || !req.body.date || !req.body.priority) {
            throw new BodyNotSent();
        }
        const { body: Alert } = req;
        // eslint-disable-next-line no-underscore-dangle
        if (!Alert._id) {
        Alert._id = await generateId();
        }
        const result = await create(Alert);
        res.status(200).json(result || 'Alert added successfully');
    } catch (error) {
        next(error);
    }
};


exports.updateAlert = async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            throw new InvalidData();
        }
        if (JSON.stringify(req.body) === '{}') {
            throw new EntityNotFound('updated Alert data');
        }
        if (!req.params.id) {
            throw new PropertyNotFound('ID');
        }

        const { body: Alert, params: { id } } = req;
        const result = await update(id, Alert);
        if (!result || result.matchedCount === 0 || result.modifiedCount === 0) {
            throw new PropertyNotFound(`Specific Alert data with id of ${req.params.id}`);
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteAlert = async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            throw new InvalidData();
        }
        //add a check if doesn't exists
        const { params: { id } } = req;
        const result = await deleteById(id);
        if (!result || result.deletedCount === 0) {
            throw new PropertyNotFound(`Specific Alert data with id of ${req.params.id}`);
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};
