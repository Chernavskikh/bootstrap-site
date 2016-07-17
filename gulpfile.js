var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');//минификатор
var rename = require('gulp-rename');//переименовать в min.css
var notify = require('gulp-notify');//уведомления в панельке
var prefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');//сервер
var connect = require('gulp-connect');
var sass = require('gulp-sass');


//server connect
gulp.task('connect', function() {
  connect.server({
  		root: 'site',
  		livereload: true
  	});
});

//html
gulp.task('html', function() {
	gulp.src('./site/index.html')
	.pipe(connect.reload())
  .pipe(notify("Done reload!"));
});
//scss
gulp.task('sass', function () {
  return gulp.src('./site/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./site/css'))
});
//css
gulp.task('css', function () {
  return gulp.src('./site/css/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(prefix('last 10 versions', 'ie8', 'ie9'))
    .pipe(gulp.dest('./site/bundle'))
    .pipe(cssmin())
  	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./site/bundle'))
    .pipe(connect.reload())
    .pipe(notify("Done reload!"));
});

//watch
gulp.task('watch', function () {
	gulp.watch('./site/css/*.css', ['css'])
	gulp.watch('./site/index.html', ['html'])
  gulp.watch('./site/sass/*.scss', ['sass'])
})

//default
gulp.task('default', ['connect', 'sass', 'css', 'watch', 'html']);

