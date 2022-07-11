const express = require('express')
const path = require('path');
const app = express()
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = 8000

module.exports = app;

//API Routes
var rootAPI = function(req, res, next) {
    res.json({success:true, message:"Root API", result:{}});
};
var album = require('./routes/album');
var band = require('./routes/band');
var member = require('./routes/member');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//API
app.get('/', rootAPI);
app.use('/album', album);
app.use('/band', band);
app.use('/member', member);

app.listen(port, () => {
    console.log('Server listening on http://localhost:' + port)
});