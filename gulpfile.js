'use strict';

// run gulp

let gulp = require('gulp'),
	sass = require('gulp-sass'),
	gcmq = require('gulp-group-css-media-queries'),
	cssmin = require('gulp-cssmin');



gulp.task('sass', function () {
	return gulp.src('./sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gcmq())
		.pipe(cssmin())
		.pipe(gulp.dest('app/css'));

});

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.sass', ['sass']);
});

gulp.task('default',
	['sass', 'sass:watch'],
);