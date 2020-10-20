var express = require('express');
var router = express.Router();
const cors = require('cors')

const Profile = require('../model/Profile')
router.use(cors())

/* GET Candidate's List. */
router.get('/', function (req, res, next) {
    Profile.find(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });

});
router.get('/position', function (req, res, next) {
    Profile.find({designation: req.query.designation}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });

});

module.exports = router;