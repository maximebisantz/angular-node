/*##############################################
 * 			Core.js for Angular.js
 * ############################################### */

// define the MODULE for Angular
var scotchTodo = angular.module('scotchTodo', []);

scotchTodo.controller('mainController', function($scope, $http){
	
	console.log($http);
	console.log($scope);
	
	$scope.formData = {};
	
	// Landing on the page : get all todos
	/** OLD Angular
	$http.get('/api/todos')
		.sucess(function(data){
			$scope.todos = data;
		})
		.error(function(data){
			console.log('ERROR: ' + data);
		});
	*/
	$http.get('/api/todos')
	// success
	.then(function(data){
		// data is an object where it's property data contains the todos.
		$scope.todos = data.data;
		console.log(data.data);
	}, 
	// error
	function(data){
		console.log('ERROR: ' + data);
	}); 
	
	
	
	// when submitting the 'add' form, send the data to the node API
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
			/**
			.sucess(function(data){
				$scope.formData = {}; // clear the form so our user is ready to enter another one
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
			*/
		.then(function(data){
			$scope.formData = {};
			$scope.todos = data.data;
			console.log(data.data);
		}, function(data){
			console.log('Error post : ' + data);
		});
	};
	
	// delete a todo after checking it
	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/' + id)
			/**
			.sucess(function(data){
				$scope.todos = data;
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
			*/
		.then(function(data){
			$scope.todos = data.data
		}, function(data){
			console.log('Error delete: ' + data);
		});
	}	
})

//
//function mainController($scope){
//	alert('hello world');
//}
