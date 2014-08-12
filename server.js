//
// 
//
// An app to custom tag your songs and create a dynamic playlists.
//
var express   = require('express');
var app       = express();
var port      = process.env.PORT || 8080;
var mongoose  = require('mongoose');
var passport  = require('passport');
var flash     = require('connect-flash');

var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');

var configDB = require('./config/database.js');

// var yarm = require('yarm');
// require('./app/yarm.js');


// ==== CONFIGS ======
//Config database
mongoose.connect(configDB.url);

// Express config
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(__dirname + '/client')); // setting up public dir for ejs
app.set('view engine', 'ejs'); // set up ejs for templating


// yarm config
//app.use('/rest',yarm());

require('./config/passport')(passport); //pass passport for configuration

//required for passport
app.use(session({ secret: 'tagnplaytagnplaytagnplay'})) // session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// ==== Routes ==============
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ==========================================================
app.listen(port);
console.log('What happens on port ' + port + ' stays on port ' + port);


    