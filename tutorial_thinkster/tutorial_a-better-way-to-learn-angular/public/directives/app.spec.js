/** ------------------------------- **/
/** 	Unit Test for DIRECTIVE		**/
/** ------------------------------- **/


describe('Unit testing directives', function(){
	
	var compile, rootScope, controller;
	
	beforeEach(module('greetings'));
	
	beforeEach(function(){
		inject(function($compile, $rootScope, $window, $controller){
			compile = $compile;
			rootScope = $rootScope;
			controller = $controller;
			
			spyOn($window, 'alert');
			
		});
	});
	
	it('should replace the element <welcome> with text', function(){
		var element = compile("<welcome></welcome>")(rootScope);
		rootScope.$digest();
		expect(element.html()).toContain("Howdy there! How you doing?");
	});
	
	it('should call the window.alert', function(){
		var element = compile('<div alertwelcome></div>')(rootScope);
		rootScope.$digest();
		expect(window.alert).toHaveBeenCalledWith('Howdy!');
	});
	
	it('should call the window.alert on class directive', function(){
		var element = compile('<div class="classdirective"></div>')(rootScope);
		rootScope.$digest();
		expect(window.alert).toHaveBeenCalledWith('class directive');
	});
	
	it('should call window.alert on comment directive', function(){
		var element = compile('<!-- directive: commentdirective -->')(rootScope);
		rootScope.$digest();
		expect(window.alert).toHaveBeenCalledWith('comment directive');
	});
	
	it('should call twice to window.alert on double attribute directive', function(){
		var element = compile('<div goodbye alertwelcome></div>')(rootScope);
		rootScope.$digest();
		expect(window.alert.calls.count()).toBe(2);
		expect(window.alert.calls.allArgs()).toContain(['Howdy!'], ['good bye from stacked directive attribute']);
	});
	
	it('should alert on mouseenter event', function(){
		var element = compile('<div entering></div>')(rootScope);
		rootScope.$digest();
		element.triggerHandler('mouseenter'); // triggering an event
		expect(window.alert).toHaveBeenCalledWith('mouse has entered the div');
	});
	
	it('should alert on mouveleave event', function(){
		var element = compile('<div leaving></div>')(rootScope);
		rootScope.$digest();
		element.triggerHandler('mouseleave');
		expect(window.alert).toHaveBeenCalledWith('mouse has left the div');
	});
	
	it('should add a class on enter and remove it on leave', function(){
		var element = compile('<div entering="activeClass" leaving></div>')(rootScope);
		rootScope.$digest();
		expect(element.attr('class')).not.toContain('activeClass');
		element.triggerHandler('mouseenter');
		expect(element.attr('class')).toContain('activeClass');
		element.triggerHandler('mouseleave');
		expect(element.attr('class')).not.toContain('activeClass');
	});
	
	it('should take the argument and call to the controller method', function(){
		var element = compile('<div ng-controller="FunCtrl as fun"><div id="dir" fundirective="fun.start()"></div></div>')(rootScope);
		rootScope.$digest();
		//console.log(element.find('div'));
		element.find('div').triggerHandler('mouseenter');
		expect(window.alert).toHaveBeenCalledWith('fun times have been started');
	});
	
	it('should take the argument and call the controller method (2)', function(){
		var element = compile('<div ng-controller="FunCtrl as fun"><div fundirective="fun.end()"></div>')(rootScope);
		rootScope.$digest();
		element.find('div').triggerHandler('mouseenter');
		expect(window.alert).toHaveBeenCalledWith('fun times are over');
	});
	
	it('should use the main directive controller and then display the result', function(){
		var element = compile('<welcometwo hi hello></welcometwo')(rootScope);
		rootScope.$digest();
		element.triggerHandler('mouseenter');
		expect(window.alert).toHaveBeenCalledWith(['hi','hello']);
	});
	
	it('should have isolated scope', function(){
		var first, second;
		var element = compile('<div><welcometwo hi hello></welcometwo><welcometwo howdy></welcometwo></div>')(rootScope);
		rootScope.$digest();
		first = angular.element(element.find('welcometwo')[0]); // needs to be wrapped inside angular.element() again.
		second = angular.element(element.find('welcometwo')[1]);
		first.triggerHandler('mouseenter');
		second.triggerHandler('mouseenter');
		expect(window.alert).toHaveBeenCalled();
		expect(window.alert.calls.count()).toBe(2);
		expect(window.alert.calls.first().args).toEqual([['hi', 'hello']]);
		expect(window.alert.calls.mostRecent().args).toEqual([['howdy']]);
	});
	
	it('should test the controller inside the directive', function(){
		var ctrl, scope;
		var element = compile('<welcometwo></welcometwo>')(rootScope);
		rootScope.$digest();
		ctrl = element.controller('welcometwo');
		scope = element.isolateScope();
		//console.log(element.isolateScope().words);
		expect(scope.words).toEqual([]);
		ctrl.sayHi();
		ctrl.sayHello();
		ctrl.sayHowdy();
		expect(scope.words).toEqual(['hi', 'hello', 'howdy']);
	});
	
	it('should use transclude to insert the button', function(){
		var element = compile('<welcomethree><button>Click on me</button></welcomethree>')(rootScope);
		rootScope.$digest();
		//console.log(element);
		expect(element.find('button')).toBeTruthy();
	});
	
});