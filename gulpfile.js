var gulp = require('gulp'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', () => {
    return gulp.src('src/scss/style.scss')
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/css'))
       
});

gulp.task('watch', () => {
    gulp.watch('src/scss/*.scss', gulp.parallel('scss'));
});

gulp.task('default', gulp.parallel('scss', 'watch'));