const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    emailId: { type: String, unique: true },
    password: { type: String },
    phone: { type: Number, unique: true },
    role: { type: String }
})
module.exports = Users = mongoose.model('Users', UserSchema)