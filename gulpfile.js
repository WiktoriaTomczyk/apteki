/**
 * Created by Wiktoria on 2017-06-29.
 */
const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("default", ["map", "dojoConfig"]);

gulp.task("map", () => {
    return gulp.src("map.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("dojoConfig", () => {
    return gulp.src("dojoConfig.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("dist"));
});