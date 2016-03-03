module.exports = function(grunt){
	//加载所有依赖包，也就是在package中配置的
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	//如果没有matchdep这个插件，需要用grunt.loadNpmTasks("grunt-task-name")来加载相应模块
	//grunt.loadNpmTasks("grunt-htmlhint");
	//
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{ 
        	main: { 
        		expand: true, 
        		cwd: './less/', 
        		src: ['yunui.less'], 
        		dest: './dist/css/', 
        		ext: '.css' 
        	} 
        },
		watch:{
	    	less:{
	    		files:['./less/**/*.less'],
	    		tasks:['less:main']
	    	}
		}        
    });

    grunt.registerTask('default', [
        'less',
        'watch'
    ]);

};    