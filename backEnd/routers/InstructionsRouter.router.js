const { Router } = require('express');
const {
    getAllInstructions,
    getInstruction,
    createInstruction,
    updateInstruction,
    deleteInstruction,
} = require('../controllers/Instructions.controller');

const InstructionsRouter = new Router();

InstructionsRouter.get('/', getAllInstructions);
InstructionsRouter.get('/:id', getInstruction);
InstructionsRouter.post('/', createInstruction);
InstructionsRouter.put('/:id', updateInstruction);
InstructionsRouter.put('/', updateInstruction);
InstructionsRouter.delete('/:id', deleteInstruction);

module.exports = { InstructionsRouter };