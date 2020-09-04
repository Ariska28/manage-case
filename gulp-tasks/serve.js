"use strict";

module.exports = (gulp, plugins, soursPath) => {

    gulp.task('serve:wp', () => {
        plugins.browserSync.init({
            proxy: process.env.LOCAL_DOMAIN, // Using a vhost-based url
        });
    });

    gulp.task('serve:dev', () => {
        plugins.browserSync.init({
            server: './public',
        });
    });


};