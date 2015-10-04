import gulp from 'gulp';
import eslint from 'gulp-eslint';

const TASK_NAME = 'lint';

function lintOnce(fileConf) {
  return gulp.src(fileConf.src)
    .pipe(eslint(fileConf.options))
    .pipe(eslint.formatEach('compact', process.stderr))
    .pipe(eslint.failOnError())
}

function lint() {
  return gulp.autoRegister(TASK_NAME, lintOnce);
}

gulp.task(TASK_NAME, lint);

export default lint;

