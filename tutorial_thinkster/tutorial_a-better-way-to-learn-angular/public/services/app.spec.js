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
	
	
})