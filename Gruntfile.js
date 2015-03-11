(function () {
    'use strict';

    module.exports = function (grunt) {
        grunt.initConfig({
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                all: {
                    src: [
                        'Gruntfile.js',
                        './src/{,*/}*.js'
                    ]
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-jshint');

        grunt.registerTask('default', [
            'jshint'
        ]);
    };
}());

