const { Schema, model } = require('mongoose');

const AlertsSchema = new Schema({
    _id: { type: Number, required: true},
    description: { type: String, required: true },
    date: { type: String, required: true },
    priority: { type: String, default: "Normal" }
}, { collection: 'Alerts' });

module.exports = model('Alerts', AlertsSchema);

