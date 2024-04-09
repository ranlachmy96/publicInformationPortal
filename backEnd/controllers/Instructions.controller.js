/***************************************************************
 * Import Dependencies
 * - Importing repository functions for CRUD operations on instructions
 * - Importing custom error classes for 404 errors
 * - Importing custom error classes for 400 errors
 ***************************************************************/

/***************************************************************
 * Generate ID
 * - Function to generate a unique ID for instructions
 ***************************************************************/

/***************************************************************
 * Get All Instructions
 * - Function to get all instructions
 ***************************************************************/

/***************************************************************
 * Get Instruction by ID
 * - Function to get a specific instruction by ID
 ***************************************************************/

/***************************************************************
 * Create Instruction
 * - Function to create a new instruction
 ***************************************************************/

/***************************************************************
 * Update Instruction
 * - Function to update an existing instruction
 ***************************************************************/

/***************************************************************
 * Delete Instruction
 * - Function to delete an instruction by ID
 ***************************************************************/

const {
    find, findById, create, update, deleteById,
} = require('../repositories/Instructions.repository');
const { PropertyNotFound, EntityNotFound } = require('../errors/404.errors');
const { InvalidData, BodyNotSent } = require('../errors/400.errors');

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

exports.createInstruction = async (req, res, next) => {
    try {
        if (!req.body.category || !req.body.title || !req.body.description || !req.body.date) {
            throw new BodyNotSent();
        }
        const { body: Instruction } = req;
        // eslint-disable-next-line no-underscore-dangle
        if (!Instruction._id) {
            Instruction._id = await generateId();
        }
        const result = await create(Instruction);
        res.status(200).json(result || 'Instruction added successfully');
    } catch (error) {
        next(error);
    }
};


exports.updateInstruction = async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            throw new InvalidData();
        }
        if (JSON.stringify(req.body) === '{}') {
            throw new EntityNotFound('updated Instruction data');
        }
        const { body: Instruction, params: { id } } = req;
        const result = await update(id, Instruction);
        if (!result || result.matchedCount === 0) {
            throw new PropertyNotFound('ID');
        }
        if (result.modifiedCount === 0) {
            throw new BodyNotSent('Instruction');
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteInstruction = async (req, res, next) => {
    try {
        if (isNaN(req.params.id)) {
            throw new InvalidData();
        }
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
