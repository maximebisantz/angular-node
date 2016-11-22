/**
* 	Unit testing designed for Karma / Jasmine.
*	Will test against mock brought up by jasmine
*/

describe('Unit testing for myServiceModule', function(){
	
	var mock, notify;
	
	beforeEach(module('myServiceModule'));
	
	/**
	 * Where the magic happens to create Mock
	 */
	beforeEach(function(){
		mock = {alert: jasmine.createSpy()};
		
		module(function($provide){
			$provide.value('$window', mock); // https://docs.angularjs.org/api/auto/service/$provide#value
		});
		
		inject(function($injector){
			notify = $injector.get('notify'); // https://docs.angularjs.org/api/auto/service/$injector
		});
	});
	
	it('should not alert first two notifications', function(){
		notify('one');
		notify('two');
		
		expect(mock.alert).not.toHaveBeenCalled();
	});
	
	it('should alert all after third notification', function(){
		
		notify('one');
		notify('two');
		notify('three');
		
		expect(mock.alert).toHaveBeenCalledWith('one\ntwo\nthree');
	});
	
	it('should clear message after alert', function(){
		notify('one');
		notify('two');
		notify('three');
		notify('more');
		notify('two');
		notify('three');
		
		expect(mock.alert.calls.count()).toEqual(2);
		expect(mock.alert.calls.mostRecent().args).toEqual(["more\ntwo\nthree"]);
		
	});
	
	
});

/** -------------------------
 * SECOND PART OF THE TUTORIAL 
 *____________________________*/

describe('Second part of the tutorial', function(){
	
	var messages, listCtrl, postCtrl;
	
	beforeEach(module('thinksterService'));
	
	beforeEach(function(){
		
		inject(function($injector, $rootScope, $controller){
			messages = $injector.get('messages');
			listCtrl = $controller('ListCtrl');
			postCtrl = $controller('PostCtrl');
		}) 
		
	})
	
	it('should have the message service', function(){
		
		// Spy on the method, but calls the real function
		spyOn(messages, 'add').and.callThrough();

		messages.add('hello');
		
		expect(messages.add).toHaveBeenCalled();
		
		console.log(messages.list);
		
		expect(listCtrl.messages).toBeDefined();
		expect(listCtrl.messages[0].text).toBe('hello');
		
	});
	
	it('should have the functionnality of the service', function(){
		
		spyOn(messages, 'add'); //will mock the call and not go through the real one.
		
		postCtrl.addMessage('Tibet is a nice place to be');
		
		expect(messages.add).toHaveBeenCalledWith('Tibet is a nice place to be');
		
		
	})
	
})





