var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat       = require('gulp-concat'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
  	pngquant     = require('imagemin-pngquant'),
	emailBuilder = require('gulp-email-builder');

gulp.task('styles', function () {
	return gulp.src('dev_src/sass/*.sass')
	.pipe(sass())
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(gulp.dest('dev_src/css/'));
});

gulp.task('img', ['clean-img'], function() {
  return gulp.src('dev_src/img/**/*')
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('clean-img', function() {
  return del.sync('dist/img');
});

gulp.task('emailBuilder', function() {
	return gulp.src(['dev_src/*.html'])
		.pipe(emailBuilder().build())
		.pipe(gulp.dest('dist/emails/'));
});

gulp.task('watch', function () {
	gulp.watch('dev_src/sass/*.sass', ['styles']);
	gulp.watch('dev_src/img/**/*', ['img']);
	gulp.watch('dev_src/*.html', ['emailBuilder']);
});

gulp.task('default', ['watch']);
