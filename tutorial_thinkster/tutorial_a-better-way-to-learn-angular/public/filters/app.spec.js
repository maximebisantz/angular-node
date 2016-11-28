/**
	TESTING FILTERS
**/


describe('Filter testing', function(){
	
	var scope, controller, capitalize, filter, orderBy, limitTo, $filter;
	
	beforeEach(module('filterApp'));
	
	beforeEach(function(){
		inject(function($controller, $rootScope, _capitalizeFilter_, _filterFilter_, _orderByFilter_, _limitToFilter_, _$filter_){
			controller = $controller('filterController');
			scope = $rootScope;
			capitalize = _capitalizeFilter_;
			filter = _filterFilter_;
			orderBy = _orderByFilter_;
			limitTo = _limitToFilter_;
			$filter = _$filter_;
		});
	});
	
	it('should capitalize the input', function(){
		expect(controller.myString).toBe('hello world');
		expect(capitalize('hello world')).toBe('HELLO WORLD');
	});
	
	it('should filter controller.people and return the object with name: "Eric"', function(){
		var expectedObject = controller.people[0];
		expect(filter(controller.people, {name:'Eric'})).toEqual([expectedObject]);  
	});
	
	it('should order by name', function(){
		var firstOrder = orderBy(controller.people, 'name')[0];
		expect(firstOrder.name).toBe('Albert Pai');
	});
	
	it('should limit the result to 2', function(){
		var limitedToTwo = limitTo(controller.people, 2).length;
		expect(limitedToTwo).toBe(2);
	});
	
	it('should chain filters orderby name and limit to 1', function(){
		var filtered = limitTo(orderBy(controller.people, 'name'), 1);
		expect(filtered.length).toBe(1);
		expect(filtered[0].name).toBe('Albert Pai');
	});
	
	it('should parse a getDate() integer and format the date', function(){
		var date = 1480342878841;
		var filteredDate = $filter('date')(date, 'dd-MM-yyyy');
		expect(filteredDate).toBe('28-11-2016');
	});
	
	it('should make my name uppercase', function(){
		var makeUppercase = $filter('makeUppercase');
		expect(makeUppercase(controller.username)).toBe('MAX BISANTZ');
	});
	
	it('should use startWithA fitler and return only 2 values', function(){
		var startWithA = $filter('startWithA');
		var filteredResult = startWithA(controller.friends);
		expect(filteredResult.length).toBe(2);
		expect(filteredResult[0].name).toBe('Andrew');
	});
	
	it('should use startWithLetter with W and return one result', function(){
		var startWithLetter = $filter('startWithLetter');
		var result = startWithLetter(controller.friends, 'w');
		expect(result.length).toBe(1);
		expect(result[0].name).toBe('Will'); 
	});
	
	
});
