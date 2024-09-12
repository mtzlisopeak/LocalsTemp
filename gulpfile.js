let gulp = require("gulp")
let sass = require("gulp-sass")(require("sass"))
let uglify = require("gulp-uglify")

function compileSass(){
    return gulp.src("./src/styles/*scss")
    .pipe(sass({outputStyle: "compressed"}))
    .pipe(gulp.dest("./dist/styles"))
}

function compressJS(){
    return gulp.src("./src/scripts/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/scripts"))
}

exports.default = gulp.parallel(compileSass, compressJS)
exports.watch = function(){
    gulp.watch("./src/styles/*.scss", gulp.parallel(compileSass))
    gulp.watch("./src/scripts/*.js", gulp.parallel(compressJS))
}