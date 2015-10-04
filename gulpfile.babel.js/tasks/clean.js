import gulp from 'gulp';
import del from 'del'

const TASK_NAME = 'clean';

function clean(callBack) {
  gulp.autoRegister(TASK_NAME, (config)=> {
    del.sync(config.src)
    callBack();
  });
}

gulp.task(TASK_NAME, clean);

export default clean;

