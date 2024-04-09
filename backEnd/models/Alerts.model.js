/***************************************************************
 * Define Alerts Schema
 * - Define the structure of the Alerts schema
 * - Specify fields with their types and validation requirements
 * - Set collection name to 'Alerts'
 ***************************************************************/
const { Schema, model } = require('mongoose');

const AlertsSchema = new Schema({
    _id: { type: Number, required: true},
    description: { type: String, required: true },
    date: { type: String, required: true },
    priority: { type: String, default: "Normal" }
}, { collection: 'Alerts' });

module.exports = model('Alerts', AlertsSchema);