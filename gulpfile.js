const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const copy = require('gulp-copy');
const tsify = require('tsify');
const svelte = require('gulp-svelte');
const fs = require('fs');
const path = require('path');

gulp.task('js', async () => {
	return browserify()
		.add('src/index.js')
		.bundle()
		.pipe(fs.createWriteStream('./build/index.js'));
});

gulp.task('svelte', async () => {
	return gulp.src('svelte/*.svelte')
		.pipe(svelte({
			customElement: true
		}))
		.pipe(gulp.dest('./build/svelte'));
});

gulp.task('ui', async () => {
	return gulp.src('node_modules/fomantic-ui-css/*')
		.pipe(copy('build/ui', { prefix: 2 }));
});

gulp.task('jq', async () => {
	return gulp.src('node_modules/jquery/dist/*')
		.pipe(copy('build/jq', { prefix: 3 }));
});

gulp.task('static', () => {
	return gulp.src('static/**')
		.pipe(copy('build', { prefix: 1 }));
});

gulp.task('default', (() => {
	if (!fs.existsSync('./build')) {
		fs.mkdirSync('./build');
	};
	return gulp.parallel('js', 'svelte', 'ui', 'static', 'jq');
})());
