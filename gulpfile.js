'use strict';

// run gulp on terminal

let gulp = require('gulp'),
	sass = require('gulp-sass'),
	gcmq = require('gulp-group-css-media-queries'),
	cssmin = require('gulp-cssmin'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	rigger = require('gulp-rigger'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
	return gulp.src('./sass/**/*.sass')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 15 versions'],
			cascade: false
		}))
		.pipe(gcmq())
		.pipe(cssmin())
		.pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.sass', ['sass']);
});


gulp.task('js', function () {
	return gulp.src('./js/*.js')
		.pipe(rigger())
		// .pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('js:watch', function () {
	gulp.watch('./js/*.js', ['js']);
});


gulp.task('default',
	['sass', 'sass:watch', 'js', 'js:watch'],
);