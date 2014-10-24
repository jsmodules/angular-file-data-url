var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    changed = require("gulp-changed"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish");

function path(str) {
    return __dirname + (str.charAt(0) === "/" ? "" : "/") + str;
}

gulp.task("js", function() {
    var SRC = path("src/**/*.js"),
        DEST = path("dist");

    return gulp.src(SRC)
        .pipe(uglify())
        .pipe(gulp.dest(DEST));
});

gulp.task("jshint", function () {
    return gulp.src("src/js/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task("test", ["jshint"]);
gulp.task("build", ["js"]);