
const express = require('express')
const router = express.Router()
const cors = require('cors')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const Users = require('../model/Users')
const { getMaxListeners } = require('../model/Users')
router.use(cors())

process.env.SECRET_KEY = 'secret'


// for testing purpose using demo account
const testAccount = nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    service: "smtp.gmail.com",
    host: "smtp.gmail.com",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: 'krushna.equinoxlabs@gmail.com' , 
        pass: 'elab@159',
    },
});


// const transport = {
//     host: 'smtp.gmail.com',
//     auth: {
//       user: "Your Email Id",
//       password: "Your Password"
//     }
//   }

router.post('/register', (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role
    }
    Users.findOne({
        emailId: req.body.emailId
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    Users.create(userData)
                        .then(user => {
                            var mail = {
                                from: '"EquinoxLabs" <krushna.equinoxlabs@gmail.com>',
                                to: userData.emailId,  //Change to email address that you want to receive messages on
                                subject: 'Registration Successful',
                                text: `username:${userData.emailId} and password: ${req.body.password}`,
                                html: `<b>username:${userData.emailId} and password: ${req.body.password}</b>`
                            }

                            transporter.sendMail(mail, function(error, info){
                                if (error) {
                                  res.send(error);
                                } else {
                                  res.json('Registration Successfull. Email has been sent');
                                  
                                }
                              });
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
                        phone: user.phone,
                        role: user.role
                    }
                    console.log(payload)
                    let token = jwt.sign(payload, process.env.SECRET_KEY , {
                        expiresIn: 1440
                    })
                    res.send({ token, payload })
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
