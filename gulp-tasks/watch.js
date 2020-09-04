"use strict";

module.exports = (gulp, plugins, soursPath) => {

    gulp.task('watch:dev', () => {
        gulp.watch(soursPath.html.watch, ['html']);
        gulp.watch(soursPath.styles.watch, ['css']);
        gulp.watch(soursPath.js.watch, ['scripts']);
        gulp.watch(soursPath.icons.watch, ['icon-font']);
        // gulp.watch(soursPath.images.watch, ['images']);
    });

    gulp.task('watch:build', () => {

        gulp.watch(soursPath.styles.watch, ['css']);
        gulp.watch(soursPath.js.watch, ['scripts']);
        // gulp.watch(soursPath.images.watch, ['images']);
        gulp.watch(soursPath.icons.watch, ['icon-font']);

        gulp.watch(soursPath.php.watch).on('change', plugins.browserSync.reload);


    });


};