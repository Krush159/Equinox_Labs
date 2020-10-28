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
  Profile.find({ designation: req.query.designation }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });

});
router.put('/updateProfile/:id', function (req, res, next) {
  console.log(req)
  Profile.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
})
router.put('/callerUpdate/:id', function (req, res, next) {
  console.log(req)
  Profile.findByIdAndUpdate({ _id: req.params.id }, { $push: { callerUpdate: req.body } })
    .then(() => {
      res.status(201).json({
        message: 'caller notes updated successfully!'
      });
    }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
})

//FOR TIMELINE

router.get('/candidates/:id', function (req, res, next) {
  Profile.findById({ _id: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  })
})

router.patch('/openFlag', function( req,res,next){
  let updates = [...req.body].map(function(obj){
    return Profile.updateOne({_id: obj._id},{$set: { flag: "Open" }})
  })

  Promise.all(updates)
  .then(() => {
    res.status(201).json({
      message: 'flags updated successfully!'
    });
  }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
})

router.get('/closedFlag', function (req, res, next) {
  Profile.find({ flag: "Closed" }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });

});

router.post('/shortlisted', async function (req, res, next) {
  const ids = []
  req.body.map(obj => ids.push(obj['_id']))
  
  await Profile.find().where('_id').in(ids).exec((err, records) => {
    if (err) {
      console.log(err);
    } else {
      res.json(records);
    }
  });
})
module.exports = router;