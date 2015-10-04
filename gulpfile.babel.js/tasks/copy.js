import gulp from 'gulp';

const TASK_NAME = 'copy';

function copyOnce(fileConf) {
  return gulp.src(fileConf.src)
    .pipe(gulp.dest(fileConf.dest))
    .pipe(gulp.pipeTimer(TASK_NAME))
}

function copy() {
  return gulp.autoRegister(TASK_NAME, copyOnce, (config)=> {
    gulp.watch(config.src, ()=> {
      copyOnce(config);
    });
  });
}

export default gulp.task(TASK_NAME, copy);
