const { series, src, dest } = require('gulp');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function clear() {
    return src('dist', { allowEmpty: true })
        .pipe(clean());
}
function css() {
    return src(['src/css/**/*.css'])
        .pipe(dest('dist/css'));
}
function js() {
    return src(['src/js/**/*.js'])
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('dist/js'));
}
function html() {
    return src('src/**/*.html')
        .pipe(dest('dist/'));
}

exports.default = series(
    clear,
    css,
    js,
    html
);