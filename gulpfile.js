const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const tsProject = ts.createProject('./tsconfig.json');

gulp.task('scripts', () => {
    const merge = require('merge2');
    const tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('./definitions')),
        tsResult.js
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../src' }))
        .pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
    ]);
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});


gulp.task('default', ['watch']);