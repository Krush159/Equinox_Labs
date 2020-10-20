var express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addProfile', addProfile);
app.use('/upload', upload);
app.use('/getProfile', getProfile);
app.use('/jobOpenings', jobOpenings)

module.exports = app;