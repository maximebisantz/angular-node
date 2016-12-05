/*----------------------------------------------------------*/
/* https://thinkster.io/egghead/understanding-isolate-scope */
/*----------------------------------------------------------*/

var app = angular.module('choreApp', []);

/**
 * we need to wire up logChore and done. 
 * We can do this by setting the done property on the scope object within the directive 
 * to an ampersand (&) for an expression (more will be covered on the different options) 
 * and then change the template to include a div with a class of "button" 
 * and an ng-click attribute set to "done({chore:chore})" and say "I'm done!" inside the div. 
 * The {chore:chore} syntax maps the chore from the model we made in the <input> to be passed 
 * to the logChore function when we said 'done="logChore(chore)"' (in the kid directive)
 */
app.directive('kid', function(){
	return {
		restrict: 'E',
		scope: {
			done: '&' //stands for EXPRESSION
		}, // isolated scope, so mutliple directive won't share bindings.
		template: '<input type="text" ng-model="chore">' +
		'{{ chore }}' + 
		'<div class="button" ng-click="done({chore: chore})">I\'m done</div>'
	};
});

// With the isolated scope we can tell each directive a different data

app.controller('ChoreCtrl', function(){
	this.logChore = function(chore){
		console.log(chore + ' is done!');
	};
});