/**
 * Selenium tests against FORMS
 */

describe('Test against Forms', function(){
	
	by.addLocator('controller', function(controllerName){
		var controller = document.querySelectorAll('[ng-controller=" '+ controllerName +'"]');
		return controller;
	});

	beforeEach(function(){
		browser.get('http://localhost:8080/forms/');
	})

	/**
	 * Test the first form to bind and retrieve data
	 */
	describe('Controller 1', function(){
		
		var controller1 = element(by.id('ExampleController'));
		var name = controller1.element(by.model('ctrl.user.name'));
		var email = controller1.element(by.model('ctrl.user.email'));
		var genderMale = controller1.element(by.css('[value="male"]'));
		var genderFemale = controller1.element(by.css('[value="female"]'));
		var update = controller1.element(by.id('updateControl1'));
		var master = element(by.id('master1'));
		var reset = element(by.id('resetControl1'));
		var user = element(by.id('user1'));
		
		it('should bind the data to the model', function(){
			
			expect(master.getText()).toBe('master = {}');
			
			name.sendKeys('max');
			email.sendKeys('max@example.com');
			genderMale.click();
			update.click();
			
			// evaluate ctrl.master rather than getting the text out of the DOM element.
			master.evaluate('ctrl.master').then(function(value){
				console.log('evaluate ctrl.master');
				console.log(value);
				
				// actual test
				expect(value).toEqual({name:"max", gender:"male", email:"max@example.com"});
				
			});
			
			name.clear();
			email.clear();
			
			name.sendKeys('henry');
			email.sendKeys('henry@example.com');
			genderFemale.click();
			
			
			user.evaluate('ctrl.user').then(function(value){
				console.log('evaluate ctrl.user');
				console.log(value);
				
				expect(value).toEqual({name:"henry", gender: "female", email:"henry@example.com"});
			})
			
			reset.click();
			
			user.evaluate('ctrl.user').then(function(value){
				console.log('reevaluate ctrl.user after calling reset()');
				console.log(value);
				
				expect(value).toEqual({name:"max", gender: "male", email:"max@example.com"});
			});
		});
	});

	describe('Controller 2 - validation example', function(){
		
		
		var controller2 	= element(by.id('ExampleController2'));
		var name 			= controller2.element(by.model('ctrl.user.name'));
		var nameVal 		= controller2.element(by.id('nameError2'));
		var email 			= controller2.element(by.model('ctrl.user.email'));
		var emailValRequired = controller2.element(by.id('emailRequired1'));
		var emailValValid 	= controller2.element(by.id('emailValid1'));
		var agree 			= controller2.element(by.model('ctrl.user.agree'));
		var sign 			= controller2.element(by.model('ctrl.user.agreeSign'));
		var agreeVal 		= controller2.element(by.id('agreeValidation2'));
		
		it('should have validation hidden', function(){
			name.sendKeys('max');
			// valid input - the validation error should be hidden
			expect(nameVal.isDisplayed()).not.toBeTruthy();
		})
		
		it('should display validation error', function(){
			name.sendKeys('max');
			name.clear();
			
			//browser.sleep(2000);
			
			//name.sendKeys(protractor.Key.BACK_SPACE);
			
			name.sendKeys(protractor.Key.ENTER);
			
			//browser.sleep(3000);
			
			// validation error must be shown.
			expect(nameVal.isDisplayed()).toBeTruthy();
		});
		
		it('should display an error at first and then validate it', function(){
			
			email.sendKeys('max');
			email.sendKeys(protractor.Key.ENTER);
			
			// display error not valid email
			expect(emailValValid.isDisplayed()).toBeTruthy();
			
			email.clear();
			email.sendKeys(protractor.Key.ENTER);
			
			// display error email is required
			expect(emailValRequired.isDisplayed()).toBeTruthy();
			
			email.sendKeys('max@example.fr');
			
			// no errors
			expect(emailValValid.isDisplayed() && emailValRequired.isDisplayed()).not.toBeTruthy();
			
		});
		
		it('should display an error when the user doesn\'t click agree', function(){
			
			// agree sign should not be displayed
			expect(sign.isDisplayed()).not.toBeTruthy();
			
			agree.click();
			
			// agree sign should be displayed
			expect(sign.isDisplayed()).toBeTruthy();
			
			sign.click();
			
			browser.wait(function(){
				return agreeVal.isDisplayed();
			});
			
			// error message should be shown
			expect(agreeVal.isDisplayed()).toBeTruthy();
			
			sign.sendKeys('max');
			
			// error message should be hidden
			expect(agreeVal.isDisplayed()).not.toBeTruthy();
			
		});
		
	});
	
	describe('Custom Validation - controller 4', function(){
		
		var controller4 = element(by.id('ExampleController4'));
		var size = controller4.element(by.model('ctrl.size'));
		var invalid = element(by.css('[name="errorInvalid"]'));
		var range = element(by.css('[name="errorRange"]'));
		
		it('Should have the error hidden', function(){
			expect(invalid.isDisplayed()).not.toBeTruthy();
			expect(range.isDisplayed()).not.toBeTruthy();
		});
		
		it('Should have the error displayed', function(){
			size.sendKeys('aaa');
			size.sendKeys(protractor.Key.ENTER);
			expect(invalid.isDisplayed()).toBeTruthy();
			expect(range.isDisplayed()).not.toBeTruthy();
		});
		
		it('Should have the error displayed again', function(){
			size.clear();
			size.sendKeys('12');
			size.sendKeys(protractor.Key.ENTER);
			
			//browser.sleep(2000);
			
			expect(invalid.isDisplayed()).not.toBeTruthy();
			expect(range.isDisplayed()).toBeTruthy();
		});
		
		it('Should not have the error displayed', function(){
			size.clear();
			size.sendKeys('5');
			size.sendKeys(protractor.Key.ENTER);

			//browser.sleep(2000);
			
			expect(invalid.isDisplayed()).not.toBeTruthy();
			expect(range.isDisplayed()).not.toBeTruthy();
		});
		
	});
	
});


