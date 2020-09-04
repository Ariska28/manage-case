"use strict";

module.exports = (gulp, plugins, soursPath) => {
    gulp.task('copy:fonts', () => {
        return gulp.src(soursPath.fonts.build)
            .pipe(gulp.dest(soursPath.fonts.dist));

    });
};