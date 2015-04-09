// gulp environment

// modules
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	stylus = require('gulp-stylus'),
	jade = require('gulp-jade'),
	autoprefix = require('gulp-autoprefixer'),

	browserSync = require('browser-sync'),
	reload = browserSync.reload,

	// paths variables
	path = {
		src: './src/',
		build: './build/'
	},

	// browserSync config
	bsConfig = {
		server: {
			baseDir: path.build
		},
		// tunnel: true,
		host: 'localhost',
		port: 9000
	};


// tasks
// build main css-file from stylus sources
gulp.task('stylus', function () {
	gulp
		.src(path.src + 'stylus/main.styl')
		.pipe(stylus())
		.on('error', gutil.log)
		.pipe(autoprefix({
			browsers: ['last 4 versions', '> 1%', "Firefox ESR", "Opera 12.1"],
			cascade: true
		}))
		.pipe(gulp.dest(path.build + 'css'))
		.pipe(reload({stream: true}));
});


// build html files from jade sources
gulp.task('jade', function () {

	var data = require('./template-data.json');

	gulp
		.src(path.src  + 'jade/*.jade')
		.pipe(jade({
			pretty: '\t',
			locals: data
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest(path.build))
		.pipe(reload({stream: true}));
});


// build task
gulp.task('build', ['stylus', 'jade']);


// browser sync server
gulp.task('webserver', function () {
	browserSync(bsConfig);
});


//watch
gulp.task('watch', function() {
	gulp.watch(path.src + 'stylus/**/*.styl', ['stylus']);
	gulp.watch([path.src + 'jade/**/*.jade', './template-data.json'], ['jade']);
});


// default task
gulp.task('default', ['build', 'webserver', 'watch']);