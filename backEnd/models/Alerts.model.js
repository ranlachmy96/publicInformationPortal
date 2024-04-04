const { Schema, model } = require('mongoose');

const InstructionsSchema = new Schema({
    _id: { type: Number, required: true},
    description: { type: String, required: true },
    date: { type: String, required: true },
}, { collection: 'Instructions' });

module.exports = model('Alerts', AlertsSchema);

