module.exports = function(grunt) {  
   
    grunt.initConfig({   
		pkg: grunt.file.readJSON('package.json'),

		jshint: {  
            options: {
                curly: true,
                eqeqeq: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true
            },
            globals: {
                exports: true
            }
		}, 
    
        uglify: {  
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.description %> | MIT License | By: <%= pkg.author %> | <%= pkg.homepage %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
            js: {  
                files: {   
                    'dist/tiletemplate.min.js': ['src/tiletemplate.js'] 
                }  
            } 
        }  
   
    });  
    
    grunt.loadNpmTasks('grunt-contrib-jshint');  
    grunt.loadNpmTasks('grunt-contrib-uglify');  
    
    grunt.registerTask('default', ['jshint', 'uglify']); 
    grunt.registerTask('development', ['jshint']);    
    grunt.registerTask('production', ['jshint', 'uglify']);  
};