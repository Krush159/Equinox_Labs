const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AddProfileSchema = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    email: {type:String},
    gender: {type:String},
    date: {type:Date},
    city: {type:String},
    phone: {type:Number},
    qualification: {type:String},
    specialization: {type:String},
    institute: {type:String},
    passingYear: {type:Date},
    type: {type:String},
    designation: {type:String},
    organization: {type:String},
    workExpFrom: {type:Date},
    workExpTill: {type:Date},
    noticePeriod: {type:Number},
    currentSalary: {type:Number},
    status: {type:String},
})
module.exports = Profile = mongoose.model('Profile', AddProfileSchema)