const {
    find, findById, create, update, deleteById,
} = require('../repositories/Instructions.repository');
const { PropertyNotFound, EntityNotFound } = require('../errors/404.errors');
const { PropertyExists, BodyNotSent } = require('../errors/400.errors');


const generateId = async () => {
    try {
        const Instructions = await find();
        if (Instructions.length === 0) {
            return 1;
        }
        let maxId = 0;
        Instructions.forEach((Instruction) => {
            // eslint-disable-next-line no-underscore-dangle
            if (Instruction._id > maxId) {
                // eslint-disable-next-line no-underscore-dangle
                maxId = Instruction._id;
            }
        });
        return maxId + 1;
    } catch (error) {
        console.error('Error generating ID:', error);
        throw error;
    }
};


exports.getAllInstructions = async (req, res, next) => {
    try {
        const result = await find();
        if (result.length === 0) {
            throw new EntityNotFound('Instructions data');
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getInstruction = async (req, res, next) => {
    try {
        const result = await findById(req.params.id);
        if (result.length === 0) {
            throw new PropertyNotFound(`specific Instruction data with id of ${req.params.id}`);
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.createInstruction = async (req, res, next) => {
    try {
        if (!req.body.category || !req.body.title || !req.body.description || !req.body.date) {
            throw new BodyNotSent();
        }
        const { body: Instruction } = req;
        // eslint-disable-next-line no-underscore-dangle
        Instruction._id = await generateId();
        const result = await create(Instruction);
        res.status(200).json(result || 'Instruction added successfully');
    } catch (error) {
        next(error);
    }
};


exports.updateInstruction = async (req, res, next) => {
    try {
        if (JSON.stringify(req.body) === '{}') {
            throw new EntityNotFound('updated Instruction data');
        }
        if (!req.params.id) {
            throw new PropertyNotFound('ID');
        }
        const existingCase = await findById(req.params.id);
        if (existingCase.length === 0) {
            throw new PropertyNotFound(`Instruction with id ${req.params.id}`);
        }

        const { body: Instruction, params: { id } } = req;
        const result = await update(id, Instruction);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteInstruction = async (req, res, next) => {
    try {
        const existingInstruction = await findById(req.params.id);
        if (existingInstruction.length === 0) {
            throw new PropertyNotFound(`Instruction with id ${req.params.id}`);
        }
        //add a check if doesnt exists
        const { params: { id } } = req;
        const result = await deleteById(id);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};