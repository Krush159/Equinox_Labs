var express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')


// DB Config
// const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

const db = 'mongodb+srv://mongoUser:mongoUser123@cluster1.jxkjy.mongodb.net/Venus?authSource=admin&replicaSet=atlas-8u9c2v-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
mongoose.connect(db,{useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addProfile = require('./routes/addProfile')
var upload = require('./routes/upload')
var getProfile = require('./routes/getProfile')
var jobOpenings = require('./routes/jobOpenings')
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static('./client/build'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addProfile', addProfile);
app.use('/upload', upload);
app.use('/getProfile', getProfile);
app.use('/jobOpenings', jobOpenings);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('./client/build'));
  
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', "index.html"));
    });
  }
  
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname,'client', 'build', "index.html"));
//  });

module.exports = app;