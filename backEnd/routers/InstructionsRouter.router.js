/***************************************************************
 * Define Instructions Router
 * - Create a new instance of Router for managing instruction routes
 ***************************************************************/

/***************************************************************
 * Define Route Handlers
 * - Define route handlers for various CRUD operations on instructions
 * - Assign controller functions to handle requests to different routes
 ***************************************************************/
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