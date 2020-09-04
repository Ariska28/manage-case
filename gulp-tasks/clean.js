"use strict";

module.exports = (gulp, plugins, soursPath) => {

    gulp.task('clean:all', () => {
        plugins.del([
            soursPath.styles.dist,
            `${soursPath.html.dist}/**/*.html`,
            soursPath.images.dist,
            soursPath.js.dist,
            soursPath.icons.dist
        ], { force: true });
    });

    gulp.task('clean:js', () => {
        plugins.del([
            soursPath.js.dist
        ], { force: true });
    });

    gulp.task('clean:images', () => {
        plugins.del([
            soursPath.images.dist
        ], { force: true });
    });

    gulp.task('clean:html', () => {
        plugins.del([
            `${soursPath.html.dist}/**/*.html`,
        ], { force: true });
    });

    gulp.task('clean:fonts', () => {
        plugins.del([
            soursPath.icons.dist
        ], { force: true });
    });

    gulp.task('clean:css', () => {
        plugins.del([
            soursPath.styles.dist
        ], { force: true });
    });


};