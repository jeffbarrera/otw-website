var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    copy = require('gulp-copy')

// Styles task
gulp.task('styles', function() {
  return sass('source/assets/stylesheets/styles.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('temp/stylesheets/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('temp/stylesheets/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts task
gulp.task('scripts', function() {
  return gulp.src(['bower_components/jquery/dist/jquery.min.js','bower_components/picturefill/dist/picturefill.min.js','bower_components/js-cookie/src/js.cookie.js','source/assets/javascripts/scripts.js'])
    .pipe(concat('scripts.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('temp/javascripts/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images task
gulp.task('images', function() {
  return gulp.src('source/assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('temp/images/'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Files task
gulp.task('files', function() {
    return gulp.src('source/assets/files/**/*')
        .pipe(gulp.dest('temp/files/'))
        .pipe(notify({ message: 'Files task complete' }));
});

// Fonts task
gulp.task('fonts', function() {
    return gulp.src('source/assets/fonts/**/*')
        .pipe(gulp.dest('temp/fonts/'))
        .pipe(notify({ message: 'Fonts task complete' }));
});

// Watch for changes
gulp.task('watch', function() {
    gulp.watch('source/assets/stylesheets/**/*.scss', ['styles']);
	gulp.watch('source/assets/javascripts/**/*.js', ['scripts']);
    gulp.watch('source/assets/images/**/*', ['images']);
    gulp.watch('source/assets/files/**/*', ['files']);
    gulp.watch('source/assets/fonts/**/*', ['fonts']);
});

gulp.task('default', function() {
	gulp.start('styles', 'scripts', 'images', 'files', 'fonts');
});