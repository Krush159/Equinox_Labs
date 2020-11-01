const express = require('express')
const router = express.Router()
const cors = require('cors')

const Openings = require('../model/Openings')
router.use(cors())

router.post('/', (req, res) => {
    // let decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    console.log(req.body)
    const addOpenings = {
        position: req.body.position,
        numOfPosition: req.body.numOfPosition,
        experience: req.body.experience,
        expDOJ: req.body.expDOJ,
        jobDescription: req.body.jobDescription,
        shortlistData: req.body.shortlistData,
        numOfSelectedCandidates: req.body.numOfSelectedCandidates,
        createdBy: req.body.createdBy
    }
    console.log(addOpenings)
    Openings.create(addOpenings)
        .then(res => {
            res.json({ status: 200, message: "Openings created Successfully" })
        })
        .catch(err => {
            res.send({ status: 201, message: err })
        })
})

router.get('/getOpenings', (req,res) => {
    Openings.find(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
})
module.exports = router