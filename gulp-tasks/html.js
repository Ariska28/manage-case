"use strict";

module.exports = (gulp, plugins, soursPath) => {

    gulp.task('html', () => (
        gulp.src(soursPath.html.build)
            .pipe(plugins.rigger())
            .pipe(gulp.dest(soursPath.html.dist))

            .pipe(plugins.browserSync.reload({ stream: true }))

    ));

};