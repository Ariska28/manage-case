"use strict";

module.exports = (gulp, plugins, soursPath) => {

// scss, css
    gulp.task('css', () => {

        let taskStream = gulp.src(soursPath.styles.build)
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.postcss([
                plugins.autoprefixer({
                    browsers: ['last 10 versions'],
                    cascade: false,
                }),
                plugins.cssnano(),
            ]))
            .pipe(plugins.cssTimeStamp({useDate: true}))
            .pipe(gulp.dest(soursPath.styles.dist));

        // if(serve){
            taskStream = taskStream.pipe(plugins.browserSync.reload({stream: true}));
        // }

        return taskStream;

    });

    gulp.task('css:vendors', () => {

        let taskStream = gulp.src(soursPath.styles.vendors)
            .pipe(plugins.concat('vendors.css'))
            .pipe(plugins.postcss([
                    plugins.cssnano()
                ])
            )
            .pipe(plugins.cssTimeStamp({useDate: true}))
            .pipe(gulp.dest(soursPath.styles.dist));

        // if(serve){
            taskStream = taskStream.pipe(plugins.browserSync.reload({stream: true}));
        // }

        return taskStream;
    });


};