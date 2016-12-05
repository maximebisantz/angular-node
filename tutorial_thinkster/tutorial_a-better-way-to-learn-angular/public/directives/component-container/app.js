var app = angular.module('app', []);

/**
 * The example directive clock would be an example 
 * of component - uncomplicated behavior, essentially 
 * displaying the data passed into the attributes.
 */
app.directive('clock', function(){
	return {
		restrict: 'E',
		scope: {
			timezone: '@'
		},
		template: "<div>12:00pm {{ timezone }}</div>"
	};
});

/**
 * The panel directive is an example of a CONTAINER
 * Panel takes a title attribute from the view, 
 * uses @ in the isolated scope to insert it into 
 * the template, and uses transclusion to append 
 * a clock component from the view.
 */
app.directive('panel', function(){
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			title: '@'
		},
		template: 	'<div style="border: 3px solid red">'+
					'<div class="alert-box">{{ title }}</div>'+
					'<div ng-transclude></div></div>'
	};
});