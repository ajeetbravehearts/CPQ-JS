var gulp = require('gulp');
var browserify = require('browserify');
var vinylSourceStream = require( 'vinyl-source-stream' );
var vinylBuffer = require( 'vinyl-buffer' );

gulp.task('build', function() {
    return browserify('./scripts/main.js', {debug: true} ).bundle()
        .pipe( vinylSourceStream( 'cpq.js' ) )
        .pipe( vinylBuffer() )
        .pipe( gulp.dest( './build' ) );
});
