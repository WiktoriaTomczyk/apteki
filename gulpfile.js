/**
 * Created by Wiktoria on 2017-06-29.
 */
const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");

gulp.task("default", ["map", "style"]);

gulp.task("map", () => {
    return gulp.src("map.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("style", () => {
    return gulp.src("style.sass")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("dist"));
});
