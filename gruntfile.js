//use strict js code 
'use strict';


module.exports = function(grunt){
    //grunt configuration for all tasks

    //including plugins
    require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

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
        },

        copy: {
            html: {
                files: [
                    {
                        //for html
                        expand: true,
                        dot: true,
                        cwd: './',
                        src: ['*.html'],
                        dest: 'dist'
                    }]
            },
            fonts: {
                files: [
                    {
                        //for font-awesome
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }]
            }
        },

        clean: {
            build: {
                src: ['dist/']
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: './',                   // Src matches are relative to this path
                    src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        },

        //prepare files and configure some plugins to work okay
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html', 'aboutus.html', 'index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },

        // Concat
        concat: {
            options: {
                separator: ';'
            },

            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        //cssmin
        cssmin: {
            dist: {}
        },


        // Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },

            release: {
                // filerev:release hashes(md5) all assets (images, js and css )
                // in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },


        // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin: {
            html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/index.html'],
            options: {
                assetsDirs: ['dist', 'dist/css', 'dist/js']
            }
        },


        htmlmin: {                                         // Task
            dist: {                                        // Target
                options: {                                 // Target options
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'dist/index.html',  // 'destination': 'source'
                    'dist/contactus.html': 'dist/contactus.html',
                    'dist/aboutus.html': 'dist/aboutus.html',
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

    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
}




