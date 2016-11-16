var Todo = require('./models/todo');

module.exports = function(app){
	
	
	
	// api -----------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res){
		
		
		// use mongoose to get all todos in the database
		Todo.find(function(err, todos){
			
			console.log(todos);
			
			// catch the error if any and handle it
			if(err)
				res.send(err);
			
			// returns all todos in JSON format
			res.json(todos);
			
		});
		
	});
	
	// create todo and send back all todos afterwards
	app.post('/api/todos', function(req, res){
		
		
		// Create a todo, information comes from AJAX request from Angular
		Todo.create({ //use Mongoose helper to "create" a new entry
			text : req.body.text
		}, function(err, todo){ // callback
			
			// error handling
			if(err)
				res.send(err);
			
			// get and return all the todos
			Todo.find(function(err, todos){
				if(err)
					res.send(err);
				res.json(todos); 
			})
			
		})
		
	});
	
	// Delete a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		
		// remove the todo with mongoose
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo){ //callback
			if(err)
				res.send(err);
			
			Todo.find(function(err,todos){ // bring back all the todos after removing
				if(err)
					res.send(err);
				res.json(todos);
			})
		});
		
	});
	
	// application ---------------------------------------------------------

	app.get('', function(req, res){ // catch "all" requests and serve the single file for the angular front-end 
		res.sendfile('./public/index.html');
	}) 
	
	
}