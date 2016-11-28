

describe('testing run blocks with promises', function(){

	var scope, ctrl, getData, timeout
	
	beforeEach(module('app'));
	
	
	beforeEach(inject(function($rootScope, $controller, _getData_, $timeout){
		
		scope = $rootScope.$new();
		
		ctrl = $controller('ctrl', {
			$scope : scope,
			getData : _getData_
		}); 
		
		getData = _getData_;
		
		// timeout won't resolve itself, I have to call
		// flush() from within the test.
		timeout = $timeout;
		
	}));
	
	it('should bring a result', function(){
		
		scope.$digest();
		
		timeout.flush();
		
		expect(scope.data).toBe('hello world');
		
		
	});
	
	
	
	
})
