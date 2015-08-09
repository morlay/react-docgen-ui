import gulp from 'gulp';
import gulpBabel from 'gulp-babel';

const TASK_NAME = 'babel';

function babelOnce(fileConf) {
  return gulp.src(fileConf.src)
    .pipe(gulpBabel(fileConf.options))
    .pipe(gulp.dest(fileConf.dest));
}

function babel() {
  return gulp.autoRegister(TASK_NAME, babelOnce);
}

gulp.task(TASK_NAME, babel);

export default babel;

