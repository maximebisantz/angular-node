/**

		Conf.js for Protractor

**/

exports.config = {
	framework : 'jasmine',
	seleniumAddress : 'http://localhost:4444/wd/hub',
	specs : ['spec.js'],
	rootElement : '[ng-app]'
};