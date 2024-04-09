/***************************************************************
 * Define Organizations Schema
 * - Define the structure of the Organizations schema
 * - Specify fields with their types and validation requirements
 * - Set collection name to 'Organizations'
 ***************************************************************/
const { Schema, model } = require('mongoose');

const OrganizationsSchema = new Schema({
    _id: { type: Number, required: true},
    org_id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    phone: { type: Number, required: true },
}, { collection: 'Organizations' });

module.exports = model('Organizations', OrganizationsSchema);