var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var vinylSourceStream = require( 'vinyl-source-stream' );
var sourcemaps = require('gulp-sourcemaps');
var vinylBuffer = require( 'vinyl-buffer' );

gulp.task('build', function() {
    return browserify('./scripts/main.js', {debug: true} ).bundle()
        .pipe( vinylSourceStream( 'cpq.js' ) )
        .pipe( vinylBuffer() )
        .pipe( sourcemaps.init( {loadMaps: true} ) )
        .pipe( uglify() )
        .pipe( sourcemaps.write('./') )
        .pipe( gulp.dest( './build' ) );
});
