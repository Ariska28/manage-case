"use strict";

module.exports = (gulp, plugins, soursPath) => {

// scss, css
    gulp.task('scripts', () => {

        let stream = gulp.src(soursPath.js.build);

        stream = stream
            .pipe(plugins.rigger())
            .pipe(plugins.babel({
                    presets: ['env'],
                })
            )
            .pipe(gulp.dest(soursPath.js.dist))
            .pipe(plugins.rename((path) => {
                path.extname = `.min${path.extname}`;
            }))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(soursPath.js.dist))

            .pipe(plugins.browserSync.reload({ stream: true }));

        return stream;

    });

    gulp.task('scripts:vendors', () => {
        let stream = gulp.src(soursPath.js.vendors);

        stream = stream
            .pipe(plugins.concat('vendors.js'))
            .pipe(gulp.dest(soursPath.js.dist))
            .pipe(plugins.uglify())
            .pipe(plugins.rename('vendors.min.js'))
            .pipe(gulp.dest(soursPath.js.dist))

            .pipe(plugins.browserSync.reload({ stream: true }));

        return stream;
    });

};