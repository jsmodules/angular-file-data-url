var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    jshint = require("gulp-jshint"),
    size = require("gulp-size"),
    stylish = require("jshint-stylish");

function path(str) {
    return __dirname + (str.charAt(0) === "/" ? "" : "/") + str;
}

gulp.task("js", function() {
    var SRC = path("src/**/*.js"),
        DEST = path("dist");

    return gulp.src(SRC)
        .pipe(uglify())
        .pipe(size({gzip: true}))
        .pipe(gulp.dest(DEST));
});

gulp.task("watch", function() {
    gulp.watch(path("src/**/*.js"), ["js"]);
});

gulp.task("jshint", function () {
    return gulp.src(path("src/js/**/*.js"))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task("test", ["jshint"]);
gulp.task("build", ["js"]);