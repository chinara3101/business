var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var data = require('gulp-data');
var autoprefixer = require('gulp-autoprefixer');
var htmlhint = require("gulp-htmlhint");
var prettify = require('gulp-html-prettify');


gulp.task('styles', function(){
	gulp.src('app/sass/style.sass')
	.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(gulp.dest('app/css/'))
});
gulp.task('htmls', function(){
	gulp.src('app/*.html')
	.pipe(htmlhint())
	.pipe(prettify())
});
gulp.task('pages', function(){
	gulp.src('app/templates/*.pug')
	.pipe(data(function(file){
		return require('./app/templates/data/data.json')
	}))
	.pipe(pug())
	.pipe(gulp.dest('app/'))
	
});

gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', ['styles']);
	gulp.watch('app/*.html', ['htmls']);
	gulp.watch('app/templates/**/*.pug', ['pages']);
});

gulp.task('default', ['styles','htmls', 'pages', 'watch']);