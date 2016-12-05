/************************************************
 * Directive example: Angular tabs. 			*
 * https://thinkster.io/angular-tabs-directive 	*
 ************************************************/

(function(window){
	angular.module('app', [])
	
	/**
	 * The first directive is "tab".
	 * This directive represent a single pane in 
	 * the tabs widget
	 */
	.directive('tab', function(){
		return {
			restrict: 'E',
			transclude: true,
			template: '<div role="tabpanel" ng-show="active" ng-transclude></div>', // added ng-show binded to scope.active to display the tab.
			require: '^tabset', // tab directive nested inside tabset directive. --> inject the controller from tabset. ^ means the scope goes up one level
			scope: {
				heading: '@' // picks the attribute "heading" on the tabs in the view. @ stands for String
			},
			link: function(scope, element, attrs, tabsetCtrl){
				scope.active = false
				tabsetCtrl.addTab(scope)
			}
		}
	})
	/**
	 * Tabset directive that will contain 
	 * the actual logic on how to display tabs 
	 * and how to select one
	 */
	.directive('tabset', function(){
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			templateUrl: 'tabset.html',
			bindToController: true, // any values passed into the directive scope will be accessible in the controller via "this"
			controllerAs: 'tabset',
			controller: function(){
				var self = this;
				self.tabs = [];
				self.addTab = function addTab(tab){
					self.tabs.push(tab)
					// set the first tab to be active
					if(self.tabs.length === 1){
						tab.active = true;
					}
				}
				self.select = function(selectedTab){
					angular.forEach(self.tabs, function(tab){
						if(tab.active && tab !== selectedTab){
							tab.active = false;
						}
					})
					selectedTab.active = true;
				}
			}
		}
	})
	
})(window);

/*
 * When the page loads, the two directives will be initialized. 
 * Any tab directives will then register themselves with the tabset 
 * directive by calling a method on the tabset controller. 
 * The tabset directive will be responsible for orchestrating 
 * which tab is active as well as providing an interface for selecting tabs.
 */
