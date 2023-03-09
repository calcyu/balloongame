const { series, src, dest } = require('gulp');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const inject = require('gulp-inject');

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
        .pipe(inject(src(['src/js/**/*.js'], { read: false }), {
            relative: true,
            transform: function (filepath, file) {
                return `<script src="${filepath.substring(0, filepath.lastIndexOf('.'))}.min.js"></script>`;
            }
        }))
        .pipe(dest('dist/'));
}

exports.default = series(
    clear,
    css,
    js,
    html
);