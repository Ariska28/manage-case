"use strict";

const runTimestamp = Math.round(Date.now()/1000);

module.exports = (gulp, plugins, soursPath) => {
    gulp.task('icon-font', () => {
        return gulp.src(soursPath.icons.build)
            .pipe(plugins.iconfont({
                fontName: 'manageCasaFont', // required
                prependUnicode: true, // recommended option
                formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available
                timestamp: runTimestamp, // recommended to get consistent builds when watching files
            }))
            .on('glyphs', function(glyphs, options) {
                // CSS templating, e.g.
                // todo: add scss mixins for icons
                console.log(glyphs, options);
            })
            .pipe(gulp.dest(soursPath.icons.dist));
    });
};