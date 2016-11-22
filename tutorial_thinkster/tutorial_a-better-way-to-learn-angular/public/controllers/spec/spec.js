/** TESTs for Controller page **/

describe('Controller tests', function(){
	
	beforeEach(function(){
		browser.get('http://localhost:8080/controllers/');
	})
	
	
	// adds a new function to search element by (by.controller(controllername))
	by.addLocator('controller', function(controllerName){
		var controller = document.querySelectorAll('[ng-controller='+controllerName+']');
		
		return controller;
		
		/*
			return Array.prototype.filter.call(controllers, function(controller){
				return controller.ng-controller === controllerName;
			})
		*/
		
	});
	
	it('First input should be "hello world!"', function(){
		
		var greetingController = element(by.controller('greetingController'));
		var doubleInput = element(by.model('num'));
		var doubleResult = element(by.id('result'));
		
		expect(greetingController.getText()).toEqual('hello world!');
		
		doubleInput.sendKeys('2');
		expect(doubleResult.getText()).toEqual('4');

	});
	
	it('Should change the text of the P when clicked', function(){
	
		var chiliButton = element(by.id('chili'));
		var tabascoButton = element(by.id('tabasco'));
		var p = element(by.controller('SpicyController')).$('p');
		
		var text = function(spice){
			return 'The food is ' + spice +' spicy!'
		}
		
		// landing value
		expect(p.getText()).toEqual(text('very'));
		
		// chili value
		chiliButton.click();
		expect(p.getText()).toEqual(text('chili'));
		
		// tabasco value
		tabascoButton.click();
		expect(p.getText()).toEqual(text('tabasco'));
		
	});
	
	it('Should take the values from $scope and then from the controller function spice()', function(){
		
		var customSpice = element(by.model('customSpice'));
		var button = element(by.id('buttonCustomSpice'));
		var p = element(by.controller('SpicyController_2')).$('p');
		
		var text = function(spice){
			return 'The food is ' + spice + ' spicy!';
		}
		
		// landing value
		expect(p.getText()).toEqual(text('very'));
		
		// now feed the input and click on the button
		customSpice.clear();
		customSpice.sendKeys('tabasco');
		button.click();
		
		expect(p.getText()).toEqual(text('tabasco'));
		
	});
	
	it('Should inherit the scope from high to lower controller (nested)', function(){
		
		var main = element(by.controller('MainController')).$('p');
		var child = element(by.controller('ChildController')).$('p');
		var grandChild = element(by.controller('GrandChildController')).$('p');
		
		// Here values will change normally because they are inherited or redefined in children Controllers.
		expect(main.getText()).toEqual('Good morning, Max!');
		expect(child.getText()).toEqual('Good morning, Henry!');
		expect(grandChild.getText()).toEqual('Good evening, Henry!');
		
	});
	
});


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






