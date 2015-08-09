import gulp from 'gulp';
import del from 'del'

const TASK_NAME = 'clean';

function clean(callBack) {
  gulp.autoRegister(TASK_NAME, (config)=> {
    del(config.src, callBack)
  });
}

gulp.task(TASK_NAME, clean);

export default clean;

