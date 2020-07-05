//use strict js code 
'use strict';


module.exports = function(grunt){
    //grunt configuration for all tasks

    //including plugins
    require('time-grunt')(grunt);

    require('jit-grunt')(grunt);

    // require('grunt-sass')(grunt);

    //grunt is an object
    grunt.initConfig({

        //configure tasks
        sass:{
            //dist is a folder i.e distribution folder
            dist :{
                files:{
                    //specifie file to compile 'styles.scss'
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch :{
            //files : to watch
            files: 'css/*.scss',
            //tasks to perform should they change
            tasks: ['sass']
        },
        browserSync:{
            dev:{
                //files to be watched
                //should they change reloade the website
                bsFiles :{
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    //tell grunt theres a watchTask running
                    watchTask:true,
                    server: {
                        //the dir for the wesite is the current one
                        baseDir:'./'
                    }
                }
            }
        }

    //end of initConfig
    });

    //task name is 'css'
    //task to execute is 'sass' which was configured up there
    grunt.registerTask('css',['sass']);
    //browserSync first
    grunt.registerTask('default',['browserSync','watch']);

}




