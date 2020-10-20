const express = require('express')
const router = express.Router()
const cors = require('cors')

const Profile = require('../model/Profile')
router.use(cors())

router.post('/', (req, res) => {
    // let decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    const add_profile = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        date: req.body.date,
        city: req.body.city,
        phone: req.body.phone,
        qualification: req.body.qualification,
        specialization: req.body.specialization,
        institute: req.body.institute,
        passingYear: req.body.passingYear,
        type: req.body.type,
        designation: req.body.designation,
        organization: req.body.organization,
        workExpFrom: req.body.workExpFrom,
        workExpTill: req.body.workExpTill,
        noticePeriod: req.body.noticePeriod,
        currentSalary: req.body.currentSalary
    }
    Profile.create(add_profile)
        .then(res => {
            res.json({ status: 200, message: "Profile Added Successfully" })
        })
        .catch(err => {
            res.send({ status: 201, message: err })
        })
})
module.exports = router