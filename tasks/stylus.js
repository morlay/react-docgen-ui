import gulp from 'gulp'
import gutil from 'gulp-util'
import gulpStylus from 'gulp-stylus'

const TASK_NAME = 'stylus';

function stylusOnce(fileConf) {
  return gulp.src(fileConf.src)
    .pipe(gulpStylus(fileConf.options))
    .pipe(gulp.dest(fileConf.dest))
    .pipe(gulp.pipeTimer(TASK_NAME))
}

function stylus() {
  return gulp.autoRegister(TASK_NAME, stylusOnce, (config)=> {
    gulp.watch(config.src, (evt)=> {
      gutil.log(evt.type, evt.path);
      stylusOnce(config)
    });
  });
}

export default gulp.task(TASK_NAME, stylus);
