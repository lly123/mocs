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
            },

            jasmine_node: {
                options: {
                    forceExit: true,
                    match: '.',
                    matchall: false,
                    extensions: 'js',
                    specNameMatcher: 'test',
                    jUnit: {
                        report: false
                    }
                },
                all: ['spec/']
            }
        });

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-jasmine-node');

        grunt.registerTask('default', [
            'jshint',
            'jasmine_node'
        ]);
    };
}());

