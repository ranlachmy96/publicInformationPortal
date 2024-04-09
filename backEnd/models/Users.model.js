const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
    _id: { type: Number, required: true},
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
}, { collection: 'Users' });

module.exports = model('Users', UsersSchema);