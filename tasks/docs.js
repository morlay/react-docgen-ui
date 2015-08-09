import gulp from 'gulp';
import gutil from 'gulp-util';

import gulpDocGenUi from '../src';

const TASK_NAME = 'docs';

function docsOnce(fileConf) {
  return gulp.src(fileConf.entry)
    .pipe(gulpDocGenUi({
      cwd: gutil.env.cwd ? process.cwd() : null
    }))
    .on('error', gutil.log.bind(gulp))
    .pipe(gulp.dest(fileConf.dest))
    .pipe(gulp.pipeTimer(TASK_NAME))
}

function docs() {
  return gulp.autoRegister(TASK_NAME, docsOnce, (config)=> {
    gulp.watch(config.src, ()=> {
      docsOnce(config);
    });
  });
}

export default gulp.task(TASK_NAME, docs);
