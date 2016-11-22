/**

	SPEC.js for PROTRACTOR

**/

/*
describe('Protractor demo app', function(){
	it('should have a title', function(){
		
		browser.get('http://juliemr.github.io/protractor-demo');

		expect(browser.getTitle()).toEqual('Super Calculator');
	})
})
*/

describe('Binding test', function(){
	it('should bind the data from input to text', function(){
		
		// get the browser on desired page
		browser.get('http://localhost:8080/binding/'); 
		
		// select an element of the DOM with by selecting the model (ng-model). 
		// Populate the field with .sendKeys function
		element(by.model('message')).sendKeys('hello world');
		
		// Test : select the <p> where {{message}} and test its content against the test 'hello world'
		expect(element(by.binding('message')).getText()).toEqual('hello world');

	});
	
	
	it('should accept only one value: hello (thus not having ng-valid as class name)', function(){
		
		browser.get('http://localhost:8080/binding/');

		var inputWithRegex = element(by.name('inputRegex'));
		
		
		inputWithRegex.sendKeys('hello world');
		
		expect(inputWithRegex.getAttribute('class')).not.toMatch(/ng-valid(?!-)/); // should ask for not ng-valid. (ng-valid-required) exists.
		
		inputWithRegex.clear().sendKeys('hello');
		
		expect(inputWithRegex.getAttribute('class')).toMatch(/ng-valid(?!-)/);
		
	});
	
	it('should stay always the same value', function(){

		browser.get('http://localhost:8080/binding/');
		
		var inputClick  = element(by.id('clickButton'));
		var same		= element(by.id('one-time-binding-example'));
		var changing 	= element(by.id('normal-binding-example'));
		
		
		inputClick.click();
		
		
		expect(same.getText()).toMatch('igor');
		expect(changing.getText()).toMatch('igor');
		
		
		inputClick.click();
		
		expect(same.getText()).toMatch('igor');
		expect(changing.getText()).not.toMatch('igor');
		
	})
	
	
	
	
	
})

