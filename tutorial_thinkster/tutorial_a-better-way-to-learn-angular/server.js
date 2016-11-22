/************************************************
*			Thinkster tutorial Angular			*
*************************************************/

// Set-up =======================================

var express = require('express');
var app		= express();

var port 	= process.env.PORT || 8080;

var serveIndex = require('serve-index');

// Configuration ================================

app.use(express.static(__dirname + '/public'));

// Routes =======================================

/*
app.get('*', function(req, res){
	console.log(req.url);
	res.send(req.url + 'index.html');
})
*/

// Use of serve-index node plugin to display directories as in apache.
app.use('/', serveIndex('public/', {'icons' : true}));


// Listen =======================================

app.listen(port);
console.log('App listening on port ' + port); 

