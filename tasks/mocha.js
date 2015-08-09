import gulp from 'gulp';
import gulpMocha from 'gulp-spawn-mocha';

const TASK_NAME = 'mocha';

function mochaOnce(fileConf) {
  return gulp.src(fileConf.src, {read: false})
    .pipe(gulpMocha(fileConf.options));
}

function mocha() {
  return gulp.autoRegister(TASK_NAME, mochaOnce);
}

gulp.task(TASK_NAME, mocha);

export default mocha;