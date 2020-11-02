const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AddProfileSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    gender: {type: String},
    dob: {type:String},
    city: {type: String},
    phone: {type:Number},
    qualification: {type: String},
    specialization: {type: String},
    institute: {type: String},
    passingYear: {type: String},
    type: {type: String},
    designation: {type: String},
    organization: {type: String},
    workExpFrom: {type: String},
    workExpTill: {type: String},
    noticePeriod: {type: String},
    currentSalary: {type:Number},
    flag:{ type: String },
    post:{ type: String },
    openedBy: { type:String },
    callerUpdate: [new Schema({
        status: {type:String},
        comment: {type: String},
        caller: {type: String},
        timeStamp:{type: String}
    })]
})
module.exports = Profile = mongoose.model('Profile', AddProfileSchema)