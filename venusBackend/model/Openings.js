const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OpeningSchema = new Schema({
    position: { type: String },
    numOfPosition: { type: String },
    experience: { type: Number },
    expDOJ: { type: String },
    jobDescription: { type: String },
    shortlistData: [new Schema({
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        gender: { type: String },
        date: { type: Date },
        city: { type: String },
        phone: { type: Number },
        qualification: { type: String },
        specialization: { type: String },
        institute: { type: String },
        passingYear: { type: Date },
        type: { type: String },
        designation: { type: String },
        organization: { type: String },
        workExpFrom: { type: Date },
        workExpTill: { type: Date },
        noticePeriod: { type: Number },
        currentSalary: { type: Number },
        status: { type: String },
    })],
    numOfSelectedCandidates:{ type: Number }

})
module.exports = Openings = mongoose.model('Openings', OpeningSchema)