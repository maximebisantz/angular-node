module.exports = function(grunt){
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.initConfig({
		watch : {
			livereload : {
				files: ['public/**/*.*'],
				options:{
					spawn: true,
					livereload: true
				}
			}
		}
	})
	   
	grunt.registerTask('default', 'watch');
}    