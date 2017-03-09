
var gulp = require('gulp');
// 编译less文件转化为CCS
var less = require('gulp-less');
// 压缩css文件
var cssnano = require('gulp-cssnano');
// 浏览器同步测试工具
var browserSync = require('browser-sync').create();

gulp.task('default',function(){
	console.log('Hello World Zch');
});

gulp.task('copy',function(){
	//console.log('Hello World Zch');
	// gulp.src取一个文件
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist/'));	// 将此处需要的操作传递进去
});

gulp.task('dist',function(){
	gulp.watch('src/index.html',['copy']);
});

// 编译less文件
gulp.task('style',function(){
	gulp.src('src/styles/*.less')
		.pipe(less())	// 将less文件转为css文件
		.pipe(cssnano())	// 压缩css文件
		.pipe(gulp.dest('dist/css/'))
});
gulp.task('styless',function(){
	gulp.watch('src/styles/*.less',['style']);
});


// 浏览器同步测试工具
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"	// 修改从哪个入口进入浏览器
        }
    });
});