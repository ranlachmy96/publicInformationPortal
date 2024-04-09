/***************************************************************
 * Define Instructions Schema
 * - Define the structure of the Instructions schema
 * - Specify fields with their types and validation requirements
 * - Set collection name to 'Instructions'
 ***************************************************************/
const { Schema, model } = require('mongoose');

const InstructionsSchema = new Schema({
    _id: { type: Number, required: true},
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
}, { collection: 'Instructions' });

module.exports = model('Instructions', InstructionsSchema);