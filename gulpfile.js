const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const runSequence = require("run-sequence").use(gulp);
const rev = require("gulp-rev");
const reCollector = require("gulp-rev-collector");
const uglify = require("gulp-uglify");
const reload = browserSync.reload;

gulp.task('scss:dev', () => {
	gulp.src('src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css')); //将生成好的css文件放到dist/css文件夹下
});


gulp.task('dev', ['scss:dev'], function() {
	browserSync.init({
		server: {
			baseDir: './' //设置服务器的根目录
		},
		logLevel: "debug",
		logPrefix: "dev",
		browser: 'chrome',
		notify: false //开启静默模式
	});
	//使用gulp的监听功能，实现编译修改过后的文件
	gulp.watch('src/scss/*.scss', ['scss:dev']);
	gulp.watch(('*.html')).on('change', reload);
});

gulp.task('css',()=> {
    gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'               
        }))
        .pipe(rev())                                
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())                       
        .pipe(gulp.dest('rev/css'));
});

gulp.task('js', ()=> {
    gulp.src('src/js/*js')
        .pipe(uglify())
        .pipe(rev())                                
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())                       
        .pipe(gulp.dest('rev/js'));
});

gulp.task('clean', () => {
	gulp.src(['dist', 'rev'], {
			read: false
		}) //这里设置的dist表示删除dist文件夹及其下所有文件
		.pipe(clean());
});

//将处理过的css，js引入html
gulp.task('reCollector', () => {
	gulp.src(['rev/**/*.json', 'src/*.html'])
		.pipe(reCollector({
			replaceReved: true, //模板中已经被替换的文件是否还能再被替换,默认是false
			dirReplacements: { //标识目录替换的集合, 因为gulp-rev创建的manifest文件不包含任何目录信息,
				'css/': '/dist/css/',
				'js/': '/dist/js/'
			}
		}))
		.pipe(gulp.dest('dist'))
})

gulp.task('build', () => {
	runSequence('clean', ['css', 'js'], 'reCollector');
});