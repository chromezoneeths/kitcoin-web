const gulp = require('gulp');
const {watch} = require('gulp');
const xo = require('gulp-xo');

gulp.task('www', () => {
	return gulp.src('./www/**')
		.pipe(gulpCopy('./dist', {prefix: 6}));
});

gulp.task('jquery', () => {
	return gulp.src('./node_modules/jquery/dist/**')
		.pipe(gulp.dest('./dist/extern/jquery'));
});
gulp.task('fomantic', () => {
	return gulp.src('./node_modules/fomantic-ui-css/**')
		.pipe(gulp.dest('./dist/extern/fomantic'));
});
gulp.task('extern', gulp.parallel('jquery', 'fomantic'));

gulp.task('lint', () => {
	return gulp.src('**.*s') // All *script files
		.pipe(xo())
		.pipe(xo.format())
		.pipe(xo.results(results => {
			console.log(`Linting finished with ${results.warningCount} warnings and ${results.errorCount} errors.`);
		}));
});
gulp.task('js', () => {
	return gulp.src('./js/**')
		.pipe(gulp.dest('./dist/'));
});

gulp.task('default', gulp.parallel('www', 'extern', gulp.series('lint', 'js')));

gulp.task('watch', gulp.series('default', () => {
	watch('js/**/*.js', gulp.series('js'));
	watch('www/**', gulp.series('www'));
}));

