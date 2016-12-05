/* - - - - - - - - - - - - - - - - - - - */
/* Testing isolated scope and controller */
/* - - - - - - - - - - - - - - - - - - - */

describe('Testing Isolated Scope and Controller', function(){
	
	var scope, controller, compile, element;
	
	beforeEach(module('choreApp'));
	
	beforeEach(inject(function($compile, $rootScope, $controller){
		
		scope = $rootScope.$new();
		controller = $controller; 
		compile = $compile;
		
		//spyOn(console, 'log'); 
		
	}));
	
	function compileElement(){
		var e = compile('<div ng-controller="ChoreCtrl as ctrl"><kid done="ctrl.logChore(chore)"></kid></div>')(scope);
		scope.$digest();
		element = e;
	}
	
	
	it('should produce the desired element from the directive', function(){
		compileElement(); 
		expect(element.html()).toContain('<kid done="ctrl.logChore(chore)" class="ng-binding ng-isolate-scope"><input type="text" ng-model="chore" class="ng-pristine ng-untouched ng-valid ng-empty"><div class="button" ng-click="done({chore: chore})">I\'m done</div></kid>');
	});
	
	it('should call the controller function from the directive', function(){
		var input, ctrl;
		
		compileElement();

		// the compiled controller
		console.log(element.scope().ctrl);
		
		ctrl = element.scope().ctrl;
		input = element.find('input');
		
		spyOn(ctrl, 'logChore');
		
		// passing a value to the view
		angular.element(input).val('max').triggerHandler('input');
		
		// applying the scope.
		scope.$digest();
		
		// triggering the function via ng-click
		element.find('div').triggerHandler('click');
		
		expect(ctrl.logChore).toHaveBeenCalledWith('max');
		
	});
	
	
});