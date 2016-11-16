/************************************
 *		 SCOTCH Tutorial - Todo List *
 ************************************/

// Set up ------------------------------------------

var express 	= require('express');
var app 		= express(); // create the app with express.

var mongoose	= require('mongoose'); // api for mondoDB (set locally on 27017)
var port		= process.env.PORT || 8080; 

var database 	= require('./config/database'); // load the database config. (the url where to connect)

var morgan = require('morgan'); // log request to console.
var bodyParser = require('body-parser'); // pull information from HTML POST.
var methodOverride = require('method-override'); // simulate DELETE and PUT.


// configuration -----------------------------------

mongoose.connect(database.url); // use mongoose api to connect to the database

/*
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('CONNECTED TO DB');
})
*/


app.use(express.static(__dirname + '/public')); // set static files location (/public/img => /img)
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'})); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json'})); // parse application.vdn.api+json as json ???
app.use(methodOverride());

// Routes -------------------------------------------
// (The actual logic)

require('./app/routes.js')(app); 


// Listen --------------------------------------------

app.listen(port);
console.log('App listening on port ' + port);
