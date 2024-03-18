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

