// THOSE TEST ARE FOR KARMA / JASMINE engine.

/**
 * TESTING CONTROLLERS
 */
describe('testController function', function(){
	
	describe('testController', function(){
		
		var $scope;
		
		beforeEach(module('controller_app')); 
		
		// Injecting $rootScope & $controller
		beforeEach(inject(function($rootScope, $controller){
			$scope = $rootScope.$new();
			$controller('testController', {$scope : $scope});
		}));
		
		it('should create "spices" model with 3 spices', function(){
			expect($scope.spices.length).toBe(3);
		});
		
		it('should set the default value of spice', function(){
			expect($scope.spice).toBe('habanero');
		})
		
	})
	
})

/**
 * When testing a nested Controller
 * we need to create the same scope hierarchy
 */

describe('state', function(){
	
	var mainScope, childScope, grandChildScope;
	
	// Bring Angular in the equation
	beforeEach(module('controller_app'));
	
	// Inject $rootScope and $controller
	beforeEach(inject(function($rootScope, $controller){
		mainScope = $rootScope.$new();
		$controller('MainController', {$scope: mainScope});
		
		childScope = mainScope.$new();
		$controller('ChildController', {$scope: childScope});
		
		grandChildScope = childScope.$new();
		$controller('GrandChildController', {$scope: grandChildScope});
	}));
	
	// The actual tests on each scope
	it('should have over and selected', function(){
		expect(mainScope.timeOfDay).toBe('morning');
		expect(mainScope.name).toBe('Max');
		expect(childScope.timeOfDay).toBe('morning');
		expect(childScope.name).toBe('Henry');
		expect(grandChildScope.timeOfDay).toBe('evening');
		expect(grandChildScope.name).toBe('Henry');
	})
})

/**
 * Testing second part of the tutorial
 */

describe('Second part of tutorial', function(){
	
	var firstController, secondController, firstScope;
	
	beforeEach(function(){
		module('thinkster_controller');
	})
	
	// old definition of controller
	it('OLD Controller should bring the $scope value', function(){
		// injection
		inject(function($rootScope, $controller){
			firstScope = $rootScope.$new();
			$controller('MainCtrl', {$scope: firstScope});
		});
		// test
		expect(firstScope.message).toBe('hello'); 
	})
	
	
	it('NEW controller should bring "this" value as scope object', function(){
		// injection
		inject(function($rootScope, $controller){
			scope = $rootScope.$new();
			secondController = $controller('ControllerAs', {$scope: scope});
		})
		// test
		expect(secondController.message).toBe('hello');
		// function test
		secondController.changeMessage('hello world');
		expect(secondController.message).toBe('hello world'); 
	})
	
})



