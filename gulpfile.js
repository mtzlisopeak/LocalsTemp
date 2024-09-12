let gulp = require("gulp")
let sass = require("gulp-sass")(require("sass"))
let uglify = require("gulp-uglify")

function compressCSS(){
    return gulp.src("./src/styles/*css")
    .pipe(sass({outputStyle: "compressed"}))
    .pipe(gulp.dest("./dist/styles"))
}

function compressJS(){
    return gulp.src("./src/scripts/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/scripts"))
}

exports.default = gulp.parallel(compressCSS, compressJS)
exports.watch = function(){
    gulp.watch("./src/styles/*.css", gulp.parallel(compressCSS))
    gulp.watch("./src/scripts/*.js", gulp.parallel(compressJS))
}