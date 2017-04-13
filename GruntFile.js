module.exports = function(grunt)
{
	//1. Configure my tasks
	grunt.initConfig
	(
		{

			pkg: grunt.file.readJSON('package.json'),
			//define tasks

			//first task
			sass: { //task name = parent task
			compileAndCopy: { //child of parent task.
				options: { //set options, see https://github.com/gruntjs/grunt-contrib-sass for options
					style: 'expanded' //output style is : expanded. Other options are nested, compact and compressed. See contrib-sass docs.
				},
				files: {
					/*destination*/'html_dev/css/style.css' : 'html_dev/scss/style.scss' //source. The task Sass/CompileAndCopy looks at the style.scss and compiles/outputs that to style.css
					}
				}
			},

			sync: //parent task
			{
        development: //first child task
        {
            files:
            [
                {
                  cwd: 'html_dev', //I sync files in this location
                  src: ['**/*.js', '**/*.css', '**/*.php', '**/*.html', '**/*.jpg', //check all files with these extensions
                  '!**/node_modules/**' /* but exclude txt files */ ],
                  dest: 'C:/wamp64/www/tictactoe' //any output I make is put in here
                } // makes all src relative to Current Working Directory or cwd
            ],

            verbose: true, // Default: false
            failOnError: true, // Fail the task when copying is not possible. Default: false
            updateAndDelete: true // Remove all files from dest that are not found in src. Default: false
      	},

        live:
        { //second child task
            files:
            [
                {
                  cwd: 'html_dev', //I sync files in this location
                  src: ['**/*.js', '**/*.css', '**/*.php', '**/*.html', '**/*.jpg'],
                  dest: 'C:/wamp64/www/tictactoe'
              } 	// makes all src relative to cwd
            ],

            verbose: true, // Default: false
            failOnError: true, // Fail the task when copying is not possible. Default: false
            updateAndDelete: true // Remove all files from dest that are not found in src. Default: false
         }
      },

			uglify:
			{
				options:
				{
					mangle: false,
					preserveComments: false
				},
				target:
				{
					files:
					[{
							expand: true,
							cwd: 'html_dev/js/',
							src: ['*.js', '!*.min.js'],
							dest: 'html_live/js/',
							ext: '.min.js'
					}]
				}
			},

			htmlmin:
			{
				dev:
				{
					options:
					{
						removeComments: true,
						collapseWhitespace: true
					},
						files:
						[{
							expand: true,
							cwd: 'html_dev',
							src: ['html_dev/*.html'],
							dest: 'html_live'
						}]
				}
			},

			cssmin:
			{
				target:
				{
					files:
					[{
						expand: true,
						cwd: 'html_dev/css',
						src: ['*.css', '!*.min.css'],
						dest: 'html_live/css',
						ext: '.min.css'
					}]
				}
			},

		/*
		1. watch executes both child tasks css and php.
		2. css watches the .scss file. php watches everthing in html_dev
		3. if the file changes, it runs the task 'sass', which is defined further up in this gruntfile
		4. the sass task compiles the .scss to .css and outputs it to html_dev/style.css
		5. the watch task looks at the html_dev folder for ANY changes with the 'php' childtask
		6. when task sass outputs the css file to html_dev, the css file changes, therefore invoking the watch childtask php
		7. the child task php invokes the task sync:development
		8. the child task development copies all .js, .css, .php and .html files in html_dev to the destination folder
		*/
		watch: //parent task . When I call 'grunt watch' in CMD this is what happens:
		{
			css: //child task
			{
				files: 'html_dev/scss/style.scss', //watch this file
				tasks: ['sass'] //if anything changes in file, run the sass task
			},

			php: //child task
			{
					files: 'html_dev/**/*.*', //check this folder for any file that changes
					tasks: ['sync:development']  //Specifically run the 'development' subtask of 'sync'
			}
		}
		}
	);

	//2. Load in my wanted tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-sync');

	//3. Set up my tasks or 'register'
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('minify', ['uglify', 'cssmin', 'htmlmin']);
//(taskName, taskList) . 'default' is run when you do not run specific grunt tasks, so you run in CMD 'grunt'
	//grunt.registerTask('release',['sass', 'sync:live', 'minify', 'upload']); here the task 'release' runs the subtasks 'sass', 'sync:live', 'minify', 'upload' =>
	//in CMD write 'grunt release'. Run specific task : 'grunt release:sass'
}
