/** TESTS FOR SERVICE PAGE **/

describe('Service Test', function(){
	
	beforeEach(function(){
		browser.get('http://localhost:8080/services/');
	})
	
	it('should test service', function(){
		
		var controller = element(by.id('simple'));
		var message = controller.element(by.model('message'));
		var button = controller.element(by.css('button'));
		
		
		expect(message.getAttribute('value')).toEqual('test');
		
		function sendMessage(msg){
			message.clear();
			message.sendKeys(msg);
			button.click();
		}
		
		sendMessage('hello');
		sendMessage('world');
		sendMessage('max');
		
		// needs to be declared after the 3 clicks (when the alert pop's up)
		var alert = browser.switchTo().alert();

		expect(alert.getText()).toEqual('hello\nworld\nmax');
		
	})
	
	
})