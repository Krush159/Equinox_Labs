const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../model/Users')
router.use(cors())

process.env.SECRET_KEY = 'secret'

router.post('/register', (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
        role: req.body.role
    }
    Users.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    Users.create(userData)
                        .then(user => {
                            res.json({ status: user.email + 'Registeration Successfull' })
                        })
                        .catch(err => {
                            res.send('error:' + err)
                        })
                })
            }
            else {
                res.json({
                    error: 'User already exists'
                })
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
})

router.post('/login', (req, res) => {
    Users.findOne({
        emailId: req.body.emailId
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emailId: user.emailId,
                        role: user.role
                    }
                    console.log(payload)
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send({token,payload})
                }
                else {
                    res.json({
                        error: 'Incorrect Password'
                    })
                }
            }
            else {
                res.json({
                    error: "User does not exist"
                })
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
})
router.get('/getAllUsers', function (req, res, next) {
    Users.find(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });

});
module.exports = router;
