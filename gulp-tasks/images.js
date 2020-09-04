"use strict";

module.exports = (gulp, plugins, soursPath) => {

    gulp.task('images', () => (
        gulp.src(soursPath.images.build)
        // .pipe(plugins.imagemin())
            .pipe(gulp.dest(soursPath.images.dist))
            .pipe(plugins.browserSync.reload({ stream: true }))
    ));

};