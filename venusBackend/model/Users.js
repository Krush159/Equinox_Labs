const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    emailId: { type: String },
    password: { type: String },
    phone: { type: Number },
    role: { type: String }
})
module.exports = Users = mongoose.model('Users', UserSchema)