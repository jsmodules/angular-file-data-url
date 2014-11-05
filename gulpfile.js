var gulp = require("gulp"),
    webserver = require("gulp-webserver");

gulp.task("webserver", function() {
    gulp.src(__dirname)
        .pipe(webserver({
            livereload: true,
            fallback: "index.html"
        }));
});